# Engineering Constitution

> Cross-project engineering principles. This is governance, not a unit
> specification — it defines how specifications, designs, and implementations
> get written and evaluated across the whole repository.

## Principles

- **Requirement traceability.** Every implemented behavior must trace back to
  an approved `spec.md`.
- **Explicit scope.** Every spec states in-scope and out-of-scope explicitly.
- **Testable requirements.** Requirements must be written so they can be
  verified, not just asserted.
- **Explicit boundaries.** [e.g., service boundaries, module boundaries —
  fill in what applies to this project]
- **Security by default.** [state the project's baseline security posture]
- **Maintainability.** [state conventions that keep the codebase approachable
  over time]
- **Human approval gates.** [state which stages require human sign-off before
  proceeding — e.g., spec approval before design, design approval before
  implementation]

## Single source of truth

No two artifacts may both be the authoritative source for the same piece of
information. If information needs to appear in more than one place, one
location is authoritative and the others reference it.

## Boundary rules

1. Product requirement ≠ engineering specification.
2. Specification ≠ design.
3. Plan ≠ tasks.
4. ADR ≠ generic decision log.
5. `TODO.md` ≠ backlog.
6. `TODO.md` ≠ `tasks.md`.
7. A derivative skill's standing rules ≠ this chain's core artifacts.
8. `AGENTS.md` ≠ all documentation.
9. Project-management docs ≠ SDD docs.
10. Never create a duplicate source-of-truth.

## Amending this document

[State how changes to the constitution itself get proposed and approved —
this document should change rarely and deliberately.]
