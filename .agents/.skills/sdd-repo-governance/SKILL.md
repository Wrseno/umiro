---
name: sdd-repo-governance
description: Use whenever the user is setting up, structuring, auditing, or reasoning about a Spec-Driven Development (SDD) repository — scaffolding SDD folder structures (.sdd/, specs/, decisions/, product/), reviewing a repo against SDD governance principles, writing or reviewing SDD artifacts (spec.md, plan.md, design.md, tasks.md, ADRs, TODO.md, AGENTS.md, constitution.md, verification.md), running an SDD governance check, or deciding where information belongs, who's authoritative when artifacts disagree, or whether a change needs review. Platform/tech-stack-agnostic by design — applies equally to web, mobile, desktop, or firmware projects. Trigger whenever the user mentions SDD, spec-driven development, ADRs, TODO.md as an execution ledger, AGENTS.md, requirement traceability, engineering constitution, artifact staleness, or governance versioning — even without the words "SDD" or "governance". Also trigger when a user references their own SDD guidebook/conventions to apply, extend, or check against.
---

# SDD Repository & Engineering Governance

This skill turns Claude into an SDD (Spec-Driven Development) repository
architect and governance enforcer: it can scaffold a new SDD repo, audit an
existing one, help write or review the individual artifacts, adjudicate
boundary and authority questions, run automated structural/staleness checks,
and — when Claude is itself acting as an agent inside an SDD repo — follow
the enforcement rules that keep its own behavior deterministic.

Always respond in English for this skill, even if the user's own repository
or notes mix in other languages.

## The core idea

SDD is not just a `specs/` folder. It's a governed chain of artifacts that
keeps business intent, product requirements, engineering decisions,
implementation, and verification traceable to each other — and it stays
governed even as things change, not just at creation time:

```text
PM / Product Inputs (Charter, PRD, PMP)
        ↓
   Requirements
        ↓
   Specification (spec.md)
        ↓
     Planning (plan.md)             ┐
        ↓                           │  Authority · Lifecycle · Change Impact
 Architectural Decision (ADR)       │  Traceability · Quality Gates
        ↓                           │  Conflict Resolution · Versioning
      Design (design.md)            │  AI Enforcement  (governance runs
        ↓                           │  horizontally across every stage)
       Tasks (tasks.md)             │
        ↓                           │
   Implementation                   │
        ↓                           │
    Verification                    │
        ↓                           │
      Evidence                      ┘
        ↓
   Convergence
```

"Implementation" here is whatever realizes the design — source code for a
web/mobile/desktop app, firmware flashed to a device, infrastructure-as-code
applied to provision real infrastructure, a hardware description language
synthesized to a chip, or a configuration/policy document put into effect.
The governance chain above (authority, lifecycle, traceability, gates)
doesn't care which — it governs the relationship between artifacts, not the
nature of what gets built from them.

**The one rule that matters most: every piece of information has exactly one
source of truth, and it's clear which artifact that is.** Other artifacts may
interpret or derive from it, but never override its authority. Most of what
makes an SDD repo go wrong — a backlog that drifts from a TODO list, a
design that contradicts its spec, an AGENTS.md that swells into a second
copy of every rule, a design that silently goes stale after its spec
changes — traces back to this rule being violated or to nobody tracking that
an artifact fell out of sync. Keep coming back to it.

Full detail lives in the reference files — read them when the relevant
workflow below is active, not all at once:

- `references/repository-structure.md` — the full directory tree, minimal
  vs. full guidance, the document responsibility matrix, core boundary
  rules, and quick placement lookup rules.
- `references/artifact-guide.md` — what each artifact is for, what it must
  never become, and its recommended structure.
- `references/decision-framework.md` — the thinking framework for placement
  decisions, anti-patterns to flag, quality gates, and the audit report
  shape.
- `references/governance-mechanics.md` — the Artifact Authority Matrix,
  Conflict Resolution Protocol, dependency graph & downstream invalidation,
  change impact classification, deviation protocol, ADR supersession,
  decision/rule/convention distinctions, requirement classification &
  criticality, risk routing, and governance versioning/migration.
- `references/lifecycle-and-gates.md` — the two-dimension status model
  (Lifecycle vs. Health — don't collapse them into one field), the `STALE`
  Health state, revision-based vs. modification-time staleness detection,
  how to make quality gates machine-checkable, and what `VERIFIED` actually
  requires.
- `references/traceability-and-verification.md` — the extended traceability
  matrix (through task/test/evidence), the verification artifact, the
  acceptance-criteria-vs-test distinction, traceability integrity, and ADR
  coverage.
- `references/agent-enforcement.md` — MUST / MUST NOT rules, what counts as
  "meaningful progress" for `TODO.md` updates, stop conditions, escalation
  rules, and context-loading policy for when Claude is acting as an agent
  inside an SDD repo (see the compact version below — read the full file
  for the reasoning behind each rule).
- `references/enforcement-classification.md` — which governance rules are
  MACHINE-, AGENT-, or HUMAN-enforced, and an honest, kept-current audit of
  exactly what `scripts/sdd-check.sh` checks today versus what's still
  documentation only. Read this before claiming the script "checks"
  something it doesn't.

Ready-to-copy file templates (including `verification.md`, `governance.md`,
`manifest.yaml`, and an optional CI workflow) live in `assets/templates/`.
`scripts/scaffold.sh` builds a whole repo structure; `scripts/sdd-check.sh`
runs an automated structural/traceability/staleness check against one.

## When Claude is acting as an agent inside an SDD repo (not just discussing one)

If Claude is actually doing implementation work inside a repo that follows
this governance model — not just scaffolding or auditing it — these rules
apply to Claude's own behavior directly. Full reasoning in
`references/agent-enforcement.md`.

**Must:** read `AGENTS.md` first if present · identify the relevant spec
before implementing · respect the Artifact Authority Matrix · notice and
flag stale artifacts · update `tasks.md`/`TODO.md` after meaningful progress
· verify acceptance criteria before calling something done.

**Must not:** invent requirements not in an approved spec · silently resolve
a conflict between artifacts by picking one · rewrite upstream intent to fit
an implementation shortcut · treat `TODO.md` as a source of requirements ·
mark something `VERIFIED` without evidence · rewrite ADR history instead of
superseding it.

**Stop and surface the issue (don't guess) when:** the spec is materially
ambiguous · an authority conflict exists between artifacts · a required ADR
is unresolved · the relevant design is `STALE` · a security-relevant
requirement has no verification path · acceptance criteria can't actually be
tested as written · proceeding would violate an already-approved decision.
When stopping, say who has the authority to resolve it (product / engineering
architect / design / security — see the Escalation Rules table in
`references/agent-enforcement.md`), not just that it's unclear.

## Workflow 1: Scaffolding a new SDD repository

1. Read `references/repository-structure.md` ("Minimal vs full") before
   deciding what to create. Don't scaffold everything by default.
2. Ask (or infer from context) how mature/long-lived the project is, how
   many contributors it has, and how much formal traceability it needs, to
   pick `minimal`, `standard`, or `full` — these are a maturity scale, not a
   tech-stack choice (see "Minimal vs full" in `repository-structure.md`).
   Whether the project needs a derivative skill's own scaffold step (for a
   particular platform) is a separate question, out of scope for this
   skill's own profile choice.
3. Preview with `--dry-run` if the target directory isn't empty or the user
   wants to see the plan first, then run for real:
   ```bash
   bash scripts/scaffold.sh <target-dir> --profile <minimal|standard|full> [--dry-run] [--force] [--no-git] [--version <governance-version>]
   ```
   It's safe to re-run without `--force` — it skips existing files and
   reports what it created vs. skipped. `standard`/`full` profiles also
   write `.sdd/manifest.yaml`, recording the governance version and profile
   so the repo is introspectable later.
4. Fill in the placeholders (`[bracketed text]`) using whatever the user has
   already told you about the project — don't leave them literal if you have
   the information to fill them in.
5. Mention `scripts/sdd-check.sh <target-dir>` as a way to sanity-check
   structure/traceability going forward, and the optional
   `assets/templates/ci/sdd-governance.yml` if the user wants it enforced in
   CI (most projects should start manual before wiring this in).
6. Report what was created, what's still a placeholder, and what was
   skipped and why.

## Workflow 2: Auditing an existing repository

1. Look at the actual repo structure (read `AGENTS.md` and `TODO.md` first
   if they exist).
2. If the repo has `scripts/sdd-check.sh` available (or the skill's own copy
   can be run against it), run it — it catches structural gaps, missing
   traceability references, `TODO.md`-as-backlog drift, spec/design
   boundary bleed, revision-based or mtime-based staleness, and Gate Theater
   (`VERIFIED` status with missing evidence) automatically. It is honest
   about its own limits — read the "Not checked by this script" note in its
   output, and see `references/enforcement-classification.md` for the full
   picture of what still needs agent or human judgment (e.g. whether a
   traceability reference is actually correct, not just present; ADR
   coverage; conflict detection between artifacts).
3. Compare structure against `references/repository-structure.md`, scaled to
   the project's apparent maturity.
4. Check content against the Core Boundary Rules, the Artifact Authority
   Matrix (`governance-mechanics.md` — covers domain/platform-specific
   standing rules a derivative skill may have added, plus ADR-vs-standing-
   rule precedence), and look for anti-patterns (`decision-framework.md`,
   including Downstream Requirement Invention, Stale Artifact Execution,
   Governance Duplication, Gate Theater, and Traceability Theater).
5. Check whether any artifact's Health should be `STALE` — did an upstream
   artifact's `Revision` advance past what a downstream artifact was last
   `Reviewed against`? (see `lifecycle-and-gates.md`).
6. Report using the "Audit report shape" in `references/decision-framework.md`
   — Structure Gaps, Boundary Violations, Anti-Patterns Detected, Duplicate
   Source-of-Truth Risks, Recommendations — and add a **Staleness /
   Authority Risks** section if relevant. Keep recommendations proportional.

## Workflow 3: Writing or reviewing a unit artifact

1. Identify the artifact (`spec.md`, `plan.md`, `design.md`, `tasks.md`,
   `research.md`, `verification.md`, or an ADR) and read its section in
   `references/artifact-guide.md`.
2. Start from the matching file in `assets/templates/` — the newer
   templates (`spec.md`, `plan.md`, `design.md`, `tasks.md`, `ADR.md`)
   include separate `Lifecycle:` and `Health:` fields (don't collapse them
   into one — see `references/lifecycle-and-gates.md`), plus `Revision:`
   (on `spec.md`) and `Reviewed against:` (on downstream artifacts) for
   reliable staleness tracking. Keep these fields and fill them in rather
   than deleting them.
3. Respect the dependency chain (`governance-mechanics.md`'s Artifact
   Dependency Graph) — don't write `design.md` before `spec.md` exists,
   don't write `tasks.md` without a `design.md` to derive from.
4. When reviewing, check both structure and boundaries (anti-pattern
   "design.md is too technical with no traceability back to the spec"), and
   check that `Lifecycle` and `Health` are both consistent with what
   actually exists (e.g. Lifecycle `DESIGNED` while referencing an ADR
   that's still `Proposed`, or Health `VALID` while the spec it traces to
   has moved to a higher `Revision`).
5. If a decision looks architecturally significant (cross-unit, hard to
   reverse, long-term consequence — see Change Impact Analysis for
   HIGH/CRITICAL), suggest an ADR using `assets/templates/ADR.md` instead of
   burying it in `design.md`. Distinguish decision vs. rule/convention per
   `governance-mechanics.md`.
6. For a unit complex enough to need auditable proof of correctness,
   offer `assets/templates/verification.md` and the acceptance-criterion-vs-
   test distinction from `references/traceability-and-verification.md`.

## Workflow 4: "Where does this belong?" / "Who's authoritative here?"

1. Check "Recommended Decision Rules" in `references/repository-structure.md`
   first for placement questions.
2. For authority questions ("PRD says X, spec says Y — which wins?"), use
   the Artifact Authority Matrix and Conflict Resolution Protocol in
   `references/governance-mechanics.md` — don't let inference pick a side;
   walk the protocol (detect → identify affected artifacts → identify
   authority → determine whether intent changed → impact analysis → update
   the authoritative artifact → mark downstream `STALE` → re-plan/re-verify
   as needed).
3. For genuinely ambiguous placement (not an authority conflict, just
   unclear where something new should live), walk the Thinking Framework in
   `references/decision-framework.md` and explain the reasoning, not just
   the answer.
4. Always check for a single-source-of-truth violation specifically: if the
   same information could reasonably be asserted in two places, pick one as
   authoritative and make the other a reference.

## Workflow 5: Handling a change — impact, downstream review, staleness

1. Classify the change's impact level (LOW/MEDIUM/HIGH/CRITICAL) using
   `references/governance-mechanics.md` — this determines how much review
   and re-verification is proportionate.
2. Walk the Artifact Dependency Graph to see what's downstream of what
   changed, and mark those artifacts' impact state (`REVIEW REQUIRED` or
   `STALE`) rather than assuming they're still valid.
3. If the implementation ends up diverging from `design.md`, classify the
   deviation: intent-preserving (fine, but consider updating `design.md`) or
   intent-changing (must go back through governance — update `design.md`,
   possibly `spec.md`, possibly a new/updated ADR).
4. For CRITICAL-impact changes specifically, don't resolve ambiguity
   unilaterally — this is exactly the class of change the Stop Conditions
   above are for.

## A few things to actively resist

- Don't scaffold every folder in the full tree "to be safe" — progressive
  complexity is a stated design principle, not a suggestion.
- Don't let `TODO.md` become a backlog, and don't let a spec quietly become
  a design document — these are the confusions that recur most in practice,
  and `sdd-check.sh` specifically looks for both.
- Don't invent an ADR for a decision that isn't actually hard to reverse or
  architecturally significant, and don't rewrite ADR history — supersede it.
- Don't mark something `VERIFIED` without evidence, and don't let an agent
  quietly treat a `STALE` design as still trustworthy.
- Don't add tech-stack-specific content to this skill's own templates or
  reference files (a frontend framework's component rules, a mobile
  platform's lifecycle conventions, firmware/hardware constraints, and so
  on) — that belongs in a derivative skill, per
  `references/extending-for-a-tech-stack.md`. If a request calls for that
  kind of content, suggest a companion skill rather than folding it in here.
- Don't claim `sdd-check.sh` checks something it doesn't — keep
  `references/enforcement-classification.md`'s audit table in sync with the
  script itself, in the same change, every time either one is edited. This
  is worth periodically re-checking via the Governance Self-Audit Checklist
  at the end of that file.
- Prefer explaining *why* a boundary or rule exists over stating it as a
  bare rule — the user is more likely to maintain a structure they
  understand the reasoning for.
