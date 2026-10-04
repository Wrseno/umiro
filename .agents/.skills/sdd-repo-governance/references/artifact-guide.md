# Artifact Guide

What each SDD artifact is for, what it must never turn into, and its
recommended structure. Ready-to-copy templates for the file-based artifacts
live in `assets/templates/` — use this guide to understand *why* they're
shaped that way and to review/critique existing artifacts.

Full-text templates in `assets/templates/`: `AGENTS.md`, `constitution.md`,
`roadmap.md`, `product.md`, `domain.md`, `glossary.md`, `constraints.md`,
`spec.md`, `plan.md`, `design.md`, `tasks.md`, `ADR.md`, `TODO.md`.

---

## `spec.md` — behavioral contract

Answers: WHY / WHO / WHAT / WHEN / under what conditions / what must happen /
what must not happen.

It is **not** a technical design document. It should not default to depending
on a specific technology. If you catch a spec describing a database schema or
a specific library, that content belongs in `design.md` instead.

Recommended structure:

```text
# [Unit name]

## 1. Purpose
## 2. Scope
### In Scope
### Out of Scope
## 3. Actors
## 4. User/System Scenarios
## 5. Functional Requirements
## 6. Business Rules
## 7. Non-Functional Requirements
## 8. Constraints
## 9. Acceptance Criteria
## 10. Dependencies
## 11. Open Questions
```

## `research.md` — optional, evidence not requirement

Used when a unit needs investigation before a decision can be made.

```text
Question → Investigated Alternatives → Findings → Recommendation
```

Research findings inform `plan.md` and `design.md`, but research itself
doesn't define requirements — if a finding turns out to be a requirement,
state it explicitly in `spec.md`.

## `plan.md` — implementation strategy

A genuinely core part of the unit lifecycle, not an optional nicety.
Answers: how do we intend to approach this work? Sits between spec and design:

```text
spec.md → plan.md → design.md
```

Recommended structure:

```text
# Implementation Plan

## 1. Approach
## 2. Implementation Strategy
## 3. Affected Areas
## 4. Dependencies
## 5. Sequence / Phases
## 6. Risks
## 7. Assumptions
## 8. Architectural Questions
## 9. Required Decisions
## 10. Verification Strategy
```

`plan.md` is where architectural questions get surfaced ("should schedule
generation be synchronous?", "where should route calculation happen?"). When
such a question needs a durable answer, it graduates to an ADR:

```text
plan → architectural question → ADR → design
```

**`plan.md` MUST NOT:**
- redefine or add to the requirements in `spec.md` — a gap found while
  planning goes back into `spec.md`, not into the plan;
- introduce a business rule that wasn't approved in `spec.md`;
- become a detailed technical design — that's `design.md`;
- become a task checklist — that's `tasks.md`.

Plan vs tasks: plan is strategic ("implement scheduling in four stages: ...");
tasks is operational ("T001 Create WorkingCalendar", "T002 Implement
working-time calculation", ...). Plan = strategy. Tasks = execution breakdown.

## ADR (Architecture Decision Record) — cross-cutting, not a phase

Lives in `decisions/ADR-xxx.md`. Use it for decisions with long-term
consequences: boundaries, architecture style, integration strategy,
persistence strategy, transaction boundaries, authorization model, technology
choices that are hard to reverse.

Don't create an ADR for variable naming, minor component naming, formatting,
or simple implementation detail — that's what makes ADRs noisy and low
signal-to-noise (see anti-pattern 52.6 in `decision-framework.md`).

```text
ADR-012

Title: Route Calculation Strategy
Status: Accepted

Context:
...

Decision:
...

Alternatives Considered:
...

Consequences:
...
```

Status lifecycle: `Proposed → Accepted → Superseded / Deprecated`.

Three things that look similar but aren't:
- **Rule/convention** ("every module must own its own data access, no
  reaching into another module's internals") → a project's (or a derivative
  skill's) own standing-rules file.
- **Architecture decision** ("why did we choose module-owned data access
  over a shared data layer?") → `decisions/ADR-xxx.md`.
- **Unit-specific implementation decision** ("scheduling uses strategy X
  for the first implementation") → `specs/<unit>/design.md`, unless it has
  cross-unit or long-term architectural weight — then it graduates to ADR.

## `design.md` — solution contract

Answers: what technical solution will be built? Must stay consistent with
`spec.md` and any applicable ADRs — a design that drifts from its spec with no
back-reference is an anti-pattern (52.7).

```text
## Architecture
## Components
## Domain Model
## Data Model
## Interfaces
## State Transitions
## Error Handling
## Security
## Integration
## Migration Strategy
## Alternatives Considered
```

## `tasks.md` — derived, granular execution breakdown

Derived from spec + design, not a place to redefine requirements.

```text
spec.md → design.md → tasks.md
```

```text
- [ ] T001 Create WorkingCalendar
- [ ] T002 Implement working-time calculator
- [ ] T003 Create schedule generator
- [ ] T004 Implement conflict detector
- [ ] T005 Add persistence integration
- [ ] T006 Add verification
```

Tasks must be actionable, dependency-aware, and traceable back to
design/spec.

## `TODO.md` — project-level execution ledger

Scope is the whole repository, not one unit. Answers: where is
development right now, what happened, what's next, what's blocked. It is
**not** a second backlog and **not** a duplicate of `tasks.md`
(anti-pattern 52.3) — those live at the unit/product layer with different
scopes.

| | Scope | Answers |
|---|---|---|
| `tasks.md` | one unit | What granular work does this unit need? |
| `TODO.md` | whole project | Where are we, what's done, what's next? |

`TODO.md` must never become the source of truth for behavioral requirements,
architecture definitions, detailed technical design, or product backlog
detail — it only reports state, it doesn't define anything new.

**When to update it:** on materially meaningful progress, not every
action. See "What counts as meaningful progress" in
`references/agent-enforcement.md` — reading a file, searching code, or
running a test doesn't by itself warrant a `TODO.md` update; a task status
change, a new blocker, a milestone, or a stage transition does.

A practical optional state machine for agentic workflows (simplify to what
the project actually needs — not every project needs every state):

```text
PLANNED → SPECIFYING → SPECIFIED → DESIGNING → DESIGNED →
IMPLEMENTING → IMPLEMENTED → VERIFYING → VERIFIED
                                        ↕
                                    BLOCKED → RESOLVED (resume current stage)
```

Sprint vs TODO: Sprint is a time-boxed delivery commitment (can live entirely
in Jira/Linear/GitHub Projects — don't replicate the whole board into
`TODO.md`, just reference `Current Sprint: S13` if useful). `TODO.md` is
continuous execution state and doesn't reset when a sprint closes — a unit
sitting at 70% when a sprint ends stays visibly at 70% in `TODO.md` until the
next sprint picks it back up. This preserves historical continuity.

## `AGENTS.md` — entry point for AI agents

Not the place for product requirements, design rules, architecture docs, or
SDD content in full — that's how it turns into an unmaintainable pile
(anti-pattern 52.2). It should contain:

- the order in which documents should be read
- agent behavior instructions
- mandatory gates
- a prohibition on making unstated assumptions
- traceability rules
- how to find the currently active work
- links/references to the authoritative documents (not copies of them)

Typical agent reading order:

```text
1. AGENTS.md
2. TODO.md
3. Relevant project/product context
4. Constitution
5. Relevant user story / backlog item (if relevant)
6. spec.md
7. plan.md
8. Relevant ADR(s)
9. design.md
10. tasks.md
11. implementation
```

An agent does not need to read the entire repository every time — only the
documents relevant to the active unit/task.

## `.sdd/constitution/constitution.md` — governance layer

Cross-project engineering principles: requirement traceability, explicit
scope, testable requirements, explicit boundaries, security by default,
maintainability, human approval gates. Not a unit specification — it
governs how all specifications get written and evaluated.

## `.sdd/context/` — knowledge, not requirement

`product.md`, `domain.md`, `glossary.md`, `constraints.md`. Relatively stable
knowledge that builds a shared mental model. Example: "Maintenance Schedule =
planned maintenance activity within a defined period" is context. "The system
SHALL prevent overlapping maintenance schedules for the same unit" is a
requirement and belongs in a spec.

## `.sdd/roadmap/roadmap.md` — strategic scope

Answers: where is the project headed? Not a granular backlog and not a TODO
list.

## Project-management documents (`docs/project/`)

`Charter` (why the project exists), `PRD` (what product should exist), `PMP`
(how the project is governed). These stay relevant across the whole
lifecycle, not just at kickoff — a PRD v2 or a scope change should flow
forward into new/updated specs, designs, and ADRs as needed. Requirements
actually needed for implementation must be stated explicitly in `spec.md`
rather than left implicit in the PRD.

Whether these belong in the repo at all: use three buckets.
- **In the repository** if it's a source of truth, engineering-relevant,
  needed by developers/AI, or needed for traceability.
- **Reference-only** (`docs/project/`) if still relevant but not a working
  engineering artifact.
- **Stays in the PM system** — budget, contracts, procurement, confidential
  stakeholder info, HR data, sensitive commercial documents, irrelevant
  meeting artifacts. The repository must not become a document management
  system.

## Validation & Convergence

SDD doesn't stop at implementation:

```text
specification → implementation → validation → convergence
```

Questions to ask: does implementation still match the spec? Does design still
match implementation? Were the tasks actually done? Is there a requirement
gap? Is there undocumented behavior?

## Status lifecycle (recommended, for specs/units)

```text
draft → clarifying → approved → planned → implementing →
implemented → verifying → verified
```

Abnormal states: `blocked`, `cancelled`, `superseded`.

## Spec-of-specs (only for genuinely large units)

```text
specs/010-maintenance-management/
├── roadmap.md
├── 010.1-unit-management/{spec,plan,design,tasks}.md
├── 010.2-team-management/{spec,plan,design,tasks}.md
└── 010.3-scheduling/{spec,plan,design,tasks}.md
```

Only decompose this way when the unit genuinely needs it — don't default
to spec-of-specs for ordinary units.
