# Design — [Unit Name]

> Solution contract. Answers what technical solution will be built. Must stay
> consistent with `spec.md` and any applicable ADRs — reference them by ID so
> the traceability chain is visible, not implicit.

**Lifecycle:** DRAFT | DESIGNED | SUPERSEDED
**Health:** VALID | REVIEW_REQUIRED | STALE | BLOCKED
**Traces to:** `spec.md` (this unit) · ADR(s): [list any applicable ADR IDs]
**Reviewed against:** spec revision [N]

If `spec.md`'s Revision increases after this document is marked DESIGNED,
set this document's Health to `STALE` until it's reviewed against the new
revision and `Reviewed against` is updated — see the STALE state in
`references/lifecycle-and-gates.md`. Do not proceed to implementation from a
`STALE` design regardless of its Lifecycle value.

## Architecture

[High-level shape of the solution]

## Components

[Key components/modules and their responsibilities]

## Domain Model

[Core entities and their relationships, as realized in this design]

## Data Model

[Schemas, storage shape, if applicable]

## Interfaces

[APIs, contracts, boundaries with other systems/components]

## State Transitions

[If the unit involves stateful behavior]

## Error Handling

[How failure modes are handled]

## Security

[Relevant security considerations for this design]

## Integration

[How this connects to existing systems/units]

## Migration Strategy

[If this changes or replaces existing behavior/data]

## Alternatives Considered

[What else was considered and why this approach was chosen — keep brief;
if the reasoning is architecturally significant and long-lived, it may
belong in an ADR instead]
