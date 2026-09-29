---
id: product-spec-grafomed-v1
type: product_spec
product_id: grafomed-v1
title: "Grafo Med v1 — Product Specification"
spec_version: "0.4.1"
status: binding_architecture_contract_revised
authority: javier
steward: mia
clinical_custodian: acai
semantic_custodian: siris
educational_custodian: alexei
systems_custodian: cris
independent_auditor: ghost
created_at: 2026-08-26T14:56:00-05:00
updated_at: 2026-08-28T11:43:48-05:00
canonical_language: en
legacy_migration_performed: false
front_created: false
repository: false
---

# Grafo Med v1 — Product Specification

## Product purpose

Grafo Med v1 is a source-locked graph system for medical learning, clinical
reasoning, assessment, mastery tracking, and explainable route generation.

It lets MIA and authorized agents transform medical sources into typed graph
objects, connect those objects to competencies and routing metadata, generate
learning routes, assess mastery, update learner state, and produce remediation
or transfer practice. It must never confuse medical truth with notes, folders,
vectors, exam taxonomies, learner state, or visual graph density.

## Current boundary

This is a clean-build product. It does not migrate legacy Médico Completo
nodes, edges, fronts, or project state. Legacy artifacts are research references
and non-regression evidence only.

This product root is not a Git repository and does not create an active MIA
front. No clinical content becomes valid merely because its file exists.

## Specification authority

This `PRODUCT_SPEC.md` is the binding architecture contract for Grafo Med v1.
It defines durable product decisions: purpose, boundaries, object-layer
separation, packet contract, lifecycle, evidence sufficiency, route behavior,
learner-state boundary, review gates, release scope, and v0.1 acceptance.

Executable artifacts live under `schemas/`, `tests/`, and `config/`. They may
evolve faster than this contract but must not contradict it. A contradiction
requires a preserved prior revision, an explicit spec revision, a rationale,
and an audit record.

## Product layers

Grafo Med keeps five layers separate:

1. **Medical truth:** intrinsic biomedical and clinical objects plus typed,
   provenance-bearing relations.
2. **Learning representation:** observable mastery targets, resources,
   activities, cases, and assessments mapped to medical truth.
3. **Assemblies:** illness scripts, DETcSp pathways, clinical chains,
   differential sets, and professional activities composed from reusable
   objects and relations.
4. **Learner state:** a versioned estimate of what one learner can currently
   retrieve, explain, discriminate, decide, or perform.
5. **Derived projections:** indexes, embeddings, route candidates,
   visualizations, metrics, and exports that can be rebuilt.

`mastery_atom` is confirmed as a learning-layer object. It is an observable,
evaluable performance target over one or more graph objects. It is not an
intrinsic medical fact and does not turn every learnable object into a clinical
decision.

The medical-truth layer is also the product's knowledge-entity layer.
Anatomical entities, biological processes, conditions, findings, mechanisms,
tests, and other intrinsic objects may exist without a learner-facing objective.
Learning-layer objects refer to them as evidence objects rather than duplicating
their medical identity.

Sources, resources, cases, activities, and assessments are support objects.
They may point to medical graph objects and mastery atoms but do not become
medical-truth nodes merely because they are used in a route.

## v0.1 primary user

The v0.1 user is builder-facing:

- Javier;
- MIA;
- authorized internal agents working through MIA.

Learner-facing artifacts may be exported during v0.1, but v0.1 is not a public
student app and must not be represented as a clinical decision-support system.

## v0.1 deliverable

The first deliverable is infrastructure plus one vertical proof slice:

1. canonical object and relation schemas;
2. source-ingestion and source-lock protocol;
3. node, relation, assembly, and packet lifecycle;
4. tag and competency alignment;
5. transparent route-generation engine v0;
6. learner-state model v0;
7. one source-locked, reviewed, route-tested demo slice.

## First vertical slice

The first confirmed slice is:

```text
genital-ulcer-syndrome-to-initial-management
```

Included:

- recognition of a genital, anal, or perianal ulcer presentation;
- a syndrome-level infectious and noninfectious differential;
- genital herpes and primary syphilis as the principal etiologic contrasts;
- chancroid, lymphogranuloma venereum, and donovanosis only to the depth needed
  for initial discrimination and appropriate escalation;
- initial history, examination, syphilis evaluation, lesion-based HSV testing,
  HIV testing, and resource-context interpretation;
- the bounded decision to start presumptive therapy at the initial visit when
  the suspected etiology, epidemiology, diagnostic availability, timing, and
  public-health consequences justify it;
- initial counseling, safety-netting, and partner-service handoff only where
  they change the first management state.

Excluded:

- all of Dermatology or all sexually transmitted infections;
- complete disease-specific treatment modules, recurrent-disease management,
  and longitudinal follow-up;
- detailed management of pregnancy, congenital infection, neurosyphilis,
  immunocompromise, malignancy, or complex inflammatory ulcer disease beyond
  recognizing an escalation boundary;
- copying proprietary item-bank questions;
- patient-specific bedside decision support.

The route target is bounded: the learner should recognize the syndrome,
construct and prioritize the initial differential, select and interpret the
first diagnostic workup in context, and commit to an evidence-backed initial
management state with explicit uncertainty and escalation boundaries.

## Minimum construction unit

The minimum operational construction unit is a folder-based
`GrafoMedSlicePacket`, not an individual node and not a monolithic JSON file.

```text
slice-packets/<packet-id>/
  packet.yaml
  source_lock/
  evidence_bundle/
  candidates/
    nodes/
    relations/
    assemblies/
    learning/
  reviews/
  exports/
```

`packet.yaml` is the packet manifest. It contains identity, version, scope,
status, owners, timestamps, object references, required gates, hashes, and the
canonical snapshot against which derived outputs were produced. Large payloads
remain in the subfolders and are referenced from the manifest.

The first reserved packet is:

```text
slice-genital-ulcer-syndrome-initial-management-v0
```

## Slice packet lifecycle

```text
captured
  -> source_locked
  -> evidence_bundled
  -> graph_drafted
  -> reviewed
  -> route_tested
  -> promoted
  -> maintained
```

Lateral states are `blocked`, `contested`, `deprecated`, `superseded`, and
`archived`. Lifecycle, evidence status, review status, and release status are
separate fields.

For v0.1, `promoted` means valid for controlled internal use by Javier and MIA.
It does not mean public release, learner efficacy, clinical advice, or full
learner-app readiness.

Release status is a separate future axis:

```text
internal_only
  -> learner_pilot_ready
  -> public_release_candidate
  -> public_released
```

Only `internal_only` is available in v0.1.

## Source-lock sufficiency

A source is sufficiently locked for v0.1 only when its record contains:

1. a stable source ID and evidence role;
2. bibliographic or content identity, authorship, title, edition or version,
   publication date, and publisher or issuing body when applicable;
3. a stable locator, DOI, PMID, ISBN, guideline identifier, or equivalent;
4. access date and the exact section, page, figure, table, or scope used;
5. a checksum for every locally stored permissible artifact, or an explicit
   remote-only record when storage rights do not permit a copy;
6. rights and use status, including restrictions on quotation, redistribution,
   item-bank use, or model processing;
7. provenance for acquisition, extraction, and any transformation;
8. a claim-coverage map linking material claims or relations to supporting
   source locations;
9. unresolved limitations, disagreements, retractions, or update risks;
10. a source-lock review result.

A citation string by itself is not a source lock. A structurally complete
record with no usable claim coverage is also insufficient.

## Evidence bundle protocol

Every slice requires an evidence bundle before promotion:

1. one or more core content sources;
2. explicit learning objectives or an evidence-backed objective synthesis;
3. assessment evidence such as open items, original generated items, cases,
   OSCE prompts, or rubrics;
4. clinical-reality sources such as guidelines, reviews, epidemiology, or
   practice literature appropriate to the bridge;
5. competency alignment with the selected AAMC EPAs, CanMEDS objects, and
   Grafo Med tag axes;
6. a search and selection log;
7. a contradiction and uncertainty register.

External evidence search is automatic when MIA processes a chapter unless
Javier explicitly says `solo procesa local`. The search log must record query,
source or database, date, inclusion rationale, exclusion rationale, duplicates,
and retrieval limits. Search breadth never substitutes for source quality or
claim-level support.

Commercial or copyrighted MCQs must not be copied unless explicit license
authority and a controlled handling policy exist. The default is open evidence,
abstracted item patterns, and original assessment items with source-mapped
rationales.

## Object ontology

The v0.1 medical-truth object family is:

- `anatomical_entity`
- `biological_process`
- `developmental_event`
- `condition`
- `clinical_finding`
- `mechanism`
- `test`
- `intervention`
- `risk`
- `context`
- `decision_atom`
- `decision_pattern`

The v0.1 assembly family is:

- `clinical_chain`
- `illness_script`
- `detcsp_pathway`
- `differential_set`
- `professional_activity`

The v0.1 learning family is:

- `mastery_atom`
- `learning_objective`
- `resource`
- `activity`
- `case`
- `assessment`

`decision_atom` is central to the clinical-decision layer but not every
learnable object is a decision. A decision atom still requires a trigger,
actor, inputs, genuine alternatives, discriminators, one observable commitment,
downstream consequence, error costs, assessment evidence, and boundaries.

### Learner-facing contract for graph objects

Any graph object may become a bounded unit of learning or assessment through a
`learning_contract` projection. The contract does not change the object's
layer or convert medical truth into a learning-layer fact.

Each contract contains exactly three scalar fields:

1. `objective`: one observable learner action;
2. `expected_performance`: a short statement of included performance, expected
   level, and node boundary;
3. `mastery_evidence`: the observable evidence sufficient to judge the
   objective.

The objective is singular. If two actions can be passed or failed
independently in a clinically or educationally meaningful way, they must be
split into separate nodes or represented as an assembly. Multiple cases or
items may assess the one objective, but they do not create multiple objectives
inside the node. An object without a contract remains valid graph truth but is
not yet declared learner-ready or independently evaluable.

Accordingly, the shorthand `one node = one objective` applies only to an object
declared as a learner-facing unit through `learning_contract`, and always to a
`mastery_atom`. It does not apply to every node in the complete knowledge graph.
For example, `Atlas (C1)` may remain an anatomical entity without an objective,
while the mastery atom `classify a vertebra by region` carries one objective and
lists Atlas among its evidence objects.

## Relation contract

Every relation is a separate, directed, typed, provenance-bearing assertion
with source, rationale, context, evidence status, and validation status. A tag
must never substitute for a relation.

The minimum v0.1 relation registry must cover these approved semantics:

- structural and developmental: `part_of`, `anatomical_subtype_of`,
  `derives_from`, `develops_into`, `developmental_basis_of`;
- mechanistic: `mechanistic_basis_of`, `causes_or_contributes_to`, `modulates`;
- learning: `requires`, `enables_mastery_of`, `assessed_by`, `remediates`;
- clinical reasoning: `supports_hypothesis`, `discriminates_from`,
  `feeds_decision`, `changes_management_state`;
- alignment and governance: `supports_competency`,
  `instantiates_professional_activity`, `supersedes`.

Exact direction, domain, range, inverse policy, and allowed context for every
type must be defined in the executable registry before use. `requires` must be
acyclic. Associative, monitoring, and clinical workflow relations may contain
justified cycles. Reciprocal edges are not duplicated unless they assert
distinct semantics.

## Candidate creation and promotion

MIA and authorized agents may automatically create candidate objects and
relations. Automatic creation never grants canonical or clinical authority.

Before promotion, every candidate must pass:

1. exact ID and alias search;
2. full-text and semantic duplicate search;
3. graph-neighbor inspection;
4. object-versus-relation-versus-assembly classification;
5. reuse classification as global, transversal, specialization,
   condition-specific, or decision-pattern instantiation;
6. source and claim-coverage checks;
7. relation validation;
8. semantic, clinical, educational, systems, and independent audit gates.

Canonical objects are never silently deleted or overwritten. Material changes
preserve the prior revision and distinguish content identity from topology
identity. Conceptual replacement uses `supersedes` and retains traceability.

## Tags and competencies

Tags are route and retrieval metadata, not ontology. The approved v1 axes are:

- `preclinical_discipline`
- `clinical_area`
- `organ_system`
- `learning_function`
- `competency_framework`
- `route_intent`

Every assignment includes axis, code, role, weight, and provenance. Roles are
`primary`, `secondary`, `bridge`, `context`, and `prerequisite`.

Source tags do not automatically propagate to derived objects. A clinical
bridge enters a preclinical route only when a typed relation and the route
contract justify it. Competency frameworks are many-to-many alignment layers,
not parents of medical-truth objects.

## Route engine v0

The first engine is deterministic, inspectable, and rule-based. It must not use
reinforcement learning, GNNs, or collaborative filtering in v0.1.

Required inputs:

- target mastery atom, competency, professional activity, or bounded route goal;
- learner-state snapshot;
- tag and scope filters;
- available time and route constraints;
- required assessments and safety constraints.

Required procedure:

1. resolve the target into mastery and graph objects;
2. traverse required upstream learning relations;
3. add only relation-backed clinical bridges and cases allowed by scope;
4. remove mastered objects unless review is due;
5. enforce hard prerequisites and topological order;
6. rank feasible steps by target relevance, mastery gap, clinical value,
   readiness, spacing need, time cost, overload risk, and source uncertainty;
7. interleave explanation, retrieval, application, assessment, and transfer;
8. produce a human-readable reason for every included step.

The engine first generates a concept/mastery route and only then selects
resources. Configurable weights and tie-breakers belong in executable config.
A manually authored gold route is required for the first slice so the automated
route can be compared against an expert reference.

## Learner-state model v0

Learner state is stored separately from the canonical graph and versioned
against the graph snapshot and route version. Minimum fields are:

- pseudonymous `learner_id`;
- current goal and target object references;
- mastery estimate per mastery atom;
- confidence or uncertainty of each estimate;
- evidence references, attempt summary, and timestamps;
- error-pattern labels and remediation history;
- last-practiced date and review-due or forgetting-risk indicator;
- time, deadline, fatigue, and modality constraints when provided;
- current route and state version.

No patient-identifiable data belongs in learner state. Mastery must be updated
from observable evidence, not confidence alone. A weak prerequisite may block
or slow a downstream step; a failed transfer case must be able to trigger
targeted remediation without modifying medical truth.

## Review gates and independence

Promotion requires separated review artifacts:

- Siris: semantic boundaries, deduplication, and relation meaning;
- Acai: clinical validity, safety, and scope;
- Alexei: learnability, assessment, route utility, and transfer;
- Cris: schemas, validators, indexes, and reconstruction;
- Ghost: independent contradiction, permission, provenance, and failure audit.

A producer cannot be the sole approver of its own output. Repeating the same
model judgment does not create independent confirmation. Review must use a
separate review context, explicit evidence, and auditable findings. Contested
or high-impact clinical decisions and any public release remain subject to
Javier's authority.

For the first slice, all five review domains and 100% of candidate objects,
relations, assessments, and route steps are in scope. Sampling is not allowed
for the first packet. A future sampling policy may be introduced only after the
vertical proof passes and the spec is revised.

## First real test

The first real test is the reserved genital-ulcer syndrome packet. It must
produce:

- one valid `GrafoMedSlicePacket` and manifest;
- one sufficient source lock and one complete evidence bundle;
- 8–15 bounded medical-truth and assembly candidate objects, excluding source
  metadata and separately reported learning-support records;
- no more than two mastery atoms and one assessment artifact for this proof;
- 15–30 typed relations with rationale and provenance;
- one condition-centered illness script;
- one bounded mini-DETcSp pathway without expanding into a complete STI or
  Dermatology module;
- one manual gold route and one generated route;
- 3–5 original MCQs with answers, rationales, source maps, and experimental
  status;
- one learner-state fixture with before and after states;
- one remediation branch and one novel transfer case;
- one consolidated review dossier containing the five separated reviews.

Counts constrain scope; they are not substitutes for quality.

## v0.1 promotion threshold

The first packet may reach `promoted` only when:

1. all executable schemas and product tests pass;
2. every material claim and relation has usable provenance and rationale;
3. every candidate has a completed duplicate and reuse check;
4. no placeholder satisfies a required field;
5. there are zero unresolved blocking, critical clinical, safety, rights,
   semantic, or hard-prerequisite defects;
6. all five review domains pass and any non-blocking limitations are recorded;
7. the generated route violates no hard prerequisite and includes every
   required gold-route milestone, or documents a valid reason for divergence;
8. the learner-state fixture changes the next route action in the expected
   direction after success and after failure;
9. the remediation branch targets an evidenced error or prerequisite gap;
10. the transfer case tests application beyond verbatim recall;
11. canonical data can rebuild indexes and exports without using derived
    artifacts as truth;
12. Ghost issues a final internal-promotion recommendation.

Passing this threshold validates the v0.1 system mechanism for internal use. It
does not establish clinical outcome benefit, psychometric validity, learning
efficacy, generalizability, or public-release readiness.

## Rights, privacy, and safety

- Rights status is required for every stored source and assessment artifact.
- Full copyrighted works and commercial item-bank content are not reproduced
  without explicit authority.
- Learner state is private operational data and remains separate from exports by
  default.
- Patient-identifiable information is prohibited in v0.1 fixtures and cases.
- Synthetic cases must be labeled synthetic; de-identified real cases require
  documented authority and risk review.
- Grafo Med v0.1 outputs are educational artifacts, not clinical advice.

## Deferred decisions

The following are intentionally deferred and do not block schema implementation
or the first internal proof:

- empirical mastery thresholds and validation datasets;
- psychometric calibration of assessments;
- long-term learner-model algorithms;
- clinical-tag granularity beyond the approved v1 registry;
- Ghost sampling policy after the first successful packet;
- learner pilot and public-release criteria;
- advanced recommenders such as knowledge tracing, RL, GNNs, or collaborative
  filtering;
- unrelated condition frameworks such as the canonical PTSD DSM-5-TR/ICD-11
  mapping.

## Binding non-migration and non-scaling rule

No legacy Médico Completo node, edge, project, or front may be imported or
relabeled as Grafo Med content. The earlier digestive-embryology slice remains
preserved in revision history but is superseded as the first proof; no content
from it was migrated. Grafo Med must not expand horizontally beyond the current
first slice until the complete vertical proof passes the v0.1 promotion
threshold or Javier explicitly revises this contract.
