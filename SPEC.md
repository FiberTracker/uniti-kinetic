# Uniti / Kinetic FiberComp Build Spec

## Overview
Build a comprehensive FiberComp competitive intelligence GIS map for Uniti Group / Windstream (Kinetic) with FTTH competitive landscape, commercial fiber routes, and carrier overlap analysis.

## Tabs

### Tab 1: GIS Map (FTTH Competitive Landscape)
- Windstream/Kinetic BDC (provider `131413`) across 18 states
- Census block group shading with housing units (TIGERweb Layer 8)
- Competitive overbuilders per market

### Tab 2: Commercial Fiber Markets
- Uniti's enterprise/lit services metro fiber presence
- Source from investor materials + commercial_fiber_tracker.json

### Tab 3: AT&T Overlap (includes Lumen assets acquired Feb 2026)
- AT&T BDC (`130077`) same 18 states
- Filter: ATT + Uniti only

### Tab 4: Verizon/Frontier Overlap
- VZ (`131425`) + Frontier (`130258`)
- Filter: VZ + Uniti only

### Tab 5: T-Mobile Portfolio (MetroNet + Lumos — NOT Lumen)
- Find MetroNet and Lumos provider IDs via BDC search
- Filter: T-Mo portfolio + Uniti only

### Tab 6: Operator Profiles (sourced)
### Tab 7: Overlap Matrix with risk ratings

## Content Rules
- No UBS references
- No M&A rumors on paper
- Password: 2026
- Deploy to FiberTracker/uniti-kinetic + Netlify
- Email links to vikram.nidamaluri@gmail.com
