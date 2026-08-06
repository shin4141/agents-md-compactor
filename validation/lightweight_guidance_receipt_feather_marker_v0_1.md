# Lightweight Guidance Receipt v0.1 — Feather Marker validation

## Scope and authority

This bounded V11 vertical follows the PR #1 merge commit
`814f57aa187bd597169c8a137ac15d6915b6c562` on
`codex/lightweight-guidance-receipt-v0-1`. It changes the generated receipt
syntax and its directly dependent deterministic regressions, public disclosure,
fixed expected artifact, checksum manifest, handoff, and visible screenshots.

It does not add analytics, monitoring, token accounting, or performance
behavior. It does not change classifier behavior, routing behavior, source
dispositions, moved guide bodies, move-map semantics, privacy behavior, or the
historical source corpus.

## Receipt contract

`formatGuidanceReceipt(categories)` now always retains Core and returns:

- `🪶 Core only` for no guide or an explicit `core` entry;
- `🪶 Core + testing` for one canonical guide; and
- `🪶 Core + release · security` for multiple canonical guides.

Guide names remain lowercase, follow `GUIDE_CATEGORIES`, and are deduplicated.
Unknown categories still raise `INVALID_RECEIPT`.

The generated active-file contract appears once and says:

> End every response with `🪶 Core only`, or `🪶 Core + <guides actually read>`
> using ` · ` in canonical order.

Its dynamic `Available guide order` suffix lists only emitted guides in
canonical order and is absent with no emitted guide. The marker is explicitly a
declaration, not proof of guide reading or runtime compliance.

## Fixed historical evidence synchronization

Only the generated receipt sentence changed in the expected active artifact.

| Fact | Before | After |
| --- | ---: | ---: |
| Active artifact SHA-256 | `b60acc020ddad730ba7c7528dc9a98e349646c4eb47b24054ac4bf87bf1f3bfe` | `934bfcb6355ddcb065e09da0071d1c5cac8b2d59ebdf6d3cc2bf0d8880652b35` |
| Active UTF-16 code units | 14,285 | 14,286 |
| Active UTF-8 bytes | 14,327 | 14,331 |
| Complete-package UTF-16 code units | 32,391 | 32,392 |
| Complete-package UTF-8 bytes | 32,621 | 32,625 |

The canonical Unicode-code-point measurements remain exactly:

- original active file: 20,664;
- generated active file: 14,284;
- actual active-file reduction: 6,380 / 30.9%;
- complete emitted package: 32,383 / +56.7%;
- source accounting: 41 total / 28 retained / 13 moved / 0 deleted / 0
  unaccounted;
- moved instruction bodies: 13/13 byte-for-byte; and
- physical reconnect targets: 10.

`evidence/public_rc_v0_1/SHA256SUMS` synchronizes the changed expected active
artifact and the mechanically changed `EVIDENCE.md` and `reproduce.mjs` entries.
All other expected-artifact and moved-body hashes remain fixed.

## Visible screenshot refresh

The old result and artifact screenshots visibly contained obsolete lower-case
receipt examples. They were therefore recaptured from the actual local
application using the fixed `BEFORE_AGENTS.md` corpus, Balanced mode, default
theme, 100% zoom, and an exact 1440 × 1200 CSS-pixel viewport. No UI metric or
text was edited after capture. The unchanged input/mode asset remains the
previous approved hash.

| Tracked PNG | Dimensions | SHA-256 |
| --- | --- | --- |
| `docs/images/public_v0_1/public-v0_1-result-metrics.png` | 1440 × 1200 | `69866a5415ad135ff9b367865294cb7e5d20a450c51ef1cdfb03cfa417edcc0d` |
| `docs/images/public_v0_1/public-v0_1-input-mode.png` | 1440 × 1200 | `e650e12d15e5f4382670739094d1f7e8001c6ac4de79b5ef380d1c000d32bc4c` |
| `docs/images/public_v0_1/public-v0_1-artifacts-review.png` | 1440 × 1200 | `f7fdd314c9a2c4d085ef679b845fed79a14220cd868b1434e2552d523280b01d` |

The result image visibly retains `COMPACTED`, 30.9%, 20,664, 14,284, 32,383,
+56.7%, 0 unique instructions deleted, and the active-file versus complete-
package distinction. The artifact image visibly retains `AGENTS.md`, both
guides, `move-map.md`, the selected active-file preview, and all three local
actions. Neither image contains browser chrome or external/private content.

## Verification

- `npm test`: PASS — 108 passed, 0 failed, 0 cancelled, 0 skipped, 0 todo.
- `node evidence/public_rc_v0_1/reproduce.mjs`: PASS — exact fixed metrics,
  41/28/13 accounting, 13/13 moved-body preservation, and 10 routes.
- `git diff --check`: PASS.

## Boundaries and next gate

The feather represents only the lighter always-loaded instruction surface. It
does not establish token, cost, time, model-performance, verified-reading, or
verified-compliance claims.

Current Gate: `HOLD — marker implementation and evidence closure before
fixed-commit Fable review`.

Missing Closure: GPT review of the marker PR; Shin merge authorization;
resulting main commit freeze; Fable read-only review; and a separate
announcement decision. No marker PR merge or Fable review is authorized by
this record.
