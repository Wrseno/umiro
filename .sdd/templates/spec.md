# [Unit Name]

> Behavioral contract. This document states what the unit must do, not how
> it will be built — keep it free of technology-specific detail unless the
> technology itself is a hard requirement. Anything ambiguous should be an
> Open Question, not a silent assumption.

**Lifecycle:** DRAFT | CLARIFYING | SPECIFIED | SUPERSEDED
**Health:** VALID | REVIEW_REQUIRED | BLOCKED
**Revision:** 1
**Authority:** This document is the primary authority for this unit's
functional behavior. `design.md` and `tasks.md` derive from it and must not
redefine it.

> Lifecycle and Health are two separate dimensions — see
> `references/lifecycle-and-gates.md`. Lifecycle tracks how far the artifact
> has progressed; Health tracks whether it's currently trustworthy. `spec.md`
> doesn't carry a `STALE` Health value itself (nothing is upstream of it
> except the PRD/product layer) — but bump **Revision** every time you make a
> meaningful change, since that's what downstream artifacts (`design.md`,
> `tasks.md`) compare against to detect their own staleness.

## 1. Purpose

[Why this unit exists, in a sentence or two]

## 2. Scope

### In Scope

- [...]

### Out of Scope

- [...]

## 3. Actors

[Who or what interacts with this unit — users, roles, other systems]

## 4. User/System Scenarios

[Concrete scenarios describing how actors use this unit. Given/When/Then
style is fine if that fits the project's conventions.]

## 5. Functional Requirements

[Numbered, testable statements of required behavior, e.g. FR-001, FR-002...]

## 6. Business Rules

[Rules the domain imposes, independent of the software]

## 7. Non-Functional Requirements

[Performance, reliability, security, accessibility, etc. — only what's
actually relevant to this unit]

## 8. Constraints

[Unit-specific constraints; project-wide constraints belong in
`.sdd/context/constraints.md` and can be referenced rather than repeated]

## 9. Acceptance Criteria

[Concrete, verifiable conditions that determine when this unit is done]

## 10. Dependencies

[Other units, systems, or decisions this depends on]

## 11. Open Questions

[Anything ambiguous or undecided — do not let implementation start with
material open questions unresolved]
