# Agent Enforcement: MUST rules, Stop Conditions, Escalation, Context Loading

This is the operational layer that makes the rest of this skill's governance
model actually enforceable by an AI agent working in the repository, not
just documented. When Claude (or another agent) is acting *in* an SDD
repository — not just reasoning about its structure — these rules apply
directly to its own behavior.

## MUST

- MUST read `AGENTS.md` before doing repository work, if it exists.
- MUST identify the relevant spec before implementing anything.
- MUST respect the Artifact Authority Matrix (`governance-mechanics.md`) —
  never treat a downstream artifact as authoritative over its upstream
  source.
- MUST notice and flag stale artifacts (an upstream changed since a
  downstream was last reviewed) rather than trusting them at face value.
- MUST stop at unresolved architectural conflicts rather than picking a side
  (see Stop Conditions below).
- MUST update `tasks.md`/`TODO.md` after meaningful execution progress, not
  let them silently fall out of sync with reality.
- MUST verify acceptance criteria rather than declaring something done on
  the basis that the code looks right.

### What counts as "meaningful progress"

Not every action warrants a `TODO.md`/`tasks.md` update — that would make
them noisy rather than useful. Update execution state when a **task status,
blocker, milestone, stage, or completion state materially changes.**
Reading a file, searching code, or running a test in the course of normal
work does not, by itself, require an update. This keeps the bar calibrated:
frequent enough that `TODO.md` stays trustworthy, not so frequent that it
becomes a log of every tool call.

## MUST NOT

- MUST NOT invent requirements that aren't in an approved spec.
- MUST NOT silently resolve a conflict between artifacts by inference —
  follow the Conflict Resolution Protocol instead.
- MUST NOT rewrite upstream product intent (PRD, approved spec) to make an
  implementation detail fit more easily.
- MUST NOT treat `TODO.md` as a source of requirements — it reports state,
  it doesn't define anything.
- MUST NOT mark work `VERIFIED` without evidence (see Gate Evidence in
  `lifecycle-and-gates.md`).
- MUST NOT modify ADR history retroactively — supersede, don't rewrite (see
  ADR Supersession Protocol in `governance-mechanics.md`).

## Stop Conditions

An agent should stop and surface the issue — not guess, implement, and
rationalize afterward — when:

- the specification is ambiguous on behavior that actually matters,
- an authority conflict exists between artifacts,
- a required ADR decision is unresolved,
- the relevant design is marked `STALE`,
- a security-relevant requirement has no verification path,
- acceptance criteria can't actually be tested as written,
- proceeding would violate an already-approved decision.

The default posture SDD is trying to instill is: **detect uncertainty →
surface uncertainty → resolve uncertainty → proceed.** Not: guess, build,
and justify the guess after the fact.

## Escalation Rules

"Blocked" isn't a complete answer on its own — who resolves it matters too:

| Kind of ambiguity | Escalate to |
|---|---|
| Product ambiguity | Product owner |
| Architectural ambiguity | Engineering architect / technical owner |
| UX ambiguity | Design authority |
| Security ambiguity | Security authority |

The distinction that matters for an agent: not "I don't know," but "I don't
have the authority to resolve this — here's who does."

## Context Loading Policy

Not every task needs the full `AGENTS.md` reading order. Load context
proportional to the task:

**Bug fix:**
```text
AGENTS.md → relevant TODO entry → unit spec → design → implementation → tests
```

**Building a new unit of work:**
```text
AGENTS.md → PRD/context → spec → plan → ADR → design → tasks
```

**Architectural work:**
```text
AGENTS.md → constitution → relevant rules → ADR index → affected specs → affected designs
```

**Domain-specific work** (e.g. a derivative skill's own category — UI work
for a frontend skill, hardware-interface work for a firmware skill):
```text
AGENTS.md → that domain's standing rules (from the derivative skill) → unit spec → design → implementation
```

These four are illustrative, not exhaustive — a derivative skill
(`references/extending-for-a-tech-stack.md`) may define additional
categories specific to its own domain rather than forcing everything
through "bug fix" or "new unit of work."

### Context Budget Principle

> Read the minimum authoritative context necessary to perform the current
> task.

Don't read every historical ADR, every unit, every piece of research, and
every old task by default. Read: global rules + the relevant unit +
specifically referenced decisions + the relevant implementation. This is
what keeps the governance model usable at scale instead of forcing a full
repository read on every task — it's context engineering, not just document
governance.
