# Grafo Med v1

For the games lab and collaborator setup, start with [COLLABORATING.md](COLLABORATING.md).

Grafo Med v1 is Javier's source-locked medical learning and clinical-reasoning
graph product.

The binding architecture contract is `PRODUCT_SPEC.md` version 0.4.2. The
latest amendment adds an internal teaching-first SQL application and explicit
integrated mastery compositions, while preserving knowledge/learning separation
and independent decision-level evidence. It does not validate medical content
or learning efficacy.

## Working local learning app

The new application is in [app/](app/README.md): SQLite persistence, a Python
API, Spanish learner interface, candidate thyroid teaching/practice, serial cases,
interactive graph, evidence and export. Start with
`python3 products/grafomed-v1/app/server.py` from the workspace root, then open
[the local app](http://127.0.0.1:8787). This is internal-only, not public-release
ready. The earlier browser-local prototype is preserved separately.

This directory is the canonical product root for Grafo Med, versioned in the
private `Jaflomd/grafomed-v1` repository. It is not a migrated legacy project or an active MIA front by
itself. It stores the product contract, schemas, source locks, graph objects,
route artifacts, learner-state models, reviews, exports, and rebuildable
indexes.

## Unified internal alpha

The local server in `app/` now provides one entrypoint with Learner and
Builder/Viewer modes. The read-only integration snapshot joins the derived
viewer projection, GUD candidate packet, routes and active thyroid learner
release without exporting learner state or granting canonical write authority.
Open `/builder.html` after starting the server; public hosting and clinical or
educational validation remain out of scope.

## Boundary

Grafo Med v1 is built from scratch. Legacy Médico Completo artifacts may be
used as research references and lessons learned, but their nodes, relations,
project state, and fronts must not be imported or relabeled as Grafo Med
content.

## Directory contract

```text
config/          product-level machine-readable configuration
schemas/         object, relation, packet, route, and review schemas
source-locks/    source records and evidence bundles
slice-packets/   minimum construction units for vertical slices
graph/nodes/     intrinsic graph object records
graph/relations/ typed provenance-bearing relation records
graph/assemblies illness scripts, DETcSp pathways, chains, and sets
routes/          generated or tested learning-route artifacts
learner-state/   learner models separate from medical truth
reviews/         clinical, semantic, educational, systems, and audit gates
exports/         human-facing or app-facing derived artifacts
indexes/         disposable projections that can be rebuilt
tests/           validators, fixtures, and acceptance checks
viewer/          local interactive graph explorer and snapshot builder
```

## Interactive viewer

The approved local viewer lives at `viewer/index.html`; a single-file portable
build lives at `exports/grafomed-viewer.html`. It supports graph, route, and
inspector modes, focal expansion, snapshot identity, and candidate proposal
export. It has no authority to edit canonical graph objects directly.

Viewer v0.3 is node-first and three-dimensional. It opens in Spanish on a dark
curriculum cone of luminous spherical nodes: drag rotates the graph, the wheel
zooms, hover previews a node, click pins its relations and opens its record, and
double-click refocuses its neighborhood. Node radius represents visible degree
only. Routes and inspection remain secondary lenses over the same identities.

The visual interaction grammar is adapted from the approved legacy Médico
Completo reference. That reference did not authorize a migration: no legacy
node, relation, learner state, project, or front enters Grafo Med. Canonical
records remain in English while the viewer supplies Spanish presentation labels
and summaries for every displayed node.

Graph objects may also carry a learner-facing contract without changing their
medical or assembly identity. A complete contract contains exactly one
observable objective, one bounded description of expected performance, and one
statement of mastery evidence. The current syphilis condition and syphilis-test
nodes are the first implementation of this convention, displayed in Spanish in
the selection inspector.

The knowledge-entity layer lives inside `medical_truth`. Its anatomical,
biological, diagnostic, and clinical entities do not require objectives merely
to exist. Mastery atoms connect to those entities through `evidence_object_refs`
and `enables_mastery_of`, allowing one reusable anatomical entity to support
several learning routes without duplicating its identity.

## Candidate anatomy clusters

The candidate cluster library currently includes the vertebral column and the
upper limb. The upper-limb design covers all 21 source outcomes from the
Anatomical Society syllabus through 10 key objectives, 33 single-objective
mastery atoms, 5 integrating activities, and 4 reusable route templates. Its
medical-truth layer contains 5 anatomical families and 54 entities connected
to learning through a deterministic derived view of 221 typed relations.

Both clusters remain source-locked candidates. Their standalone 3D previews are
derived inspection surfaces, not evidence of medical, educational, or clinical
validation and not a promotion mechanism.

## Legacy-reference intake

Médico Completo is used as a read-only quarry of hypotheses, distinctions and
possible cluster boundaries. Its identities, edges and source status are never
imported directly. Each bounded cluster follows `LEGACY_INTAKE_PROTOCOL.md`:
select, decompose, source-audit, granularity-audit, topology-audit, diff,
propose, obtain approval, build as candidate and verify before continuing.

The first completed proposal cycle covers upper-limb osteology, surface
anatomy, trauma relationships and imaging. It remains
`candidate_proposal_not_ingested`; its exact object and relation package lives
under `designs/intake-proposals/` and requires Javier's approval before the
candidate graph is changed.

## Learner-app prototype

The functional local prototype at `prototypes/learner-app-v0/` tests an
adaptive Duolingo-like learning journey over all 33 mastery atoms in the
upper-limb cluster. The learner selects the destination while MIA proposes one
explainable ready-to-learn frontier. The prototype includes a daily-mission
home, a complete learning path, a mastery map, an open and contestable learner-
state profile, and three fully interactive lessons. Each moves through
diagnosis, teaching, guided practice, retrieval, confidence calibration,
productive-error remediation, transfer, feedback, and review scheduling.

Its reward points never confer mastery. Recognition, explanation, application,
and transfer remain separate evidence dimensions, and a successful session is
explicitly capped below transferable or consolidated status. Demo progress is
synthetic, stays in browser local storage, and cannot write to canonical
GrafoMed learner state. Candidate contracts additionally specify auditable
evidence events, permitted assessment uses, pedagogical-mechanism retirement,
missingness, privacy, accessibility and game/mastery separation.

One mastery atom now also has a complete deep-unit candidate implementation:
`gm-ma-identify-upper-limb-long-flat-bones`. Its versioned source pack is
`prototypes/learner-app-v0/content-packs/upper-limb-bones.v0.json`; it compiles
deterministically to the browser assignment `node-pack.js` through
`scripts/build_node_learning_pack.py`. The unit contains 7 micro-lessons, 33
activities (29 scored and 4 teaching interactions), 4 response formats, a
bounded checkpoint and four scheduled reviews at +1, +3, +7 and +21 days.

This deep pack demonstrates the intended extension of one node, not the final
content scale of the full 33-node cluster. Its items and teaching copy remain
candidate content pending educational and anatomical review. Image-dependent
transfer is represented through text and relationships in this version; real
specimen, radiograph and cross-sectional assets still need licensed sources,
expert annotation and separate validation.

## First intended slice

The first confirmed vertical slice is:

```text
genital ulcer syndrome -> initial evaluation and management
```

The initial slice packet is reserved as:

```text
slice-genital-ulcer-syndrome-initial-management-v0
```

No source, node, relation, route, or learner-facing content is promoted merely
because this root exists.

## First candidate proof

The packet at
`slice-packets/slice-genital-ulcer-syndrome-initial-management-v0/` has reached
`graph_drafted` with a structural validation pass. It contains 15 medical-truth
and assembly candidates, 3 learning-support candidates, 29 typed relations, 2
routes, 5 original experimental MCQs, 8 source records, and 13 source-linked
claims.

The interactive viewer now renders these records as a `candidate_projection`.
They are not canonical medical truth: the semantic, clinical, educational,
systems, and independent-audit reviews still require separate reviewer
contexts before promotion can be considered.
