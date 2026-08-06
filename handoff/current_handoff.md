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
A-2-approved screenshots, automated tests, evidence reproduction, and
unauthenticated public-read verification are complete. GPT's read-only review
identified only stale active operating state, stale handoff identity, and
current-tense historical license wording. No product-code, classifier, router,
UI, privacy, screenshot, metric, or license defect was established.

PR #1 repairs those documentary facts only. README claims, product behavior,
fixed historical evidence values, screenshots, and LICENSE remain unchanged.

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

Fable review has not begun. It is allowed only after PR #1 is merged and the
resulting main commit is frozen as the exact read-only review target.

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
  `dc7a2200368b3421b39d90d3bdb5735a8f067a56d48ec5b8213245c0fc2a3abb`
- tracked artifacts/review screenshot SHA-256:
  `3cfbb0e26804257912fa9163319f5eb8fb2d4b62fdf91e058cde9d2797106267`
- offline reproduction:
  `node evidence/public_rc_v0_1/reproduce.mjs`
- test suite: 107 passed, 0 failed, 0 cancelled, 0 skipped, 0 todo

## Required handoff fields

**Current Layer:**
`V9 — Fixed Public RC Review`

**Current Gate:**
`HOLD — PR #1 review and merge, then fixed-commit Fable review`

**Current Source of Truth:**

- While PR #1 is unmerged: public `main` at
  `b60236dff97f8c026865f609f4db480428209c81` plus the exact current head of
  PR #1.
- After PR #1 merges: the resulting main merge commit becomes the sole fixed
  public review target. The pre-merge branch state becomes historical and must
  not remain an active authority source.

This transition rule prevents the handoff from becoming stale merely because
PR #1 merges. No follow-up wording-only repair is required solely to replace
branch state with main state.

**Completed:** clean public genesis, sanitization, tests, evidence reproduction,
public-read verification, Apache-2.0, screenshots, and GPT read-only review.

**Missing Closure:**

- review and merge PR #1;
- freeze the resulting main commit as the exact Fable target;
- Fable read-only review;
- separately authorized remediation only if Fable establishes a bounded issue;
- Shin decision on the complete Fable conversation URL; and
- public announcement.

The PR #1 merge item closes automatically when GitHub records the PR as merged
and must not be carried forward as an unresolved post-merge task.

**Next Actor:** GPT review → Shin merge authorization → Fable.

**Next Safe Action:** Review the updated PR #1 head. If accepted, merge PR #1,
freeze the resulting main commit, and begin no work beyond read-only Fable
review preparation.

**Rollback or Recheck Path:** Before merge, close PR #1 and delete its branch.
After merge, if the one immediate verified integration/determinism/no-write
check fails, perform one history-preserving revert, record it, and return to
Shin. Do not repair forward inside that post-merge check.

**Known Boundaries:** One historical corpus is not general performance. Unicode
code points are not tokens. The complete package is larger than the source.
Routes and the receipt do not guarantee runtime compliance. No token, cost,
latency, model-performance, safety, adoption, or public-release claim is
established.

**Do Not Continue Boundary:** Do not merge PR #1 in this repair. Do not begin
Fable review before PR #1 merges and its resulting main commit is frozen. Do
not change product behavior, classifier, router, UI, privacy behavior,
historical evidence, screenshots, README claims, LICENSE, visibility, tags,
GitHub Releases, npm publication, or announcements. Only read-only review and
separately authorized bounded remediation are allowed.

**What must not be returned to the Decision Owner:** routine wording, checksum
maintenance, test grouping, branch cleanup, deterministic evidence maintenance,
or handoff hygiene.
