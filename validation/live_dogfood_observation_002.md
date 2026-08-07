# Live Dogfood Observation 002

## Post-blind-audit public sanitization delta

After the Fable blind audit of fixed base
`7d20487a2d431a880dbd5cf6ec0b1408df752a96`, the user-specific local workspace
path in A-3 was replaced with `<local-workspace>/AGENTS.md Compactor`. This
sanitizes only that personal path; the original audited state remains
recoverable from Git history.

## Verdict

`PASS — Compactor-generated persistent instructions produced a spontaneous
Lightweight Guidance Receipt in a fresh Codex context without transient marker
prompting.`

Observed receipt:

```text
🪶 Core only
```

Receipt consistency: `PASS` for this zero-guide case. The generated package
contained zero guides and the fresh response declared Core only.

This is one local observation. It does not prove general runtime compliance,
nonzero conditional-guide reporting, token, cost, latency, performance, or
adoption claims.

## Observation lineage

### Observation 001

Status: `GENERATION OBSERVED / TRANSPORT INCOMPLETE`.

The ordinary browser UI generated from canonical root `AGENTS.md` in Balanced
mode and returned `NO_ACTIVE_REDUCTION`, but transport failed before coherent
install. No fresh-session receipt observation occurred. This is neither a PASS
nor product-failure result.

### A-3

Status: `INVALID OBSERVATION — WRONG WORKSPACE`.

A-3 was opened in `<local-workspace>/AGENTS.md Compactor` at
`f697759dfc20d5406eef6b18b6a83654328c58cc`, not in the generated Observation
002 instruction surface. Its old private-audit Gate and missing receipt are
not evidence about the generated package.

## Source and generated identities

- Canonical source commit:
  `c93e3db7fb2eb0d9327e3ef14963ab370731ec32`
- Source: root `AGENTS.md`
- Source SHA-256:
  `73374a71fdcdd71009cb61d6361bdb916bf4e6096b596238da44e50de2aebd16`
- Source size: 7,591 bytes / 7,587 Unicode code points
- Mode: Balanced
- Outcome: `NO_ACTIVE_REDUCTION`
- Source active: 7,587 Unicode code points
- Generated active: 7,763 Unicode code points
- Active delta: +176 / +2.3%
- Generated guides: 0
- Generated `AGENTS.md` SHA-256:
  `9e338a085b680fef9bc5da4b128d96fdc3c2db1ba5496c9fc0e54c9b0c180b81`
- Generated `AGENTS.md` size: 7,774 bytes / 7,763 Unicode code points
- Generated `move-map.md` SHA-256:
  `9a72eb4db45e9cc5c12467f2dcdd9cf386c187fb5be9f6639984f1758379d8ca`
- Generated `move-map.md` size: 1,922 bytes / 1,886 Unicode code points

The artifacts were recovered through the documented ordinary UI Review with
your AI clipboard path, independently hash-verified, and copied byte-for-byte
only into an isolated dogfood workspace. The result is not recommended for
adoption merely because it was installed: the product correctly reported no
active reduction for this source and mode.

## Fresh-session boundary and observation

The fresh Codex project was rooted in the Compactor-generated persistent
instruction surface. Its neutral read-only prompt did not mention the feather,
the receipt contract, `AGENTS.md`, expected output, a guide to read, 13-92
context, or V13 instructions.

The response identified the repository as `shin4141/agents-md-compactor` and
ended spontaneously with the observed receipt above. No transient marker or
developer-special prompting was supplied.

The fresh response reported that its project surface contained only generated
artifacts and did not expose a `.git` repository. Canonical Gate reconstruction
was therefore not testable, and repository reconnect-target use was not
exercised in that fresh context. It reported Gate state as `UNKNOWN` rather
than guessing or advancing. This is an environment/repository-identity
limitation, not a Compactor product defect or receipt failure, and it does not
change the zero-guide receipt PASS.

## Claim boundaries and remaining UNKNOWN

- The receipt is a declaration, not proof of guide reading or general runtime
  compliance.
- `CLOSED` only for this zero-guide case: a fresh context emitted
  `🪶 Core only` without a transient marker prompt, matching zero generated
  guides.
- `UNKNOWN`: whether a nonzero generated-guide case reports the guides actually
  read correctly, or exercises and reports repository reconnect-target use
  correctly.
- `UNKNOWN`: automatic product-level recognition or rejection of recursive
  Compactor input.
- No token, cost, latency, performance, adoption, semantic-equivalence, or
  general reliability claim is established.

## Next Gate

`HOLD — fictional measured sample before Fable`

The fictional `AGENTS.md` measured sample is a separately authorized next
stage. Do not begin it, and do not begin Fable, from this record.
