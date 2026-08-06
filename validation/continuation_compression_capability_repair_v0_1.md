# Continuation/Compression Capability Repair v0.1

## Classification and Gate

- Classification: `PASS`
- Starting commit: `41763249ffcfa651474d0440efa4e9d389bc5a28`
- Bounded implementation commit:
  `01454bfe79181b7ad94144124a0ca7cf243e30ad`
- Branch: `codex/v0-1-contract-vertical`
- Gate after PASS:
  `HOLD — awaiting Shin acceptance of demonstrated v0.1 capability`

The authorized deterministic repair establishes useful net active-file
reduction on the exact historical V13 source without semantic rewriting. This
is implementation and local qualification evidence, not public-release,
adoption, token, cost, speed, recall, or compliance evidence.

## Exact Bounded Recognition Rule

The repair changes only complete, structurally independent H2 source spans in
the existing `handoff` guide family. Heading recognition is bounded to:

- English: `Chat Continuation`, `Session Continuation`, `Context Compression`,
  and `Context Compaction`, with only the fixed optional suffixes `Footer`,
  `Signal`, `Rule(s)`, or `Guidance`;
- Japanese: `チャット継続`, `セッション継続`, `コンテキスト圧縮`, and
  `文脈圧縮`, with only the fixed optional Japanese equivalents of those
  suffixes.

Heading recognition alone is insufficient. The span must be the whole authored
H2 block, and its first body paragraph must contain both explicit conditional
syntax and a bounded continuation/compression trigger. Recognized English
triggers include significant or accumulated context, long context or
discussion, multiple decisions, continuation risk, handoff-sensitive work,
inefficient raw history, repeated decisions, accumulated project state, or a
handoff/compression/compaction decision. Recognized Japanese triggers cover the
authorized long-context, continuation-risk, inefficient-history, compression,
and handoff-decision forms.

A recognized lookalike remains active in every mode when it is nested, lacks
the explicit trigger, contains an unqualified every-task/every-response rule,
defines final authority or a Decision Owner boundary, defines repository-wide
safety, defines mandatory completion evidence, or remains materially
ambiguous. Aggressive does not bypass this guard.

## Whole-Section Preservation and Canonical Ownership

Eligible sections move as complete source spans. The exact source byte sequence
between each generated `source-span` marker equals the original span, including
its H2 heading, definitions, enum values, output templates, exceptions,
qualifiers, examples, nested headings, lists, blank lines, and code fences.

Chat Continuation and Context Compression keep separate source-span IDs and
condition signatures even though both live in `agent-guides/handoff.md`. Each
has one canonical destination; neither is copied into the active file or a
second guide. The source ledger balances retained, moved, and folded spans and
reports zero unique deletions and zero unaccounted spans.

## Stable Reconnect Routes

The handoff guide emits one explicit deterministic anchor and heading for each
bounded family. The active file contains exactly these routes when both are
present:

```markdown
- For chat/session continuation risk or `CHAT_CONTINUE / PREPARE_HANDOFF / HANDOFF_NOW`, read `agent-guides/handoff.md#chat-continuation`
- When long context may require `KEEP / COMPRESS / HANDOFF`, read `agent-guides/handoff.md#context-compression`
```

The routes target the relevant subsection rather than asking an agent to read
the handoff guide for unrelated work.

## Focused Test Matrix

| Test | Conservative | Balanced | Aggressive | Result |
|---|---|---|---|---|
| Complete English Chat Continuation H2 routes intact | pass | pass | pass | one `handoff` canonical home |
| Complete English Context Compression H2 routes intact | pass | pass | pass | separate span in the same guide |
| Conditional Japanese equivalents route intact | pass | pass | pass | exact Unicode preserved |
| Similar unconditional or ambiguous headings | retained | retained | retained | no guide emitted |
| Nested H3 lookalikes under a universal H2 | retained | retained | retained | parent boundary preserved |
| Authority, safety, evidence, and completion guards | retained | retained | retained | Aggressive cannot bypass |
| Stable route anchors and exact source accounting | pass | pass | pass | zero duplicate/unaccounted spans |
| Review and deterministic ZIP package | pass | pass | pass | complete exact artifacts |

`npm test` completed with 95 tests: 95 passed, 0 failed, 0 skipped,
0 cancelled, and 0 todo. The previous 91 tests remain green; four focused tests
were added. Those existing tests also cover copy, move-map, exact-duplicate
repetition, Unicode, deterministic ZIP, local-only privacy, server/CSP, and UI
behavior. `git diff --check` passed.

## SHA-Bound Historical Requalification

The existing SHA-bound replay tool read the sources from fresh disposable bare
clones. Neither historical repository was modified.

| Role | Exact identity | Git blob | SHA-256 | Bytes | Characters |
|---|---|---|---|---:|---:|
| Original | `21cd88d4efb378a60cd08a28712083d9d4a8bc19:AGENTS.md` | `f85b0d9b17a8f90a7128ea96d9c8f63a88022128` | `e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db` | 20,705 | 20,664 |
| Human+AI benchmark | `e3d1b29f4bfb0215ebde66ea60376c01b7f87327:AGENTS.md` | `2deb6f610f8e3a4e67808a0182cb2439a7abc447` | `bb14c77c6b45c6bf365902b47729b455df566fa98688956824e072c352f2dae7` | 11,147 | 11,141 |

The repaired three-mode result is identical except for the selected mode
recorded in Review:

| Mode | Original | Complete active | Actual reduction | Retained | Moved | Folded | Guides | Outcome |
|---|---:|---:|---:|---:|---:|---:|---|---|
| Conservative | 20,664 | 17,350 | 3,314 / 16.0% | 19 | 2 | 0 | `agent-guides/handoff.md` | `COMPACTED` |
| Balanced | 20,664 | 17,350 | 3,314 / 16.0% | 19 | 2 | 0 | `agent-guides/handoff.md` | `COMPACTED` |
| Aggressive | 20,664 | 17,350 | 3,314 / 16.0% | 19 | 2 | 0 | `agent-guides/handoff.md` | `COMPACTED` |

All modes externalize exactly 3,800 source characters (18.4%) while reporting
the smaller 3,314-character complete-active-file reduction as the primary
metric. No mode misstates router and receipt overhead as a saving.

### Exact Moved Spans

| Source span | Heading | Characters | Source-span SHA-256 | Disposition |
|---|---|---:|---|---|
| `S007-5ad40d78` | Chat Continuation Footer | 1,494 | `dcc08fca58368bc72bb0bb6303def2ab2b4d108937935bdde6d43a26c3c320a7` | conditional → `agent-guides/handoff.md` |
| `S011-839255fb` | Context Compression Footer | 2,306 | `7aa407951eaac7a1109e485b70271498af6c3b35e550fe96e2138309b6c2f45e` | conditional → `agent-guides/handoff.md` |

Each extracted generated source span equals its original source text exactly.
Their condition signatures remain separate:
`handoff:section:chat-continuation` and
`handoff:section:context-compression`.

### Retained Universal and Protected Inventory

The remaining 19 spans stay active. Sixteen are classified `UNIVERSAL`; two
remain conservatively `UNQUALIFIED_ACTIVE`; one Safety Rule remains
`AMBIGUOUS`. The active inventory includes:

- V12 → V13 Handoff Discipline and Operational Judgment Core References;
- Continuation Proof Selection and the canonical base report;
- Active Signals, Context Health, update checking, and Concept Promotion;
- Agent Rule, Do Not Overbuild, Output Discipline, and Gate Discipline;
- all four authored Safety Rule spans; and
- CAP and BLOCK rules.

This preserves the original authority, safety, evidence, completion, Gate,
Decision Owner/final-Seat, CAP/BLOCK, and reconnect boundaries. The only moved
spans are the two authorized conditional H2 sections. Unique instructions
deleted: 0. Unaccounted source spans: 0.

## Complete Package Integrity

Every mode emits the same three visible artifacts:

| Artifact | Characters | SHA-256 |
|---|---:|---|
| `AGENTS.md` | 17,350 | `4e8ad9c6ced27daadf8aa760159776d3131dcaa7c47f08b99a88cef23a1dc035` |
| `agent-guides/handoff.md` | 4,113 | `1eda2561588f3ffed298a06fcddb8af9d4ea4244abe53eb4e4531f264a22fbfa` |
| `move-map.md` | 3,695 | `e2f05a8a536aad1a889f1ad6b35fa4d1c871f7698c609783264164d79f4c2d8d` |

Review contains the exact original plus all three artifacts. Its SHA-256 is
mode-specific because the selected mode is explicit: Conservative
`8f2996893cdd38c8bba589a7ca7553e25549880148f70747f855580ad6a18c61`,
Balanced
`f2a53fd4cdb9d1ac27ba077dbb591163944a4a615c28584c069a0bdd7d108c41`,
and Aggressive
`4146fa2e00b111f61189a3f57b417146f2ae343363363f9cc6927bd75d0451fb`.
The deterministic ZIP is 25,624 bytes with SHA-256
`307f1824eb29356cd15b22a230a4861e495c18fd144f77316a21f0b1e9ffa9a8`
in all modes. Its stored entries exactly match the preview artifact text and
order. Copy behavior remains covered by the unchanged passing UI tests.

## Human Benchmark Comparison

The repaired engine's 16.0% reduction is 30.1 percentage points below the
human+AI benchmark's 46.1% reduction. Its active file is 6,209 characters
larger than the 11,141-character human result. That difference does not fail
this repair: the human result obtains most of its additional reduction through
semantic consolidation, paraphrase, template removal, and repository-aware
routing, all outside this deterministic authorization.

The repair proves the narrower product question: the engine can produce a
useful positive net reduction on the real historical file by moving two intact,
explicitly conditional sections, while refusing to rewrite or move the
remaining protected material.

## Privacy Regression

No UI, CSS, server, privacy copy, export format, branding, or README file
changed. The local-only privacy tests pass unchanged: no network or persistence
API was added, CSP/server behavior is unchanged, Review remains an explicit
clipboard-only action, and deterministic ZIP remains local. A new live-browser
privacy run was not required because browser/server production code did not
change.

## Limitations and Rollback

- Recognition is intentionally lexical and structural, not semantic proof.
- Only whole independent H2 sections with bounded headings and leading triggers
  qualify; nested, differently named, or unusual trigger forms may remain
  active.
- Conservative false refusals are preferable to routing an ambiguous universal
  rule. No external model or repository knowledge is used.
- Character counts are not token, cost, speed, recall, or compliance measures.
- Stable reconnect routes do not guarantee that an agent will read or obey a
  guide.

Rollback is to revert implementation commit
`01454bfe79181b7ad94144124a0ca7cf243e30ad` and the closeout commit containing
this validation record and handoff, rerun `npm test`, and replay the exact
SHA-bound historical source. No migration or stored user data exists.

## Completion Line

The bounded sections route only under explicit conditional scope; their whole
source spans remain exact and separate in one canonical guide; reconnect
anchors are stable; all protected rules remain active; all three historical
modes produce positive complete-active-file reduction; unique deletion and
unaccounted-span counts are zero; all 95 tests and the SHA-bound Review/ZIP
replay pass; and no unrelated scope was added.

The only missing closure is Shin's acceptance of this demonstrated capability.
Until that acceptance, do not describe v0.1 internally as capability complete
and do not start release, publication, hosting, visibility, pricing, branding,
or external-claim work.
