---
id: grafomed-viewer-spec-v0
type: product_component_spec
product_id: grafomed-v1
component: graph_viewer
version: "0.3.0"
status: user_confirmed_and_implementation_authorized
authority: javier
steward: mia
systems_custodian: cris
independent_auditor: ghost
created_at: 2026-08-26T15:48:00-05:00
canonical_language: en
---

# Grafo Med graph viewer v0

## Purpose

Provide Javier and authorized MIA agents with a portable HTML interface for
exploring Grafo Med snapshots, inspecting provenance and validation state,
following learning routes, and preparing candidate proposals without directly
mutating canonical graph truth.

## Confirmed interaction contract

1. The viewer is an interactive explorer and proposal editor, not a canonical
   graph editor.
2. Its primary surface is a node map. `route` and `inspector` are synchronized
   secondary lenses over the same node identities.
3. A snapshot that fits within the visible-node budget opens with every real
   node visible. Larger snapshots use an aggregate overview and progressively
   expandable focal neighborhoods.
4. Every view is anchored to an explicit snapshot. Candidate overlays remain
   visually and semantically distinct from reviewed or promoted objects.
5. The graph surface uses the visual and interaction grammar Javier approved
   from legacy Médico Completo: a dark spatial field, luminous spherical nodes,
   perspective depth, orbit rotation, wheel zoom, hover preview, and click-to-pin
   relations. This is a visual reference only; no legacy node, relation, state,
   project, or front is migrated.
6. Spanish is the default and authoritative presentation language for this
   viewer. Canonical object IDs and source records remain provider-neutral
   English data, while every displayed node title and summary is localized into
   Spanish.

## Approved implementation defaults

- Local-first and provider-neutral.
- No CDN, account, network, server, or external runtime is required to open the
  self-contained export.
- Canonical graph files remain the source of truth; viewer data is disposable
  and rebuildable.
- The local app uses separate source files for maintainability and also emits a
  single self-contained HTML export.
- The builder displays a non-clinical architecture demo only when the canonical
  graph is empty. The demo is visibly labeled and is never stored under
  canonical graph directories.
- Learner state is excluded by default. Private state may be added only through
  a future explicit, reviewed export option.
- Importing a snapshot affects only the current browser session.
- Proposed changes are downloaded or copied as candidate JSON records and must
  enter the normal Grafo Med review lifecycle.
- Object layer is encoded through color and vertical position in the curriculum
  cone. Candidate status also uses a dashed outline so meaning does not depend
  on color alone.
- The 3D curriculum cone places medical-truth foundations below and wider,
  assemblies in the integration zone, and learning representations above and
  narrower. Coordinates are disposable projection metadata, never truth.
- Node radius is a local degree/centrality cue: larger nodes unlock or connect
  more visible objects. It must never be interpreted as mastery, importance, or
  evidence strength.
- The visible node budget is bounded. The overview renders individual nodes
  while the snapshot fits the budget and aggregates by layer only after the
  budget is exceeded.
- No object is preselected on load. The inspector rail opens only after Javier
  selects a node, preserving maximum canvas space for the node map.

## v0.3 feature set

- full-text search over IDs, labels, summaries, tags, competencies, and aliases;
- layer, object-type, lifecycle, and relation-family filters;
- node-first 3D default view with focal-depth and visible-node controls;
- drag-to-orbit, wheel/pinch-style zoom, hover preview, click inspection, and
  double-click refocus;
- expandable one-hop neighborhood;
- aggregate global map;
- route timeline synchronized with node inspection;
- provenance, source, review, evidence, tag, competency, and relation details;
- candidate proposal export;
- snapshot JSON import and export;
- PNG export of the visible 3D graph;
- responsive layout and keyboard navigation.

## Non-authority boundary

The viewer must never:

- write into `graph/`, `slice-packets/`, `source-locks/`, or learner state;
- promote a candidate;
- hide candidate, contested, or evidence status;
- treat layout coordinates, centrality, color, or visual density as medical or
  educational truth;
- imply clinical or learning validation from successful rendering.

## Acceptance criteria

1. `viewer/index.html` opens without a server and loads local viewer data.
2. `exports/grafomed-viewer.html` is a self-contained artifact with no external
   JavaScript, CSS, font, image, analytics, or network dependency.
3. The node map opens as the primary surface; graph, route, and inspector modes
   operate on one selection state.
4. Candidate records are visually distinct and proposal actions never mutate
   canonical files.
5. Empty canonical graph state is honest and the architecture demo is labeled.
6. The builder can regenerate viewer data from canonical JSON or YAML records.
7. Broken relation endpoints are reported and omitted from the visualization.
8. Automated component tests pass.
9. The Spanish locale covers every node and route in the generated snapshot.
10. The canvas supports orbit, zoom, hover hit-testing, selection, relation
    highlighting, keyboard zoom/reset, and a reduced-motion-safe animation.
