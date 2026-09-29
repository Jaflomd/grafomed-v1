# Grafo Med viewer v0.2 — node-first verification

## Outcome

Viewer v0.2 opens as an individual-node map rather than a route or
panel-dominant interface. The current 18-object candidate snapshot fits within
the visible-node budget and therefore renders all 18 real objects and all 29
typed relations without substituting aggregate layer objects.

## Verified behaviors

- The primary tab is labeled `Nodes` / `Nodos`.
- No object is preselected on load.
- The inspector rail remains closed until a node is selected.
- Selecting a node opens its inspector and highlights its connected relations.
- Edge labels remain hidden until their incident node is selected.
- Individual nodes are laid out in layer bands when the snapshot fits the
  visible-node budget.
- Route and inspector views remain synchronized secondary lenses.
- The portable HTML remains self-contained and read-only.
- Candidate status remains visibly distinct and no promotion authority was
  added.

## Verification evidence

- JavaScript syntax validation: passed.
- Automated product tests: 14 passed.
- Workspace validation: passed with 0 warnings before this close.
- Visual browser QA: node-first load, full 18-node projection, on-demand
  inspector, and selected-edge highlighting observed on 2026-08-28.
- Visual artifact: `reviews/assets/viewer-node-first-2026-08-28.png`.

This verifies interface behavior only. It does not validate or promote the
medical, semantic, educational, or psychometric content of the candidate
slice.
