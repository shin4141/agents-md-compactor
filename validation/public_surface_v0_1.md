# Public surface v0.1 validation

## Classification and scope

Classification: `PASS`

Starting commit: `ca53b21af525766d9b31cbb15498a838457e5182`

This bounded A-2 task integrates the three visually approved public screenshots
into the README as byte-identical tracked documentation assets. It changes only
`README.md`, `docs/images/public_v0_1/`,
`docs/public_screenshot_plan_v0_1.md`, this validation record, and
`handoff/current_handoff.md`.
It does not change the engine, classifier, mode logic, source accounting,
route generation, guides, move map, ZIP behavior, privacy implementation,
server behavior, historical evidence, license, visibility, release status, or
Fable-review status.

## Fixed claims used

- Historical source: a real governance-heavy `AGENTS.md`.
- Active file: 20,664 to 14,284 Unicode code points.
- Actual active-file reduction: 6,380 / 30.9%.
- Complete emitted package: 32,383 Unicode code points, +56.7% versus the
  original.
- Accounting: 41 total / 28 retained / 13 moved; 0 folded / 0 unique
  instructions deleted / 0 unaccounted.
- Reconnect routes: 10.
- Historical preservation: all 13 moved source bodies byte-for-byte.
- Automated suite: 107 tests pass.
- Historical three-mode boundary: Conservative, Balanced, and Aggressive all
  reach the same 14,284-code-point / 30.9% safe frontier; other fixtures can
  differ.

All measurements use Unicode code points with LF and the trailing newline
included.

## Public-copy checks

The README follows the required public flow:

1. Hero and third-option thesis;
2. demonstrated historical result with the 32,383 / +56.7% package disclosure
   adjacent to the 30.9% active-file result;
3. active core versus reconnectable guides;
4. four-step usage flow;
5. output contents;
6. bounded semantic-rewrite comparison;
7. evidence and reproducibility;
8. privacy boundary;
9. repository-fit guidance;
10. limitations;
11. development story; and
12. local commands.

The README presents `0 unique instructions deleted` and `13/13 moved
instruction bodies preserved byte-for-byte` as the exact historical claims. It
states that the full package is larger because it retains routed material and
traceability, not as a buried disclaimer. It labels 30.9% as active-file
reduction only.

The A-2 repair removes the repeated hero-result paragraph. It replaces it with
the mechanism boundary: conditional instructions leave the always-loaded file
without deletion while reconnect triggers remain active. The adjacent label
states that 30.9% measures the active `AGENTS.md`, not the total emitted
package; the 32,383-code-point / +56.7% package total remains visible.

The visible Privacy card now states that processing is local, the shipped
application does not transmit or persist input, and it contains no analytics,
telemetry, or training-data collection. It no longer claims that the
application does not inspect or sell input. Clipboard-only review,
external-service policy after manual paste, and the browser-extension,
operating-system-compromise, and modified-copy limits remain explicit.

The evidence section now accurately states that the repository passes 107
automated tests and identifies the focused historical regression test; it does
not imply that all 107 tests use the historical corpus.

The semantic comparison labels `20,664 → 11,141 / 46.1%` exactly as a
**semantic rewrite baseline — not a lossless compression target**. It records
the semantic rewrite’s possible readability and size advantages while bounding
its authority, modality, required-field, and review differences. It does not
present the number as an equivalent product target or a product failure.

The README states the clipboard-only review action, the local processing
boundary, no persistence/analytics/telemetry/training collection/external
assets, external-service policy boundary after manual paste, and the exclusion
of browser extensions, operating-system compromise, and modified copies.

It also states both suitable and unsuitable repository profiles, including
`NO_ACTIVE_REDUCTION`, and records the fixed historical three-mode boundary
without claiming that Aggressive is always smaller.

## Prohibited claims excluded

The README makes no total-text-reduction, token-reduction, cost-reduction,
latency-improvement, model-performance-improvement, runtime-compliance,
universal 30.9%, semantic-equivalence, safety-certification, adoption, release,
or general-performance claim. It adds no license choice, release assertion,
visibility assertion, Fable-review assertion, or external-testing claim.

## Development-story check

The development story describes Shin as working with AI agents without a
conventional software-engineering background and frames the work as Decision
ownership. It confines the story to the evidence-bound decisions: rejecting
source externalization as active reduction, correcting narrowly routed
universal safety rules, rejecting the weak 16% result, reaching 30.9% without
changing preserved source bodies, rejecting failed audit delivery as
completion, and building reproducible evidence before public review. It makes
no claim about coding novelty or a personal biography.

## Screenshot plan

[`docs/public_screenshot_plan_v0_1.md`](../docs/public_screenshot_plan_v0_1.md)
defines exactly three screenshots and their README placement, Markdown alt
text, captions, display widths, and authoritative-evidence links. The required
display order is result metrics first, then input/mode selection, then generated
artifacts with clipboard-review and ZIP actions. Every image uses the tracked
public corpus in Balanced mode at a 1440 × 1200 viewport. All three A-2-approved
PNGs are now tracked under `docs/images/public_v0_1/`, linked from README, and
byte-identical to their approved local images.

## Verification

- `npm test`: PASS — 107 tests passed; 0 failed, cancelled, skipped, or todo.
- `git diff --check`: PASS.
- Local UI inspection: PASS — the tracked historical corpus in Balanced mode
  displays the corrected local-processing/no-transmission/no-persistence/no-
  analytics/no-telemetry/no-training Privacy card, the visible source input,
  Balanced selection, and mode explanation before generation. The accepted
  result-metrics and artifacts/review screenshots retain their prior hashes.
- Tracked screenshot assets: PASS — all three are byte-identical to the
  approved local PNGs, opaque RGB PNGs at 1440 × 1200, in the planned README
  order, with no absolute local paths in tracked documentation:
  - `public-v0_1-result-metrics.png`: SHA-256
    `dc7a2200368b3421b39d90d3bdb5735a8f067a56d48ec5b8213245c0fc2a3abb`
  - `public-v0_1-input-mode.png`: SHA-256
    `e650e12d15e5f4382670739094d1f7e8001c6ac4de79b5ef380d1c000d32bc4c`
  - `public-v0_1-artifacts-review.png`: SHA-256
    `3cfbb0e26804257912fa9163319f5eb8fb2d4b62fdf91e058cde9d2797106267`

## Rollback

Revert the bounded A-2 copy-repair commit and run `npm test`. That restores the
prior public surface and its prior two exact-copy assertions. The accepted
product engine, historical evidence, privacy implementation, user data, and
other tests remain untouched. No migration or stored data exists.

## Completion and next Gate

The A-2-approved screenshots are integrated into the README in result → input
→ artifacts order. Each uses repository-relative image markup, its exact plan
alt text and caption, a linked evidence record, and an explicit evidence
boundary. Tests and whitespace validation pass. No license, visibility,
release, product-behavior, or Fable action occurred.

Next Gate:
`HOLD — Shin license selection before release-candidate freeze`
