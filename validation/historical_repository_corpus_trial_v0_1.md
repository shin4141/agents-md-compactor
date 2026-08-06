# Historical Repository Corpus Trial v0.1

Date: 2026-08-05 (Asia/Tokyo)

Product starting commit:
`684ee7f307cdfbddc6e5a862d2d220646d31be05`

Classification: `HOLD`

Reason: the nine-run qualification completed, but the corpus established an
exact deterministic classification defect. Mixed top-level Markdown heading
structure can create an indivisible oversized source block, and narrow keyword
category matches can then move universal safety or scope rules under an
incorrect conditional route in Aggressive mode. This record does not repair
the defect.

## Method and Source Isolation

The two historical repositories were cloned as bare repositories into a
temporary directory. No source worktree was created. Local hook paths were set
to `/dev/null`. Only `git show`, object/identity reads, and local product calls
were used. No source repository file, branch, commit, remote, pull request, or
visibility setting was changed.

The raw Git blobs were passed directly to the product at starting commit
`684ee7f307cdfbddc6e5a862d2d220646d31be05`. All generated files, Review with
Your AI packages, ZIPs, and temporary source copies stayed outside the product
repository. No full historical source is committed here.

## Exact Historical Sources

Trial A — real bloated English V13 instruction surface:

- repository: `shin4141/decision-os-v13-loopkit`
- source expression:
  `e3d1b29f4bfb0215ebde66ea60376c01b7f87327^:AGENTS.md`
- resolved commit: `21cd88d4efb378a60cd08a28712083d9d4a8bc19`
- Git blob: `f85b0d9b17a8f90a7128ea96d9c8f63a88022128`
- path: `AGENTS.md`
- source SHA-256:
  `e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db`
- size: 20,705 UTF-8 bytes; 20,664 Unicode code points; 7 parsed blocks

Trial B — real Japanese V13 instruction surface:

- repository: `shin4141/decision-os-v13-loopkit`
- source expression:
  `e3d1b29f4bfb0215ebde66ea60376c01b7f87327^:AGENTS.ja.md`
- resolved commit: `21cd88d4efb378a60cd08a28712083d9d4a8bc19`
- Git blob: `447b9f982abb80b991ca463d6cf430aea4a88e14`
- path: `AGENTS.ja.md`
- source SHA-256:
  `f49d32685ee0814d4c963c2805643f8b6d8623f23e92ede083b45c599aebbd29`
- size: 4,505 UTF-8 bytes; 2,301 Unicode code points; 10 parsed blocks
- repository fact: the path exists at the exact parent; no fallback commit was
  needed and no Japanese text was synthesized

Trial C — already-short V12 negative control:

- repository: `shin4141/decision-os-v12-completion-integrity`
- commit: `be1b3f70128d67e642d288c2bab9b53719720c37`
- Git blob: `f20b7345efc7a102c179d75710ef01e380cda442`
- path: `docs/v12-short-agents.md`
- source SHA-256:
  `7d02f19b5104fadea4355d7de2feb3bc2dc3ed95cd25a53d279f824b25e5786a`
- size: 1,014 UTF-8 bytes; 1,014 Unicode code points; 1 parsed block

Independent `shasum -a 256` checks matched all three source hashes above.

## Complete Nine-Run Metrics Matrix

Actual change uses the complete generated active file, including all router,
receipt, and generated spacing. A minus sign is a reduction; a plus sign is an
increase. Trial letters bind each row to the immutable source identity above.

| Trial | Mode | Outcome | Original | Active | Actual change | Source externalized | Source blocks | Retained | Moved | Guide inventory | Deleted | Accounted exactly once |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|---:|---|
| A | Conservative | `NO_ACTIVE_REDUCTION` | 20,664 | 20,840 | +176 (0.9%) | 0 (0.0%) | 7 | 7 | 0 | — | 0 | yes |
| A | Balanced | `NO_ACTIVE_REDUCTION` | 20,664 | 20,840 | +176 (0.9%) | 0 (0.0%) | 7 | 7 | 0 | — | 0 | yes |
| A | Aggressive | `COMPACTED` | 20,664 | 19,757 | -907 (4.4%) | 1,335 (6.5%) | 7 | 3 | 4 | `testing`, `release`, `handoff` | 0 | yes |
| B | Conservative | `COMPACTED` | 2,301 | 1,935 | -366 (15.9%) | 655 (28.5%) | 10 | 9 | 1 | `handoff` | 0 | yes |
| B | Balanced | `COMPACTED` | 2,301 | 1,935 | -366 (15.9%) | 655 (28.5%) | 10 | 9 | 1 | `handoff` | 0 | yes |
| B | Aggressive | `COMPACTED` | 2,301 | 1,084 | -1,217 (52.9%) | 1,644 (71.4%) | 10 | 5 | 5 | `release`, `handoff`, `other` | 0 | yes |
| C | Conservative | `NO_ACTIVE_REDUCTION` | 1,014 | 1,190 | +176 (17.4%) | 0 (0.0%) | 1 | 1 | 0 | — | 0 | yes |
| C | Balanced | `NO_ACTIVE_REDUCTION` | 1,014 | 1,190 | +176 (17.4%) | 0 (0.0%) | 1 | 1 | 0 | — | 0 | yes |
| C | Aggressive | `NO_ACTIVE_REDUCTION` | 1,014 | 1,190 | +176 (17.4%) | 0 (0.0%) | 1 | 1 | 0 | — | 0 | yes |

Every source block had one unique move-map entry and appeared in exactly one
of the retained or moved ledgers. Every deleted-source count was zero.

## Review and ZIP Evidence for All Nine Runs

`GENERATED_COMPLETE` means the Review with Your AI package contained the exact
source, selected mode, displayed facts, active file, every emitted guide,
move map, and review instructions. ZIP inventories below were independently
parsed from central and local records; `exact` means every stored entry byte
matched the corresponding generated artifact's UTF-8 bytes.

| Trial / mode | Review package | ZIP inventory | ZIP bytes | ZIP SHA-256 | Entry bytes |
|---|---|---|---:|---|---|
| A / Conservative | `GENERATED_COMPLETE`; 43,934 chars; `62f473f36bc2ee83b9ba31212e7587cbe2fdfd90de16f43772f471315bdfcc60` | `AGENTS.md`, `move-map.md` | 21,800 | `eece0e92e6dda960517faa70f9a00947cdf4c3619b085c87972ccfbdee01c159` | exact |
| A / Balanced | `GENERATED_COMPLETE`; 43,930 chars; `dfdcf558110111d83ce000c33f72d693464ef387b19e9485789cc5ddb9032cba` | `AGENTS.md`, `move-map.md` | 21,800 | `eece0e92e6dda960517faa70f9a00947cdf4c3619b085c87972ccfbdee01c159` | exact |
| A / Aggressive | `GENERATED_COMPLETE`; 45,180 chars; `9dc867159e1e0f772ab572a33828f466d93e97b67c16fb144eb1ce75a5912715` | `AGENTS.md`, `agent-guides/handoff.md`, `agent-guides/release.md`, `agent-guides/testing.md`, `move-map.md` | 23,175 | `0a726bd0aa1fb00b081ddae1ad9780c96825eb2c5b16e844bad35ae10816642f` | exact |
| B / Conservative | `GENERATED_COMPLETE`; 8,053 chars; `b55ccf0ac6996afd976d9554de8c099e1ba4206b813d521aba9b28253046027b` | `AGENTS.md`, `agent-guides/handoff.md`, `move-map.md` | 6,792 | `b7dac63dc4527c577d3e17e8052b2dfcba6b6ba2becbac392b43ecc4dd89bcb7` | exact |
| B / Balanced | `GENERATED_COMPLETE`; 8,049 chars; `ef7728c1a438288187886c3278b5ef0adb16db0733c6830ed7292d9a56541743` | `AGENTS.md`, `agent-guides/handoff.md`, `move-map.md` | 6,792 | `b7dac63dc4527c577d3e17e8052b2dfcba6b6ba2becbac392b43ecc4dd89bcb7` | exact |
| B / Aggressive | `GENERATED_COMPLETE`; 9,149 chars; `44dc3c035b78c0fffdf75098911687477c76739f7e427090f4efd719b570575c` | `AGENTS.md`, `agent-guides/handoff.md`, `agent-guides/other.md`, `agent-guides/release.md`, `move-map.md` | 7,889 | `972fb629bfad1b60659e62b493fea895d2ba44a56181eb696a6dbb2cf83be757` | exact |
| C / Conservative | `GENERATED_COMPLETE`; 4,194 chars; `08e355a28c7f9aaa59f6c52372eee448c0a7172d99d7ab1fff429770689bde08` | `AGENTS.md`, `move-map.md` | 1,671 | `6be833fc42bc8a12e2a474a05ed03344379320c83b4ce2777ed759eb8f4bd494` | exact |
| C / Balanced | `GENERATED_COMPLETE`; 4,190 chars; `9434754205dc4acd58fad584cbeb295aec4573c0d7737a81e1baa9c0624d7b51` | `AGENTS.md`, `move-map.md` | 1,671 | `6be833fc42bc8a12e2a474a05ed03344379320c83b4ce2777ed759eb8f4bd494` | exact |
| C / Aggressive | `GENERATED_COMPLETE`; 4,192 chars; `74a138cbac49e5c7d7217d0887fbd0c8393acff51c9266b6062475a193d3801c` | `AGENTS.md`, `move-map.md` | 1,671 | `6be833fc42bc8a12e2a474a05ed03344379320c83b4ce2777ed759eb8f4bd494` | exact |

Japanese source, active-file, guide, move-map, Review, and ZIP entry content
remained valid UTF-8. All Japanese ZIP entry bytes matched the visible
generated artifacts exactly.

## Qualitative Findings

### Trial A — English

- The source uses one large opening H1 section with many H2 subsections, then
  six additional H1 rules. Because there are multiple minimum-level H1
  headings, the deterministic parser selects H1 as its boundary. The first
  block is therefore 19,049 characters, or 92.2% of the source, and contains
  authority, V12/V13 handoff, reference routing, continuation proof, reporting
  templates, signal explanations, chat continuation, context health, update
  checks, promotion, and compression guidance as one indivisible unit.
- Conservative and Balanced retain all seven blocks. No guide is forced, but
  receipt overhead makes the active file 176 characters larger.
- Aggressive moves `Do Not Overbuild` to testing, `Output Discipline` and
  `Safety Rule` to handoff, and `CAP Rule` to release. `Gate Discipline` and
  `BLOCK Rule` remain active. These routes are syntactically readable but do
  not express the moved rules' actual universal triggers.
- Repository-wide authority inside the 19,049-character block stays active,
  but universal Safety, scope, output, and CAP rules do not all stay active in
  Aggressive. `Safety Rule` and `Do Not Overbuild` clearly should remain
  active; `Output Discipline` requires a loop-record trigger broader than
  handoff; `CAP Rule` requires a CAP-judgment trigger broader than release.
- Long explanations and examples for optional reporting extensions remain
  always loaded because they are trapped in the oversized first block. They
  are candidates for routing or compaction, but the first inspection did not
  rewrite them.
- No exception was detached from its parent rule. Each complete source block
  moved or remained atomically.
- The Lightweight Guidance Receipt is present once and remains compact. Guide
  files contain only their canonical receipt name and do not duplicate the
  active receipt contract.

### Trial B — Japanese

- Conservative and Balanced move the 655-character `最小運用ロジック`
  (minimum operating logic) section to the handoff guide. That section contains
  broad always-applicable scope, authorization, safety, and completion rules;
  a handoff-only trigger is too narrow.
- Aggressive also moves `何のためか` and `判断ロジック最小版` to handoff,
  `V12 / V13 の意味` to `other`, and `やってはいけないこと` to release.
  The last section is a general prohibition block, not release-only guidance.
- The generated routers are concise, but the handoff and release labels do not
  tell an agent to load these rules during ordinary implementation. The 52.9%
  reduction is therefore not sufficient evidence that the Aggressive package
  is an acceptable replacement.
- No Japanese exception was detached from its parent section. The receipt was
  present once and compact in every mode.
- The historical file describes itself as a Japanese entry/guide whose
  canonical rules remain in `AGENTS.md`, not as a full replacement. This
  limits what its absolute reduction can establish.

### Deterministic Defect Statement

The corpus establishes a product-classification defect, not merely a
repository preference:

1. block granularity depends on the minimum heading level when a document has
   multiple top-level headings, allowing one early H1 to absorb many
   independently routable H2 domains; and
2. in Aggressive mode, a narrow category signal can outrank the universal
   meaning of a prohibition, safety, scope, or CAP rule and move it under an
   incomplete trigger.

The defect is reproducible from the exact blobs above. No repair is authorized
or included in this qualification commit.

## Trial C — Negative Control

All three modes correctly emitted no guides and returned
`NO_ACTIVE_REDUCTION`. The complete active file increased from 1,014 to 1,190
characters: 176 more characters, or 17.4%, entirely from the compact receipt
layer. Source externalization was 0.0%.

The UI view model says `No active-file reduction in this mode.`, displays
`17.4% larger`, and states: `The selected mode did not reduce the active file;
do not replace the original solely for context reduction.` This is a
successful refusal to force compaction, not a product failure.

## Historical Human Benchmark Comparison

Human-compressed benchmark identity:

- repository: `shin4141/decision-os-v13-loopkit`
- commit: `e3d1b29f4bfb0215ebde66ea60376c01b7f87327`
- Git blob: `2deb6f610f8e3a4e67808a0182cb2439a7abc447`
- path: `AGENTS.md`
- SHA-256:
  `bb14c77c6b45c6bf365902b47729b455df566fa98688956824e072c352f2dae7`
- size: 11,147 UTF-8 bytes; 11,141 Unicode code points; 10 parsed blocks

The human benchmark is 9,523 characters, or 46.1%, smaller than Trial A's
20,664-character source. This is a descriptive comparison, not evidence that
the human result is superior.

The human result keeps decision ownership and authority, evidence and
continuation boundaries, completion/Gate semantics, execution and safety,
handoff responsibility, concept promotion, the canonical base report, and
conditional-extension rules active. It consolidates conditional references
into a compact routing table and removes or compresses many repeated examples
and full optional footer explanations. Its routing domains include next-action
selection, Gate mapping, CAP selection, context health, handoff, compression,
Field Notes, scaffolding, Decision Packets, and Build closeout; those do not
map one-to-one to the Compactor's seven named specialist categories.

The Compactor preserves all original source instructions byte-for-byte and
accounts for every block, while the human benchmark intentionally rewrites and
consolidates text. The human result adds clearer explicit Decision Owner and
authority language and does not preserve every historical example verbatim.
The Compactor Aggressive result preserves those examples but moves four broad
rules under misleading specialist triggers.

Conservative and Balanced are identical for Trial A and more closely match the
human benchmark's safety intent because they keep every broad rule active, but
they provide no compaction and increase the active file by 0.9%. Aggressive is
the only mode with a real Trial A reduction, but its 4.4% reduction comes with
incorrect routing. No Compactor mode is an acceptable automatic replacement
for this historical English source without resolving or consciously accepting
the defect.

## Review with Your AI Trial

The strongest Trial A reduction was Aggressive: 20,664 to 19,757 active
characters, a 4.4% reduction. Its complete Review with Your AI package was
45,180 characters with SHA-256
`9dc867159e1e0f772ab572a33828f466d93e97b67c16fb144eb1ce75a5912715`.

That exact package was submitted once to a separate visible ChatGPT review
context with instructions to return only specific recommendations and classify
each as `product-classification defect`, `repository-specific preference`, or
`no change required`. No recommendation was applied.

Five stable recommendations were captured:

1. `product-classification defect`: restore `Safety Rule` to active
   `AGENTS.md`; a handoff-only route omits prompt-injection and safety rules
   during ordinary tasks.
2. `product-classification defect`: restore `Do Not Overbuild` to active
   `AGENTS.md`; testing does not describe its universal scope boundary.
3. `product-classification defect`: broaden the `Output Discipline` trigger
   from handoff to any full V13 Loop Record.
4. `product-classification defect`: use a CAP-specific trigger instead of a
   release-only trigger for `CAP Rule`. Creating a new guide category would be
   a product decision and was not adopted.
5. `repository-specific preference`: use Conservative for this governance-
   heavy repository rather than accept Aggressive's small reduction and
   conditional-omission risk. This recommendation was not adopted.

The stable captured response was 2,455 characters with SHA-256
`0fcac0623d9b029bf13c807c7c7c3d32d8b2506d09d966c7275b43937b231a1b`.
The visible control reported one assistant response, but continued to expose a
generation-active signal and never confirmed completion during bounded polling.
The five complete visible recommendations above are therefore review evidence
with completion unconfirmed, not a claim about a finalized model response or
model identity. No special model configuration was verified.

## Limitations

- Three historical inputs are useful corpus evidence, not general reliability
  evidence or external adoption.
- Trial B is a Japanese entry/guide and is materially shorter than Trial A;
  its 52.9% Aggressive reduction must not be compared as if the surfaces had
  the same role.
- Character counts measure Unicode code points, not tokens, runtime context
  use, cost, speed, or model compliance.
- The human benchmark is a semantic rewrite, not a byte-preserving reference
  output, and size alone cannot choose between it and a generated package.
- Review with Your AI is another model's judgment. Its response completion was
  not confirmed, and none of its suggestions was automatically adopted.
- Source-repository remotes were not modified; temporary bare-repository config
  changed only the local hook path to `/dev/null`.

## Decision and Rollback

Current Gate:
`HOLD — deterministic classification defect established; awaiting Shin review`

The next product decision is whether to authorize one bounded repair covering
historical Markdown section granularity and universal-rule protection, or to
accept and document the limitation for v0.1. Repair, release, hosting,
visibility changes, marketing, and further product development are not
authorized by this record.

Rollback: revert the validation commit that adds this record and updates the
current handoff. No product logic or historical source repository requires
rollback.
