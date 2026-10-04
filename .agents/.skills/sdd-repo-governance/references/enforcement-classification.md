# Enforcement Classification & Honest Audit

Two purposes: (1) classify every governance rule by *who* actually enforces
it, so the limits of automation are visible rather than implied; (2) keep an
honest, current record of what `scripts/sdd-check.sh` actually checks versus
what's only documented — so this skill never claims enforcement it doesn't
perform.

## Enforcement Classification

Every governance rule in this skill falls into one of three buckets:

- **MACHINE-ENFORCED** — a script can check this deterministically from file
  contents/structure alone (e.g. "does `spec.md` exist," "does `design.md`
  contain a Traces-to reference").
- **AGENT-ENFORCED** — not scriptable in general, but an agent following
  `agent-enforcement.md` can and should check it as part of normal work
  (e.g. "is this deviation intent-preserving or intent-changing").
- **HUMAN-REVIEW** — requires judgment a script or a general-purpose agent
  shouldn't make unilaterally (e.g. "is this architecture decision actually
  correct," "does this PRD change reflect real product intent").

Examples:

| Rule | Classification |
|---|---|
| Required artifact exists | MACHINE |
| Status/Health fields present and well-formed | MACHINE |
| `Traces to` reference present | MACHINE |
| Revision-based staleness (when revision fields are maintained) | MACHINE |
| Modification-time staleness heuristic | MACHINE (heuristic, not definitive) |
| Gate Theater detection (`VERIFIED` + empty/TBD evidence) | MACHINE |
| Traceability target actually exists and is a valid link | AGENT |
| Deviation is intent-preserving vs. intent-changing | AGENT |
| Whether an architectural decision is *correct*, not just recorded | HUMAN |
| Whether a requirement is ambiguous enough to need clarification | AGENT, escalate to HUMAN if genuinely unclear |
| Conflict resolution when authority is genuinely unclear | HUMAN (product/architecture/design/security per `agent-enforcement.md`) |

Don't present an AGENT- or HUMAN-level rule as if a script checks it. If a
governance document says something is "checked," it should be checked by
`sdd-check.sh` or it should say "checked by the agent, not the script."

## Audit: what `sdd-check.sh` actually checks today

This table is the source of truth for what's real automation versus what's
still documentation only. Keep it in sync with the script — when the script
changes, update this table in the same change.

| Rule | Documented | Machine-checked by `sdd-check.sh` |
|---|---|---|
| Required root structure (`AGENTS.md`, `TODO.md`, `constitution.md`) | ✓ | ✓ |
| `spec.md` present per unit | ✓ | ✓ |
| `design.md` / `tasks.md` present when expected | ✓ | ✓ |
| `Traces to` reference present in `design.md`/`tasks.md` | ✓ | ✓ |
| `spec.md` absorbing design content (schema/API language) | ✓ | ✓ (heuristic keyword match) |
| `spec.md` absorbing a task checklist | ✓ | ✓ |
| `TODO.md` looking like a second backlog (checklist volume) | ✓ | ✓ (heuristic — item count) |
| ADR has a `Status:` field | ✓ | ✓ |
| Staleness via modification time | ✓ | ✓ (heuristic) |
| Staleness via revision numbers | ✓ | ✓ (when `Revision:`/`Reviewed against:` fields present; falls back to mtime otherwise) |
| Gate Theater (`VERIFIED` status with empty/TBD evidence) | ✓ | ✓ |
| Gate prerequisites (e.g. `design-ready` full condition set) | ✓ | ✗ — documented as a target shape, not evaluated end-to-end |
| ADR validity (referenced ADR actually exists and is Accepted) | ✓ | ✗ |
| Conflict detection between artifacts (e.g. PRD vs. spec) | ✓ | ✗ — requires semantic comparison, not currently scripted |
| Traceability integrity (a `traces_to: FR-001` target genuinely exists and is satisfied) | ✓ | ✗ — script checks the reference is *present*, not that it's *valid or fulfilled* |
| Architecture Decision Coverage (every accepted ADR referenced downstream where relevant) | ✓ | ✗ |
| Acceptance criteria coverage percentage | ✓ | ✗ |

Items marked ✗ are real gaps, not aspirational hand-waving — when auditing a
repository or reporting `sdd-check.sh` results, say so plainly rather than
implying the script caught something it didn't. These are exactly the kind
of checks to point out as still needing agent judgment or human review.

## Governance Health Report (reporting shape)

When summarizing an audit, this shape keeps machine-checked and
judgment-based findings visibly separate rather than blending them into one
undifferentiated score:

```text
SDD Governance Health
├── Structure          [machine-checked]
├── Metadata            [machine-checked]
├── Authority           [documented / agent-enforced]
├── Traceability         [machine-checked: reference present · agent-checked: reference valid]
├── Lifecycle            [machine-checked: fields well-formed · agent-checked: transitions valid]
├── Staleness            [machine-checked: revision or mtime heuristic]
├── Gate Compliance      [partially machine-checked — see audit matrix above]
├── Enforcement          [this classification itself]
└── Evidence             [machine-checked: Gate Theater · human-checked: evidence quality]
```

Use `SDD Health: NN%` only as a rough, optional dashboard signal if a
project wants to track it over time (see "SDD Health" in
`governance-mechanics.md`) — don't present it as a precise or fully
automated score given the gaps above.

## Governance Self-Audit Checklist

Periodically — or whenever this skill itself is extended — check:

- Is every rule that's described as machine-checkable actually checked by
  `sdd-check.sh`, or has the audit matrix above been updated to say it
  isn't yet?
- Is every authority relationship stated explicitly (in the Artifact
  Authority Matrix), or is something being resolved by unstated convention?
- Are there two artifacts defining the same rule (Governance Duplication —
  see `decision-framework.md`)?
- Are stale artifacts actually detectable given what the templates
  currently capture (Status/Health/Revision fields), or has a new artifact
  type been added without them?
- Are gates that claim to be machine-checkable actually evaluated
  end-to-end, or only partially (per the audit matrix)?
- Are human-required decisions clearly marked as such, rather than implied
  to be agent- or machine-resolvable?
