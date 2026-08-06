# Current Handoff

## Product anchors

- Decision Owner: Shin
- Product: standalone `AGENTS.md Compactor`; not a V13-series product
- Canonical repository: `https://github.com/shin4141/agents-md-compactor`
- Canonical branch: `main`
- Repository visibility: `PUBLIC`
- Private source RC:
  `f697759dfc20d5406eef6b18b6a83654328c58cc`
- Clean public RC review base:
  `b60236dff97f8c026865f609f4db480428209c81`
- Private archive: `shin4141/agents-md-compactor-private-archive` — remains
  `PRIVATE`
- Canonical historical evidence:
  `evidence/public_rc_v0_1/EVIDENCE.md`
- Screenshot capture specification:
  `docs/public_screenshot_plan_v0_1.md`
- Public-export sanitization record:
  `validation/public_export_sanitization_v0_1.md`

## Current state

The clean public genesis, authorized sanitization, Apache-2.0 license,
A-2 screenshots, automated tests, evidence reproduction, unauthenticated
public-read verification, and the PR #1 documentary repair are complete. PR #1
merged as `814f57aa187bd597169c8a137ac15d6915b6c562`; that merge commit is the
fixed base of the separate Lightweight Guidance Receipt marker vertical.

This vertical changes only the deterministic receipt syntax and its bounded
public presentation and evidence records. It does not add analytics,
monitoring, token accounting, performance behavior, classifier behavior,
routing behavior, source disposition changes, or guide-body changes.

## Audit lineage

These audits have distinct scopes and must not be collapsed into one result.

### Opus — private product and evidence audit

- Audited fixed private product commit:
  `109d52ba59e3bc334c4de8bd8d1975deb0f012d9`
- Delivery capsule SHA-256:
  `90729379f9d5225c8f1fa54b73a10b3fb1b59402cb6e4ff2d7965403e1daf6c6`
- Verdict: `HOLD — bounded repairable gaps remain`
- Established:
  - 60/60 embedded files matched hashes and byte counts
  - 20,664 → 14,284 / 30.9% independently reproduced
  - 41/28/13 accounting and 10 reconnect routes
  - 13/13 moved bodies byte-preserved
  - 106/106 tests passed at the audited commit
  - no concrete meaning-destruction finding; all moved spans were conditional;
    universal and ambiguous spans remained active
  - reconnectability and shipped local-processing boundaries supported
  - credible non-developer-led human–AI development supported as Decision
    ownership and acceptance-criteria design, not coding novelty
- HOLD reason: public evidence packaging and public-copy disclosure, not core
  product failure
- Current closure status:
  - R1 self-contained public evidence: CLOSED
  - R2 direct historical regression test: CLOSED
  - R3 package total +56.7% disclosure: CLOSED
  - R4 same three-mode result disclosure: CLOSED
  - R5 tracked/openable evidence surface: CLOSED
  - R6 Apache-2.0 license: CLOSED
  - R7 file-scheme meta CSP: OPEN — LOW; known boundary, not an Opus-defined
    Fable blocker

### Sonnet — four-product comparison claim-boundary audit

- Scope: supplied source summaries and linked primary sources for AGENTS.md
  Compactor, Ponytail, RTK, and OSI; not a repository-wide code audit
- Verdict: `REVISE — bounded wording corrections are required`
- Product results: AGENTS.md Compactor PASS; Ponytail PASS; OSI PASS; RTK
  REVISE only because its compact wording must retain the Bash-routed
  limitation
- Whole-graphic corrections:
  - add a Bash-routed or equivalent limitation to the RTK compact label
  - state that placement reflects each product's primary target, not exclusive
    scope
- Does not establish token, billed-cost, task-quality, performance, or
  product-superiority claims

### GPT — fixed public RC documentary consistency review

- Reviewed: `b60236dff97f8c026865f609f4db480428209c81`
- Verdict before repair: `HOLD — active operating state and one evidence As-of
  statement are stale`
- Repair surface: PR #1, five documentary files only
- No README, product source, screenshot, historical metric, or LICENSE change

### Fable — pending

Fable review has not begun. It is allowed only after the marker PR is merged
and the resulting main commit is frozen as the exact read-only review target;
it must not review the earlier PR #1 merge commit.

Fable must distinguish proven fixed-corpus facts; structurally plausible but
unmeasured repeated-use and future-bloat value; and unsupported token, cost,
latency, model-performance, semantic-equivalence, runtime-obedience, adoption,
and superiority claims.

Any decision to place the Fable conversation URL in README remains Shin's
separate explicit decision after reading the complete conversation.

## Exact verification

- metric: Unicode code points, LF, trailing newline included
- original active file: 20,664 code points
- generated active file: 14,284 code points
- actual active reduction: 6,380 / 30.9%; `COMPACTED`
- complete package: 32,383 code points; +56.7% versus the original
- accounting: 41 total / 28 retained / 13 moved / 0 folded / 0 deleted / 0
  unaccounted
- moved bodies: 13 of 13 exact
- reconnect routes: 10
- Apache-2.0 LICENSE SHA-256:
  `c71d239df91726fc519c6eb72d318ec65820627232b2f796219e87dcf35d0ab4`
- tracked input/mode screenshot SHA-256:
  `e650e12d15e5f4382670739094d1f7e8001c6ac4de79b5ef380d1c000d32bc4c`
- tracked result-metrics screenshot SHA-256:
  `69866a5415ad135ff9b367865294cb7e5d20a450c51ef1cdfb03cfa417edcc0d`
- tracked artifacts/review screenshot SHA-256:
  `f7fdd314c9a2c4d085ef679b845fed79a14220cd868b1434e2552d523280b01d`
- offline reproduction:
  `node evidence/public_rc_v0_1/reproduce.mjs`
- test suite: 108 passed, 0 failed, 0 cancelled, 0 skipped, 0 todo

## Required handoff fields

**Current Layer:**
`V11 — Lightweight Guidance Receipt`

**Current Gate:**

- While PR #2 is unmerged:
  `HOLD — bounded GPT review repair and Shin merge authorization`
- After PR #2 merges:
  `HOLD — freeze the resulting main commit and conduct fixed-commit Fable review`

**Current Source of Truth:**

- Verified post-PR #1 public `main` base:
  `814f57aa187bd597169c8a137ac15d6915b6c562`.
- Marker implementation branch:
  `codex/lightweight-guidance-receipt-v0-1`, based on that exact main commit.
- Once the separate marker PR is merged, its resulting main commit—not this
  branch or the PR #1 merge—becomes the sole fixed Fable review target.

**Completion Line:** exact formatter syntax implemented; generated receipt
contract updated; full tests PASS; historical evidence mechanically
synchronized; 30.9% active-file result preserved; marker boundaries documented;
separate Draft PR opened.

**Missing Closure:**

- GPT review of the marker PR;
- Shin merge authorization;
- resulting main commit freeze;
- Fable read-only review; and
- separate announcement decision.

**Next Actor:** GPT review → Shin merge authorization → main freeze → Fable.

**Next Safe Action:** Apply the two bounded GPT documentary corrections, push
them to PR #2, and stop for final GPT review. After GPT PASS, only Shin may
authorize merge.

**Rollback or Recheck Path:** Before marker merge, close the marker PR and
delete its branch. After merge, if the immediate verified integration,
determinism, or no-write check fails, perform one history-preserving revert,
record it, and return to Shin. Do not repair forward inside that post-merge
check.

**Known Boundaries:** One historical corpus is not general performance. Unicode
code points are not tokens. The complete package is larger than the source.
Routes and the receipt do not guarantee runtime compliance. No token, cost,
latency, model-performance, safety, adoption, or public-release claim is
established.

**Do Not Continue Boundary:** Do not begin Fable review before PR #2 is merged
and the resulting main commit is frozen as the exact review target. Do not
change product behavior beyond this bounded receipt contract, classifier,
router, privacy behavior, source dispositions, guide bodies, LICENSE,
visibility, tags, GitHub Releases, npm publication, or announcements. Only the
marker PR, read-only review, and separately authorized bounded remediation are
allowed.

**What must not be returned to the Decision Owner:** routine wording, checksum
maintenance, test grouping, branch cleanup, deterministic evidence maintenance,
or handoff hygiene.
