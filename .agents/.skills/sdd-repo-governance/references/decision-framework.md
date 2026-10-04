# Decision Framework, Anti-Patterns, and Quality Gates

Use this file for the "audit an existing repo" and "where should this
information live" workflows.

## Thinking Framework: where should new information go?

Before creating a new document, or when reviewing whether an existing one is
in the right place, ask:

1. **Scope** — Is this project-wide, product-wide, unit-specific,
   architecture-specific, or execution-specific?
2. **Authority** — Who is the actual source of truth for this information?
3. **Lifecycle** — Is this document stable, frequently changing, derived, or
   transient/historical?
4. **Audience** — Who needs it: stakeholder, product manager, engineer,
   designer, AI agent, auditor?
5. **Duplication risk** — Does this information already exist somewhere else?
   If yes, don't copy it — reference it.
6. **Traceability** — Does this artifact need to connect
   `source → decision → implementation → verification`?
7. **Context efficiency** — Does an AI agent need to read this every time it
   works on a unit, or only when that specific unit/context is active?
8. **Change frequency** — Should a change to this document trigger a change
   to requirements, design, or tasks — or does it only reflect execution
   state?

When in doubt, prefer the Recommended Decision Rules in
`repository-structure.md` for a fast lookup, and fall back to this framework
for genuinely ambiguous cases.

## Anti-Patterns to Flag During an Audit

### One giant `spec.md` for the whole system
Problem: context overload, unclear ownership, changes become untraceable.
Fix: unit-scoped specs under `specs/<unit>/`; use spec-of-specs only
for units that are genuinely too large for one spec.

### `AGENTS.md` becomes the place for every rule
Problem: hard to maintain, grows without bound, mixes product, UI,
engineering, and workflow concerns.
Fix: `AGENTS.md` stays an entry point and behavior contract; authoritative
detail lives in its proper domain folder and gets linked, not copied.

### `TODO.md` becomes a second backlog
Problem: duplicate priorities, duplicate statuses, drifts out of sync with
Jira/Linear/GitHub.
Fix: `TODO.md` = execution state/history. Backlog = product planning. Sprint
= time-boxed delivery. Keep these three distinct even if a human filled all
three roles at different times.

### Copying entire PRD/PMP content into multiple SDD files
Problem: multiple sources of truth, stale copies, ongoing maintenance
overhead.
Fix: reference the upstream document and derive only the engineering-relevant
interpretation; write the specific requirements implementation actually needs
explicitly into the relevant spec.

### Every unit is forced to have 6–10 artifacts
Problem: bureaucracy, ceremony, empty placeholder documents nobody fills in.
Fix: baseline is `spec.md` + `design.md` + `tasks.md`. Add `plan.md`,
`research.md`, `verification.md`, or anything a derivative skill defines
for its own domain only when the unit's actual complexity calls for it.

### An ADR for every small decision
Problem: ADRs become a diary, volume gets too high, signal-to-noise drops.
Fix: reserve ADRs for decisions with long-term consequences, cross-unit
impact, high reversal cost, or genuine value to future maintainers.

### `design.md` is too technical with no traceability back to the spec
Problem: design can silently drift from the business requirement; the
technical solution becomes self-justifying.
Fix: every design should be traceable to the requirement/spec it implements.

### Downstream Requirement Invention
Problem: `design.md` (or even `tasks.md`) quietly introduces a new business
requirement that was never in `spec.md` — the downstream artifact starts
acting as if it has authority it doesn't have.
Fix: a requirement discovered while designing or implementing goes back into
`spec.md` first (bumping its Revision), not straight into the downstream
artifact. See "Interpretation ≠ override" in `governance-mechanics.md`.

### Stale Artifact Execution
Problem: an agent (or a developer) keeps implementing from a `design.md`
whose Health is `STALE`, because the document still *looks* complete and
nobody checked.
Fix: treat `STALE` Health as a stop condition, not a formality — see
`agent-enforcement.md`'s Stop Conditions.

### Governance Duplication
Problem: the same rule gets defined more than once — e.g. `AGENTS.md`,
`constitution.md`, an ADR, and a domain-specific standing-rules file (from a
derivative skill) all separately assert an answer to the same operational
question, and they drift apart.
Fix: one rule, one authoritative location (see the Artifact Authority Matrix
in `governance-mechanics.md`); everywhere else links to it.

### Gate Theater
Problem: a status field says `VERIFIED` (or a gate is marked passed) while
the evidence behind it is missing, placeholder ("TBD"), or doesn't actually
correspond to the acceptance criteria claimed.
Fix: see "What VERIFIED Actually Means" in `lifecycle-and-gates.md` —
`scripts/sdd-check.sh` treats this combination as a FAIL, not a warning.

### Traceability Theater
Problem: a `traces_to:` reference is present and looks correct, but the
target it points to doesn't actually exist, or the relationship is
decorative rather than real (e.g. `design.md` cites `FR-001` but doesn't
actually address what `FR-001` requires).
Fix: presence of a reference is necessary but not sufficient — this is
currently AGENT/HUMAN-checked, not machine-checked (see the audit matrix in
`references/enforcement-classification.md`), so treat a clean
`sdd-check.sh` traceability pass as "references exist," not "references are
correct."

## Quality Gates

### Pre-development gates (repo/project level)

- **Gate 0 — Project Foundation:** project context, engineering constitution,
  glossary/domain vocabulary, and an SDD workflow description all exist.
- **Gate 1 — Scope:** capability scope, roadmap, priority/release intent, and
  out-of-scope areas are all clear.
- **Gate 2 — Unit Specification:** `spec.md` is clear, testable, not
  materially ambiguous, has acceptance criteria, and is approved per the
  project's governance.
- **Gate 3 — Implementation Ready:** `spec.md`, `design.md`, and `tasks.md`
  are consistent with each other, traceable, executable, and have no
  critical open questions. Only then does implementation start.

### Per-artifact readiness gates (unit level)

- **Gate 1 — Specification Ready:** clear, unambiguous, in/out of scope
  stated, testable, acceptance criteria present.
- **Gate 2 — Plan Ready:** has an approach, dependencies known, important
  risks known, architectural questions identified.
- **Gate 3 — Design Ready:** consistent with spec, follows applicable ADRs,
  implementable, detailed enough for task decomposition.
- **Gate 4 — Tasks Ready:** actionable, dependency-ordered, traceable to
  design/spec.
- **Gate 5 — Verification:** implementation satisfies spec, satisfies
  acceptance criteria, doesn't violate the constitution, and is consistent
  with applicable ADRs.

Not every project needs to formalize all of these as checklists — but during
an audit, these are the questions to ask about whatever stage the repo is
currently in.

## End-to-End Workflow (for orientation)

```text
PROJECT INITIATION (Charter, PRD, PMP)
        ↓
PROJECT / PRODUCT BASELINE
        ↓
SDD FOUNDATION (Constitution, Context, Roadmap, Workflow, any derivative skill's own foundation docs)
        ↓
PRODUCT DISCOVERY / PLANNING (Vision, Story Map, Backlog, Sprint Selection)
        ↓
UNIT SDD (Specify → Clarify → Plan → ADR if needed → Design → Tasks)
        ↓
IMPLEMENT
        ↓
VERIFY / CONVERGE
        ↓
UPDATE TODO / PROJECT STATE
        ↓
NEXT UNIT / NEXT SPRINT
```

## Exception handling — not every change needs the full cycle

- **Trivial** (typo, copy change, minor formatting): skip the cycle.
- **Behavioral change:** must consider the specification.
- **Architectural change:** must consider whether an ADR is needed.
- **Large unit:** may need spec-of-specs.

Apply proportionality — this whole framework exists to make traceability
possible, not to create ceremony for its own sake.

## Audit report shape

When auditing an existing repo, structure findings as:

```text
## Structure Gaps
(missing folders/files that the project's maturity level calls for)

## Boundary Violations
(content in the wrong place — reference the Core Boundary Rules)

## Anti-Patterns Detected
(reference the specific anti-pattern by name)

## Duplicate Source-of-Truth Risks
(same information asserted authoritatively in more than one place)

## Recommendations
(prioritized, proportional — don't recommend scaffolding everything at once)
```
