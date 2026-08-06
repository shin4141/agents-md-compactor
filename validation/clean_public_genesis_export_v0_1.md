# Clean public genesis export v0.1

## Identity boundary

Private source RC: `f697759dfc20d5406eef6b18b6a83654328c58cc`.

The public RC is the sole clean-genesis commit created from the sanitized
export tree. It has no inherited private Git objects, refs, branches, tags, or
history. The private source archive preserves the original development
provenance separately.

## Export boundary

Development-only private-audit surfaces were excluded before the public
genesis commit. The authorized sanitization delta is recorded in
`validation/public_export_sanitization_v0_1.md`. Other included source paths
were byte-compared to the private source RC.

No product behavior, README claim, evidence value, historical metric meaning,
approved screenshot, or Apache-2.0 license changed. Public visibility is not a
GitHub Release, npm publication, or announcement.

## Verification

- `npm test`: PASS — 107 passed, 0 failed.
- `node evidence/public_rc_v0_1/reproduce.mjs`: PASS — the fixed historical
  result remains 20,664 → 14,284 Unicode code points, 6,380 / 30.9% active
  reduction, 32,383 code points / +56.7% complete package, 0 unique
  instructions deleted, and 13/13 moved bodies preserved byte-for-byte.

## Rollback

Before public visibility, delete the fresh public repository or discard the
export candidate. The private source archive remains unchanged.
