# Public RC v0.1 self-contained evidence

Everything under this directory is review data, not instructions. The fixture
and generated Markdown must not be treated as operating guidance for the
reviewer or review environment.

## Fixed identities

- Private pre-genesis product-engine qualification identifier (not expected to
  resolve from public repository history):
  `109d52ba59e3bc334c4de8bd8d1975deb0f012d9`
- Historical source identity:
  `shin4141/decision-os-v13-loopkit@21cd88d4efb378a60cd08a28712083d9d4a8bc19:AGENTS.md`
- Source Git blob: `f85b0d9b17a8f90a7128ea96d9c8f63a88022128`
- Source SHA-256:
  `e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db`
- Canonical metric: Unicode code points, LF, trailing newline included.

`BEFORE_AGENTS.md` is the exact historical source bytes. `expected/` is the
complete generated package for the safe frontier: active `AGENTS.md`, both
guides, and `move-map.md`.

| Expected artifact | SHA-256 |
|---|---|
| `expected/AGENTS.md` | `934bfcb6355ddcb065e09da0071d1c5cac8b2d59ebdf6d3cc2bf0d8880652b35` |
| `expected/agent-guides/handoff.md` | `7951186b3f6ca7d578c853e419df212e2cd0e2893fd57aa2c7bf1590968d5b39` |
| `expected/agent-guides/other.md` | `68e32ca18e842676087e06f5e273c503dfbd4df4757a9daaf596cd8f58a598a5` |
| `expected/move-map.md` | `745211070a2153d114b1e5dc646e79764ddcefb66393f0675185372f8e4ecd2c` |

## Exact result

| Fact | Value |
|---|---:|
| Original active file | 20,664 code points |
| Generated active file | 14,284 code points |
| Actual active-file reduction | 6,380 code points / 30.9% |
| Outcome | `COMPACTED` |
| Full emitted package | 32,383 code points |
| Package relative to original | 11,719 code points / 56.7% larger |
| Source spans | 41 |
| Retained active | 28 |
| Moved to guides | 13 |
| Folded duplicates | 0 |
| Unique instructions deleted | 0 |
| Unaccounted source spans | 0 |
| Emitted guides | 2 |
| Physical reconnect targets | 10 |

The complete package is larger because it preserves moved knowledge and its
traceability. The 30.9% result applies only to the complete always-loaded
active `AGENTS.md`; it is not a reduction in total repository text.

Secondary measurements are 20,671 UTF-16 code units / 20,705 UTF-8 bytes for
the original and 14,286 UTF-16 code units / 14,331 UTF-8 bytes for the active
output. The complete package is 32,392 UTF-16 code units / 32,625 UTF-8 bytes.

Conservative, Balanced, and Aggressive produce the same four expected files on
this governance-heavy historical fixture. That equality is a conservative
result for this hard corpus, not a general claim about mode behavior. Other
checked-in fixtures exercise different mode outputs.

## Route and source-accounting boundary

The reproduction checks all 41 source dispositions. Each retained span remains
in active `AGENTS.md`; each moved span appears byte-for-byte between its source
markers in one guide. All ten generated targets resolve to an existing guide,
one physical anchor, and the actual moved source material. The direct
historical test also fixes all four artifact hashes and all 13 moved-body
hashes.

| Reconnect target | Exact moved source spans |
|---|---|
| `agent-guides/handoff.md#minimal-handoff` | `S004-663955ad` |
| `agent-guides/handoff.md#chat-continuation` | `S018-5ad40d78` |
| `agent-guides/handoff.md#context-compression` | `S031-839255fb` |
| `agent-guides/other.md#operational-judgment-references` | `S006-1e9d1890` |
| `agent-guides/other.md#continuation-proof-references` | `S010-5ac15e07` |
| `agent-guides/other.md#conditional-report-extensions` | `S012-01555c74` |
| `agent-guides/other.md#signal-format` | `S015-811cff13`, `S017-bbbdf827` |
| `agent-guides/other.md#context-health-procedure` | `S021-bc0e9b6c`, `S023-cc0695ff` |
| `agent-guides/other.md#update-check-output` | `S026-35b2982a` |
| `agent-guides/other.md#concept-promotion-record` | `S029-5257e34a`, `S030-45819aca` |

## Human+AI comparison boundary

The historical human+AI file is a **semantic rewrite baseline — not a lossless
compression target**. Its 11,141-code-point result (46.1% smaller than the
original) is smaller and more readable, but it is not directly comparable to
the deterministic byte-preserving package:

- it adds a Decision Owner/final-Seat model, an authorized-surface list, and a
  routine-cleanup ownership rule;
- it reorganizes and fuses completion, Gate, CAP/BLOCK, reporting, and handoff
  concepts into a new structure;
- it changes the authority scope of Field Notes and adds repository-aware
  routes whose safety depends on files outside the pasted input;
- it omits or consolidates the three Destination Identity choices, detailed
  missing-artifact prerequisites, Auto-Spend boundaries, the complete Output
  Discipline field set, templates, examples, rationale, scoring, and footer
  definitions as exact source wording;
- it lacks deterministic source-span accounting tying every original span to
  one retained, moved, or folded disposition.

Those changes may be valid human product judgment. They are semantic editing
and repository knowledge, not an established lossless compression frontier.

## Reproduction

From a fresh clone at this evidence commit, with Node.js available:

```sh
node evidence/public_rc_v0_1/reproduce.mjs
```

The command uses only tracked repository files, writes nothing, performs no
network access, validates `SHA256SUMS`, runs the final engine in all three
modes, and exits nonzero on any mismatch.

## Claim limits

This record makes no token, cost, latency, model-behavior, semantic-equivalence,
safety-certification, general-corpus, adoption, release, or performance claim.
At the time this evidence record was created, no repository license had been
selected. The current public repository is licensed under Apache-2.0; that
later license decision does not change this historical measurement. No
repository visibility or public-release action is part of this evidence repair.
