# Public screenshot plan v0.1

## Scope

This is the smallest planned README screenshot set: three product states, no
marketing composites, no edited metrics, and no user-provided content. All
three captures were originally A-2 visually approved and integrated. The
result-metrics capture was mechanically refreshed from the same fixed state
when its complete-package disclosure became stale; the input/mode and
artifacts/review captures remain unchanged.

Use the tracked public historical corpus
`evidence/public_rc_v0_1/BEFORE_AGENTS.md` in every capture. Select
**Balanced**. It is the fixed, safe-frontier corpus and makes the visible
values reproducible. Do not use a personal, private, or external corpus.

## Capture settings

- Browser: desktop Chromium-compatible browser, 100% zoom.
- Viewport: use the capture viewport recorded with each asset; the current
  result-metrics capture uses 835 × 1200 CSS pixels and retains its raw
  820 × 1114 pixel browser output.
- Application: `npm run ui`, served at `http://127.0.0.1:4173`.
- Source: paste the exact tracked `BEFORE_AGENTS.md` with no edits.
- Mode: `Balanced`.
- Presentation: default UI theme, no browser extensions or developer tools
  visible, no crop that changes the described evidence boundary.

## Integration record

| Display order | Tracked path | Status | SHA-256 |
| ---: | --- | --- | --- |
| 1 | `docs/images/public_v0_1/public-v0_1-result-metrics.png` | Captured from the repaired fixed result; integrated | `cd1f1f67b6d55d845ab15051249f1f44d9749b3d711c5f2d07bf38ad1d621877` |
| 2 | `docs/images/public_v0_1/public-v0_1-input-mode.png` | Captured; A-2 visually approved; integrated | `e650e12d15e5f4382670739094d1f7e8001c6ac4de79b5ef380d1c000d32bc4c` |
| 3 | `docs/images/public_v0_1/public-v0_1-artifacts-review.png` | Captured; receipt copy refreshed; integrated | `f7fdd314c9a2c4d085ef679b845fed79a14220cd868b1434e2552d523280b01d` |

## README placement plan

The approved captures are integrated in this display order. The result image
comes first so the reader sees the active-file/package distinction before the
input form. Each image links to the authoritative
[`Evidence and reproducibility`](../evidence/public_rc_v0_1/EVIDENCE.md)
record.

| Display order | File name | README insertion section | Markdown alt text | Caption | Recommended display width | Authoritative evidence |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `public-v0_1-result-metrics.png` | `## Demonstrated historical result`, after the package-total disclosure and before `## How the third option works` | “Compaction result showing 30.9% active-file reduction from 20,664 to 14,284 Unicode code points and a 36,103-code-point full package.” | “The active file is smaller; the complete routed package is larger because it preserves reconnectable knowledge and traceability.” | 100% of the README column, maximum 1,152 px | [Evidence and reproducibility](../evidence/public_rc_v0_1/EVIDENCE.md) |
| 2 | `public-v0_1-input-mode.png` | `## v0.1 Promise`, after the four-step flow | “Pasted public historical AGENTS.md source with Balanced selected in AGENTS.md Compactor.” | “Paste one AGENTS.md, choose a compaction mode, and keep the source in the browser.” | 100% of the README column, maximum 1,152 px | [Evidence and reproducibility](../evidence/public_rc_v0_1/EVIDENCE.md) |
| 3 | `public-v0_1-artifacts-review.png` | `## What the output contains`, after the output list | “Generated active AGENTS.md, routed guides, move map, and local review and ZIP actions.” | “Inspect the active file, every routed guide, and the move map before copying a review package or downloading the ZIP.” | 100% of the README column, maximum 1,152 px | [Evidence and reproducibility](../evidence/public_rc_v0_1/EVIDENCE.md) |

| File name | Exact screen state | Visible values | Caption | Evidence boundary |
| --- | --- | --- | --- | --- |
| `public-v0_1-input-mode.png` | Fresh page after the tracked corpus is pasted, before **Generate**. Keep the source textarea, the `Balanced` choice, the mode explanation, and the local-only privacy card in frame. | The corpus text is visible only as its first on-screen lines; `Balanced` is selected; no result is shown. | “Paste one AGENTS.md, choose a compaction mode, and keep the source in the browser.” | Demonstrates the input and selection surface only. It does not prove a result, privacy beyond the stated application boundary, or performance on the visible source. |
| `public-v0_1-result-metrics.png` | Click **Generate**, then scroll so the outcome banner, all three metric cards, and the first generation counts are in frame. | `COMPACTED`; `30.9%`; `20,664`; `14,284`; `36,103 Unicode code points`; `74.7% larger than the original`; `0` unique instructions deleted. | “The active file is smaller; the complete routed package is larger because it preserves reconnectable knowledge and traceability.” | Shows the fixed historical result for this corpus and mode. It is not a token, cost, latency, model-quality, or general-performance claim. |
| `public-v0_1-artifacts-review.png` | Continue from the generated result and scroll to show the generated-file list, selected active `AGENTS.md` preview, **Review with your AI**, and ZIP actions. Keep the guide names and `move-map.md` visible. | `AGENTS.md`, `agent-guides/handoff.md`, `agent-guides/other.md`, `move-map.md`; `Copy Review with your AI`; `Copy selected file`; `Download ZIP`. | “Inspect the active file, every routed guide, and the move map before copying a review package or downloading the ZIP.” | Demonstrates available local actions. “Review with your AI” copies to clipboard only; it does not call an external AI service or establish external review. |

## Capture checks

Before approval, confirm that the historical corpus and Balanced mode were
used; the screenshot filename matches this plan; no private content, browser
chrome, extension UI, or unrelated application is visible; and the caption
still matches the exact UI state. The result screenshot must retain the
complete-package disclosure next to the active-file reduction rather than
cropping it into a footnote. Those checks passed for the current tracked assets
listed above.

These screenshots are explanatory product images. The authoritative evidence
remains [`evidence/public_rc_v0_1/EVIDENCE.md`](../evidence/public_rc_v0_1/EVIDENCE.md)
and its offline reproduction script.
