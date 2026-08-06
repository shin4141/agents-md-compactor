# Public evidence self-containment repair v0.1

## Classification and scope

Classification: `PASS`

Starting product commit:
`109d52ba59e3bc334c4de8bd8d1975deb0f012d9`

This repair makes the already accepted excluded-private-audit result reproducible from a
fresh product clone. It adds tracked fixed evidence, one direct historical
test, exact public wording, and a secondary complete-package measurement in the
UI and Review package. It does not change `src/compactor.js`, source-span
dispositions, classification, modes, generated routes, guide bytes,
`move-map.md`, ZIP behavior, privacy code, or server behavior.

## Excluded private-audit findings accepted

The repair accepts without reopening:

- 20,664 original to 14,284 active Unicode code points;
- 6,380 / 30.9% actual active-file reduction;
- 41 source spans: 28 retained, 13 moved, zero folded, zero unique
  instructions deleted, and zero unaccounted;
- 13 of 13 moved bodies preserved byte-for-byte;
- ten of ten reconnect targets resolving at file, physical-anchor, and
  moved-body level;
- no meaning-loss or universal-rule-misrouting defect;
- the local-only privacy boundary;
- the prior 106-test baseline.

## Findings rejected or deferred

- The human+AI file's 46.1% result is rejected as a directly equivalent
  lossless target. It is recorded as a **semantic rewrite baseline — not a
  lossless compression target** because it adds authority, changes scope,
  omits exact source detail, uses repository knowledge, and lacks deterministic
  source accounting.
- No classifier, router, guide, source-accounting, privacy, server, or product
  defect was established; changes to those accepted surfaces were therefore
  rejected from this repair.
- License selection, public-release action, visibility changes, Fable review,
  external testing, and product positioning remain deferred to Shin.

## Tracked evidence inventory

`evidence/public_rc_v0_1/` now contains:

- exact `BEFORE_AGENTS.md` source bytes;
- exact active `expected/AGENTS.md`;
- exact `expected/agent-guides/handoff.md` and
  `expected/agent-guides/other.md`;
- exact `expected/move-map.md`;
- `EVIDENCE.md` with source/product identities, artifact hashes, counts,
  route mapping, human-baseline boundary, and limitations;
- `CLAIM_TO_TEST_MATRIX.md` mapping the 30.9% claim directly to the historical
  test;
- `SHA256SUMS` covering every evidence input, output, record, and script;
- `reproduce.mjs`, an offline, read-only, tracked-byte reproduction.

Exact command from repository root:

```sh
node evidence/public_rc_v0_1/reproduce.mjs
```

It uses no second repository, runs Conservative, Balanced, and Aggressive, and
compares all generated artifacts and accounting to tracked evidence.

## Direct historical claim test

`test/historical-frontier.test.js` directly asserts 20,664 original and 14,284
active code points, 6,380 / 30.9% reduction, `COMPACTED`, 41/28/13 accounting,
zero folded/deleted/unaccounted, all four artifact hashes, all 13 moved-body
hashes, ten unique physical reconnect anchors, exact tracked artifact bytes,
and the complete-package count. It also fixes the supported README/Evidence
wording boundary.

## Active file versus complete package

The primary result remains the complete always-loaded active file:

- original active `AGENTS.md`: 20,664 Unicode code points;
- generated active `AGENTS.md`: 14,284 Unicode code points;
- actual active-file reduction: 6,380 / 30.9%.

The secondary emitted-package result is:

- active `AGENTS.md` plus both guides plus `move-map.md`: 32,383 code points;
- 11,719 code points / 56.7% larger than the original.

The UI and Review package explain that the package is larger because moved
instructions and their traceability are preserved, and that 30.9% applies only
to the always-loaded active file. No package-total, token, cost, latency,
model-quality, or runtime-obedience saving is claimed.

## Three-mode boundary

On this governance-heavy historical corpus, Conservative, Balanced, and
Aggressive reach the same safe deterministic frontier: 14,284 code points and
30.9% active-file reduction. README and evidence explicitly state that other
checked-in fixtures produce different mode results and that Aggressive is not
promised to be smaller.

## Verification

- self-contained reproduction: `PASS` for all three modes;
- fixed source SHA-256:
  `e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db`;
- active SHA-256:
  `b60acc020ddad730ba7c7528dc9a98e349646c4eb47b24054ac4bf87bf1f3bfe`;
- handoff guide SHA-256:
  `7951186b3f6ca7d578c853e419df212e2cd0e2893fd57aa2c7bf1590968d5b39`;
- other guide SHA-256:
  `68e32ca18e842676087e06f5e273c503dfbd4df4757a9daaf596cd8f58a598a5`;
- move-map SHA-256:
  `745211070a2153d114b1e5dc646e79764ddcefb66393f0675185372f8e4ecd2c`;
- `npm test`: 107 tests, 107 passed, 0 failed, 0 cancelled, 0 skipped,
  0 todo; all prior 106 tests remain and pass;
- `git diff --check`: pass;
- fresh-clone reproduction and full tests: pass at closeout;
- no license file added;
- no public visibility change, public release, external submission, or Fable
  review occurred.

## Rollback

Revert the public-evidence closeout commit. This removes the tracked fixture,
direct historical test, package-total presentation, README claim, validation,
and handoff update. The accepted engine, generated source frontier, privacy
implementation, user data, and server remain unchanged; no migration or stored
state exists. Re-run `npm test` after rollback.

## Completion and next Gate

The exact historical result is now independently reproducible from a fresh
product clone; the 30.9% claim is directly tested; artifact and moved-body
hashes and physical routes are fixed; active and package-total facts are
separate; all three hard-corpus modes and limitations are disclosed; tests and
fresh-clone checks pass; commits are pushed; no accepted engine/privacy surface
or public visibility changed.

Next Gate:
`HOLD — awaiting private-audit closure check and Shin license decision`
