#!/usr/bin/env bash
# Scaffold an SDD repository structure into a target directory.
#
# Usage:
#   scaffold.sh <target-dir> [minimal|standard|full] [options]
#   scaffold.sh <target-dir> --profile standard [options]
#
# Profiles (same as the old positional "level" argument, kept for backward
# compatibility — pass it positionally or via --profile, not both):
#   minimal  — AGENTS.md, TODO.md, constitution, glossary/domain context,
#              empty specs/ and decisions/. Good for a small or early-stage
#              project.
#   standard — minimal + roadmap, workflow, .sdd/templates, product/,
#              full .sdd/context/, governance.md, manifest.yaml. Good
#              default for most real, ongoing projects.
#   full     — standard + docs/project/ and .sdd/traceability/requirements.md.
#              Use when there's a real PM upstream worth referencing in-repo,
#              or regulatory/compliance-grade traceability matters.
#
# Profiles track SDD governance maturity (team size, how long-lived the
# project is, how much formal traceability it needs) — not tech stack or
# platform. A project's platform-specific folders/templates (frontend,
# mobile, firmware, etc.) are added by a derivative skill's own scaffold
# step, run after this one — see references/extending-for-a-tech-stack.md.
#
# Options:
#   --profile <name>       minimal|standard|full (default: standard)
#   --dry-run              print what would be created; touch nothing
#   --force                overwrite existing files instead of skipping them
#   --no-git               skip `git init` even if target isn't a git repo
#   --version <string>     governance_version written into manifest.yaml
#                          (default: "1.0")
#   -h, --help              show this help and exit
#
# The script never overwrites an existing file unless --force is passed —
# by default it skips anything already present and reports what it skipped,
# so it's safe to re-run against a partially-set-up repo.

set -uo pipefail

usage() {
  sed -n '2,37p' "$0" | sed 's/^# \{0,1\}//'
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

TARGET_DIR="${1:?Usage: scaffold.sh <target-dir> [minimal|standard|full] [options] (see --help)}"
shift

PROFILE="standard"
DRY_RUN=0
FORCE=0
NO_GIT=0
GOVERNANCE_VERSION="1.0"

# Backward-compatible positional profile: if the next arg doesn't start
# with "--", treat it as the profile.
if [[ $# -gt 0 && "${1:0:2}" != "--" ]]; then
  PROFILE="$1"
  shift
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --profile) PROFILE="$2"; shift 2 ;;
    --dry-run) DRY_RUN=1; shift ;;
    --force) FORCE=1; shift ;;
    --no-git) NO_GIT=1; shift ;;
    --version) GOVERNANCE_VERSION="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

case "$PROFILE" in
  minimal|standard|full) ;;
  *) echo "Invalid profile: '$PROFILE' (must be minimal, standard, or full)" >&2; exit 1 ;;
esac

if [[ -e "$TARGET_DIR" && ! -d "$TARGET_DIR" ]]; then
  echo "Target exists and is not a directory: $TARGET_DIR" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATES_DIR="$SCRIPT_DIR/../assets/templates"

created=()
skipped=()
would_create=()

place() {
  # place <template-name> <relative-target-path>
  local template="$1"
  local rel_target="$2"
  local dest="$TARGET_DIR/$rel_target"
  if [[ -f "$dest" && "$FORCE" -eq 0 ]]; then
    skipped+=("$rel_target")
    return
  fi
  if [[ "$DRY_RUN" -eq 1 ]]; then
    would_create+=("$rel_target")
    return
  fi
  mkdir -p "$(dirname "$dest")"
  cp "$TEMPLATES_DIR/$template" "$dest"
  created+=("$rel_target")
}

mkdir_empty() {
  # mkdir_empty <relative-dir-path> — creates dir with .gitkeep so git tracks it
  local rel_dir="$1"
  local dest="$TARGET_DIR/$rel_dir"
  if [[ -d "$dest" ]]; then
    return
  fi
  if [[ "$DRY_RUN" -eq 1 ]]; then
    would_create+=("$rel_dir/.gitkeep")
    return
  fi
  mkdir -p "$dest"
  touch "$dest/.gitkeep"
  created+=("$rel_dir/.gitkeep")
}

[[ "$DRY_RUN" -eq 0 ]] && mkdir -p "$TARGET_DIR"

# --- minimal (always) ---
place "AGENTS.md" "AGENTS.md"
place "TODO.md" "TODO.md"
place "constitution.md" ".sdd/constitution/constitution.md"
place "glossary.md" ".sdd/context/glossary.md"
place "domain.md" ".sdd/context/domain.md"
mkdir_empty "specs"
mkdir_empty "decisions"

# --- standard ---
if [[ "$PROFILE" == "standard" || "$PROFILE" == "full" ]]; then
  place "roadmap.md" ".sdd/roadmap/roadmap.md"
  place "sdd-workflow.md" ".sdd/workflow/sdd-workflow.md"
  place "spec.md" ".sdd/templates/spec.md"
  place "plan.md" ".sdd/templates/plan.md"
  place "design.md" ".sdd/templates/design.md"
  place "tasks.md" ".sdd/templates/tasks.md"
  place "product.md" ".sdd/context/product.md"
  place "constraints.md" ".sdd/context/constraints.md"
  place "vision.md" "product/vision.md"
  place "capability-map.md" "product/capability-map.md"
  place "backlog.md" "product/backlog.md"
  place "governance.md" ".sdd/governance.md"
fi

# --- full ---
if [[ "$PROFILE" == "full" ]]; then
  mkdir_empty "docs/project"
  place "requirements-traceability.md" ".sdd/traceability/requirements.md"
fi

# --- manifest.yaml (governance version + profile) ---
if [[ "$PROFILE" == "standard" || "$PROFILE" == "full" ]]; then
  manifest_dest="$TARGET_DIR/.sdd/manifest.yaml"
  if [[ -f "$manifest_dest" && "$FORCE" -eq 0 ]]; then
    skipped+=(".sdd/manifest.yaml")
  elif [[ "$DRY_RUN" -eq 1 ]]; then
    would_create+=(".sdd/manifest.yaml")
  else
    mkdir -p "$(dirname "$manifest_dest")"
    created_date="$(date +%Y-%m-%d)"
    sed -e "s/governance_version: \"1.0\"/governance_version: \"$GOVERNANCE_VERSION\"/" \
        -e "s/profile: \"standard\"/profile: \"$PROFILE\"/" \
        -e "s/date: \"\[YYYY-MM-DD\]\"/date: \"$created_date\"/" \
        "$TEMPLATES_DIR/manifest.yaml" > "$manifest_dest"
    created+=(".sdd/manifest.yaml")
  fi
fi

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "=== Would create (profile: $PROFILE) ==="
  printf '  %s\n' "${would_create[@]:-}"
  echo ""
  echo "Dry run — nothing was written to disk."
  exit 0
fi

# --- git init (unless already a repo or --no-git) ---
if [[ "$NO_GIT" -eq 0 ]] && command -v git >/dev/null 2>&1; then
  if [[ ! -d "$TARGET_DIR/.git" ]]; then
    git -C "$TARGET_DIR" init -q
    created+=("(git repository initialized)")
  fi
fi

echo "=== Created ==="
printf '  %s\n' "${created[@]:-}"
echo "=== Skipped (already existed) ==="
printf '  %s\n' "${skipped[@]:-}"
echo ""
echo "Profile: $PROFILE. Governance version: $GOVERNANCE_VERSION."
echo "Placeholders in [brackets] inside the created files still need to be filled in."
echo "Run scripts/sdd-check.sh $TARGET_DIR anytime to check structure/traceability/staleness."
