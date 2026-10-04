# Governance Mechanics

This file covers the *dynamics* of an SDD repository: who's authoritative
when artifacts disagree, what happens when an upstream artifact changes,
how to classify the size of a change, and how governance itself evolves over
time. Use `repository-structure.md` and `artifact-guide.md` for where things
live; use this file for how they behave once the repository is live and
changing.

## Artifact Authority Matrix

"One source of truth" only works if it's clear *which* artifact is
authoritative for a given kind of knowledge. Use this matrix; extend it with
project-specific rows as needed, but don't leave it undefined.

| Knowledge | Primary authority | Downstream consumers |
|---|---|---|
| Product objective | PRD | spec.md, plan.md |
| Functional behavior | spec.md | design.md, tasks.md, tests |
| Implementation strategy | plan.md | design.md, tasks.md |
| Architectural decision | ADR | design.md, implementation, standing rules |
| Technical structure | design.md | tasks.md, implementation |
| Execution work | tasks.md | developer / agent |
| Current progress | TODO.md | human / agent navigation |
| Agent operating constraints | AGENTS.md / rules | agent |
| Verification evidence | verification artifact | status / release decision |
| *(domain/platform-specific standing rule, added by a derivative skill)* | *(that skill's own rule file)* | implementation |

This matrix is meant to grow: a derivative skill that adds platform-specific
standing rules (frontend architecture, hardware constraints, mobile
conventions, an API design standard, etc. — see
`references/extending-for-a-tech-stack.md`) should add its own row here
rather than inventing a parallel authority system. Whatever rows a project
ends up with, treat standing rules with the same authority weight as
`AGENTS.md` operating constraints — binding, not optional context — unless
the project explicitly says otherwise.

**Interpretation ≠ override.** A downstream artifact may interpret and
elaborate on its upstream source, but must never silently redefine it. A
`design.md` can explain *how* a requirement is satisfied; it cannot change
*what* the requirement is. If implementing a requirement reveals the
requirement itself needs to change, that change happens in the authoritative
artifact (`spec.md`, or further upstream in the PRD) — not by quietly
diverging in the downstream one.

## ADR vs. Standing Rules: precedence

ADRs and standing rules (whatever domain-specific rule files a project or a
derivative skill has added, plus general conventions) answer different
questions and rank differently when they disagree:

```text
ADR             → the architectural decision, and WHY it was made
Standing Rules  → the day-to-day operationalization of that decision, HOW to follow it
```

An ADR outranks a standing rule it relates to. If an ADR is accepted and a
standing rule conflicts with it:

```text
ADR accepted
    ↓
standing rule conflicts with it
    ↓
the standing rule MUST be updated to match the ADR
```

Never let an agent resolve this by inference (e.g. quietly following
whichever one it read most recently, or whichever "seems more specific").
Treat a standing rule that contradicts an accepted ADR as a stale rule that
needs a governance update, not as a legitimate alternative interpretation —
this is also the **Governance Duplication** anti-pattern's cousin: two
artifacts asserting different answers to the same operational question.

## Conflict Resolution Protocol

Artifacts will disagree eventually — a PRD says one thing, the spec says
another; an ADR and a design drift apart. An agent must never resolve this by
guessing (picking "the latest-looking file" or "whatever seems reasonable").
Follow this sequence:

1. **Detect** the conflict.
2. **Identify** which artifacts are affected.
3. **Identify authority** — check the Artifact Authority Matrix for which
   side should currently be the source of truth.
4. **Determine intent** — did the upstream intent actually change, or is the
   downstream artifact simply wrong/stale?
5. **Impact analysis** — see "Change Impact Analysis" below.
6. **Update the authoritative artifact** to reflect the resolved decision.
7. **Mark downstream artifacts as `STALE`** (see `lifecycle-and-gates.md`)
   rather than assuming they're still valid or silently rewriting them.
8. **Re-plan** if the change is significant enough to affect strategy.
9. **Re-verify** anything whose behavior could have changed.

**Hard rule:** an AI agent must not resolve a conflict by inference when the
conflict touches product behavior, architecture, security, data integrity, or
acceptance criteria. Surface it and stop (see `agent-enforcement.md` for the
full stop-condition list) rather than picking a side.

### Precedence order when rules genuinely conflict

When step 3 ("identify authority") doesn't resolve things cleanly — e.g. two
standing rules from different domains both seem to apply — fall back to this
precedence order, highest first:

```text
1. Architectural boundaries (module/service/layer boundaries already established)
2. Accepted ADRs
3. Standing engineering rules (whatever domain-specific rule files are in play)
4. Unit-specific design (this unit's design.md)
5. Implementation details
6. Organizational preference / convention
```

**Architectural correctness takes precedence over folder symmetry or
convenience.** Don't let "but that's how we organized the other units"
override an accepted ADR or an established architectural boundary.

## Artifact Dependency Graph & Downstream Invalidation

Dependencies, stated explicitly rather than left implicit:

```text
spec.md          depends on: PRD
plan.md          depends on: spec.md, applicable project constraints
ADR              depends on: the architectural question/decision context
design.md        depends on: spec.md, plan.md, accepted ADRs
tasks.md         depends on: design.md, spec.md
verification     depends on: tasks.md, design.md, spec.md (acceptance criteria)
```

When an upstream artifact changes, downstream artifacts don't automatically
become wrong, but they do need review. A useful default when `spec.md`
changes:

```text
plan          → REVIEW REQUIRED
ADR           → REVIEW REQUIRED (if it referenced the changed requirement)
design        → STALE
tasks         → STALE
verification  → RE-RUN REQUIRED
```

Not everything downstream is automatically invalid — but everything
downstream should acquire an *impact state* so nothing silently drifts out of
sync unnoticed.

## Change Impact Analysis

Classify changes by impact level so review effort stays proportional:

- **LOW** — copy/text changes, non-functional UI tweaks, documentation
  clarification. Minimal review.
- **MEDIUM** — component behavior, API payload shape, workflow detail,
  database query changes. Review the directly affected artifacts.
- **HIGH** — domain rule changes, state transitions, data model changes,
  security behavior, authorization, core algorithm changes. Review the full
  downstream chain; consider whether an ADR is now needed.
- **CRITICAL** — financial integrity, safety, security boundaries, data
  loss risk, compliance, irreversible migrations. Full downstream review,
  mandatory re-verification, and — for anything at this level — do not let
  an agent resolve ambiguity unilaterally; escalate (see
  `agent-enforcement.md`).

Higher impact → more review, more downstream re-validation, more
verification required before considering the change complete.

## Deviation Protocol

Real implementations sometimes diverge from what `design.md` specified.
Don't wave this away as "developer discretion" — classify it:

- **Intent-preserving deviation**: same behavior, same constraints, just a
  better/different implementation detail (e.g. swapped one internal
  repository implementation for another with identical semantics). This is
  fine — but update `design.md` if the change is worth future readers
  knowing about.
- **Intent-changing deviation**: different behavior, different state model,
  different security boundary, or anything that changes what the system
  actually does. This is **not** discretionary — it must go back through
  artifact governance (update `design.md`, potentially `spec.md`, potentially
  raise an ADR) before being considered acceptable.

## ADR Supersession Protocol

ADR lifecycle: `Proposed → Accepted → Superseded` (or `Rejected`).

Never delete a superseded ADR just because the decision changed — history
should stay navigable. When a new ADR replaces an old one, cross-link them:

```text
ADR-017
supersedes: ADR-003

ADR-003
superseded_by: ADR-017
status: Superseded
```

## Decision vs. Rule vs. Convention

Three things that look similar but govern differently:

- **Rule/convention** — a standing practice, e.g. "all inter-service calls
  use synchronous request/response, not fire-and-forget," or a naming
  convention like `create<X>Handler`/`update<X>Handler`. Lives in a
  project's (or a derivative skill's) own standing-rules file, not in an
  ADR.
- **Architectural decision** — *why* a rule or approach was chosen over
  alternatives, e.g. "we selected message-queue-based communication over
  direct synchronous calls between these two services." Lives in an ADR.
- **Unit-specific implementation decision** — a choice scoped to one
  unit, not a standing rule. Lives in that unit's `design.md`, unless
  it turns out to have cross-unit or long-term architectural weight, in
  which case it graduates to an ADR.

Keep these three distinct so none of them becomes a dumping ground for the
other two.

## Requirement Classification & Criticality

Not all requirements need the same kind of verification. Classify by type:
functional, non-functional, security, performance, data, integration, UX,
compliance, operational. The type suggests the verification strategy —
performance requirements need load tests, security requirements need
security verification, functional requirements need acceptance tests, UX
requirements need usability validation.

Separately, classify by **criticality** (`low` / `medium` / `high` /
`critical`, or `P0`–`P3` if the project prefers that scale). Keep this
distinct from *business priority* — a P1 business requirement is not
automatically safety-critical, and a safety-critical requirement isn't
automatically the top business priority. Conflating the two leads to either
under-reviewing dangerous changes or over-reviewing trivial ones.

## Risk Governance

Don't let every risk get dumped into one undifferentiated `risk.md`. Route
by where the risk was discovered and what kind it is:

```text
Risk discovered during research      → research.md / plan.md
Architectural risk                   → ADR
Implementation risk                  → design.md / plan.md
Execution blocker                    → TODO.md / tasks.md
Residual verification risk           → verification artifact
```

## Governance Versioning

If this skill's conventions are going to govern a repository over a long
lifetime, version the governance itself so old repositories aren't silently
declared "wrong" when the conventions evolve:

```text
.sdd/
├── constitution.md
├── governance.md
└── manifest.yaml
```

`manifest.yaml` (see `assets/templates/manifest.yaml`) records
`governance_version` and `profile` (e.g. `minimal` / `standard` / `full`) so
both humans and agents can tell which rules a given repository was built
under, without guessing.

### Migration Protocol

When governance conventions change (e.g. a new version starts recommending a
`verification.md` per unit that older repositories don't have):

- State the new **version**.
- State what's **required** for repositories moving to the new version.
- State what's explicitly **not required** — existing historical artifacts
  should not need to be rewritten just to comply retroactively.
- Preserve **backward compatibility** wherever the change isn't safety- or
  correctness-critical.

## SDD Health (optional reporting model)

For repositories that want a rollup signal, a simple health summary can be
useful — not as a hard gate, but as a dashboard-style indicator:

```text
SDD Health: 92%

Traceability coverage     98%
Verification coverage     91%
Stale artifacts            2
Unresolved decisions       1
Governance compliance     96%
```

Only introduce this if the project actually wants to track it over time —
it's a reporting aid, not a mandatory artifact.
