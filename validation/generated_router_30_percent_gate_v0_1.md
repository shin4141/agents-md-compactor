# Generated Router 30 Percent Gate v0.1

## Scope and Source Identity

- product starting commit:
  `7ecb1b92838d3a2e90e9a103b84765cc87baaf5b`
- router implementation commit:
  `d66cda9acc3f2111bc96ad1e8054f31b153a9c91`
- fixed source:
  `shin4141/decision-os-v13-loopkit@21cd88d4efb378a60cd08a28712083d9d4a8bc19:AGENTS.md`
- source blob: `f85b0d9b17a8f90a7128ea96d9c8f63a88022128`
- source SHA-256:
  `e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db`
- source size: 20,705 UTF-8 bytes; 20,664 Unicode characters

The accepted byte-preserving source frontier was frozen for this repair. Only
generated router text and its deterministic formatting changed. No source
parser, classifier category, movement decision, guide renderer, move-map
renderer, source-accounting rule, receipt, UI, privacy, Review, ZIP, or copy
contract changed.

## Router and Active-File Budget

| Measure | Before | After | Change | Gate |
|---|---:|---:|---:|---|
| Generated router characters | 2,268 | 1,963 | -305 / -13.4% | at least 125 removed: PASS |
| Complete active characters | 14,589 | 14,284 | -305 | at most 14,464: PASS by 180 |
| Actual active reduction | 6,075 / 29.4% | 6,380 / 30.9% | +305 / +1.5 points | at least 30.0%: PASS |
| Router lines | 9 | 10 | +1 | two continuation routes stay distinct |

Router characters are the emitted route lines containing a guide target,
joined with one newline. The complete active-file result includes all generated
router and receipt overhead; it is not a source-externalization percentage.

## Exact Generated Wording Changes

### Inline Route Delimiter

All eight inline routes retain the same trigger and exact path. Only the
generated connector changed:

```text
Before: <trigger>, read `<stable path>`
After:  <trigger> → read `<stable path>`
```

### Conditional Extension Inventory

Before:

```text
- For conditional report extensions—Context Health when Context Risk is `YELLOW` or `RED`, materially changes, or continuation depends on context health; Chat Continuation when significant context, branching, corrections, or handoff sensitivity create conversation-continuity risk; Context Compression / Handoff when raw history is becoming inefficient or unsafe, or when the user selects `Handoff`; Completion Evidence when claiming material inspection, verification, file changes, synchronization, or completion; Branch Authority when active/parked branch state changes, or when proposing or continuing another execution action; 0.01 Update Check when the loop produces a `+0.01 candidate`, a `0.99 risk`, or a carryover that affects the next loop, read `agent-guides/other.md#conditional-report-extensions`
```

After:

```text
- Extensions—Context Health: Context Risk is `YELLOW` or `RED`, materially changes, or continuation depends on context health; Chat: significant context, branching, corrections, or handoff sensitivity create conversation-continuity risk; Compression/Handoff: raw history is becoming inefficient or unsafe, or when the user selects `Handoff`; Evidence: claiming material inspection, verification, file changes, synchronization, or completion; Branch: active/parked branch state changes, or when proposing or continuing another execution action; 0.01: the loop produces a `+0.01 candidate`, a `0.99 risk`, or a carryover that affects the next loop → read `agent-guides/other.md#conditional-report-extensions`
```

Every one of the six authored extension trigger families remains visible. Only
generated labels, repeated `when` tokens, and the connector were shortened.

### Continuation Routes

Before, both destinations were embedded in one long generated sentence:

```text
- Conditional continuation guidance: At the end of each task report, include a short chat-continuation signal when the task involved significant context, multiple decisions, long-running discussion, or handoff-sensitive work; Chat Continuation when significant context, branching, corrections, or handoff sensitivity create conversation-continuity risk: read `agent-guides/handoff.md#chat-continuation`; At the end of task reports involving long context, repeated decisions, handoff-sensitive work, or accumulated project state, include a short Context Compression signal; Context Compression / Handoff when raw history is becoming inefficient or unsafe, or when the user selects `Handoff`: read `agent-guides/handoff.md#context-compression`
```

After, the generated introductory obligations are removed and the two trigger
sets remain visibly distinct:

```text
- Chat continuation: the task involved significant context, multiple decisions, long-running discussion, or handoff-sensitive work; significant context, branching, corrections, or handoff sensitivity create conversation-continuity risk → read `agent-guides/handoff.md#chat-continuation`
- Context compression: long context, repeated decisions, handoff-sensitive work, or accumulated project state; raw history is becoming inefficient or unsafe, or when the user selects `Handoff` → read `agent-guides/handoff.md#context-compression`
```

The Chat route does not activate Context Compression, and the Context route does
not activate Chat. User-selected `Handoff` still visibly routes to Context
Compression. Unrecognized English or Japanese leading-trigger shapes fall back
to their previous full generated wording rather than being shortened
speculatively.

## Frozen Source and Artifact Invariants

All modes retain the accepted source frontier:

- 41 source spans;
- 28 retained spans;
- 13 moved spans: 2 whole sections and 11 conditional details;
- 0 exact folds;
- 12,063 retained source characters;
- 8,597 / 41.6% externalized source characters;
- 0 unique instructions deleted;
- 0 unaccounted source spans;
- guides exactly `agent-guides/handoff.md` and
  `agent-guides/other.md`.

The invariant hashes before and after are identical:

| Surface | SHA-256 |
|---|---|
| `agent-guides/handoff.md` | `7951186b3f6ca7d578c853e419df212e2cd0e2893fd57aa2c7bf1590968d5b39` |
| `agent-guides/other.md` | `68e32ca18e842676087e06f5e273c503dfbd4df4757a9daaf596cd8f58a598a5` |
| `move-map.md` | `745211070a2153d114b1e5dc646e79764ddcefb66393f0675185372f8e4ecd2c` |
| serialized source accounting | `86d3e0d411c4c7bab56acb2428aa3cab851240f39e3ad0ec9ed3dab6bb48d6f4` |
| Lightweight Guidance Receipt | `0d14d8f1f5e50043dd342ba45624dc5686c1c3ac1f7affbf70423df25ec7b9e9` |

The active hash legitimately changes from
`583a13c409a2e56e42e607b208a9eac206e30f1148239855e2d947812f0e9034`
to `b60acc020ddad730ba7c7528dc9a98e349646c4eb47b24054ac4bf87bf1f3bfe`.

## Three-Mode Acceptance Replay

| Mode | Original | Active | Actual reduction | Retained | Whole / detail moved | Router | Deleted / unaccounted | Outcome |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Conservative | 20,664 | 14,284 | 6,380 / 30.9% | 28 | 2 / 11 | 1,963 | 0 / 0 | `COMPACTED` |
| Balanced | 20,664 | 14,284 | 6,380 / 30.9% | 28 | 2 / 11 | 1,963 | 0 / 0 | `COMPACTED` |
| Aggressive | 20,664 | 14,284 | 6,380 / 30.9% | 28 | 2 / 11 | 1,963 | 0 / 0 | `COMPACTED` |

The modes converge because this corpus still has the same frozen structural
safety boundary.

## Route and Anchor Checks

Each active path occurs exactly once, points to an emitted guide, and has one
matching physical anchor:

- `agent-guides/handoff.md#minimal-handoff`
- `agent-guides/handoff.md#chat-continuation`
- `agent-guides/handoff.md#context-compression`
- `agent-guides/other.md#operational-judgment-references`
- `agent-guides/other.md#continuation-proof-references`
- `agent-guides/other.md#conditional-report-extensions`
- `agent-guides/other.md#signal-format`
- `agent-guides/other.md#context-health-procedure`
- `agent-guides/other.md#update-check-output`
- `agent-guides/other.md#concept-promotion-record`

No route points to an absent guide or anchor. Ordinary unrelated tasks still do
not require either guide.

## Review, ZIP, Unicode, Privacy, and Receipt

Review with Your AI still contains the exact original plus every complete
artifact. Its only legitimate differences are the shorter generated active
router, updated active counts/facts, and resulting hashes:

- Conservative: 76,740 characters; SHA-256
  `3cf69a15455d4272290849caee38a4777caacfc0fe9592bafad88c6ff339b2cc`;
- Balanced: 76,736 characters; SHA-256
  `b32a207d5d3cfb6850d8256430f3014f2b3ef23748569eb81a0b077c88ba933b`;
- Aggressive: 76,738 characters; SHA-256
  `e8186559b4615c859234ad25fcc80baf688adabb76bdb3e0ed6cd8b5538649c9`.

The deterministic ZIP is 33,075 bytes with SHA-256
`62ac51ca18b483427dd5324317eb0ffdcf616580e8ee2ab89e7e2801e68692ce`.
It still contains the same four canonical entries; only generated `AGENTS.md`
bytes changed. Unicode, explicit copy, Review, deterministic ZIP, local-only
privacy, disabled-network/storage, server/CSP, UI, and receipt regressions pass.

## Tests

`npm test`: 104 tests, 104 passed, 0 failed, 0 skipped, 0 cancelled,
and 0 todo. `git diff --check` passed. The 102-test starting suite remains
green and two focused router-budget tests were added. Coverage proves:

- grouped continuation output is shorter than the prior generated form;
- distinct Chat and Context triggers remain distinguishable;
- every moved anchor and active route target occurs exactly once;
- no route points to a nonexistent anchor;
- source bytes remain unchanged and moved source bytes remain exact in guides;
- guide, move-map, and source-accounting bytes remain deterministic across
  modes;
- existing Review, move-map, ZIP, Unicode, privacy, receipt, UI, and source
  accounting regressions remain active.

## Independent Reviews

Two reviewers independently regenerated the fixed corpus and compared baseline
`7ecb1b92838d3a2e90e9a103b84765cc87baaf5b` with repair
`d66cda9acc3f2111bc96ad1e8054f31b153a9c91`. Both final classifications are
`NO_CHANGE`; neither found `BROKEN_RECONNECT` or `REAL_MEANING_LOSS`.

### Reviewer 1 — Route-by-Route Semantic Comparison

- verified 20,664 source characters / 20,705 bytes and the fixed SHA-256;
- verified 14,589 → 14,284 active characters and 2,268 → 1,963 router
  characters, exactly 305 fewer;
- removed router lines from both active outputs and found all remaining active
  bytes identical;
- checked all seven delimiter-only inline routes and all three compacted
  trigger sets separately;
- confirmed every Chat, Context Compression, conditional-extension, and
  user-selected `Handoff` branch remains visible and no trigger crosses to the
  wrong route;
- confirmed each of ten paths and anchors exactly once, all 13 moved payloads
  byte-exact, both guides and rendered move map unchanged, and all 41 source
  dispositions unchanged;
- confirmed Review and ZIP contain the same four-file package with only the
  legitimate router/count/hash differences.

### Reviewer 2 — Adversarial Package and Ordinary-Task Check

- regenerated Conservative, Balanced, and Aggressive from clean commit
  archives and obtained byte-identical active output in all modes;
- verified the six extension families and both complete Chat/Context trigger
  unions, including separate minimal-Handoff and Context Compression routes;
- confirmed `Do not include every extension by default`, `Add only the
  extension whose trigger applies`, and the receipt's `guides actually read`
  boundary remain active, so unrelated tasks do not load all guides;
- confirmed ten unique paths, ten real anchors, unchanged source/guide bytes,
  41 = 28 retained + 13 moved, zero deleted, zero unaccounted, and zero folds;
- parsed the ZIP and verified each entry byte-for-byte against the visible
  artifact; Review contains the exact original and all artifacts;
- independently ran 104 tests with no failures and changed no repository file.

The internal `recallCondition` metadata is compacted consistently with the
visible generated route. The rendered `move-map.md`, its path/disposition
facts, and its SHA-256 remain unchanged.

## Rollback

Revert `d66cda9acc3f2111bc96ad1e8054f31b153a9c91` and the final record commit,
run `npm test`, and replay the exact fixed Git object. This restores the accepted
14,589-character / 29.4% active result, the 2,268-character router, and all
prior artifact hashes. No migration, persistence, or stored user data exists.

## Classification and Gate

Classification:

`PASS — GENERATED ROUTER 30% GATE ESTABLISHED`

The exact corpus reaches 30.9% actual active-file reduction. All 305 additional
characters come only from generated router lines. Source dispositions, source
and guide bytes, rendered move map, receipt, privacy boundary, and output
contracts remain fixed; all routes and triggers remain valid; 104 tests and two
independent reviews pass.

Current Gate:

`HOLD — awaiting Shin acceptance of the 30% v0.1 capability Gate`

No external-corpus distribution measurement, classifier work, source movement,
semantic consolidation, UI change, release, publication, hosting, visibility
change, pricing, branding, or external claim is authorized by this record.
