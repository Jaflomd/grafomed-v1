# Upper-limb cluster design review

Status: `structural_pass_candidate_not_promoted`

## Source coverage

- Anchor: Anatomical Society core regional anatomy syllabus, upper-limb outcomes 50–70.
- Coverage: 21/21 outcomes represented in at least one key objective.
- Decomposition: 10 key objectives and 33 mastery atoms.
- Contract: every mastery atom has one scalar objective, one expected-performance boundary, and one mastery-evidence statement.

## Knowledge layer

- 5 anatomical families.
- 54 leaf anatomical entities.
- 54 deterministic `part_of` relations.
- 167 deterministic `enables_mastery_of` relations.
- Knowledge entities have definitions and connections but no fictitious learner objective.

## Learning assembly

- 5 integrating activities.
- 4 candidate route templates.
- Assessment levels A1–A4 are evidence modes, not additional objectives.

## Validation performed

- YAML parsing and closed-reference checks.
- Unique identifiers across cluster, hierarchy, learning, assembly, route, and knowledge objects.
- Relation-schema and relation-registry validation for all 221 materialized relations.
- Full product suite: 33 tests passed.
- Browser runtime: 3D canvas loaded; node selection changed the inspector; no horizontal overflow at a 360 px viewport.

## Honest limitations

- Individual muscle entities are intentionally deferred until they require independent relations or assessment.
- Source-locked representative images and a bounded abnormality list remain pending.
- Sampling rules, critical errors, and pass standards require educational review and pilot data.
- EPA and CanMEDS mappings remain pending until the local source-locked registries are available.
- This review is structural and semantic only; it is not an independent anatomical-content audit and does not authorize promotion.
