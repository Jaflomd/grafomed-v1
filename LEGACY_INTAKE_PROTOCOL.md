# GrafoMed legacy-reference intake protocol

Status: `binding_workflow_candidate`

Purpose: learn from Médico Completo without migrating its ontology, topology or
unverified content into GrafoMed.

## Unit of work

One cycle handles one bounded cluster or subcluster. A cycle must be small
enough that every proposed object and relation can be inspected individually.
Broad labels such as “all anatomy” or “all cardiology” are not valid intake
units.

## Cycle

1. **Select.** Name the clinical or preclinical boundary, source outcomes and
   explicit exclusions.
2. **Extract read-only.** Identify relevant legacy records and their incoming
   and outgoing references. The legacy graph remains research evidence only.
3. **Decompose.** Separate entities, claims, mechanisms, conditions, findings,
   decisions, mastery atoms, activities and assemblies that were bundled in a
   legacy node.
4. **Audit sources.** Distinguish useful wording from verified claims. Generic
   textbook lists, copied descriptions and pending source locks do not satisfy
   GrafoMed provenance.
5. **Audit granularity.** Test whether each proposed node has one reusable
   identity and whether each mastery atom has one observable objective.
6. **Audit topology.** Reject generic `connected`, `unlocks` or prerequisite
   edges unless they can be rebuilt with a registered semantic type, direction,
   context, rationale and provenance.
7. **Diff against GrafoMed.** Mark each concept as reuse, refine, split, merge,
   add, defer or reject. The new graph may be wrong too; the comparison is a
   bidirectional audit.
8. **Propose exactly.** Produce a machine-readable package listing object IDs,
   relation contracts, learning dependencies, exclusions and unresolved gates.
9. **Ask Javier.** No proposal enters the candidate graph until Javier approves
   the exact package or delegates that class of approval.
10. **Build candidate.** Materialize only the approved package, keeping it
    unpromoted and source/status boundaries visible.
11. **Verify.** Run schema, reference, relation and non-regression checks; render
    the cluster; inspect the graph visually; and record remaining review gates.
12. **Close or iterate.** Either accept the candidate slice for later promotion
    review or revise it before selecting the next cluster.

## Required outputs

- one source-bounded legacy-reference inventory;
- one written audit with strengths, defects and current-GrafoMed findings;
- one machine-readable incorporation proposal;
- explicit `reuse/refine/split/merge/add/defer/reject` dispositions;
- relation-registry amendments required before ingest;
- automated structural checks;
- a user-visible statement of exactly what would enter and what would not.

## Non-negotiable boundaries

- No direct copying of legacy identities or dependency edges.
- No content promotion based on structural validity alone.
- No hidden migration of legacy project state, fronts or learner state.
- No graph edge without semantic type and rationale.
- No objective attached to a knowledge entity merely because it is learnable.
- No broad horizontal expansion while the current intake cycle has unresolved
  semantic or source gates.
