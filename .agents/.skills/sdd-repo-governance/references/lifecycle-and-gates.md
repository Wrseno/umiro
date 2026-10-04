# Lifecycle & Quality Gates

A single canonical status model for specs/units, made checkable rather
than left as a vague description like "design is consistent with spec." Use
this alongside the pre-development and per-artifact gates in
`decision-framework.md` — this file is the more granular, state-machine
version for projects that want it.

## Two dimensions, not one: Lifecycle and Health

Don't collapse "where is this artifact in its life" and "is this artifact
currently trustworthy" into a single status field — they're independent and
both matter. An artifact can be far along its lifecycle and simultaneously
unhealthy (e.g. `DESIGNED` but `STALE` because the spec moved since), or
early in its lifecycle and perfectly healthy (`SPECIFIED` and `VALID`).

**Lifecycle** (progression toward completion, plus terminal exits):

```text
DRAFT → CLARIFYING → SPECIFIED → PLANNED → DESIGNED → READY →
IMPLEMENTING → VERIFYING → VERIFIED

Terminal exits: CANCELLED, SUPERSEDED
```

**Health / Impact** (orthogonal — can apply at any lifecycle stage):

```text
VALID              — nothing upstream has changed since last review
REVIEW_REQUIRED     — an upstream change may affect this; not yet reviewed
STALE               — confirmed out of sync with an upstream source
BLOCKED             — waiting on an external decision or dependency
```

So valid combinations include `DESIGNED + STALE`, `IMPLEMENTING + BLOCKED`,
`SPECIFIED + VALID`. The templates in `assets/templates/` carry both fields
separately (`Lifecycle:` and `Health:`) for exactly this reason — don't
merge them back into one field when filling them in.

Not every project needs to track every state formally — pick the subset
that matches the project's actual rigor. A solo prototype might just use
draft/implementing/done and skip Health entirely. A regulated multi-team
project benefits from tracking both dimensions precisely.

### Example transition conditions

`SPECIFIED → PLANNED` only when:
- the spec is approved,
- zero unresolved critical open questions remain,
- acceptance criteria are defined.

`→ DESIGNED` only when:
- required ADRs are resolved (Accepted or explicitly Not Required),
- the design is consistent with the spec,
- Health is `VALID` (not `STALE` or `BLOCKED`).

`→ VERIFIED` only when:
- all mandatory acceptance criteria are verified with evidence recorded (see
  "What VERIFIED actually means" below),
- there is no critical verification failure outstanding,
- Health is `VALID`.

## The STALE Health State

This is the piece that keeps a fast-moving repo honest. When `spec.md`
changes but `design.md` hasn't been reviewed since, `design.md`'s Lifecycle
stays wherever it was (still `DESIGNED`), but its Health becomes `STALE` — it's
not silently still trustworthy, and it's also not automatically wrong enough
to delete or revert.

```text
STALE → REVIEWED → VALID
   or
STALE → UPDATED → VALID
```

The value of this for an AI agent specifically: seeing `design.md` marked
`STALE` is a direct signal to **stop and check before continuing
implementation from it**, rather than trusting a document that looks
complete but is actually out of sync with its source of truth.

### Detecting staleness: revision numbers vs. modification time

Two ways to detect that a downstream artifact needs review, in order of
reliability:

**Revision-based (preferred when maintained).** Give the upstream artifact a
revision counter, and have the downstream artifact record which revision it
was last reviewed against:

```yaml
# in spec.md
Revision: 8

# in design.md
Reviewed against:
  spec_revision: 7
  adr_revisions:
    ADR-004: 3
```

If `spec.md`'s current revision (8) is higher than what `design.md` was
reviewed against (7), `design.md`'s Health is definitively `STALE` — this
isn't a heuristic, it's a direct comparison. Bump `Revision:` only on
material changes to the artifact (not typo fixes), and update
`Reviewed against:` whenever the downstream artifact is actually re-reviewed
against the new revision, even if nothing needed to change as a result.

**Modification-time heuristic (fallback).** If a project doesn't maintain
revision counters, `scripts/sdd-check.sh` falls back to comparing file
modification times — if `spec.md` was edited more recently than `design.md`,
it's flagged as *possibly* stale. This is strictly a heuristic: it can't
distinguish a material spec change from a typo fix, and it breaks under
things like a bulk reformat or a checkout that resets mtimes. Prefer the
revision-based approach for anything where staleness detection actually
matters.

## Making Gates Machine-Checkable

Turn "design is consistent with spec" into something a script — or an
agent following a checklist — can actually evaluate. This doesn't require
real YAML/CI tooling to be useful; stating gates in this conditional form is
valuable even when checked manually.

```text
gate: design-ready
requires:
  - spec.lifecycle == "SPECIFIED"
  - spec.health == "VALID"
  - unresolved_critical_questions == 0
  - applicable_adrs.status in ["ACCEPTED", "NOT_REQUIRED"]
  - design.traces_to_spec == true
  - no_blocking_conflicts == true
```

```text
gate: implementation-ready
requires:
  - spec.lifecycle == "SPECIFIED"
  - plan.lifecycle == "PLANNED"
  - design.lifecycle == "DESIGNED"
  - design.health == "VALID"
  - tasks.complete == true
  - unresolved_decisions == 0
```

```text
gate: verification-ready
requires:
  - implementation.lifecycle == "IMPLEMENTED"
  - acceptance_criteria.coverage == 100%
  - critical_tests.passed == true
  - verification.evidence_recorded == true
```

**Be precise about what's actually checked vs. only documented.** It's easy
for a governance model to describe more enforcement than a script actually
performs — that gap is itself an anti-pattern (see "Gate Theater" in
`decision-framework.md`). See
`references/enforcement-classification.md` for the current honest mapping
of which of these conditions `scripts/sdd-check.sh` actually evaluates
today versus which are documented expectations still requiring human or
agent judgment.

## What `VERIFIED` Actually Means

`VERIFIED` is not just "tests passed." Tests passing is necessary but not
sufficient. The full definition:

```text
VERIFIED =
    implementation evaluated against the approved specification
    + acceptance criteria satisfied
    + verification evidence recorded
```

A green test suite with no mapping back to acceptance criteria, or a status
of `VERIFIED` next to an evidence field that just says "TBD," is not
verification — it's the **Gate Theater** anti-pattern. Don't let `VERIFIED`
get written until there's something an auditor could actually check.

```text
Gate → Evidence → Result
```

```text
Requirement: FR-012

Acceptance Criteria: AC-01, AC-02, AC-03
Verification: TEST-021, TEST-022, TEST-023
Evidence: CI run #123, manual scenario #7, screenshot/report
Result: PASS
```

See `assets/templates/verification.md` for a per-unit template that
captures this, and `scripts/sdd-check.sh`, which flags a verification
artifact claiming `VERIFIED` status with empty or `TBD` evidence as a
failure rather than letting it pass silently.
