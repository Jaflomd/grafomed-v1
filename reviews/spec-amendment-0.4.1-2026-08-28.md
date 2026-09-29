# Grafo Med specification amendment review — 0.4.1

## Authority and decision

- Authority: Javier, explicitly authorized on 2026-08-28.
- Decision: create a knowledge-entity layer and add vertebral entities to the
  candidate vertebral-column graph.
- Binding interpretation: `one node = one objective` applies to learner-facing
  units, especially `mastery_atom`, not to every medical-truth node.
- Medical-truth entities remain reusable knowledge identities and may exist
  without `learning_contract`.

## Executable change

The existing `anatomical_entity` object type remains the canonical type for
vertebral structures. The relation registry now permits any medical-truth or
assembly object, including `anatomical_entity`, to point to a `mastery_atom`
through `enables_mastery_of`. It also defines `anatomical_subtype_of` for a
specific vertebra or morphotype pointing to a more general anatomical entity.

The first implementation contains one general vertebral archetype and ten
source-locked vertebral morphotypes or distinctive entities: Atlas, Axis,
typical C3–C6, transitional C7, typical thoracic pattern, atypical thoracic set,
typical L1–L4, L5, sacrum, and coccyx. The initial bridge is intentionally
bounded to regional classification and atypical-vertebra recognition.

## Granularity and safety review

Creating one node for every numbered vertebra was rejected as the default
because it would duplicate morphology without adding independent educational
or clinical meaning. A numbered vertebra becomes its own object only when it
has reusable distinguishing features, independent relations, clinical
importance, or a separately assessable role. Features remain structured
properties until they satisfy the same promotion rule.

Thoracic variation is preserved explicitly: T1, T11, and T12 are fixed members
of the atypical set in this design; T9 and T10 are modeled as variable or
transitional rather than forced into a universal rigid list. C7 also records
that typical-versus-atypical classification varies by convention.

## Compatibility review

This amendment is additive and preserves all five product layers. It does not
alter the genital-ulcer proof slice, learner state, routes, legacy data, or
promotion gates. The vertebral cluster and its knowledge entities remain
source-locked candidates and are displayed only through a derived preview.
No candidate object is promoted by successful schema validation or rendering.
