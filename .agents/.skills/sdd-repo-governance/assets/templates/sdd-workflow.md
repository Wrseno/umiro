# SDD Workflow

> How the Spec-Driven Development lifecycle works in this repository.

## Lifecycle

```text
spec.md → research.md (optional) → plan.md → ADR (when needed) →
design.md → tasks.md → implementation → validation → TODO.md update
```

## Approval gates

[State who approves each stage transition, e.g.:
- spec.md requires approval from [role] before plan.md starts
- design.md requires approval from [role] before implementation starts]

## Exception handling

- **Trivial changes** (typo, copy, minor formatting): skip the full cycle.
- **Behavioral changes:** must go through spec.md.
- **Architectural changes:** must consider whether an ADR is needed.
- **Large units:** may use spec-of-specs — see `.sdd/templates/` and the
  unit folder convention in `specs/`.

## Unit folder convention

Baseline: `spec.md`, `design.md`, `tasks.md`. Add `plan.md`, `research.md`,
`data-model.md`, `contracts/`, `ux.md` only when the unit's complexity
calls for them.
