# Current Handoff

## Current repair status — source-relative reference preservation

This section is the current state and supersedes the older as-of snapshots
below. Those historical records remain preserved for their own evidence states.

- Canonical repair base: `9fd3f196b5bfebd8f03f7cf7176013cd2cd2268b`.
- Working branch: `codex/source-relative-reference-preservation`.
- Defect: a byte-preserved moved body could give a relative path or Markdown
  link a guide-relative meaning after relocation.
- Repair: deterministic Source Base Contract metadata now precedes every
  routed moved-source section and is outside every preserved source-span body.
- Active historical artifact: unchanged at 14,284 Unicode code points and
  SHA-256 `934bfcb6355ddcb065e09da0071d1c5cac8b2d59ebdf6d3cc2bf0d8880652b35`.
- Current complete package: 36,103 Unicode code points; 15,439 / 74.7% larger
  than the 20,664-code-point source. This replaces the former generated-package
  total only; the active 6,380 / 30.9% reduction remains unchanged.
- Accounting: 41 total / 28 retained / 13 moved / 0 folded / 0 deleted / 0
  unaccounted; 13/13 moved bodies exact; 10 reconnect targets.
- Verification: `npm test` PASS (108/108);
  `node evidence/public_rc_v0_1/reproduce.mjs` PASS in all three modes;
  `git diff --check` PASS.
- Public screenshot: the factually stale result-metrics capture was refreshed
  from the actual local application with the fixed source and Balanced mode;
  raw SHA-256 `cd1f1f67b6d55d845ab15051249f1f44d9749b3d711c5f2d07bf38ad1d621877`.

**Current Gate:** `HOLD — source-relative reference repair review`.

**Missing Closure:** bounded review and Draft PR publication only; no merge is
authorized.

**Next Authorized Action:** inspect the bounded diff, commit it, and create a
Draft PR. Do not begin Fable, classifier optimization, another compaction run,
or unrelated product, README, or release work.

**Rollback or Recheck Path:** revert the bounded repair commit, then rerun
`npm test`, `node evidence/public_rc_v0_1/reproduce.mjs`, and
`git diff --check`. The historical source, active artifact, and moved-body
hashes provide the fixed recheck anchors.

**Completion Line:** `PASS — SOURCE-RELATIVE REFERENCE REPAIR IMPLEMENTED,
REPRODUCED, AND AWAITING BOUNDED REVIEW`.

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
Observation 002 settlement are ancestors of Fictional Sample 001's frozen
measurement base `a41f20c0a679934157b38ef033b2d67e67f2e0b4`.

Canonical main then advanced with the approved comparison-image-only commit
`b8beca8e70658bc73ae547b73895e2a530ee6afd`. That exact README image change is
integrated into this branch without a PR-specific README edit; it does not
change the fictional measurement base or result.

After refreshing that canonical main, the reviewed Fictional Sample 001 marker
is absent, so the current pre-merge Gate is `HOLD — Fictional Sample 001 review
/ merge`. The integrated branch contains the marker, verifying the post-merge
selector path to the separate Fable hold without treating the branch as a merge
substitute.

Fictional Sample 001 was measured from
`a41f20c0a679934157b38ef033b2d67e67f2e0b4` and is locally complete on
`codex/fictional-sample-001`. Its invented Lumen Draft source was frozen before
measurement at SHA-256
`335b64177c3f44bb557eb99712aa770272b924cf595a3adfcecfcefca9bca0c9`.
The single ordinary Balanced UI run returned `COMPACTED`: 13,413 to 10,799
Unicode code points, 2,614 / 19.5% active reduction; three guides; 16/13/3
source accounting; zero folded, deleted, or unaccounted spans; three reconnect
routes; and a 17,889-code-point package, +33.4% versus source. All five
generated text artifacts were recovered through the UI and frozen byte-exactly.
Fable has not begun, and no sample-specific image work occurred.

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

Fable review has not begun. If the Fictional Sample 001 marker is absent from
canonical main, Draft PR #5 remains in review / merge closure. Once the marker
is an ancestor of canonical main, the next stage is Fable read-only review only
with separate Shin authorization.

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

The reviewed Fictional Sample 001 ancestry marker is
`bc5e513e4891bd912a8515c9ea98abb8cd27d755`.

After refreshing canonical `origin/main`, determine the Gate with:

```text
git fetch origin main
git merge-base --is-ancestor bc5e513e4891bd912a8515c9ea98abb8cd27d755 origin/main
```

- Marker absent from canonical `main`:
  `HOLD — Fictional Sample 001 review / merge`.
- Marker present in canonical `main`:
  `HOLD — Fable read-only review separately unauthorized`.

Do not infer settlement from the feature branch, PR existence, or a stale local
checkout. In this private-archive checkout, use the refreshed `canonical/main`
as the canonical equivalent of `origin/main` for the same ancestry check.

**Current Source of Truth:**

- Fictional Sample 001 measurement base:
  `a41f20c0a679934157b38ef033b2d67e67f2e0b4`.
- Current canonical main after the approved comparison image:
  `b8beca8e70658bc73ae547b73895e2a530ee6afd`.
- Reviewed Fictional Sample 001 marker:
  `bc5e513e4891bd912a8515c9ea98abb8cd27d755`.
- Integration: current branch merges `b8beca8e70658bc73ae547b73895e2a530ee6afd`
  unchanged, including its README image line.
- Local sample branch: `codex/fictional-sample-001`.
- Initial bounded sample commit: `613b960`.
- Bounded Draft PR:
  `https://github.com/shin4141/agents-md-compactor/pull/5`.
- Frozen source and generated artifacts:
  `validation/fictional_sample_001/`.
- Canonical sample record: `validation/fictional_sample_001.md`.
- Historical evidence remains separately rooted at
  `evidence/public_rc_v0_1/EVIDENCE.md`.

**Completion Line:** `PASS — FICTIONAL SAMPLE 001 FROZEN, VERIFIED, AND PLACED
IN A BOUNDED DRAFT PR`. The source, exact one-run Balanced result, generated
artifacts, accounting, routes, validation, branch push, and Draft PR are
complete. The approved canonical README image is integrated unchanged. The
marker-driven Gate below now settles pre-merge versus post-merge closure without
rewriting the measurement base.

**Missing Closure:**

- If the marker is absent: review / merge of Draft PR #5, Fable read-only
  review, and any separately authorized README/Fable-link or announcement
  decision.
- If the marker is present: Fable read-only review and any separately
  authorized README/Fable-link or announcement decision. PR #5 review / merge
  is no longer Missing Closure.

**Next Owner:** The executing AI owns local validation, commit, non-interactive
publication attempts, Draft PR hygiene, and restartable record maintenance.
Shin retains merge authority, Fable authorization, and any public-claim or
announcement decision.

**What the Receiving AI Now Owns:** Preserve the fictional source identity and
the fact that it was frozen before measurement. Do not edit it to improve the
19.5% result. Preserve source/generated separation, the three exact generated
guides, the move map, the separate historical 30.9% evidence, and the ZIP hash
as `UNKNOWN` unless an ordinary UI download artifact is recovered coherently.

**Next Authorized Action:** If the marker is absent, review and, only with
Shin authorization, merge PR #5. If the marker is present, the next stage is
Fable read-only review only with separate Shin authorization.

**First One Action:** Refresh canonical `origin/main` and run the marker
ancestry check. If absent, reconnect to PR #5 review / merge; if present,
preserve the Fable hold until separately authorized.

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

**Do Not Continue Boundary:** Do not begin Fable, create images, change product
behavior, classifier, router, UI, tests, README claims, historical evidence,
screenshots, LICENSE, marker syntax, visibility, tags, GitHub Releases, npm
publication, or announcements. While the marker is absent, do not merge PR #5
without Shin authorization.

**What must not be returned to the Decision Owner:** routine branch handling,
authentication cleanup, checksum maintenance, test grouping, deterministic
evidence maintenance, publication mechanics through already authorized
surfaces, or handoff hygiene. Ask Shin only for a real direction, risk,
public-claim, externalization, merge, Fable, or announcement decision.
