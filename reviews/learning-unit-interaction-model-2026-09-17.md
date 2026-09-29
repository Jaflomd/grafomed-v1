---
id: grafomed-learning-unit-interaction-model-2026-09-17
product_id: grafomed-v1
status: user-confirmed-design-direction_pending-spec-amendment
recorded_at: 2026-09-17
authority: javier
scope: learning-interaction-and-assessment-model
binding_spec: PRODUCT_SPEC.md v0.4.1
---

# Grafo Med learning interaction model — design direction

## Javier's confirmed direction

- A cluster (for example, thyroid physiology) contains multiple mastery targets.
- Each mastery target integrates multiple decisions.
- Each decision draws on concepts, facts, and procedures. These inputs are reusable across decisions and mastery targets; they are not copied into each parent.
- **Concept**, in the learner-facing interaction sense, is brief contextual input for the learner, such as a short video, reading, or other microresource.
- **Fact** is a learnable heuristic or rule, assessed directly. Its evidence, scope, exceptions, and currency must remain explicit; the label does not make a claim universally certain.
- **Procedure** is usually a checklist-like sequence and is assessable, often by ordering steps or grouping items.
- **Decision** is assessed with a very-short-answer response or another appropriate response format.
- **Mastery** is assessed with high-quality board-style MCQs that integrate the relevant decisions.

The proposed interaction sequence is:

`cluster -> mastery target -> decisions -> reusable concept/fact/procedure inputs`

Assessment is mapped to each level, rather than conflating a target with its item:

`fact/procedure checks -> decision responses -> integrated mastery MCQs`

## MIA interpretation and compatibility boundary

The learner-facing word **concept** denotes a presentation/input unit here. It must not silently replace an intrinsic medical-truth entity or claim in the ontology. A video or reading is currently a `resource`; its underlying medical concept may be a separate reusable graph object.

In the binding v0.4.1 spec, `mastery_atom` is an observable, evaluable learning target, while `assessment` is a distinct support object. Therefore, a board-style MCQ **measures** a mastery target; it is not itself the mastery target. Multiple decisions may contribute to one mastery target if they jointly demonstrate one observable integrated objective. Independently passable objectives require separate targets or an explicit higher-level assembly.

The v0.4.1 schemas do not yet encode learner-facing `concept`, `fact`, and `procedure` as three separate object types, nor do they encode default response formats by level. This note records the direction without changing the binding ontology or promoting candidate content.

## Assessment design guardrails proposed for review

- Board-style MCQs should test application or reasoning in a meaningful context, not merely recall; use an item blueprint, plausible alternatives, and source-locked explanations.
- Do not infer robust mastery from one correct MCQ alone. Decide the evidence rule, item sampling, and confidence threshold separately.
- Very-short-answer items can reveal the learner's own decision rather than recognition of options, but the response format may vary when the decision is better assessed another way.
- A checklist-ordering item demonstrates procedural sequence only when order is genuinely consequential; grouping is appropriate when classification is the target.

## Open specification decisions

1. Exact object/relationship mapping for learner-facing concepts, facts, and procedures.
2. Whether board-style MCQ is the default mastery assessment or a mandatory format for every mastery target.
3. Required number/diversity of items and criteria for a mastery estimate.
4. Explicit response-format metadata and scoring rubrics for facts, procedures, and decisions.

## References consulted for MIA's assessment recommendation

- NBME Item-Writing Guide: https://www.nbme.org/sites/default/files/2021-02/NBME_Item%20Writing%20Guide_R_6.pdf
- Grafo Med binding specification: `products/grafomed-v1/PRODUCT_SPEC.md` v0.4.1, especially product layers, object ontology, learner-facing contracts, and assessment requirements.
