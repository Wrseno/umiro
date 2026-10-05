# Extending This Skill for a Specific Tech Stack

This skill is deliberately scoped to **how SDD works as a methodology** —
the artifact chain, authority model, lifecycle, traceability, and gates —
independent of what's being built with it. It should work the same way for
a web app, a mobile app, a desktop app, or firmware, because none of its
governance mechanics reference a language, framework, or platform.

Anything that *is* tech-stack-specific — frontend component architecture,
a mobile platform's conventions, firmware/hardware constraints, an API
design standard, a particular framework's own idioms — belongs in a
**separate, derivative skill** that assumes this one is already in place,
not inside this skill. If Claude is asked to add that kind of content
directly to this skill's templates or reference files, the right move is to
suggest a companion skill instead (see "Suggested naming" below) and keep
this skill's own files tech-agnostic.

## Why this split, concretely

- `spec.md` already can't mention technology (see `artifact-guide.md`) —
  splitting tech-stack rules into their own skill is the same principle
  applied one level up, to the skill itself.
- A team building firmware shouldn't carry web-specific folders and
  templates they'll never use, and vice versa. Keeping this skill's
  scaffold/check scripts platform-agnostic means every domain gets the same
  lean, relevant baseline.
- The governance mechanics (Authority Matrix, Conflict Resolution Protocol,
  lifecycle/Health model, traceability, gates) are reusable exactly because
  they don't encode any assumption about what's being governed. A derivative
  skill should lean on that instead of re-inventing its own version of it.

## What a derivative skill should do

1. **Assume this skill's scaffold already ran.** A derivative skill doesn't
   re-create `AGENTS.md`, `TODO.md`, `.sdd/`, `specs/`, or `decisions/` — it
   adds to a repository this skill already structured, typically via its own
   scaffold step invoked after `scripts/scaffold.sh`.
2. **Add its own standing-rules location**, named for its own domain —
   `design/` for a frontend skill, `hardware/` for a firmware skill,
   `mobile/` for a mobile skill, `api/` for an API-design skill, whatever
   fits. This skill doesn't reserve or prescribe a name for that location.
3. **Register new rows in the Artifact Authority Matrix**
   (`governance-mechanics.md`) for whatever standing rules it adds, rather
   than inventing a parallel authority system. The matrix is meant to grow.
4. **Respect the existing spec/plan/design/tasks boundaries.**
   Platform-specific detail lives in `design.md` (or a derivative skill's
   own design-adjacent file), never in `spec.md` — `spec.md`'s job (what the
   unit must do) doesn't change just because the platform did.
5. **Extend, don't fork, the lifecycle/Health/gate model.** A derivative
   skill's artifacts should use the same `Lifecycle:`/`Health:` fields and
   canonical values from `lifecycle-and-gates.md` rather than defining a
   second status vocabulary.
6. **Add its own check script rather than editing `sdd-check.sh` in place**,
   where practical — e.g. `scripts/<domain>-check.sh` that a project runs
   alongside this skill's own check. If it genuinely needs to extend
   `sdd-check.sh` itself, it must keep
   `references/enforcement-classification.md`'s audit table honest for
   whatever it adds — see the Governance Self-Audit checklist at the end of
   that file.
7. **Not duplicate the anti-patterns, MUST/MUST NOT rules, or stop
   conditions already defined here** — a derivative skill's own rules should
   be additions specific to its domain (e.g. a mobile skill might add "don't
   block the main thread in a lifecycle callback"), not a restatement of
   "don't let TODO.md become a backlog."

## Suggested naming

So Claude (and a person skimming available skills) can tell at a glance
which skill owns what: `sdd-<domain>`, e.g. `sdd-frontend-web`,
`sdd-mobile`, `sdd-firmware`, `sdd-desktop`, `sdd-api-design`. Not required,
but keeps the relationship to this skill obvious.

## What belongs here vs. in a derivative skill — quick test

Check a candidate rule against **two** reference projects, not one — a
single comparison tends to only catch platform bias, not product-shape
bias:

1. **A firmware project with no UI at all.** Catches rules that quietly
   assume a visual interface exists.
2. **An infrastructure/ops repository with no "features" in the product
   sense** — its units of work are things like "migrate the database
   cluster" or "rotate the TLS certificates." Catches rules that assume a
   product/user-facing framing (end users, a backlog of user stories, a
   product vision) even when they don't mention any particular platform.

If a rule holds up verbatim for both, it belongs in this skill. If it only
makes sense for one kind of platform *or* one kind of product shape, it
belongs in a derivative skill instead — even if the current project happens
to be a consumer web app and the rule feels obviously true for it. A rule
that fails test 2 specifically (e.g. anything that assumes "users," a
backlog, or a product vision are mandatory) is usually fixable by rephrasing
it as optional/example framing rather than a requirement — see how
`repository-structure.md`'s "Minimal vs full" section treats `product/` as
created only "when relevant," not assumed.
