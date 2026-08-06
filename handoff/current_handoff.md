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

This bounded branch repairs those documentary facts only. README claims,
product behavior, fixed historical evidence values, screenshots, and LICENSE
remain unchanged.

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

**Current Gate during this repair:**
`HOLD — bounded documentary consistency repair before Fable review`

**Current Source of Truth:** Public `main` at clean public RC
`b60236dff97f8c026865f609f4db480428209c81` plus this bounded repair branch.

**Completed:** clean public genesis, sanitization, tests, evidence reproduction,
public-read verification, Apache-2.0, screenshots, and GPT read-only review.

**Missing Closure:**

- merge of this bounded documentary repair after review;
- Fable read-only review of the resulting fixed commit;
- separately authorized remediation if Fable finds an issue;
- decision on a Fable conversation URL in README; and
- public announcement.

**Next Actor:** A-2 → GPT review → Shin/Fable.

**Next Safe Action:** Open the Draft PR and stop for review.

**Rollback or Recheck Path:** Close the unmerged Draft PR and delete its branch.
The clean public RC, private source archive, product behavior, historical
evidence, screenshots, and LICENSE remain unchanged.

**Known Boundaries:** One historical corpus is not general performance. Unicode
code points are not tokens. The complete package is larger than the source.
Routes and the receipt do not guarantee runtime compliance. No token, cost,
latency, model-performance, safety, adoption, or public-release claim is
established.

**Do Not Continue Boundary:** Do not change product behavior, classifier,
router, UI, privacy behavior, historical evidence, screenshots, README claims,
LICENSE, visibility, tags, GitHub Releases, npm publication, announcements, or
begin Fable review. Only read-only review and separately authorized bounded
remediation are allowed.

**What must not be returned to the Decision Owner:** routine wording, checksum
maintenance, test grouping, branch cleanup, deterministic evidence maintenance,
or handoff hygiene.
