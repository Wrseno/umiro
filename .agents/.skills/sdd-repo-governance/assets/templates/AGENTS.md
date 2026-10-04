# AGENTS.md

> Entry point for AI agents working in this repository. This file tells an
> agent how to operate here — it is not a place for product requirements,
> design rules, or SDD content in full. Read the linked documents instead of
> duplicating them here.

## Reading order

Before making changes, read in this order:

1. `AGENTS.md` (this file)
2. `TODO.md` — current execution state
3. Relevant project/product context (`docs/project/`, `.sdd/context/`)
4. `.sdd/constitution/constitution.md` — engineering principles
5. Relevant user story / backlog item, if applicable (`product/backlog.md`)
6. `specs/<active-unit>/spec.md`
7. `specs/<active-unit>/plan.md`
8. Any referenced ADR(s) in `decisions/`
9. `specs/<active-unit>/design.md`
10. `specs/<active-unit>/tasks.md`

You do not need to read the entire repository for every task — only the
documents relevant to the active unit or task.

## Mandatory rules

- Do not make unstated assumptions about requirements. If `spec.md` is
  ambiguous or silent on something material, flag it as an open question
  rather than guessing.
- Every behavioral change must be traceable to an approved specification.
- Every non-trivial architectural decision must be recorded as an ADR before
  (or as part of) implementing it.
- Do not treat `TODO.md` as a backlog or `tasks.md` as a place to redefine
  requirements — see the boundary rules in `.sdd/constitution/constitution.md`.
- Update `TODO.md` when you complete meaningful work, change stage, or hit a
  blocker.

## Finding active work

Check `TODO.md` for `Current Position` — it names the active sprint, phase,
unit, stage, and task.

## Gates

Do not begin implementation on a unit until:
- `spec.md` is clear, testable, and has acceptance criteria.
- `design.md` is consistent with `spec.md` and any applicable ADRs.
- `tasks.md` exists and is traceable to `design.md`.

## Authoritative sources (do not duplicate, link instead)

- Engineering principles: `.sdd/constitution/constitution.md`
- Domain/product knowledge: `.sdd/context/`
- Roadmap: `.sdd/roadmap/roadmap.md`
- Architecture decisions: `decisions/`
- Domain/platform-specific standing rules (if this project uses a
  derivative skill for its tech stack): see that skill's own rules location
