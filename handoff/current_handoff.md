# Current Handoff

## Product anchors

- Decision Owner: Shin
- Product: standalone `AGENTS.md Compactor`; not a V13-series product
- Canonical repository: `https://github.com/shin4141/agents-md-compactor`
- Repo root: repository checkout (local path intentionally omitted)
- Active branch: `codex/v0-1-contract-vertical`
- Release-candidate starting commit:
  `3967330cccc5f4344a5207f5f460b804d5f2d4ff`
- Canonical historical evidence:
  `evidence/public_rc_v0_1/EVIDENCE.md`
- Canonical public-surface validation:
  `validation/public_surface_v0_1.md`
- Apache-2.0 release-candidate validation:
  `validation/apache_2_license_and_rc_freeze_v0_1.md`
- Screenshot capture specification:
  `docs/public_screenshot_plan_v0_1.md`

## Current state

The bounded Apache-2.0 integration and release-candidate freeze is complete.
The root `LICENSE` is the complete unmodified official Apache License 2.0
text, `package.json` declares `Apache-2.0`, and README has the compact public
license link. The obsolete active license-status statement is removed; historical
validation records remain as historical records.

The public README/adoption surface, fixed historical evidence, and three
A-2-approved screenshots remain intact. The tracked result, input/mode, and
artifacts/review PNGs retain their approved SHA-256 values. No product engine,
classifier, mode logic, source accounting, routes, guides, move map, ZIP
behavior, privacy implementation, server behavior, evidence value, or
historical artifact changed.

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
- historical modes: Conservative, Balanced, and Aggressive reach the same safe
  frontier on this corpus; other fixtures can differ
- offline reproduction:
  `node evidence/public_rc_v0_1/reproduce.mjs`
- Apache-2.0 license SHA-256:
  `c71d239df91726fc519c6eb72d318ec65820627232b2f796219e87dcf35d0ab4`
- package SPDX identifier: `Apache-2.0`
- test suite: 107 passed, 0 failed, 0 cancelled, 0 skipped, 0 todo
- `git diff --check`: pass
- tracked input/mode screenshot SHA-256:
  `e650e12d15e5f4382670739094d1f7e8001c6ac4de79b5ef380d1c000d32bc4c`
- tracked result-metrics screenshot SHA-256:
  `dc7a2200368b3421b39d90d3bdb5735a8f067a56d48ec5b8213245c0fc2a3abb`
- tracked artifacts/review screenshot SHA-256:
  `3cfbb0e26804257912fa9163319f5eb8fb2d4b62fdf91e058cde9d2797106267`

## Required handoff fields

**Current Layer:**
`V9 — Release Candidate / Public Review Preparation`

**Current Gate:**
`HOLD — controlled visibility transition and final Fable review preparation`

**Current Source of Truth:** The current release-candidate commit on
`codex/v0-1-contract-vertical`, including `LICENSE`, `package.json`,
`README.md`, the fixed historical evidence, public screenshots, both
validation records, and this handoff.

**Completed:** Public README/adoption, public screenshots, evidence,
Apache-2.0, and the private release-candidate commit.

**Missing Closure:**

- controlled visibility change;
- fixed-commit Fable review;
- choice whether to include the Fable conversation URL in README; and
- public announcement.

**Next Actor:** Shin + A-2.

**Next Safe Action:** Coordinate the controlled visibility transition and
prepare the final Fable review against the fixed release-candidate commit.
Do not alter the frozen screenshots, product behavior, historical evidence, or
license surface without new authorization.

**Rollback or Recheck Path:** Revert the bounded release-candidate commit and
run `npm test`. This removes only the Apache-2.0 documentation and metadata
surface while leaving the accepted product engine, historical evidence, public
screenshots, privacy implementation, and user data unchanged. No migration
exists.

**Known Boundaries:** One historical corpus is not general performance. Unicode
code points are not tokens. The complete package is larger than the source.
Routes and the receipt do not guarantee runtime compliance. No token, cost,
latency, model-performance, safety, adoption, or public-release claim is
established.

**Do Not Continue Boundary:** Do not change classifier or router logic, source
dispositions, guide/move-map semantics, privacy/server behavior, categories,
or modes; do not change visibility, publish a release, create a tag, publish
to npm, or begin Fable review except at the authorized next gate.

**What must not be returned to the Decision Owner:** routine branch cleanup,
test grouping, deterministic evidence maintenance, screenshot mechanics within
the fixed plan, handoff hygiene, and other routine release-candidate cleanup.
