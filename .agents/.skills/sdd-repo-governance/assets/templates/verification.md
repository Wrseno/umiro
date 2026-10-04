# Verification — [Unit Name]

> Closes the loop from acceptance criteria to proof. `VERIFIED` means the
> implementation has been evaluated against the *approved* specification,
> every acceptance criterion is satisfied, AND evidence is recorded for
> each — not merely that a test suite passed. A criterion with no evidence
> (or evidence marked "TBD") must not be marked PASS, and the overall status
> must not be VERIFIED while any required criterion lacks evidence — that
> combination is "Gate Theater" (see anti-patterns in `decision-framework.md`)
> and `scripts/sdd-check.sh` treats it as a FAIL.

**Traces to:** `spec.md`, `design.md`, `tasks.md` (this unit)

**Verification Status:** DRAFT | IN PROGRESS | VERIFIED | FAILED

## Acceptance Criteria Results

| Acceptance Criterion | Test(s) | Evidence | Result |
|---|---|---|---|
| AC-001 | TEST-001 | [CI run / manual scenario / report] | PASS/FAIL |
| AC-002 | TEST-002 | | |

## Known Deviations

[Any intent-preserving deviations from design.md worth noting — see the
Deviation Protocol in governance-mechanics.md. "None" if there are none.]

## Residual Risks

[Anything not fully mitigated by verification. "None" if there are none.]
