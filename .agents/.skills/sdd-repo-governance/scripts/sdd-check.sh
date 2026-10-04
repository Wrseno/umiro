#!/usr/bin/env bash
# File-based governance check. See references/enforcement-classification.md
# for the current, honest accounting of exactly which rules this script
# evaluates versus which remain agent- or human-checked — keep that table in
# sync whenever this script changes.
#
# Usage:
#   sdd-check.sh <repo-dir>
#
# Exit code: 0 if no FAIL-level findings, 1 if any FAIL-level finding
# (suitable for use as a CI gate — see assets/templates/ci/sdd-governance.yml).

set -uo pipefail

REPO_DIR="${1:?Usage: sdd-check.sh <repo-dir>}"
PASS=0
WARN=0
FAIL=0

pass() { echo "[PASS] $1"; PASS=$((PASS+1)); }
warn() { echo "[WARN] $1"; WARN=$((WARN+1)); }
fail() { echo "[FAIL] $1"; FAIL=$((FAIL+1)); }

# Extract the token right after **Label:** (first whitespace-delimited word).
# Works whether the field was filled in with one value ("SPECIFIED") or left
# as an unedited template listing ("DRAFT | CLARIFYING | ...") — in the
# latter case it just reads the first listed option, which is itself always
# a valid token, so an unedited template doesn't produce a false failure.
field() {
  local file="$1" label="$2"
  grep -oP "\*\*${label}:\*\*\s*\K[A-Za-z_]+" "$file" 2>/dev/null | head -1
}

LIFECYCLE_VALUES="DRAFT CLARIFYING SPECIFIED PLANNED DESIGNED READY IMPLEMENTING IMPLEMENTED VERIFYING VERIFIED CANCELLED SUPERSEDED"
HEALTH_VALUES="VALID REVIEW_REQUIRED STALE BLOCKED"

value_in_set() {
  local needle="$1" haystack="$2"
  [[ " $haystack " == *" $needle "* ]]
}

echo "SDD Governance Check — $REPO_DIR"
echo ""

echo "-- Structure --"
[[ -f "$REPO_DIR/AGENTS.md" ]] && pass "AGENTS.md exists" || warn "AGENTS.md missing (entry point for AI agents)"
[[ -f "$REPO_DIR/TODO.md" ]] && pass "TODO.md exists" || warn "TODO.md missing (project execution ledger)"
[[ -f "$REPO_DIR/.sdd/constitution/constitution.md" ]] && pass "constitution.md exists" || warn "constitution.md missing"

echo ""
echo "-- TODO.md shape --"
if [[ -f "$REPO_DIR/TODO.md" ]]; then
  bullet_count=$(grep -cE '^\s*-\s*\[[ x>!]?\]' "$REPO_DIR/TODO.md" 2>/dev/null || echo 0)
  if [[ "$bullet_count" -gt 15 ]]; then
    warn "TODO.md has $bullet_count checklist items — this may have become a second backlog (see 'TODO.md becomes a second backlog' in decision-framework.md); TODO.md should report execution state, not track every granular task"
  else
    pass "TODO.md checklist volume looks like execution state, not a backlog ($bullet_count items)"
  fi
fi

echo ""
echo "-- Metadata & Lifecycle (per unit) --"
if [[ -d "$REPO_DIR/specs" ]]; then
  shopt -s nullglob
  for unit_dir in "$REPO_DIR"/specs/*/; do
    unit=$(basename "$unit_dir")
    [[ "$unit" == "." || "$unit" == ".." ]] && continue

    spec="$unit_dir/spec.md"
    design="$unit_dir/design.md"
    tasks="$unit_dir/tasks.md"
    plan="$unit_dir/plan.md"
    verification="$unit_dir/verification.md"

    if [[ ! -f "$spec" ]]; then
      fail "$unit: missing spec.md"
      continue
    else
      pass "$unit: spec.md present"
    fi

    # Boundary heuristic: spec.md absorbing design/implementation content.
    # This keyword list is illustrative and deliberately small — it's a
    # quick smoke-test, not a tech-stack-specific rule. A derivative skill
    # for a particular platform (see references/extending-for-a-tech-stack.md)
    # is a better place for a more thorough, stack-aware version of this
    # check than growing this list indefinitely here.
    if grep -qiE '\b(postgres|mysql|schema|endpoint|api route|database table|gpio|register address|interrupt vector)\b' "$spec" 2>/dev/null; then
      warn "$unit: spec.md contains technology/schema-specific language — check it hasn't absorbed design.md content"
    fi
    if grep -qE '^\s*-\s*\[[ x]\]\s*T[0-9]' "$spec" 2>/dev/null; then
      fail "$unit: spec.md contains a task checklist (T0xx items) — this belongs in tasks.md, not spec.md"
    fi

    # Lifecycle/Health field validation, per artifact present.
    for pair in "spec:$spec" "design:$design" "tasks:$tasks" "plan:$plan"; do
      kind="${pair%%:*}"; f="${pair#*:}"
      [[ -f "$f" ]] || continue
      lc=$(field "$f" "Lifecycle")
      hl=$(field "$f" "Health")
      if [[ -n "$lc" ]]; then
        if value_in_set "$lc" "$LIFECYCLE_VALUES"; then
          pass "$unit/$kind.md: Lifecycle=$lc (recognized)"
        else
          warn "$unit/$kind.md: Lifecycle='$lc' is not a recognized canonical value"
        fi
      fi
      if [[ -n "$hl" ]] && ! value_in_set "$hl" "$HEALTH_VALUES"; then
        warn "$unit/$kind.md: Health='$hl' is not a recognized canonical value"
      fi
    done

    # Traceability presence.
    if [[ -f "$design" ]]; then
      pass "$unit: design.md present"
      grep -qi "traces to" "$design" 2>/dev/null \
        && pass "$unit: design.md declares traceability" \
        || warn "$unit: design.md has no 'Traces to' reference back to spec.md"
    else
      warn "$unit: no design.md yet (fine if this unit hasn't reached design stage)"
    fi

    if [[ -f "$tasks" ]]; then
      pass "$unit: tasks.md present"
    elif [[ -f "$design" ]]; then
      warn "$unit: design.md exists but tasks.md does not yet"
    fi

    # --- Staleness: revision-based (preferred) with mtime fallback ---
    spec_rev=$(grep -oP '\*\*Revision:\*\*\s*\K[0-9]+' "$spec" 2>/dev/null | head -1)
    for pair in "design:$design" "tasks:$tasks" "plan:$plan"; do
      kind="${pair%%:*}"; f="${pair#*:}"
      [[ -f "$f" ]] || continue
      reviewed_rev=$(grep -oiP 'reviewed against:.*?spec revision\s*\K[0-9]+' "$f" 2>/dev/null | head -1)
      if [[ -n "$spec_rev" && -n "$reviewed_rev" ]]; then
        hl=$(field "$f" "Health")
        if [[ "$reviewed_rev" -lt "$spec_rev" ]]; then
          if [[ "$hl" == "STALE" ]]; then
            pass "$unit/$kind.md: correctly marked Health=STALE (reviewed spec rev $reviewed_rev, spec is now rev $spec_rev)"
          else
            fail "$unit/$kind.md: reviewed against spec revision $reviewed_rev but spec.md is now revision $spec_rev — Health should be STALE (currently '${hl:-unset}')"
          fi
        else
          pass "$unit/$kind.md: revision check OK (reviewed spec rev $reviewed_rev, current $spec_rev)"
        fi
      elif [[ -f "$design" && "$kind" != "spec" ]]; then
        # Fallback to mtime heuristic only when revision fields aren't maintained.
        if [[ "$kind" == "design" && "$spec" -nt "$f" ]]; then
          warn "$unit/design.md: spec.md modified more recently (mtime heuristic, no revision fields found) — may be STALE, review before continuing"
        elif [[ "$kind" == "tasks" && -f "$design" && "$design" -nt "$f" ]]; then
          warn "$unit/tasks.md: design.md modified more recently (mtime heuristic, no revision fields found) — may be STALE"
        elif [[ "$kind" == "plan" && "$spec" -nt "$f" ]]; then
          warn "$unit/plan.md: spec.md modified more recently (mtime heuristic, no revision fields found) — may need review"
        fi
      fi
    done

    # --- Evidence: Gate Theater check on verification.md ---
    if [[ -f "$verification" ]]; then
      vstatus=$(grep -oP '\*\*Verification Status:\*\*\s*\K[A-Za-z_ ]+' "$verification" 2>/dev/null | head -1 | xargs)
      if [[ "$vstatus" == "VERIFIED" ]]; then
        bad_evidence=0
        while IFS= read -r line; do
          # Table row: | AC-xxx | tests | evidence | result |
          evidence=$(echo "$line" | awk -F'|' '{print $4}' | xargs)
          if [[ -z "$evidence" || "$evidence" =~ ^([Tt][Bb][Dd]|[Nn]/[Aa]|-)$ ]]; then
            bad_evidence=1
          fi
        done < <(grep -E '^\|\s*AC-' "$verification" 2>/dev/null)
        if [[ "$bad_evidence" -eq 1 ]]; then
          fail "$unit/verification.md: status is VERIFIED but at least one acceptance criterion has missing/TBD evidence — Gate Theater"
        else
          pass "$unit/verification.md: VERIFIED with evidence recorded for all criteria checked"
        fi
      elif [[ -n "$vstatus" ]]; then
        pass "$unit/verification.md: status is $vstatus (not claiming VERIFIED, no evidence check needed)"
      fi
    fi
  done
  shopt -u nullglob
else
  warn "no specs/ directory found"
fi

echo ""
echo "-- Decisions (ADRs) --"
if [[ -d "$REPO_DIR/decisions" ]]; then
  shopt -s nullglob
  for adr in "$REPO_DIR"/decisions/*.md; do
    name=$(basename "$adr")
    if grep -qi "^\*\*Status:\*\*" "$adr" 2>/dev/null; then
      pass "$name: has a Status field"
    else
      warn "$name: no Status field found"
    fi
  done
  shopt -u nullglob
fi

echo ""
echo "-- Summary --"
echo "PASS: $PASS  WARN: $WARN  FAIL: $FAIL"
echo ""
echo "Not checked by this script (agent/human judgment required — see"
echo "references/enforcement-classification.md): gate prerequisite chains,"
echo "ADR validity beyond a Status field, conflict detection between"
echo "artifacts, whether traceability references are actually correct (not"
echo "just present), ADR coverage, acceptance-criteria coverage percentage."

if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi
exit 0
