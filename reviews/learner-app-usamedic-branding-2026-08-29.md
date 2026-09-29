# GrafoMed learner app · USAMEDIC brand verification

**Date:** 2026-08-29  
**Status:** observed implementation; candidate prototype remains unpromoted  
**Responsible agent:** MIA  
**Product owner:** Alexei

## Implemented brand layer

- Parent brand: USAMEDIC.
- Product lockup: GrafoMed Quest / Learning Quest.
- Original transparent PNG assets: horizontal USAMEDIC lockup and shield.
- Canonical palette: primary `#2A7DE1`, secondary `#1DCAD3`, accent `#1BACE4`.
- Typography: Montserrat for headings and controls; Poppins for body text.
- Institutional signature: “USAMEDIC · Médicos de Excelencia · usamedic.pe”.
- Green, amber and red remain restricted to semantic success, warning and danger states.

## Scope boundary

The change is presentational. It does not change mission ranking, teaching
sequences, assessment scoring, evidence events, local-storage semantics or the
boundary against canonical learner state. No candidate content was promoted
and no legacy project was migrated.

## Verification

- Both copied assets are valid PNG files and load at their original resolution.
- The desktop page has no horizontal overflow and the lesson dialog remains
  readable and fully contained.
- At the 390-pixel mobile viewport, the desktop sidebar is hidden, the compact
  USAMEDIC lockup is visible, the bottom navigation is active and there is no
  horizontal overflow.
- The automated suite passes 49/49 tests, including a brand contract that pins
  the assets, canonical colors, typography and removal of the legacy palette.

## Re-entry point

`http://127.0.0.1:8765/prototypes/learner-app-v0/index.html?v=usamedic-1`
