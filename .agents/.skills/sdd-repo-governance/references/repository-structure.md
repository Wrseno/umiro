# SDD Repository Structure Reference

Full target structure for a mature SDD repository. Not every project needs
every folder on day one — see "Minimal vs full" below — but this is the
shape to grow toward, and the shape to check an existing repo against
during an audit.

This structure is deliberately domain/tech-stack-agnostic — it doesn't
assume web, mobile, desktop, firmware, or any other platform. A project's
platform-specific standing rules (frontend component architecture, hardware
constraints, mobile platform conventions, API design standards, and so on)
are an explicit extension point, not something this skill prescribes — see
`references/extending-for-a-tech-stack.md`.

### A note on "unit"

Throughout this skill, `specs/<unit>/` and "unit" (short for **unit of
work**) refer to whatever discrete, specifiable piece of work your project
organizes `spec.md`/`design.md`/`tasks.md` around. Call it whatever your
project already calls it — a **feature**, **module**, **service**,
**subsystem**, **capability**, **pipeline stage**, **migration**, or
anything else. Nothing in this skill requires product/UI framing: a
firmware subsystem, a library's new API surface, and an infrastructure
change all fit the same `spec → plan → design → tasks` chain equally well.
Pick one consistent term for the project (via `AGENTS.md` or
`.sdd/constitution/constitution.md`) so humans and agents aren't guessing
which word maps to `specs/<unit>/` on a given repository.

## Full tree

```text
project/
│
├── AGENTS.md                     # entry point for AI agents
├── TODO.md                       # project-level execution ledger
│
├── docs/
│   └── project/
│       ├── charter.md            # optional / reference — why the project exists
│       ├── prd.md                # optional / reference — what product should exist
│       └── pmp.md                # optional / reference — how the project is managed
│
├── product/
│   ├── vision.md                 # desired long-term product outcome
│   ├── capability-map.md         # capabilities/activities, however the project frames them
│   └── backlog.md                # prioritized product work (or a pointer to Jira/Linear)
│
├── .sdd/
│   ├── constitution/
│   │   └── constitution.md       # cross-project engineering principles
│   │
│   ├── context/
│   │   ├── product.md            # product knowledge
│   │   ├── domain.md             # domain knowledge
│   │   ├── glossary.md           # shared terminology
│   │   └── constraints.md        # standing technical/business constraints
│   │
│   ├── roadmap/
│   │   └── roadmap.md            # where the system is headed, broad sequence
│   │
│   ├── workflow/
│   │   └── sdd-workflow.md       # how the SDD lifecycle works in this repo
│   │
│   ├── templates/
│   │   ├── spec.md
│   │   ├── plan.md
│   │   ├── design.md
│   │   └── tasks.md
│   │
│   ├── governance.md              # how these conventions are versioned/changed
│   ├── manifest.yaml               # which governance version/profile this repo uses
│   │
│   └── traceability/
│       └── requirements.md       # optional — useful for complex/regulated work
│
├── specs/
│   ├── 001-<unit-name>/        # a feature, module, service, subsystem — see "A note on 'unit'" above
│   │   ├── spec.md
│   │   ├── plan.md               # optional — see artifact-guide.md
│   │   ├── design.md
│   │   ├── research.md           # optional
│   │   ├── verification.md       # optional — see traceability-and-verification.md
│   │   └── tasks.md
│   │
│   └── ...
│
└── decisions/
    ├── ADR-001.md
    ├── ADR-002.md
    └── ADR-003.md
```

A platform-specific derivative skill may add its own top-level folder (e.g.
a frontend skill's `design/`, a firmware skill's `hardware/`) and its own
optional per-unit artifacts (a UI skill's `ux.md`, a data-heavy domain's
`data-model.md`, an integration-heavy domain's `contracts/`) — that's
intentional and expected. This skill's own scaffold/check scripts don't
assume any of those exist.

## Minimal vs full

Don't scaffold everything by default — that produces empty, unmaintained
files (see the anti-patterns in `decision-framework.md`). Use this as a
starting question set:

- **Always create:** `AGENTS.md`, `TODO.md`, `.sdd/constitution/constitution.md`,
  `.sdd/context/` (at least `glossary.md` and `domain.md`), `specs/` (empty
  until first unit).
- **Create when the project has more than one contributor or is
  long-lived:** `.sdd/roadmap/`, `.sdd/workflow/`, `.sdd/templates/`,
  `product/`, `.sdd/governance.md`, `.sdd/manifest.yaml`.
- **Create when there's a real project-management upstream to reference:**
  `docs/project/`.
- **Create when an architectural decision actually needs recording:**
  `decisions/` (don't pre-create empty ADR files).
- **Create when regulatory/compliance traceability matters:**
  `.sdd/traceability/requirements.md`.

Profiles (see `scripts/scaffold.sh`) are a maturity scale, not a tech-stack
choice: `minimal` → `standard` → `full` tracks team size, how long-lived the
project is, and how much formal traceability it needs — not whether it has
a UI, what platform it targets, or what language it's written in. Whether
the project needs a derivative skill's own folders is a separate question,
answered by that derivative skill, not by this one.

A unit folder's baseline is `spec.md` + `design.md` + `tasks.md`.
Everything else (`plan.md`, `research.md`, `verification.md`, and anything a
derivative skill adds) is added only when the unit's complexity actually
calls for it.

## Document Responsibility Matrix

| Artifact | Scope | Main question it answers | Source of truth |
|---|---|---|---|
| Project Charter | Project | Why does the project exist? | PM |
| PRD | Product | What product should exist? | Product |
| PMP | Project governance | How is the project managed? | PM |
| Vision | Product | What long-term outcome is desired? | Product |
| Story Map | Product | How do users move through the product? | Product |
| Backlog | Delivery | What product work is prioritized? | Product/Agile |
| Sprint | Time-box | What is committed for this period? | Agile |
| Constitution | Engineering | What principles must engineering always follow? | SDD |
| Context | Engineering | What must the team/AI know about the system? | SDD |
| Roadmap | Project/Product | Where is the system headed? | Product/Engineering |
| `spec.md` | Unit | What must this unit do? | SDD |
| `research.md` | Unit | What must be understood before deciding? | SDD (evidence, not requirement) |
| `plan.md` | Unit | How will the work be approached? | SDD |
| ADR | Architecture | Why was this architecture decision made? | Architecture |
| `design.md` | Unit | What technical solution will be built? | Engineering |
| `tasks.md` | Unit | What concrete work must be performed? | SDD |
| `verification.md` | Unit | Was the spec actually satisfied, with evidence? | Engineering/Test |
| `TODO.md` | Repository | Where is execution right now? | Engineering |
| `AGENTS.md` | Agent | How should an AI agent operate here? | Repository governance |

A derivative skill's domain-specific standing rules (frontend architecture,
hardware constraints, mobile conventions, etc.) get their own row when that
skill is in use — see the Artifact Authority Matrix in
`governance-mechanics.md`, which this skill's core rows don't try to
anticipate.

## Core Boundary Rules

These are the rules to check first during an audit, and to enforce when
deciding where new content should live:

1. Product requirement ≠ engineering specification.
2. Specification ≠ design.
3. Plan ≠ tasks.
4. ADR ≠ generic decision log (don't record every small decision).
5. TODO ≠ backlog.
6. TODO ≠ tasks.md.
7. A derivative skill's domain-specific standing rules ≠ this skill's core
   artifact chain — a platform-specific skill should extend the chain
   (register its own Authority Matrix rows, respect the existing
   spec/design/plan/tasks boundaries) rather than duplicate or route around
   it.
8. AGENTS.md ≠ all documentation (it's an entry point, not a content dump).
9. PM docs ≠ SDD docs (PM docs are upstream references, not duplicated content).
10. Never create a duplicate source-of-truth for the same information.

## Recommended Decision Rules (quick lookup)

1. Project-wide engineering principle → `.sdd/constitution/constitution.md`.
2. Unit-specific behavior → `specs/<unit>/spec.md`.
3. Unit-specific solution → `specs/<unit>/design.md`.
4. Unit-specific work breakdown → `specs/<unit>/tasks.md`.
5. Long-lived architectural decision → `decisions/ADR-xxx.md`.
6. Domain/platform-specific standing rule (UI, hardware, mobile, etc.) → a
   derivative skill's own location — see
   `references/extending-for-a-tech-stack.md`.
7. Product planning → `product/`.
8. Project management docs → external PM system, or `docs/project/` if
   relevant and non-sensitive.
9. Current implementation state → `TODO.md`.
10. AI operating instructions → `AGENTS.md`.

## Naming model

Keep names generic and predictable so both humans and AI agents can guess
file locations without searching:

```text
Project-wide:    constitution.md, product.md, domain.md, glossary.md, roadmap.md
Unit:         spec.md, design.md, tasks.md, research.md (optional), verification.md (optional)
Architecture:    ADR-001.md, ADR-002.md, ...
Execution:       TODO.md
```

A derivative skill may add its own optional per-unit artifact names
(e.g. `ux.md`, `data-model.md`, `contracts/`) — keep them equally generic
and predictable within that skill's own domain.

## Systems that span more than one repository

This skill's scaffold and `sdd-check.sh` operate on one repository at a
time, but "the system" being governed doesn't have to be. A common shape:
firmware in one repo, a mobile app in another, a backend in a third — all
part of one product. Two ways to handle it, in order of preference:

1. **One repo holds the shared governance layer** (`.sdd/`, `decisions/`,
   cross-cutting `specs/` for system-wide behavior), and each
   platform-specific repo runs this skill's scaffold independently for its
   own `AGENTS.md`/`TODO.md`/local `specs/`, while its `design.md` files
   reference ADRs by ID from the shared repo's `decisions/` rather than
   duplicating them. The Artifact Authority Matrix still names one
   authoritative location per kind of knowledge — it just isn't always in
   the repo you're standing in.
2. **If there's no shared repo**, at minimum keep ADR numbering and status
   consistent across repos (e.g. a shared `decisions/` folder synced or
   submoduled into each), since architectural decisions are usually the
   thing that most needs to stay singular across a multi-repo system — see
   "Never create a duplicate source-of-truth" in the Core Boundary Rules
   above.

Either way, the rule doesn't change: a piece of knowledge still has exactly
one authoritative location, it's just not guaranteed to be in the same
repository you're currently working in.

## Dependency direction (why the layers are ordered this way)

```text
Charter / PRD / PMP
        ↓
Context / Constitution / Roadmap
        ↓
Backlog / User Story
        ↓
Sprint
        ↓
spec.md
        ↓
research.md (optional)
        ↓
plan.md
        ↓
ADR (when needed)
        ↓
design.md
        ↓
tasks.md
        ↓
implementation
        ↓
validation
        ↓
TODO.md update
```

`TODO.md` doesn't sit in this chain — it's a state/navigation layer that
observes and reports on where the chain currently is.
