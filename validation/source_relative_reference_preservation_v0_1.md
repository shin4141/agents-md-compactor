# Source-relative reference preservation v0.1

## Scope

This bounded repair addresses one defect in the deterministic generated
guides. It does not change classification, route predicates, active-file
content, source dispositions, privacy behavior, or browser-local behavior.

## Defect observed in B-strict dogfood

The B-strict trace established that byte-preserving a moved source body does
not by itself preserve the operational base for a relative reference. A source
reference such as `docs/context_compression.md`,
`field_notes/021_required_intermediate_node.md`, or a relative Markdown link
can be read from `agent-guides/` after the body moves, where a naive
guide-relative interpretation changes its target.

## Repair invariant

Every preserved moved source body remains byte-for-byte identical to its source
span. The generator adds this deterministic metadata outside the source-span
markers, immediately before ordinary moved material and immediately after each
routed anchor and heading:

```md
### Source Base Contract

Relative file references and relative Markdown links inside a preserved moved source span are resolved from the directory containing the installed generated active `AGENTS.md` — the original source-file base — not from the generated guide's directory. This preserves the original reference base only; it does not establish that a target exists.
```

The base is the installed active `AGENTS.md` directory, not a repository-root
assumption. A reader who follows a reconnect anchor therefore encounters the
contract before the moved source body.

## Fixed historical evidence delta

The historical `BEFORE_AGENTS.md` remains unchanged. The generated active
`AGENTS.md` remains exactly 14,284 Unicode code points with SHA-256
`934bfcb6355ddcb065e09da0071d1c5cac8b2d59ebdf6d3cc2bf0d8880652b35`.

The two changed guides now carry the contract before their ten routed targets:

| Artifact | SHA-256 |
| --- | --- |
| `expected/agent-guides/handoff.md` | `6e5fa52901b789b8084f2927e91cf25f7c5e61d8847252cf2c2206b07bdf7d91` |
| `expected/agent-guides/other.md` | `1c4cf73acd98dec278eb0be432a43927f80c7ef65d00340fca16c1eb9f743198` |

The complete emitted package is now 36,103 code points: 15,439 / 74.7% larger
than the 20,664-code-point source. This is separate from the unchanged 6,380 /
30.9% active-file reduction.

## Regression coverage and verification

The historical regression checks that all 13 moved bodies retain their exact
source bytes; the Source Base Contract is outside those bytes and precedes each
body. It also covers the B-strict examples: a backticked `field_notes/...`
path, relative Markdown links in `field_notes/...` and `validation/...`, and
the anchored `docs/context_compression.md#compact-restart-surface-mode` link.

`reproduce.mjs` independently fixes the active hash and code-point count,
41/28/13/0/0/0 accounting, 13 exact moved bodies, ten physical reconnect
targets, the new guide hashes, and the 36,103-code-point package. The stale
result screenshot was mechanically refreshed from the actual local application
with the fixed corpus and Balanced mode; its raw capture is 820 × 1114 pixels
with SHA-256 `cd1f1f67b6d55d845ab15051249f1f44d9749b3d711c5f2d07bf38ad1d621877`.

## Limitations

The contract preserves the original reference base only. It does not scan a
repository, discover nested instruction files, rewrite source bodies, test
target existence, guess paths, copy targets, or guarantee runtime compliance.

## Gate

Current Gate: `HOLD — source-relative reference repair review`.

Next safe action: review the bounded repair and its reproduced evidence. Do
not begin Fable work, classifier optimization, or unrelated product changes.
