# Traceability & Verification

Extends the basic traceability model in `repository-structure.md` with
task/test/evidence coverage, and defines the verification artifact that
closes the loop from requirement to proof.

## Extended Traceability Matrix

The basic model traces `Source → Requirement → Spec → Design → ADR →
Validation`. For projects that need audit-grade traceability, extend it to
cover the full chain including task and test:

| Source | Requirement | Spec | Plan | ADR | Design | Task | Test | Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|
| PRD-12 | FR-03 | SPEC-03 | PLAN-02 | ADR-07 | DESIGN-04 | T-21 | TEST-08 | CI-44 | Verified |

This makes the full chain explicit:

```text
Intent → Requirement → Behavior → Strategy → Decision →
Technical Design → Execution → Verification → Evidence
```

Only build this out to full rigor when the project actually needs
audit-grade traceability (regulated domains, safety-critical systems,
multi-team coordination). For a small project, the lighter version in
`repository-structure.md` is enough — don't impose the full matrix as
ceremony where it isn't earning its cost.

## Acceptance Criteria vs. Test

These get conflated often enough to be worth stating precisely:

- **Acceptance criterion** = *what must be true.*
- **Test** = *how we demonstrate it's true.*

```text
Acceptance Criterion:
System must prevent duplicate execution finalization.

Test:
Submit finalize request twice concurrently.
Expected: exactly one succeeds; the second fails safely.
```

Chain: `spec.md → Acceptance Criteria → Verification Strategy → Test`.

## Verification Artifact

Optional, but recommended once a unit is complex enough that "we tested
it" needs to mean something specific. Either as a file per unit or a
small folder:

```text
specs/<unit>/
├── spec.md
├── plan.md
├── design.md
├── tasks.md
└── verification.md
```

or, for units with many test artifacts:

```text
specs/<unit>/
└── validation/
```

Minimum content (template in `assets/templates/verification.md`):
- Verification status
- Acceptance criteria, each with a pass/fail result
- Test mapping (which test(s) cover which criterion)
- Evidence (CI run, manual scenario, report)
- Known deviations
- Residual risks

```text
Verification Status: VERIFIED

AC-001  PASS
AC-002  PASS
AC-003  PASS

Known deviation: None
Residual risk: None
```

This is what actually connects SDD to testing — without it, "verified" is
just a claim rather than something an auditor (human or agent) can check.

## Traceability Integrity

A `traces_to:` reference being present is not the same as it being correct.
`scripts/sdd-check.sh` checks presence (there is a "Traces to" line) — it
does not currently verify that the target actually exists as a real
requirement/artifact, or that the relationship is substantive rather than
decorative (see "Traceability Theater" in `decision-framework.md`). Treat
this as AGENT/HUMAN-checked, not machine-checked (see
`references/enforcement-classification.md`): when reviewing traceability,
actually open the referenced artifact and confirm the reference holds up,
rather than trusting that its presence means it's correct.

## Architecture Decision Coverage

For an ADR with `Status: Accepted`, check whether it's actually referenced
downstream (in the `design.md` of units it should affect). An accepted
ADR that nothing downstream ever cites is either dead — surface it as a
candidate to reconsider — or a sign that a design that *should* reference it
doesn't, which is its own traceability gap worth flagging. This is currently
AGENT/HUMAN-checked during an audit, not something `sdd-check.sh` verifies
automatically (see the audit matrix in
`references/enforcement-classification.md`).
