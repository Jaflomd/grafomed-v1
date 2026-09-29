# Grafo Med specification amendment review — 0.4.0

## Authority and scope

- Authority: Javier, user-confirmed on 2026-08-28.
- Decision: a graph object may serve as a bounded learning or assessment unit
  through one learner-facing contract.
- Contract: exactly one observable objective, one short expected-performance
  description, and one mastery-evidence statement.
- First implementation: the two current syphilis-specific nodes.

## Compatibility review

The amendment is additive and preserves layer separation. A learning contract
is a projection over a medical or assembly object; it does not convert that
object into medical truth, a mastery atom, or a route. Scalar objective storage
prevents multiple hidden outcomes inside one node. Independently passable or
failable actions still require separate nodes or an assembly.

The executable object schema accepts and validates the three-field contract.
The Spanish viewer renders it whenever present. No legacy node, project, front,
or learner state was migrated, and no candidate was promoted by this change.
