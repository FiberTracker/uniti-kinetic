#!/usr/bin/env python3
"""
build_bdc.py — FCC BDC CSV -> GeoJSON JS files for Uniti/Kinetic dashboard.

Processes all downloaded BDC CSVs into per-provider GeoJSON JS files
with TIGERweb census block group polygons (Layer 8 = Census 2020).

Usage: python3 build_bdc.py
"""

import csv
import json
import os
import sys
import time
from collections import defaultdict
from pathlib import Path
from urllib.request import urlopen, Request

try:
    from shapely.geometry import shape, mapping
    HAS_SHAPELY = True
except ImportError:
    HAS_SHAPELY = False
    print("[WARN] shapely not installed — polygons won't be simplified. pip install shapely")

# ============================================
# CONFIGURATION
# ============================================

PROVIDER_MAP = {
    '131413': {'var': 'KINETIC_BDC_COVERAGE', 'file': 'kinetic_bdc.js', 'name': 'Windstream/Kinetic', 'color': '#4972AC'},
    '130077': {'var': 'ATT_BDC_COVERAGE', 'file': 'att_bdc.js', 'name': 'AT&T', 'color': '#009FDB'},
    '131425': {'var': 'VZ_BDC_COVERAGE', 'file': 'verizon_bdc.js', 'name': 'Verizon', 'color': '#EE0000'},
    '130258': {'var': 'FRONTIER_BDC_COVERAGE', 'file': 'frontier_bdc.js', 'name': 'Frontier', 'color': '#E60000'},
    '131081': {'var': 'METRONET_BDC_COVERAGE', 'file': 'metronet_bdc.js', 'name': 'MetroNet', 'color': '#B98E2C'},
}

TECH_FTTP = 50
SIMPLIFY_TOLERANCE = 0.002
COORD_DECIMALS = 4

# CRITICAL: Use Layer 8 (Census2020) — has HU100 and POP100
# Layer 10 (ACS2023) does NOT have these fields
TIGER_URL = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Census2020/MapServer/8/query'

SCRIPT_DIR = Path(__file__).parent
FCC_DATA_DIR = SCRIPT_DIR / 'fcc_data'
BDC_OUTPUT_DIR = SCRIPT_DIR / 'bdc_output'

POLYGON_CACHE = {}
CACHE_FILE = SCRIPT_DIR / 'fcc_data' / 'polygon_cache.json'

STATE_NAMES = {
    '01': 'Alabama', '05': 'Arkansas', '12': 'Florida', '13': 'Georgia',
    '19': 'Iowa', '21': 'Kentucky', '27': 'Minnesota', '28': 'Mississippi',
    '29': 'Missouri', '31': 'Nebraska', '35': 'New Mexico', '36': 'New York',
    '37': 'North Carolina', '39': 'Ohio', '40': 'Oklahoma', '42': 'Pennsylvania',
    '45': 'South Carolina', '48': 'Texas',
}


def load_polygon_cache():
    global POLYGON_CACHE
    if CACHE_FILE.exists():
        with open(CACHE_FILE, 'r') as f:
            POLYGON_CACHE = json.load(f)
        print(f"[CACHE] Loaded {len(POLYGON_CACHE)} cached polygons")


def save_polygon_cache():
    with open(CACHE_FILE, 'w') as f:
        json.dump(POLYGON_CACHE, f)
    print(f"[CACHE] Saved {len(POLYGON_CACHE)} polygons to cache")


def find_csv_files():
    if not FCC_DATA_DIR.exists():
        print("[ERROR] fcc_data/ not found. Run download_bdc_api.py first.")
        sys.exit(1)
    csvs = list(FCC_DATA_DIR.glob('*.csv'))
    if not csvs:
        print("[ERROR] No CSV files in fcc_data/")
        sys.exit(1)
    print(f"[INFO] Found {len(csvs)} CSV file(s)")
    for f in sorted(csvs):
        print(f"  - {f.name} ({f.stat().st_size / 1e6:.1f} MB)")
    return sorted(csvs)


def detect_provider_id(csv_path):
    """Extract provider ID from filename or CSV content."""
    name = csv_path.stem.lower()
    parts = name.replace('-', '_').split('_')
    # Pattern: bdc_STATE_PROVIDERID_...
    for i, p in enumerate(parts):
        if p in STATE_NAMES and i + 1 < len(parts):
            candidate = parts[i + 1]
            if candidate.isdigit():
                return candidate
    # Fallback: read first row
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            return str(row.get('provider_id', ''))
    return None


def read_bdc_csv(csv_path):
    """Read BDC CSV, filter to FTTP, aggregate to block group level."""
    print(f"\n  Reading {csv_path.name}...")
    block_groups = defaultdict(lambda: {'bsls': 0, 'blocks': set()})
    total_rows = 0
    fttp_rows = 0

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        tech_col = 'technology' if 'technology' in fieldnames else 'technology_code'
        geoid_col = 'block_geoid' if 'block_geoid' in fieldnames else 'census_block_geoid'

        for row in reader:
            total_rows += 1
            tech = int(row.get(tech_col, 0))
            if tech != TECH_FTTP:
                continue
            fttp_rows += 1
            geoid = row.get(geoid_col, '')
            if not geoid:
                continue
            bg_geoid = geoid[:12]
            block_groups[bg_geoid]['bsls'] += 1
            block_groups[bg_geoid]['blocks'].add(geoid[:15])

    for bg in block_groups.values():
        bg['blocks'] = len(bg['blocks'])

    print(f"    Total rows: {total_rows:,} | FTTP: {fttp_rows:,} | Block groups: {len(block_groups):,}")
    return dict(block_groups)


def fetch_tiger_polygons(geoids):
    """Fetch block group polygons from Census TIGERweb Layer 8 (Census 2020)."""
    uncached = [g for g in geoids if g not in POLYGON_CACHE]
    if not uncached:
        print(f"  All {len(geoids)} polygons already cached")
        return

    print(f"\n[TIGER] Fetching polygons for {len(uncached)} block groups ({len(geoids) - len(uncached)} cached)...")

    needed_counties = set()
    needed_geoids = set(uncached)
    for g in uncached:
        needed_counties.add(g[:5])

    total_fetched = 0
    total_counties = len(needed_counties)

    for ci, county in enumerate(sorted(needed_counties)):
        state_fips = county[:2]
        county_code = county[2:]
        state_name = STATE_NAMES.get(state_fips, state_fips)

        # CRITICAL: Use spaces as + in WHERE clause, NOT %20 or urllib.parse.quote
        where = "STATE='" + state_fips + "'+AND+COUNTY='" + county_code + "'"
        url = (TIGER_URL + "?where=" + where +
               "&outFields=GEOID,AREALAND,HU100,POP100" +
               "&f=geojson&outSR=4326&returnGeometry=true")

        try:
            req = Request(url, headers={'User-Agent': 'UnitiKineticGIS/1.0'})
            with urlopen(req, timeout=60) as resp:
                data = json.loads(resp.read())

            county_fetched = 0
            if 'features' in data:
                for feature in data['features']:
                    geoid = feature['properties'].get('GEOID', '')
                    if geoid and geoid in needed_geoids and feature.get('geometry'):
                        geom = simplify_geometry(feature['geometry'])
                        # AREALAND comes as string from Layer 8 — cast to float
                        arealand = float(feature['properties'].get('AREALAND', 0) or 0)
                        POLYGON_CACHE[geoid] = {
                            'geometry': geom,
                            'arealand': arealand,
                            'hu100': int(feature['properties'].get('HU100', 0) or 0),
                            'pop100': int(feature['properties'].get('POP100', 0) or 0),
                        }
                        total_fetched += 1
                        county_fetched += 1

            if (ci + 1) % 25 == 0 or ci == total_counties - 1:
                print(f"    [{ci+1}/{total_counties}] {state_name}: {county_fetched} polygons | Total: {total_fetched}")

        except Exception as e:
            print(f"    [WARN] County {county} ({state_name}): {e}")

        time.sleep(0.25)

        # Save cache periodically
        if (ci + 1) % 100 == 0:
            save_polygon_cache()

    print(f"  Total fetched: {total_fetched} | Cache: {len(POLYGON_CACHE)}")
    save_polygon_cache()


def simplify_geometry(geojson_geom):
    if HAS_SHAPELY:
        try:
            geom = shape(geojson_geom)
            simplified = geom.simplify(SIMPLIFY_TOLERANCE, preserve_topology=True)
            return round_coords(mapping(simplified))
        except Exception:
            pass
    return round_coords(geojson_geom)


def round_coords(geojson_geom):
    def _round(coords):
        if isinstance(coords, (int, float)):
            return round(coords, COORD_DECIMALS)
        elif isinstance(coords, (list, tuple)):
            return [_round(c) for c in coords]
        return coords
    result = dict(geojson_geom)
    if 'coordinates' in result:
        result['coordinates'] = _round(result['coordinates'])
    return result


def build_geojson(block_groups):
    features = []
    for geoid, data in sorted(block_groups.items()):
        cached = POLYGON_CACHE.get(geoid)
        if not cached:
            continue
        area_sq_km = float(cached.get('arealand', 0) or 0) / 1e6
        density = (data['bsls'] / area_sq_km) if area_sq_km > 0 else 0
        feature = {
            'type': 'Feature',
            'properties': {
                'id': geoid,
                'bsls': data['bsls'],
                'blocks': data['blocks'],
                'state': geoid[:2],
                'county': geoid[:5],
                'hu100': cached.get('hu100', 0),
                'pop100': cached.get('pop100', 0),
                'areaLandSqKm': round(area_sq_km, 2),
                'density': round(density, 1),
            },
            'geometry': cached['geometry'],
        }
        features.append(feature)
    return {'type': 'FeatureCollection', 'features': features}


def write_js_file(geojson, provider_config):
    BDC_OUTPUT_DIR.mkdir(exist_ok=True)
    filepath = BDC_OUTPUT_DIR / provider_config['file']
    js_content = f"var {provider_config['var']} = {json.dumps(geojson, separators=(',', ':'))};\n"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(js_content)
    size_mb = os.path.getsize(filepath) / 1e6
    n_features = len(geojson['features'])
    total_bsls = sum(f['properties']['bsls'] for f in geojson['features'])
    print(f"  Written: {filepath.name} ({size_mb:.1f} MB, {n_features} block groups, {total_bsls:,} FTTP BSLs)")


def write_stats(provider_id, config, block_groups, geojson):
    by_state = defaultdict(lambda: {'block_groups': 0, 'bsls': 0})
    for geoid, data in block_groups.items():
        st = geoid[:2]
        by_state[st]['block_groups'] += 1
        by_state[st]['bsls'] += data['bsls']

    stats = {
        'provider': config['name'],
        'provider_id': provider_id,
        'total_block_groups': len(block_groups),
        'total_fttp_bsls': sum(d['bsls'] for d in block_groups.values()),
        'by_state': {STATE_NAMES.get(k, k): v for k, v in sorted(by_state.items())},
    }

    stats_file = FCC_DATA_DIR / f"{config['file'].replace('.js', '_stats.json')}"
    with open(stats_file, 'w') as f:
        json.dump(stats, f, indent=2)
    print(f"  Stats: {stats_file.name}")
    print(f"    Total FTTP BSLs: {stats['total_fttp_bsls']:,}")
    for state, vals in stats['by_state'].items():
        print(f"      {state}: {vals['bsls']:,} BSLs in {vals['block_groups']} BGs")

    return stats


def main():
    print("=" * 70)
    print("Uniti/Kinetic FTTH Dashboard — FCC BDC -> GeoJSON Pipeline")
    print("Using TIGERweb Layer 8 (Census 2020) for HU100/POP100")
    print("=" * 70)

    load_polygon_cache()
    csv_files = find_csv_files()

    # Group CSVs by provider
    provider_data = defaultdict(dict)

    for csv_path in csv_files:
        provider_id = detect_provider_id(csv_path)
        if not provider_id or provider_id not in PROVIDER_MAP:
            print(f"\n[SKIP] {csv_path.name} (provider {provider_id} not in map)")
            continue

        config = PROVIDER_MAP[provider_id]
        print(f"\n[PROVIDER] {config['name']} ({provider_id})")
        bg = read_bdc_csv(csv_path)

        # Merge into provider's combined block groups
        if provider_id not in provider_data:
            provider_data[provider_id] = {}
        for geoid, data in bg.items():
            if geoid in provider_data[provider_id]:
                provider_data[provider_id][geoid]['bsls'] += data['bsls']
                provider_data[provider_id][geoid]['blocks'] = max(
                    provider_data[provider_id][geoid]['blocks'], data['blocks'])
            else:
                provider_data[provider_id][geoid] = data

    if not provider_data:
        print("\n[ERROR] No data to process")
        sys.exit(1)

    # Fetch all polygons
    all_geoids = set()
    for bg in provider_data.values():
        all_geoids.update(bg.keys())
    print(f"\n[INFO] Total unique block groups: {len(all_geoids)}")
    fetch_tiger_polygons(list(all_geoids))

    # Build and write
    print(f"\n{'='*70}")
    print("BUILDING GEOJSON FILES")
    print(f"{'='*70}")

    for provider_id, block_groups in provider_data.items():
        config = PROVIDER_MAP[provider_id]
        print(f"\n[OUTPUT] {config['name']}")
        geojson = build_geojson(block_groups)
        write_js_file(geojson, config)
        write_stats(provider_id, config, block_groups, geojson)

    print(f"\n{'='*70}")
    print("DONE — Output files in: bdc_output/")
    print(f"{'='*70}")


if __name__ == '__main__':
    main()
