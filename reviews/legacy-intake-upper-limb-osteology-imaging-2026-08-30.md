# GrafoMed legacy-reference intake · upper-limb osteology and imaging

Status: `candidate_proposal_not_ingested`

Date: 2026-08-30

## What was selected

The first bounded legacy-reference cycle covers osteology, surface anatomy,
trauma relationships and imaging of the upper limb. Fourteen records were
reviewed from `medico-completo-v1`: `ANA-177` through `ANA-186`, the refinements
`ANA-185A/B/C`, and `ANA-248`.

The legacy project is treated as a quarry of hypotheses and useful wording,
not as a canonical source. No legacy node, relation, project state or learner
state has been migrated.

## What the legacy cluster does well

- It contains a clinically useful sequence from bone orientation to surface
  landmarks, vulnerable neurovascular structures and imaging.
- Its practice statements are often observable: orient a bone, palpate a
  landmark, localize a fracture and predict a structure at risk.
- Several pitfalls capture discriminations worth preserving, such as radial
  versus ulnar orientation, capitulum versus trochlea, and normal initial
  radiographs in suspected scaphoid injury.
- The refinements `ANA-185A/B/C` show a good instinct to split an overbroad
  trauma node into elbow fracture, forearm fracture and elbow dislocation.

These are design clues. They are not verified claims merely because they were
written in the old graph.

## Why it cannot be copied

All 14 records remain `pending_mission_ingest`, use the same generic type
`habilitador`, are assigned to the same `base` tier and have no decision object.
Book titles are listed, but there is no edition, page, claim-level citation or
edge-level provenance.

More importantly, each record mixes several ontological roles:

- a bone or anatomical region;
- factual propositions about its structure;
- a learner-facing objective;
- a practice activity;
- a pitfall and teaching pearl;
- and sometimes a clinical condition or management action.

The topology then reduces all semantics to `prerequisites`, `unlocks` and
`connected`. Examples of failure include:

- Humerus orientation is declared to require clavicle and scapula orientation;
  this is a possible teaching order, not a necessary anatomical dependency.
- The imaging node requires all trauma nodes, although imaging can precede and
  support trauma learning rather than only follow it.
- `ANA-185` duplicates the scope of `ANA-185A/B/C` while remaining a node.
- `connected` links do not state whether the relation is anatomical adjacency,
  co-assessment, clinical risk or mere navigation.
- Injury nodes contain both the injury and structures at risk instead of
  representing those as reusable condition and anatomical entities connected
  by typed assertions.

## Audit of the current GrafoMed candidate

The new upper-limb candidate is safer than the legacy graph: it separates 54
knowledge entities from 33 mastery atoms and materializes 221 closed relations.
However, this comparison revealed three weaknesses before promotion:

1. `gm-ma-identify-upper-limb-long-flat-bones` is too broad for a stable unit of
   learning and evaluation. Clavicle, scapula, humerus and the radius-ulna
   contrast should be separate atoms.
2. The knowledge layer names bones but not the high-value landmarks used to
   orient them or connect them to trauma. This prevents the graph from
   expressing why a lesion endangers a particular structure.
3. The materialized relation view currently relies on `part_of` and
   `enables_mastery_of`. It is a sound taxonomy-plus-learning projection, but
   it is not yet a sufficiently expressive anatomical graph. Relations such as
   `articulates_with`, `affects_anatomical_entity` and `places_at_risk` need
   contracts before applied anatomy is ingested.

The broad imaging atom also mixes modality orientation, anatomy recognition
and abnormality detection. Region-specific image reading should depend on
reusable transversal imaging atoms instead of reimplementing them in every
body region.

## Exact package proposed for GrafoMed

The accompanying proposal
`designs/intake-proposals/upper-limb-osteology-imaging-v0.yaml` contains the
complete candidate package:

- Reuse the 15 existing skeletal entities.
- Add 24 high-value landmark entities, each attached to its parent bone.
- Add 9 bounded injury-condition entities to make trauma relationships
  explicit and reusable.
- Replace the five-bone mastery atom with four orientation atoms.
- Split wrist/hand identification into carpals and metacarpal-phalangeal maps.
- Add one surface-landmark atom.
- Split the broad imaging atom into anatomy-on-images and common osseous-injury
  recognition.
- Retain the two current neurovascular application atoms, but rewire them to
  explicit injury conditions and structures at risk.
- Design modality/projection recognition and systematic osseous image reading
  as transversal atoms, not upper-limb duplicates.
- Add four relation contracts before importing any of the new objects.

This yields a graph in which, for example, a supracondylar humeral fracture is
not a paragraph hidden inside an anatomy node. It is a condition connected to
the distal humerus through `affects_anatomical_entity`, to the brachial artery
and median nerve through `places_at_risk`, and to a mastery atom through
`enables_mastery_of`.

## What is deliberately not entering

- No legacy ID or legacy edge is retained as canonical identity.
- Generic textbook lists are not treated as claim-level source locks.
- Named Colles/Smith subtypes wait for a dedicated clinical source and
  granularity review.
- First/fifth metacarpal fracture detail waits for a hand-trauma cluster.
- Reduction, immobilization and before/after-management language remain outside
  this anatomical slice.
- No MCQ, microlesson, activity, gameplay or learner state is being built.

## Recommendation

Approve this package only as a candidate build after the relation registry is
amended. Then ingest it in two passes: first bones, landmarks and orientation;
second injury contexts, image interpretation and neurovascular risk. Each pass
should be rendered and audited before moving to the next upper-limb subcluster.
