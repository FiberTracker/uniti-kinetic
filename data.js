// ============================================================
// UNITI / KINETIC FTTH DASHBOARD — DATA LAYER
// Windstream/Kinetic competitive landscape across 18 states
// Focus: carrier overlap risk (AT&T, Verizon/Frontier, T-Mobile portfolio)
// Last updated: March 2026
// ============================================================

// ---- PROVIDER DEFINITIONS ----
const PROVIDERS = {
    kinetic:   { name: "Windstream / Kinetic",  sponsor: "Public (NASDAQ: UNIT — Uniti parent)",  color: "#4972AC", short: "KIN", bdcId: '131413' },
    att:       { name: "AT&T Fiber",            sponsor: "Public (NYSE: T)",                      color: "#009FDB", short: "ATT", bdcId: '130077' },
    verizon:   { name: "Verizon Fios",          sponsor: "Public (NYSE: VZ)",                     color: "#EE0000", short: "VZ",  bdcId: '131425' },
    frontier:  { name: "Frontier Fiber",        sponsor: "Public (NASDAQ: FYBR) — VZ acquiring",  color: "#E60000", short: "FTR", bdcId: '130258' },
    metronet:  { name: "MetroNet",              sponsor: "KKR / Oak Hill (T-Mobile JV pending)",  color: "#B98E2C", short: "MET", bdcId: '131081' },
    lumos:     { name: "Lumos Networks",         sponsor: "EQT Partners (T-Mobile interest)",      color: "#469A6C", short: "LUM", bdcId: null },
    spectrum:  { name: "Spectrum (Charter)",     sponsor: "Public (NASDAQ: CHTR)",                 color: "#0072CE", short: "SPE", bdcId: null },
    comcast:   { name: "Comcast / Xfinity",     sponsor: "Public (NASDAQ: CMCSA)",                color: "#E31937", short: "CMC", bdcId: null },
    cox:       { name: "Cox Communications",    sponsor: "Private (Cox Enterprises)",              color: "#F97316", short: "COX", bdcId: null },
    lumen:     { name: "Lumen / Quantum Fiber", sponsor: "Public (NYSE: LUMN) — AT&T acquired mass-market Feb 2026", color: "#8E8D83", short: "LUM2", bdcId: null },
};

// ---- WINDSTREAM/KINETIC 18-STATE FOOTPRINT ----
const KINETIC_STATES = [
    { fips: '01', abbr: 'AL', name: 'Alabama' },
    { fips: '05', abbr: 'AR', name: 'Arkansas' },
    { fips: '12', abbr: 'FL', name: 'Florida' },
    { fips: '13', abbr: 'GA', name: 'Georgia' },
    { fips: '19', abbr: 'IA', name: 'Iowa' },
    { fips: '21', abbr: 'KY', name: 'Kentucky' },
    { fips: '27', abbr: 'MN', name: 'Minnesota' },
    { fips: '28', abbr: 'MS', name: 'Mississippi' },
    { fips: '29', abbr: 'MO', name: 'Missouri' },
    { fips: '31', abbr: 'NE', name: 'Nebraska' },
    { fips: '35', abbr: 'NM', name: 'New Mexico' },
    { fips: '36', abbr: 'NY', name: 'New York' },
    { fips: '37', abbr: 'NC', name: 'North Carolina' },
    { fips: '39', abbr: 'OH', name: 'Ohio' },
    { fips: '40', abbr: 'OK', name: 'Oklahoma' },
    { fips: '42', abbr: 'PA', name: 'Pennsylvania' },
    { fips: '45', abbr: 'SC', name: 'South Carolina' },
    { fips: '48', abbr: 'TX', name: 'Texas' },
];

// ---- OPERATOR PROFILES ----
const OPERATOR_PROFILES = [
    {
        id: "kinetic",
        name: "Windstream / Kinetic (Uniti Group)",
        sponsor: "Public (NASDAQ: UNIT)",
        hq: "Little Rock, AR (Windstream) / Little Rock, AR (Uniti)",
        ceo: "Paul Sunu (Windstream CEO)",
        states: ["AL","AR","FL","GA","IA","KY","MN","MS","MO","NE","NM","NY","NC","OH","OK","PA","SC","TX"],
        stateCount: 18,
        metrics: [
            { label: "Kinetic Fiber Passings", value: "~2M", asOf: "2025", source: "Company Reports", sourceUrl: "#" },
            { label: "Annual Cash Generation (Uniti)", value: "$300M", asOf: "Nov 2025", source: "Uniti / Ron Mudry call", sourceUrl: "#" },
            { label: "Avg Customer Tenure", value: "23 years", asOf: "2025", source: "Uniti Investor Materials", sourceUrl: "#" },
            { label: "10-Year Retention Rate", value: "84%", asOf: "2025", source: "Uniti Investor Materials", sourceUrl: "#" },
            { label: "Business Model", value: "Dark fiber + wholesale + Kinetic ILEC retail", asOf: "2026", source: "Company Reports", sourceUrl: "#" },
            { label: "Revenue Segments", value: "Kinetic (consumer ILEC), Enterprise/Wholesale (Uniti core)", asOf: "2025", source: "10-K", sourceUrl: "#" },
            { label: "Network", value: "~200K fiber route miles (one of the largest in US)", asOf: "2025", source: "Uniti Investor Materials", sourceUrl: "#" },
            { label: "Strategic Status", value: "Exploring strategic alternatives per market intel", asOf: "Mar 2026", source: "Market Intel", sourceUrl: "#" },
            { label: "Key Issue", value: "Kinetic side: 60-day provisioning delays reported", asOf: "Feb 2026", source: "Market Intel", sourceUrl: "#" },
        ]
    },
    {
        id: "att",
        name: "AT&T Fiber",
        sponsor: "Public (NYSE: T)",
        hq: "Dallas, TX",
        ceo: "John Stankey",
        states: ["AL","AR","FL","GA","IA","KY","MS","MO","NC","OH","OK","SC","TX","NY","PA","NE","NM","MN"],
        stateCount: 21,
        metrics: [
            { label: "National HHP Target", value: "60M by 2030", asOf: "2025", source: "AT&T Investor Day", sourceUrl: "https://investors.att.com/" },
            { label: "Current Fiber HHP", value: "~30M", asOf: "2025", source: "AT&T Earnings", sourceUrl: "https://investors.att.com/" },
            { label: "Lumen Acquisition", value: "Closed Feb 2, 2026 — adds mass-market fiber in 18 states", asOf: "Feb 2026", source: "AT&T Newsroom", sourceUrl: "https://about.att.com/" },
            { label: "Lumen Deal $/HHP", value: "$1,437", asOf: "Feb 2026", source: "Public Filings", sourceUrl: "#" },
            { label: "NetworkCo Plans", value: "PE partner search for wholesale fiber subsidiary", asOf: "Mar 2026", source: "Market Intel", sourceUrl: "#" },
            { label: "Kinetic Overlap", value: "Significant — AT&T ILEC territory overlaps Windstream in SE, Midwest, South", asOf: "2026", source: "FCC BDC", sourceUrl: "#" },
        ]
    },
    {
        id: "verizon",
        name: "Verizon Fios",
        sponsor: "Public (NYSE: VZ)",
        hq: "New York, NY",
        ceo: "Hans Vestberg",
        states: ["NY","PA","NC","FL","TX","OH","GA"],
        stateCount: 9,
        metrics: [
            { label: "HHP Target", value: "35-40M", asOf: "2025", source: "Verizon Investor Day", sourceUrl: "https://www.verizon.com/about/investors" },
            { label: "Current Fiber HHP", value: "~30M (incl. Frontier pending)", asOf: "2025", source: "Verizon", sourceUrl: "#" },
            { label: "Frontier Acquisition", value: "$20B (26.6x EBITDA), pending regulatory", asOf: "Sep 2024", source: "Verizon", sourceUrl: "https://www.verizon.com/" },
            { label: "Eden Fiber JV", value: "JV model with 45% pen guarantees yr5", asOf: "2025", source: "Market Intel", sourceUrl: "#" },
            { label: "Kinetic Overlap", value: "Primarily NY and PA (Fios territory), some NC/OH", asOf: "2026", source: "FCC BDC", sourceUrl: "#" },
        ]
    },
    {
        id: "frontier",
        name: "Frontier Communications",
        sponsor: "Public (NASDAQ: FYBR) — Verizon acquiring ($20B)",
        hq: "Dallas, TX",
        ceo: "Nick Jeffery",
        states: ["NY","PA","OH","NC","SC","FL","AL","GA","MN","MS","TX","AR","IA","NE"],
        stateCount: 25,
        metrics: [
            { label: "Fiber HHP", value: "~7.2M (and growing)", asOf: "2025", source: "Frontier Earnings", sourceUrl: "https://investor.frontier.com/" },
            { label: "VZ Acquisition Status", value: "Pending regulatory approval — $20B deal", asOf: "Mar 2026", source: "Public Filings", sourceUrl: "#" },
            { label: "Kinetic Overlap", value: "Significant — ex-ILEC territories overlap in multiple states", asOf: "2026", source: "FCC BDC", sourceUrl: "#" },
            { label: "Post-VZ Close", value: "Combined Fios + Frontier will be dominant fiber competitor in NE/Mid-Atlantic", asOf: "2026", source: "Analysis", sourceUrl: "#" },
        ]
    },
    {
        id: "metronet",
        name: "MetroNet",
        sponsor: "KKR / Oak Hill Capital (T-Mobile JV pending)",
        hq: "Evansville, IN",
        ceo: "John Cinelli",
        states: ["IN","IL","MI","OH","KY","IA","FL","VA","NC","TX","MN","WI"],
        stateCount: 16,
        metrics: [
            { label: "Homes Passed", value: "2M+", asOf: "2025", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/" },
            { label: "Build Rate", value: "500,000 passings/yr", asOf: "2025", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/" },
            { label: "Pen Rate", value: "35-43% mature markets", asOf: "2025", source: "Industry", sourceUrl: "#" },
            { label: "T-Mobile Valuation", value: "$4,900/HHP (25.0x EBITDA)", asOf: "Jul 2024", source: "T-Mobile", sourceUrl: "https://www.t-mobile.com/" },
            { label: "T-Mobile JV Status", value: "Regulatory delay — insurance structure blocking", asOf: "Mar 2026", source: "Market Intel", sourceUrl: "#" },
            { label: "Kinetic Overlap", value: "OH, KY, IA, MN — Midwestern rural/suburban zones", asOf: "2026", source: "FCC BDC", sourceUrl: "#" },
        ]
    },
    {
        id: "lumos",
        name: "Lumos Networks",
        sponsor: "EQT Partners",
        hq: "Waynesboro, VA",
        ceo: "Brian Stading",
        states: ["VA","NC","SC","WV"],
        stateCount: 4,
        metrics: [
            { label: "Focus", value: "Mid-Atlantic FTTH — VA/NC/SC", asOf: "2025", source: "Lumos", sourceUrl: "https://lumosnetworks.com/" },
            { label: "T-Mobile Interest", value: "Potential T-Mobile portfolio fiber co alongside MetroNet", asOf: "2025", source: "Market Intel", sourceUrl: "#" },
            { label: "Kinetic Overlap", value: "NC, SC — Windstream ILEC territory overlaps Lumos expansion areas", asOf: "2026", source: "Market Intel", sourceUrl: "#" },
        ]
    },
];

// ---- MAP MARKERS ----
// Windstream/Kinetic major markets across 18 states
const MARKETS = [
    // ======= KINETIC — ARKANSAS (HEADQUARTERS STATE) =======
    { lat: 34.746, lng: -92.290, name: "Little Rock, AR (HQ)", provider: "kinetic", passings: "Core ILEC market — headquarters state", status: "Core Market", notes: "Windstream HQ. Largest AR footprint. Dense ILEC territory.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 16 },
    { lat: 36.074, lng: -94.188, name: "Fayetteville, AR", provider: "kinetic", passings: "Active ILEC", status: "Core Market", notes: "NW Arkansas — fast-growing metro.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 12 },
    { lat: 36.372, lng: -94.209, name: "Bentonville/Rogers, AR", provider: "kinetic", passings: "Active ILEC", status: "Core Market", notes: "Walmart HQ region. Growing market.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10 },
    { lat: 35.084, lng: -92.442, name: "Conway, AR", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8 },

    // ======= KINETIC — ALABAMA =======
    { lat: 33.521, lng: -86.802, name: "Birmingham, AL", provider: "kinetic", passings: "ILEC + fiber build", status: "Active", notes: "Major Alabama market. AT&T overlap.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 14, overlapWith: ["att"] },
    { lat: 34.730, lng: -86.586, name: "Huntsville, AL", provider: "kinetic", passings: "Active ILEC", status: "Active", notes: "Rapidly growing — tech/defense hub.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 12, overlapWith: ["att"] },
    { lat: 32.361, lng: -86.279, name: "Montgomery, AL", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10 },

    // ======= KINETIC — GEORGIA =======
    { lat: 33.749, lng: -84.388, name: "Atlanta Metro, GA", provider: "kinetic", passings: "ILEC fringe + enterprise", status: "Active", notes: "Metro fringe ILEC. AT&T dominant in core.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 12, overlapWith: ["att","comcast"] },
    { lat: 34.257, lng: -84.294, name: "Canton/N. GA", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8 },

    // ======= KINETIC — KENTUCKY =======
    { lat: 38.041, lng: -84.504, name: "Lexington, KY", provider: "kinetic", passings: "Major ILEC market", status: "Core Market", notes: "Key Kinetic market. MetroNet also expanding here.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 14, overlapWith: ["att","metronet"] },
    { lat: 37.775, lng: -87.111, name: "Owensboro, KY", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8 },

    // ======= KINETIC — NORTH CAROLINA =======
    { lat: 35.228, lng: -80.843, name: "Charlotte, NC", provider: "kinetic", passings: "Enterprise + ILEC fringe", status: "Active", notes: "Enterprise fiber presence. AT&T/Frontier overlap.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 12, overlapWith: ["att","frontier"] },
    { lat: 36.100, lng: -80.244, name: "Greensboro/Triad, NC", provider: "kinetic", passings: "Active ILEC", status: "Active", notes: "Triad region. Frontier also present.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["frontier"] },
    { lat: 35.779, lng: -78.638, name: "Raleigh, NC", provider: "kinetic", passings: "Enterprise presence", status: "Active", notes: "Research Triangle. Competitive market.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["att","frontier","lumos"] },

    // ======= KINETIC — SOUTH CAROLINA =======
    { lat: 34.001, lng: -81.035, name: "Columbia, SC", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["att"] },
    { lat: 34.846, lng: -82.398, name: "Greenville, SC", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10 },

    // ======= KINETIC — OHIO =======
    { lat: 39.962, lng: -83.001, name: "Columbus, OH", provider: "kinetic", passings: "Enterprise + ILEC", status: "Active", notes: "Major metro. AT&T, Frontier, MetroNet all present.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 12, overlapWith: ["att","frontier","metronet"] },
    { lat: 39.759, lng: -84.192, name: "Dayton, OH", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["att","frontier"] },
    { lat: 41.081, lng: -81.519, name: "Akron, OH", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8, overlapWith: ["frontier"] },

    // ======= KINETIC — NEW YORK =======
    { lat: 42.886, lng: -78.879, name: "Buffalo, NY", provider: "kinetic", passings: "Active ILEC", status: "Active", notes: "Western NY. VZ Fios territory overlap.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 12, overlapWith: ["verizon","frontier"] },
    { lat: 43.049, lng: -76.148, name: "Syracuse, NY", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["verizon","frontier"] },
    { lat: 42.443, lng: -76.502, name: "Ithaca, NY", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8, overlapWith: ["frontier"] },

    // ======= KINETIC — PENNSYLVANIA =======
    { lat: 40.794, lng: -77.860, name: "State College, PA", provider: "kinetic", passings: "Active ILEC", status: "Active", notes: "Penn State area. Verizon/Frontier overlap.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["verizon","frontier"] },
    { lat: 40.340, lng: -75.927, name: "Reading, PA", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8, overlapWith: ["verizon"] },

    // ======= KINETIC — TEXAS =======
    { lat: 32.777, lng: -96.797, name: "Dallas Metro, TX", provider: "kinetic", passings: "Enterprise + ILEC fringe", status: "Active", notes: "Enterprise fiber. AT&T dominant ILEC.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 12, overlapWith: ["att","frontier"] },
    { lat: 29.760, lng: -95.370, name: "Houston Metro, TX", provider: "kinetic", passings: "Enterprise presence", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["att","comcast"] },
    { lat: 31.461, lng: -100.437, name: "San Angelo, TX", provider: "kinetic", passings: "Active ILEC", status: "Core Market", notes: "Smaller Texas ILEC market.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8 },

    // ======= KINETIC — IOWA =======
    { lat: 41.661, lng: -91.530, name: "Iowa City, IA", provider: "kinetic", passings: "Active ILEC", status: "Active", notes: "University town. MetroNet expanding here.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["metronet"] },
    { lat: 42.500, lng: -96.400, name: "Sioux City, IA", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8 },

    // ======= KINETIC — MISSOURI =======
    { lat: 37.209, lng: -93.292, name: "Springfield, MO", provider: "kinetic", passings: "Major ILEC market", status: "Core Market", notes: "Large Windstream ILEC territory.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 14 },
    { lat: 38.747, lng: -92.288, name: "Jefferson City, MO", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8 },
    { lat: 36.830, lng: -89.587, name: "Cape Girardeau, MO", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 7 },

    // ======= KINETIC — MISSISSIPPI =======
    { lat: 32.299, lng: -90.185, name: "Jackson, MS", provider: "kinetic", passings: "Active ILEC", status: "Active", notes: "AT&T also present.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["att"] },

    // ======= KINETIC — NEBRASKA =======
    { lat: 40.814, lng: -96.702, name: "Lincoln, NE", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10 },
    { lat: 41.256, lng: -95.934, name: "Omaha, NE", provider: "kinetic", passings: "Enterprise presence", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8, overlapWith: ["cox"] },

    // ======= KINETIC — NEW MEXICO =======
    { lat: 35.085, lng: -106.651, name: "Albuquerque, NM", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10 },
    { lat: 35.687, lng: -105.938, name: "Santa Fe, NM", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8 },

    // ======= KINETIC — OKLAHOMA =======
    { lat: 35.468, lng: -97.516, name: "Oklahoma City, OK", provider: "kinetic", passings: "ILEC + enterprise", status: "Active", notes: "AT&T overlap.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 12, overlapWith: ["att","cox"] },
    { lat: 36.154, lng: -95.993, name: "Tulsa, OK", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["att","cox"] },

    // ======= KINETIC — MINNESOTA =======
    { lat: 44.977, lng: -93.265, name: "Minneapolis Metro, MN", provider: "kinetic", passings: "ILEC fringe + enterprise", status: "Active", notes: "CenturyLink/Lumen legacy overlap (now AT&T).", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["att","frontier","metronet"] },
    { lat: 44.012, lng: -92.480, name: "Rochester, MN", provider: "kinetic", passings: "Active ILEC", status: "Active", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 8, overlapWith: ["metronet"] },

    // ======= KINETIC — FLORIDA =======
    { lat: 30.332, lng: -81.656, name: "Jacksonville, FL", provider: "kinetic", passings: "Enterprise + limited ILEC", status: "Active", notes: "Enterprise fiber routes. AT&T dominant.", source: "Windstream", sourceUrl: "https://www.windstream.com/", size: 10, overlapWith: ["att","comcast"] },

    // ======= COMPETITOR MAJOR MARKETS (where they overlap Kinetic) =======
    // AT&T major builds in Kinetic territory
    { lat: 33.749, lng: -84.550, name: "Atlanta West, GA (AT&T)", provider: "att", passings: "Massive ILEC footprint", status: "Core Market", notes: "BellSouth legacy. Dominant in metro Atlanta.", source: "AT&T", sourceUrl: "https://www.att.com/", size: 14 },
    { lat: 32.777, lng: -96.950, name: "Dallas, TX (AT&T)", provider: "att", passings: "ILEC HQ market", status: "Core Market", notes: "AT&T headquarters. Complete metro coverage.", source: "AT&T", sourceUrl: "https://www.att.com/", size: 14 },
    { lat: 33.449, lng: -86.950, name: "Birmingham, AL (AT&T)", provider: "att", passings: "Major ILEC", status: "Core Market", notes: "BellSouth legacy. Significant Kinetic overlap.", source: "AT&T", sourceUrl: "https://www.att.com/", size: 12 },
    { lat: 34.730, lng: -86.750, name: "Huntsville, AL (AT&T)", provider: "att", passings: "Active fiber build", status: "Expanding", notes: "AT&T fiber expansion in N. Alabama.", source: "AT&T", sourceUrl: "https://www.att.com/", size: 10 },
    { lat: 35.468, lng: -97.700, name: "OKC, OK (AT&T)", provider: "att", passings: "ILEC market", status: "Core Market", source: "AT&T", sourceUrl: "https://www.att.com/", size: 10 },
    { lat: 35.228, lng: -80.970, name: "Charlotte, NC (AT&T)", provider: "att", passings: "Active fiber", status: "Expanding", source: "AT&T", sourceUrl: "https://www.att.com/", size: 10 },

    // Verizon Fios in Kinetic territory
    { lat: 42.886, lng: -79.050, name: "Buffalo, NY (VZ)", provider: "verizon", passings: "Fios active", status: "Active", notes: "Fios ILEC territory overlaps Kinetic.", source: "Verizon", sourceUrl: "https://www.verizon.com/", size: 12 },
    { lat: 43.049, lng: -76.300, name: "Syracuse, NY (VZ)", provider: "verizon", passings: "Fios active", status: "Active", source: "Verizon", sourceUrl: "https://www.verizon.com/", size: 10 },
    { lat: 40.794, lng: -78.050, name: "Central PA (VZ)", provider: "verizon", passings: "Fios territory", status: "Active", source: "Verizon", sourceUrl: "https://www.verizon.com/", size: 10 },

    // MetroNet expansion into Kinetic territory
    { lat: 38.041, lng: -84.700, name: "Lexington, KY (MetroNet)", provider: "metronet", passings: "Active fiber build", status: "Expanding", notes: "MetroNet expanding into Kinetic ILEC territory.", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/", size: 10 },
    { lat: 39.962, lng: -83.200, name: "Columbus, OH (MetroNet)", provider: "metronet", passings: "Active build", status: "Expanding", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/", size: 10 },
    { lat: 41.661, lng: -91.700, name: "Iowa City, IA (MetroNet)", provider: "metronet", passings: "Active build", status: "Expanding", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/", size: 8 },
    { lat: 44.977, lng: -93.450, name: "Minneapolis, MN (MetroNet)", provider: "metronet", passings: "Active build", status: "Expanding", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/", size: 10 },
    { lat: 44.012, lng: -92.650, name: "Rochester, MN (MetroNet)", provider: "metronet", passings: "Active build", status: "Expanding", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/", size: 8 },

    // Lumos in NC/SC (T-Mobile portfolio)
    { lat: 35.779, lng: -78.450, name: "Raleigh, NC (Lumos)", provider: "lumos", passings: "Expanding", status: "Expanding", notes: "Lumos (EQT) expanding in Research Triangle. T-Mobile portfolio interest.", source: "Lumos", sourceUrl: "https://lumosnetworks.com/", size: 10 },
    { lat: 36.100, lng: -80.050, name: "Greensboro, NC (Lumos)", provider: "lumos", passings: "Active", status: "Active", source: "Lumos", sourceUrl: "https://lumosnetworks.com/", size: 8 },
    { lat: 37.271, lng: -79.941, name: "Roanoke, VA (Lumos HQ region)", provider: "lumos", passings: "Core market", status: "Core Market", notes: "Lumos home territory.", source: "Lumos", sourceUrl: "https://lumosnetworks.com/", size: 10 },
];

// ---- COMMERCIAL FIBER MARKETS ----
// Uniti's enterprise/wholesale fiber presence (not Kinetic ILEC)
const COMMERCIAL_MARKETS = [
    { region: "Southeast", markets: "Atlanta, Birmingham, Charlotte, Raleigh, Jacksonville, Nashville, Memphis", routeMiles: "~50K+", notes: "Dense metro fiber networks serving enterprise, carrier wholesale, and data centers" },
    { region: "Midwest", markets: "Columbus, Cincinnati, Indianapolis, Louisville, Kansas City, St. Louis", routeMiles: "~30K+", notes: "Significant enterprise fiber connecting mid-tier cities" },
    { region: "South Central", markets: "Dallas, Houston, San Antonio, Little Rock, Oklahoma City, Tulsa", routeMiles: "~40K+", notes: "TX/AR/OK enterprise fiber. HQ market strong" },
    { region: "Northeast", markets: "Buffalo, Syracuse, Rochester, Pittsburgh suburbs", routeMiles: "~15K+", notes: "Upstate NY and PA enterprise routes" },
    { region: "Plains/Mountain", markets: "Omaha, Lincoln, Des Moines, Minneapolis suburbs, Albuquerque", routeMiles: "~10K+", notes: "Enterprise and government fiber" },
];

// ---- BUILD PIPELINE ----
const BUILDS = [
    { provider: "att", market: "National Fiber Build", state: "Multi", status: "EXPANDING", targetHHP: "60M by 2030", timeline: "Ongoing", overlap: "Kinetic 18 states", notes: "AT&T + Lumen combined push. Major Kinetic overlap in SE, Midwest", source: "AT&T", sourceUrl: "https://about.att.com/", overlapRisk: "High" },
    { provider: "att", market: "Lumen Mass-Market Integration", state: "18 states", status: "ACTIVE", targetHHP: "Added via acquisition", timeline: "Feb 2026+", overlap: "Direct Kinetic territory", notes: "Lumen consumer fiber assets now AT&T. Expands AT&T's Kinetic-overlapping footprint", source: "AT&T", sourceUrl: "#", overlapRisk: "High" },
    { provider: "verizon", market: "Frontier Fiber Integration", state: "25 states", status: "PLANNED", targetHHP: "+7.2M HHP", timeline: "Post-regulatory", overlap: "NY, PA, OH, NC", notes: "Pending $20B deal. Combined VZ+Frontier will dominate NE/Mid-Atlantic where Kinetic present", source: "Verizon", sourceUrl: "#", overlapRisk: "High" },
    { provider: "metronet", market: "Kentucky Expansion", state: "KY", status: "EXPANDING", targetHHP: "TBD", timeline: "2025-2026", overlap: "Lexington + suburbs", notes: "MetroNet overbuilding Kinetic ILEC territory in KY", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/", overlapRisk: "Medium" },
    { provider: "metronet", market: "Ohio Build", state: "OH", status: "EXPANDING", targetHHP: "TBD", timeline: "2025-2026", overlap: "Columbus metro", notes: "MetroNet expanding in OH — Kinetic territory", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/", overlapRisk: "Medium" },
    { provider: "metronet", market: "Iowa Expansion", state: "IA", status: "EXPANDING", targetHHP: "TBD", timeline: "2025-2026", overlap: "Iowa City area", notes: "Direct overlap with Kinetic ILEC markets", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/", overlapRisk: "Medium" },
    { provider: "metronet", market: "Minnesota Build", state: "MN", status: "EXPANDING", targetHHP: "TBD", timeline: "2025-2026", overlap: "Twin Cities suburbs + Rochester", notes: "MetroNet + T-Mobile portfolio expanding in MN", source: "MetroNet", sourceUrl: "https://www.metronetinc.com/", overlapRisk: "Medium" },
    { provider: "lumos", market: "NC/SC Expansion", state: "NC/SC", status: "EXPANDING", targetHHP: "TBD", timeline: "2025-2026", overlap: "Raleigh, Greensboro", notes: "Lumos (EQT) expanding in Kinetic territory. T-Mobile portfolio.", source: "Lumos", sourceUrl: "https://lumosnetworks.com/", overlapRisk: "Medium" },
    { provider: "frontier", market: "Fiber Upgrade Program", state: "Multi", status: "ACTIVE", targetHHP: "3M+ new builds", timeline: "2024-2026", overlap: "NY, PA, OH, NC, MN", notes: "Frontier's copper-to-fiber upgrade overlaps many Kinetic states", source: "Frontier", sourceUrl: "https://frontier.com/", overlapRisk: "High" },
];

// ---- OVERLAP MATRIX ----
// Market-by-market competitive presence with risk ratings
const OVERLAP_MATRIX = [
    // Arkansas
    { market: "Little Rock, AR", state: "AR", kinetic: "core", att: "active", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: "active", risk: "Medium", notes: "AT&T + Spectrum present, but Kinetic is dominant ILEC" },
    { market: "Fayetteville, AR", state: "AR", kinetic: "core", att: "active", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: null, risk: "Low", notes: "Kinetic ILEC with limited overbuilder" },

    // Alabama
    { market: "Birmingham, AL", state: "AL", kinetic: "active", att: "core", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: "active", risk: "HIGH", notes: "AT&T BellSouth ILEC territory — primary overlap risk" },
    { market: "Huntsville, AL", state: "AL", kinetic: "active", att: "expanding", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: "active", risk: "HIGH", notes: "AT&T fiber expansion in fast-growing market" },

    // Georgia
    { market: "Atlanta Metro, GA", state: "GA", kinetic: "active", att: "core", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: null, risk: "HIGH", notes: "AT&T dominant. Kinetic on fringe" },

    // Kentucky
    { market: "Lexington, KY", state: "KY", kinetic: "core", att: "active", verizon: null, frontier: null, metronet: "expanding", lumos: null, spectrum: "active", risk: "HIGH", notes: "Triple threat — AT&T + MetroNet overbuilding Kinetic" },

    // North Carolina
    { market: "Charlotte, NC", state: "NC", kinetic: "active", att: "expanding", verizon: null, frontier: "active", metronet: null, lumos: null, spectrum: "active", risk: "HIGH", notes: "AT&T + Frontier + Spectrum. Dense competitive market" },
    { market: "Raleigh Triangle, NC", state: "NC", kinetic: "active", att: "active", verizon: null, frontier: "active", metronet: null, lumos: "expanding", spectrum: null, risk: "HIGH", notes: "AT&T + Frontier + Lumos (T-Mo portfolio) all present" },
    { market: "Greensboro Triad, NC", state: "NC", kinetic: "active", att: "active", verizon: null, frontier: "active", metronet: null, lumos: "active", spectrum: null, risk: "HIGH", notes: "Multi-carrier overlap zone" },

    // South Carolina
    { market: "Columbia, SC", state: "SC", kinetic: "active", att: "active", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: "active", risk: "Medium", notes: "AT&T overlap in metro" },
    { market: "Greenville, SC", state: "SC", kinetic: "active", att: "active", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: null, risk: "Medium", notes: "Growing metro, moderate competition" },

    // Ohio
    { market: "Columbus, OH", state: "OH", kinetic: "active", att: "active", verizon: null, frontier: "active", metronet: "expanding", lumos: null, spectrum: "active", risk: "HIGH", notes: "4 competitors + MetroNet expanding. Highest OH risk" },
    { market: "Dayton, OH", state: "OH", kinetic: "active", att: "active", verizon: null, frontier: "active", metronet: null, lumos: null, spectrum: "active", risk: "HIGH", notes: "AT&T + Frontier overlap" },
    { market: "Akron, OH", state: "OH", kinetic: "active", att: null, verizon: null, frontier: "active", metronet: null, lumos: null, spectrum: "active", risk: "Medium", notes: "Frontier overlap" },

    // New York
    { market: "Buffalo, NY", state: "NY", kinetic: "active", att: null, verizon: "active", frontier: "active", metronet: null, lumos: null, spectrum: "active", risk: "HIGH", notes: "VZ Fios + Frontier + Spectrum. Post-VZ/Frontier merger = dominant" },
    { market: "Syracuse, NY", state: "NY", kinetic: "active", att: null, verizon: "active", frontier: "active", metronet: null, lumos: null, spectrum: "active", risk: "HIGH", notes: "VZ + Frontier overlap" },

    // Pennsylvania
    { market: "State College, PA", state: "PA", kinetic: "active", att: null, verizon: "active", frontier: "active", metronet: null, lumos: null, spectrum: null, risk: "HIGH", notes: "VZ Fios + Frontier in Kinetic territory" },

    // Texas
    { market: "Dallas Metro, TX", state: "TX", kinetic: "active", att: "core", verizon: null, frontier: "active", metronet: null, lumos: null, spectrum: "active", risk: "HIGH", notes: "AT&T HQ market. Kinetic on enterprise side" },
    { market: "San Angelo, TX", state: "TX", kinetic: "core", att: null, verizon: null, frontier: null, metronet: null, lumos: null, spectrum: null, risk: "Low", notes: "Smaller market, Kinetic dominant" },

    // Iowa
    { market: "Iowa City, IA", state: "IA", kinetic: "active", att: null, verizon: null, frontier: null, metronet: "expanding", lumos: null, spectrum: null, risk: "Medium", notes: "MetroNet expanding into Kinetic ILEC territory" },

    // Missouri
    { market: "Springfield, MO", state: "MO", kinetic: "core", att: "active", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: null, risk: "Medium", notes: "Kinetic strong ILEC. AT&T present but secondary" },

    // Nebraska
    { market: "Lincoln, NE", state: "NE", kinetic: "active", att: null, verizon: null, frontier: null, metronet: null, lumos: null, spectrum: "active", risk: "Low", notes: "Moderate competition" },

    // Oklahoma
    { market: "Oklahoma City, OK", state: "OK", kinetic: "active", att: "core", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: null, risk: "HIGH", notes: "AT&T ILEC overlap" },
    { market: "Tulsa, OK", state: "OK", kinetic: "active", att: "active", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: null, risk: "Medium", notes: "AT&T + Cox present" },

    // Minnesota
    { market: "Minneapolis Metro, MN", state: "MN", kinetic: "active", att: "active", verizon: null, frontier: "active", metronet: "expanding", lumos: null, spectrum: "active", risk: "HIGH", notes: "AT&T(Lumen) + Frontier + MetroNet expanding. Crowded" },
    { market: "Rochester, MN", state: "MN", kinetic: "active", att: null, verizon: null, frontier: null, metronet: "expanding", lumos: null, spectrum: "active", risk: "Medium", notes: "MetroNet expanding, Mayo Clinic market" },

    // Mississippi
    { market: "Jackson, MS", state: "MS", kinetic: "active", att: "active", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: null, risk: "Medium", notes: "AT&T overlap in state capital" },

    // Florida
    { market: "Jacksonville, FL", state: "FL", kinetic: "active", att: "core", verizon: null, frontier: null, metronet: null, lumos: null, spectrum: null, risk: "Medium", notes: "AT&T dominant. Kinetic enterprise presence" },
];

// ---- CALCULATIONS ----
const CALCULATIONS = {
    'kineticValuation': {
        label: "Kinetic Fiber Implied Valuation Range",
        result: "$4.6B – $5.6B",
        formula: "~2M passings × $2,300 – $2,800 / HHP",
        inputs: [
            { label: "Kinetic Fiber Passings", value: "~2M", asOf: "2025", source: "Company Reports", sourceUrl: "#" },
            { label: "Market $/HHP Range", value: "$2,300 – $2,800", asOf: "Mar 2026", source: "Market Comps", sourceUrl: "#" },
            { label: "Comparable: BCE/Ziply", value: "$2,600/HHP", asOf: "Sep 2024", source: "Public", sourceUrl: "#" },
            { label: "Comparable: Bell/CCI", value: "$3,000/HHP", asOf: "Nov 2024", source: "Public", sourceUrl: "#" },
        ],
        caveat: "Kinetic fiber valuation depends on pen rates, build maturity, and competitive intensity. Rural ILEC territories may trade at discount to pure-play fiber overbuilders."
    },
    'unitiDarkFiber': {
        label: "Uniti Dark Fiber / Wholesale Segment",
        result: "$300M annual cash generation",
        formula: "Only segment ahead of budget. 23-year avg customer tenure.",
        inputs: [
            { label: "Annual Cash Generation", value: "$300M", asOf: "Nov 2025", source: "Uniti / Ron Mudry", sourceUrl: "#" },
            { label: "Avg Customer Tenure", value: "23 years", asOf: "2025", source: "Uniti Investor Materials", sourceUrl: "#" },
            { label: "10-Year Retention", value: "84%", asOf: "2025", source: "Uniti Investor Materials", sourceUrl: "#" },
            { label: "Route Miles", value: "~200K", asOf: "2025", source: "Uniti Investor Materials", sourceUrl: "#" },
        ],
        caveat: "Dark fiber segment is high-quality cash flow with long-duration contracts. Valued separately from Kinetic consumer ILEC."
    },
    'attOverlapRisk': {
        label: "AT&T Overlap Risk Assessment",
        result: "HIGH — 12 of 18 states overlap",
        formula: "AT&T ILEC + Lumen acquisition creates dominant fiber competitor in most Kinetic states",
        inputs: [
            { label: "Overlapping States", value: "12 of 18", asOf: "2026", source: "FCC BDC", sourceUrl: "#" },
            { label: "AT&T 2030 Target", value: "60M HHP", asOf: "2025", source: "AT&T Investor Day", sourceUrl: "#" },
            { label: "Lumen Mass-Market Added", value: "18-state consumer fiber", asOf: "Feb 2026", source: "AT&T", sourceUrl: "#" },
            { label: "Highest Risk Markets", value: "AL, GA, TX, OK, NC, SC", asOf: "2026", source: "Analysis", sourceUrl: "#" },
        ],
        caveat: "AT&T's combined ILEC + Lumen footprint is the single largest competitive threat to Kinetic fiber. BellSouth legacy overlap is particularly dense in AL, GA, NC, SC."
    },
    'tmoPortfolioRisk': {
        label: "T-Mobile Fiber Portfolio Overlap Risk",
        result: "MEDIUM — 6 states, growing",
        formula: "MetroNet (OH/KY/IA/MN) + Lumos (NC/SC) expanding into Kinetic territory",
        inputs: [
            { label: "MetroNet Overlapping States", value: "OH, KY, IA, MN", asOf: "2026", source: "MetroNet", sourceUrl: "#" },
            { label: "Lumos Overlapping States", value: "NC, SC", asOf: "2026", source: "Lumos", sourceUrl: "#" },
            { label: "MetroNet Build Rate", value: "500K passings/yr", asOf: "2025", source: "MetroNet", sourceUrl: "#" },
            { label: "T-Mobile JV Status", value: "Regulatory delay (insurance structure)", asOf: "Mar 2026", source: "Market Intel", sourceUrl: "#" },
        ],
        caveat: "T-Mobile portfolio growing but regulatory delays slow MetroNet JV. Lumos is smaller operator focused on VA/NC. Risk is medium-term and accelerating."
    },
};

// ---- COMP TABLE DATA ----
const COMP_TABLE = [
    { transaction: "T-Mobile/MetroNet", perHHP: "$4,900", multiple: "25.0x", date: "Jul 2024", notes: "Strategic premium. T-Mobile fiber JV." },
    { transaction: "Verizon/Frontier", perHHP: "—", multiple: "26.6x", date: "Sep 2024", notes: "National scale acquirer" },
    { transaction: "BCE/Ziply", perHHP: "$2,600", multiple: "9.1x", date: "Sep 2024", notes: "PNW regional, lower pen rate" },
    { transaction: "Bell/Consolidated", perHHP: "$3,000", multiple: "14.3x", date: "Nov 2024", notes: "NE/rural mix" },
    { transaction: "AT&T/Lumen (mass-mkt)", perHHP: "$1,437", multiple: "—", date: "Feb 2026", notes: "Mass-market fiber assets only" },
    { transaction: "Segra (commercial)", perHHP: "—", multiple: "11.0x", date: "—", notes: "Commercial fiber comp for Uniti wholesale" },
];
