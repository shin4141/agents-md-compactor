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
public-read verification, and both earlier PRs are complete. PR #1 merged as
`814f57aa187bd597169c8a137ac15d6915b6c562`. The Lightweight Guidance Receipt
marker PR #2 merged as canonical main
`437c9f882493a015738d70e8cc89f063c547b2df`.

The marker is shipped in generated output as `🪶 Core only` or
`🪶 Core + <guides actually read>`. It remains a declaration, not proof of
guide reading or runtime compliance. The capsule-refit PR #3 and Live Dogfood
Observation 002 settlement are ancestors of canonical main
`a41f20c0a679934157b38ef033b2d67e67f2e0b4`.

Fictional Sample 001 is locally complete on
`codex/fictional-sample-001`, based exactly on that canonical commit. Its
invented Lumen Draft source was frozen before measurement at SHA-256
`335b64177c3f44bb557eb99712aa770272b924cf595a3adfcecfcefca9bca0c9`.
The single ordinary Balanced UI run returned `COMPACTED`: 13,413 to 10,799
Unicode code points, 2,614 / 19.5% active reduction; three guides; 16/13/3
source accounting; zero folded, deleted, or unaccounted spans; three reconnect
routes; and a 17,889-code-point package, +33.4% versus source. All five
generated text artifacts were recovered through the UI and frozen byte-exactly.
Fable and image work have not begun.

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

### GPT — final marker PR review

- Final marker PR review head:
  `f3d19b398dc2630b05ee78cfbcea6096b504f4cc`
- Verdict: `PASS — ready for Shin merge authorization`
- Established:
  - exact feather-marker formatter syntax
  - generated receipt contract
  - declaration/non-proof boundary
  - no token, cost, time, or performance claim
  - 108 tests PASS
  - evidence reproduction PASS
  - 20,664 → 14,284 / 30.9% preserved
  - package 32,383 / +56.7% preserved
  - 41/28/13, 13/13, and 10 routes preserved

### Fable — pending

Fable review has not begun. Observation 002 is settled and Fictional Sample 001
is locally complete, but the sample must first be placed in its bounded Draft
PR. Fable remains a separate, explicitly authorized read-only stage.

Fable must distinguish the separate fixed historical and one-fictional-sample
facts; structurally plausible but unmeasured repeated-use and future-bloat
value; and unsupported token, cost, latency, model-performance,
semantic-equivalence, runtime-obedience, adoption, and superiority claims.

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

## Fictional Sample 001 exact verification

- fictional source: 13,413 UTF-8 bytes / 13,413 Unicode code points
- frozen source SHA-256:
  `335b64177c3f44bb557eb99712aa770272b924cf595a3adfcecfcefca9bca0c9`
- mode: Balanced; one ordinary UI generation
- outcome: `COMPACTED`
- generated active file: 10,799 Unicode code points
- actual active reduction: 2,614 / 19.5%
- source externalization: 3,049 / 22.7%
- complete text package: 17,889 Unicode code points / +33.4%
- accounting: 16 total / 13 retained / 3 moved / 0 folded / 0 deleted / 0
  unaccounted
- moved instruction bodies: 3 of 3 exact, excluding one recorded inter-section
  separator LF per source range
- reconnect routes: 3, matching the 3 emitted guides
- ZIP hash: `UNKNOWN`; the controlled browser did not expose the downloaded
  file, while every constituent text artifact was recovered and hashed
- canonical record: `validation/fictional_sample_001.md`

## Required handoff fields

**Current Layer:**
`V11 — Reconnectable Forgetting / AGENTS.md Compactor`

**Current Gate:**
`HOLD — bounded fictional-sample Draft PR before Fable`

**Current Source of Truth:**

- Canonical product base:
  `a41f20c0a679934157b38ef033b2d67e67f2e0b4`.
- Local sample branch: `codex/fictional-sample-001`.
- Frozen source and generated artifacts:
  `validation/fictional_sample_001/`.
- Canonical sample record: `validation/fictional_sample_001.md`.
- Historical evidence remains separately rooted at
  `evidence/public_rc_v0_1/EVIDENCE.md`.

**Completion Line:** The commit containing this handoff is the local sample
PASS: frozen source, exact one-run Balanced result, generated artifacts,
accounting, routes, validation, and handoff are complete. Full A5 PASS requires
that commit to be placed in a bounded Draft PR without product, README,
historical-evidence, image, or Fable work.

**Missing Closure:**

- branch push and bounded Draft PR;
- separately authorized Fable read-only review;
- any separately authorized announcement decision.

**Next Owner:** The executing AI owns local validation, commit, non-interactive
publication attempts, Draft PR hygiene, and restartable record maintenance.
Shin retains merge authority, Fable authorization, and any public-claim or
announcement decision.

**What the Receiving AI Now Owns:** Preserve the fictional source identity and
the fact that it was frozen before measurement. Do not edit it to improve the
19.5% result. Preserve source/generated separation, the three exact generated
guides, the move map, the separate historical 30.9% evidence, and the ZIP hash
as `UNKNOWN` unless an ordinary UI download artifact is recovered coherently.

**Next Authorized Action:** Use any already authorized non-interactive
repository surface to push `codex/fictional-sample-001` and open a Draft PR
against canonical `main`. Do not merge.

**First One Action:** Confirm the local sample commit and frozen source hash,
then attempt the authorized branch push.

**Rollback or Recheck Path:** Revert the bounded sample commit. This removes
only the fictional source, generated package, checksums, validation record, and
handoff update. Re-run the source/artifact hashes, accounting audit, tests,
historical reproduction, and `git diff --check` if any sample input changes;
an input-hash mismatch returns the stage to HOLD.

**Known Boundaries:** This is one invented sample, not a benchmark or
distribution. Its 19.5% result does not alter the historical corpus's 30.9%
result. Unicode code points are not tokens. The complete package is larger than
the source. Routes and the receipt do not guarantee runtime compliance. The ZIP
identity remains `UNKNOWN`; all constituent text artifacts are exact. No
token, cost, latency, model-performance, quality, safety, adoption, superiority,
or general-reliability claim is established.

**Do Not Continue Boundary:** Do not merge, begin Fable, create images, change
product behavior, classifier, router, UI, tests, README claims, historical
evidence, screenshots, LICENSE, marker syntax, visibility, tags, GitHub
Releases, npm publication, or announcements.

**What must not be returned to the Decision Owner:** routine branch handling,
authentication cleanup, checksum maintenance, test grouping, deterministic
evidence maintenance, publication mechanics through already authorized
surfaces, or handoff hygiene. Ask Shin only for a real direction, risk,
public-claim, externalization, merge, Fable, or announcement decision.
