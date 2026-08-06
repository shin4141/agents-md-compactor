# Historical Corpus Classification Repair v0.1

Date: 2026-08-05 (Asia/Tokyo)

Starting commit:
`07928d1337d790e920276ac76aa335aeb60bd554`

Classification: `PASS`

The bounded repair fixes the two defects established in
`validation/historical_repository_corpus_trial_v0_1.md`: mixed H1/H2 block
granularity and universal-rule movement caused by narrow category signals.
No UI, branding, dependency, guide-category, ZIP-format, review-prompt, or
public-product scope changed.

## Repair

### Mixed H1/H2 Markdown

When both H1 and H2 headings exist, H1 headings now establish document
context and H2 headings establish primary classification blocks. Text before
the first H2 remains in its own block. H3+ descendants, list trees, procedures,
and fenced code stay attached to the governing H2 block. Documents without a
mixed H1/H2 structure retain the prior bounded shallowest-heading behavior.

This changes historical Trial A from 7 blocks, including one 19,049-character
opening block, to 18 independently reviewable blocks. No Markdown AST
dependency was added.

### Universal-rule guard

Routing now distinguishes:

- explicit specialist scope established by the leaf heading or a condition
  clause that matches the selected category;
- unqualified universal obligations, prohibitions, authority boundaries,
  completion/evidence rules, and safety rules; and
- ambiguous category matches without an explicit task condition.

Universal and ambiguous blocks stay active in every mode. Aggressive cannot
override this guard. A genuine scoped condition such as `When preparing a
release`, `If a test fails`, or `移行作業の場合` remains eligible for routing.
A mixed block containing an unqualified universal clause remains active even
if another clause contains a category condition.

## Immutable Inputs and Replay Method

Full historical sources are not copied into this product repository. The
qualification uses fresh temporary bare clones, disabled local hooks, exact
Git object identities, and SHA-256 verification before the product contract is
called. The deterministic replay is:

```text
git clone --bare https://github.com/shin4141/decision-os-v13-loopkit.git <v13-bare.git>
git clone --bare https://github.com/shin4141/decision-os-v12-completion-integrity.git <v12-bare.git>
git --git-dir=<v13-bare.git> config core.hooksPath /dev/null
git --git-dir=<v12-bare.git> config core.hooksPath /dev/null
node tools/replay_historical_corpus.mjs --v13-git-dir <v13-bare.git> --v12-git-dir <v12-bare.git>
```

The replay validates source commit, path, blob, SHA-256, byte and character
counts, block count, every source disposition, Review with Your AI contents,
and independently parsed ZIP entry bytes. It exits nonzero on any mismatch.

Three minimum exact historical defect excerpts are checked into `test/fixtures`
rather than the full sources:

| Fixture | Exact source slice | SHA-256 |
|---|---|---|
| `historical-v13-universal-rules.md` | Trial A lines 446–end at the resolved parent | `5268c8bac862a0ce0066b36bf2fceb815027e4c1cc1e6af539a41fb67d4b04e7` |
| `historical-v13-ja-operating-logic.md` | Trial B lines 11–49 at the resolved parent | `fdea90e973b0b1ea47995242b941db707d19ff56d3bb602747c882151d283bb1` |
| `historical-v13-ja-prohibitions.md` | Trial B lines 103–109 at the resolved parent | `1602e803038f7fdef9c143f99cf07dd5e2387c05289580d4b229e5b65d78376c` |

## Exact Historical Sources

Trial A — real bloated English V13 instruction surface:

- repository: `shin4141/decision-os-v13-loopkit`
- resolved commit: `21cd88d4efb378a60cd08a28712083d9d4a8bc19`
- path: `AGENTS.md`
- Git blob: `f85b0d9b17a8f90a7128ea96d9c8f63a88022128`
- SHA-256:
  `e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db`
- 20,705 UTF-8 bytes; 20,664 Unicode code points; 18 repaired blocks

Trial B — real Japanese V13 instruction surface:

- repository: `shin4141/decision-os-v13-loopkit`
- resolved commit: `21cd88d4efb378a60cd08a28712083d9d4a8bc19`
- path: `AGENTS.ja.md`
- Git blob: `447b9f982abb80b991ca463d6cf430aea4a88e14`
- SHA-256:
  `f49d32685ee0814d4c963c2805643f8b6d8623f23e92ede083b45c599aebbd29`
- 4,505 UTF-8 bytes; 2,301 Unicode code points; 10 blocks

Trial C — already-short V12 negative control:

- repository: `shin4141/decision-os-v12-completion-integrity`
- commit: `be1b3f70128d67e642d288c2bab9b53719720c37`
- path: `docs/v12-short-agents.md`
- Git blob: `f20b7345efc7a102c179d75710ef01e380cda442`
- SHA-256:
  `7d02f19b5104fadea4355d7de2feb3bc2dc3ed95cd25a53d279f824b25e5786a`
- 1,014 UTF-8 bytes; 1,014 Unicode code points; 1 block

## Repaired Nine-run Matrix

All three historical inputs are governance-heavy under the bounded v0.1
categories. The repaired classifier correctly refuses to force a split. Every
mode retains every block, emits no guide, externalizes zero source characters,
and reports the generated receipt overhead as an increase rather than a
saving.

| Trial | Mode | Outcome | Original | Active | Actual change | Externalized | Blocks retained | Guides |
|---|---|---|---:|---:|---:|---:|---:|---|
| A | Conservative | `NO_ACTIVE_REDUCTION` | 20,664 | 20,840 | +176 (0.9%) | 0 | 18 / 18 | — |
| A | Balanced | `NO_ACTIVE_REDUCTION` | 20,664 | 20,840 | +176 (0.9%) | 0 | 18 / 18 | — |
| A | Aggressive | `NO_ACTIVE_REDUCTION` | 20,664 | 20,840 | +176 (0.9%) | 0 | 18 / 18 | — |
| B | Conservative | `NO_ACTIVE_REDUCTION` | 2,301 | 2,477 | +176 (7.6%) | 0 | 10 / 10 | — |
| B | Balanced | `NO_ACTIVE_REDUCTION` | 2,301 | 2,477 | +176 (7.6%) | 0 | 10 / 10 | — |
| B | Aggressive | `NO_ACTIVE_REDUCTION` | 2,301 | 2,477 | +176 (7.6%) | 0 | 10 / 10 | — |
| C | Conservative | `NO_ACTIVE_REDUCTION` | 1,014 | 1,190 | +176 (17.4%) | 0 | 1 / 1 | — |
| C | Balanced | `NO_ACTIVE_REDUCTION` | 1,014 | 1,190 | +176 (17.4%) | 0 | 1 / 1 | — |
| C | Aggressive | `NO_ACTIVE_REDUCTION` | 1,014 | 1,190 | +176 (17.4%) | 0 | 1 / 1 | — |

Each run deleted zero blocks and accounted for every block exactly once. With
no emitted guides, there is no incomplete router. The result is operationally
useful as an honest refusal: the selected mode does not recommend replacing a
governance-heavy original solely for context reduction.

## Qualitative Acceptance

Trial A now exposes every H2 domain independently for classification, while
H3 `Conditional Extensions` remains attached to its governing H2 section.
Despite that finer granularity, authority, Decision Owner, completion,
evidence, safety, CAP, BLOCK, Gate, and universal reporting rules all remain
active. The former Aggressive misroutes of `Do Not Overbuild`, `Output
Discipline`, `Safety Rule`, and `CAP Rule` are gone.

Trial B keeps `最小運用ロジック`, `判断ロジック最小版`, and
`やってはいけないこと` active in every mode. General owner-approval,
prohibition, completion, and scope rules are no longer hidden behind handoff or
release routes.

Focused English and Japanese tests additionally prove that genuinely scoped
release, testing, handoff, and migration conditions remain routable. An
ambiguous category mention remains active. Exact historical excerpt tests
prove Aggressive cannot bypass the guard because of testing, release, handoff,
migration, safety, deploy, or public-surface keywords.

The unchanged realistic large English, Japanese, and mixed fixtures still
achieve positive complete active-file reduction in Balanced mode. Small clean
inputs still return `NO_ACTIVE_REDUCTION` without forcing guide creation.

## Review and ZIP Regression Evidence

Every run's Review with Your AI package contained the exact original source,
selected mode, reduction facts, active file, move map, and review
instructions. Every ZIP contained the complete visible generated inventory,
and independently decoded UTF-8 entry content matched the generated artifact
bytes exactly.

| Trial / modes | Inventory | ZIP bytes | ZIP SHA-256 |
|---|---|---:|---|
| A / all three | `AGENTS.md`, `move-map.md` | 23,018 | `aacc52e3fb1fa41719b9f30481bec3f0f858a6c44885ffbdb4a4e9a87be74006` |
| B / all three | `AGENTS.md`, `move-map.md` | 6,357 | `3e6bc149ff08b57d178763e7fd6b957ff1883e0d533bb3c37d688b26d7fac5c8` |
| C / all three | `AGENTS.md`, `move-map.md` | 1,671 | `6be833fc42bc8a12e2a474a05ed03344379320c83b4ce2777ed759eb8f4bd494` |

Review package hashes are mode-specific because the selected mode is included:

| Trial | Conservative | Balanced | Aggressive |
|---|---|---|---|
| A | `da60c3082795d3ee66ddbb2339c4b5dd6b6b2cca70b23d8d09dd2a9e80536bac` | `c9ee13639d9d6905e8bf558b40797b593cb307979c845b8ee3f00b1336f2539e` | `2aa153a9aa0147c712d6a6f87c2fb411a8a8c713d1c613aa0e8ad79ab9995bf0` |
| B | `cd4e89bd3dbde944b4df02d87bb1c060364cd9022087f711fd2bad4ac65a4b3e` | `4827f4090179f84d3473a3a0798090c1fb3805e17f49866b25b37797237c2a0b` | `a5d6ff43b28a1d7e74a5d4857a92696447e4a65410bf18fafa8a2bda9ce7cb2d` |
| C | `08e355a28c7f9aaa59f6c52372eee448c0a7172d99d7ab1fff429770689bde08` | `9434754205dc4acd58fad584cbeb295aec4573c0d7737a81e1baa9c0624d7b51` | `74a138cbac49e5c7d7217d0887fbd0c8393acff51c9266b6062475a193d3801c` |

The existing UI, copy, receipt, Unicode, Review, and deterministic ZIP tests
remain green. No external model or broad LLM classifier was used.

## Human Benchmark Comparison

The human-compressed benchmark remains:

- commit: `e3d1b29f4bfb0215ebde66ea60376c01b7f87327`
- path: `AGENTS.md`
- Git blob: `2deb6f610f8e3a4e67808a0182cb2439a7abc447`
- SHA-256:
  `bb14c77c6b45c6bf365902b47729b455df566fa98688956824e072c352f2dae7`
- 11,147 UTF-8 bytes; 11,141 Unicode code points; 10 repaired blocks

It is 9,523 characters, or 46.1%, smaller than Trial A. That result rewrites
and consolidates meaning; the Compactor preserves every source block
byte-for-byte. The repaired Compactor is therefore correctly more conservative
than the human rewrite. Size alone does not establish superiority, and the
benchmark is not a target hash.

## Verification

- `npm test`: 79 tests; 79 passed; 0 failed; 0 skipped; 0 cancelled; 0 todo
- focused regression additions: 3 tests
- previous suite retained: 76 tests
- SHA-bound historical replay: 9 of 9 runs passed
- source dispositions: every block exactly once; zero deleted
- `git diff --check`: passed

## Limitations

- This remains a three-file historical corpus, not general semantic or runtime
  reliability evidence.
- The universal guard is deterministic and lexical. It deliberately prefers
  keeping ambiguous text active and may refuse useful externalization.
- Character counts are not token, cost, speed, recall, or compliance metrics.
- Trial B is a Japanese entry/guide rather than a full canonical replacement.
- The human benchmark is a semantic rewrite, not a byte-preserving reference.

## Gate and Next Action

Current Gate:
`HOLD — awaiting Shin review of repaired historical corpus evidence`

Next authorized action: Shin reviews this repaired corpus record and the local
v0.1 product result. No further classifier refinement, UI work, release,
hosting, visibility change, marketing claim, or external-user testing is
authorized by this PASS.

Rollback: revert the classification-repair implementation commit. The prior
validation record remains the exact before-repair evidence.
