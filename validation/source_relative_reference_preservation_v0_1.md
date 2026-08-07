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
span. The generator adds one full contract immediately below each generated
guide title and, outside the source-span markers, adds this short explicit
reminder immediately after each routed anchor and heading and before its
preserved source body:

```md
> **Source base:** Resolve relative references in the preserved source body below from the installed active `AGENTS.md` directory.
```

The full contract states that relative file references and relative Markdown
links inside a preserved moved source span resolve from the directory containing
the installed generated active `AGENTS.md` — the original source-file base —
not from the generated guide's directory. It preserves that original reference
base only and does not establish a target's existence. The base is not assumed
to be a repository root. A reader who follows a reconnect anchor therefore
encounters the short reminder before the moved source body without repeating
the full contract at every route.

## Fixed historical evidence delta

The historical `BEFORE_AGENTS.md` remains unchanged. The generated active
`AGENTS.md` remains exactly 14,284 Unicode code points with SHA-256
`934bfcb6355ddcb065e09da0071d1c5cac8b2d59ebdf6d3cc2bf0d8880652b35`.

The two changed guides now each carry the full contract once, with the short
reminder before their ten routed targets:

| Artifact | SHA-256 |
| --- | --- |
| `expected/agent-guides/handoff.md` | `6efc716da1c89e1de7f4fe5b32e249d4b69daa7d31a1c78fa97a76d343fb2423` |
| `expected/agent-guides/other.md` | `9188866936b5ded0d36161ac9ae57419992f68fe8957177e896df65a392820fe` |

The complete emitted package is now 34,447 code points: 13,783 / 66.7% larger
than the 20,664-code-point source. This is separate from the unchanged 6,380 /
30.9% active-file reduction.

## Regression coverage and verification

The historical regression checks that all 13 moved bodies retain their exact
source bytes; the Source Base Contract and route-local reminder are outside
those bytes, and the reminder precedes each routed body. It also covers the
B-strict examples: a backticked `field_notes/...` path, relative Markdown links
in `field_notes/...` and `validation/...`, and the anchored
`docs/context_compression.md#compact-restart-surface-mode` link.

`reproduce.mjs` independently fixes the active hash and code-point count,
41/28/13/0/0/0 accounting, 13 exact moved bodies, ten physical reconnect
targets, the new guide hashes, and the 34,447-code-point package. The stale
result screenshot was mechanically refreshed from the actual local application
with the fixed corpus and Balanced mode; its raw capture is 820 × 1114 pixels
with SHA-256 `9c6a74005699adb01e443f889a5cdfc2b663f5f82b96313493edd9ab3375ec33`.

## Limitations

The contract preserves the original reference base only. It does not scan a
repository, discover nested instruction files, rewrite source bodies, test
target existence, guess paths, copy targets, or guarantee runtime compliance.

## Gate

Current Gate: `HOLD — source-relative reference repair review`.

Next safe action: review the bounded repair and its reproduced evidence. Do
not begin Fable work, classifier optimization, or unrelated product changes.
