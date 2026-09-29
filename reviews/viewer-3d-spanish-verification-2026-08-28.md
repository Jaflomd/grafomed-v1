# Grafo Med viewer 3D, Spanish, and learning-contract verification

Verified on 2026-08-28 by MIA in the local self-contained viewer.

## Observed result

- The primary graph surface is a dark three-dimensional canvas with spherical
  nodes, perspective depth, degree-based node radius, drag-to-orbit, wheel zoom,
  hover preview, click selection, and selected-relation highlighting.
- Spanish is the default presentation language. All 18 current node labels and
  summaries and both route descriptions are localized.
- The legacy Médico Completo documents were used only as a visual interaction
  reference. No legacy node, edge, project, front, or learner state was
  migrated.
- Both current syphilis-specific nodes carry exactly one scalar objective, one
  expected-performance description, and one mastery-evidence statement.
- Both contracts render in Spanish in the selection inspector.

## Evidence

- Full 3D graph: `reviews/assets/viewer-3d-spanish-2026-08-28.png`
- Syphilis contract: `reviews/assets/viewer-syphilis-learning-contract-2026-08-28.png`
- Portable build: `exports/grafomed-viewer.html`
- Automated checks: 18/18 passed.
- Slice validator: `structural_pass_promotion_blocked`, 0 errors, 1 expected
  warning for the five pending independent review domains.
- Workspace validator: pass with 0 warnings.

## Epistemic boundary

The viewer behavior and contract presence are observed and structurally
verified. The one-objective convention is user-confirmed. The medical and
educational content remains candidate material; this verification does not
promote it or substitute for the pending semantic, clinical, educational,
systems, and Ghost reviews.
