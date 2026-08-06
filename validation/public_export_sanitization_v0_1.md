# Public export sanitization v0.1

## Scope and provenance

Private source RC: `f697759dfc20d5406eef6b18b6a83654328c58cc`.

The private source repository and its history remain unchanged and private.
This record covers only the fresh public-export tree before its clean genesis
commit. It does not change product behavior, README claims, evidence values,
historical metric interpretation, approved screenshots, or the Apache-2.0
license.

## Authorized sanitization delta

- `AGENTS.md`: replaced the supplier-specific private-audit wording with
  neutral private-development-audit wording while preserving the operating
  boundary and instruction strength.
- `validation/public_evidence_self_containment_v0_1.md`: generalized the
  supplier-specific references to excluded-private-audit wording while
  preserving the self-contained public-evidence conclusion and exclusion
  boundary.
- `evidence/public_rc_v0_1/CLAIM_TO_TEST_MATRIX.md`: removed the live
  dependency on excluded audit material. The existing public
  `test/privacy.test.js` directly establishes the stated local-only privacy
  contract.
- `evidence/public_rc_v0_1/SHA256SUMS`: synchronized only the checksum for the
  authorized changed claim matrix; no other manifest entry changed.
- `validation/semantic_ownership_duplicate_privacy_contract_v0_1.md`:
  redacted the two reported user-specific absolute paths and added the
  public-export redaction note without changing the behavioral finding.
- `validation/public_export_sanitization_v0_1.md`: this bounded record.

## Excluded private-audit surfaces

The following identifiers are exclusions only; their contents are neither
quoted nor summarized here:

- `AGENTS_MD_COMPACTOR_OPUS_AUDIT_BUNDLE.zip`
- `OPUS_PRIVATE_CLOSURE_DELTA.md`
- `OPUS_PRIVATE_CLOSURE_PROMPT.txt`
- `evidence/opus_audit_v0_1/`
- `validation/opus_audit_bundle_evidence_v0_1.md`

## Verification

- Included source files were byte-compared with the private source RC. Only
  the authorized sanitization paths and this new record differ; excluded paths
  are absent.
- `npm test`: PASS — 107 passed, 0 failed.
- `node evidence/public_rc_v0_1/reproduce.mjs`: PASS — 20,664 original,
  14,284 active, 6,380 / 30.9% active reduction, 32,383 complete package,
  +56.7%, 0 unique instructions deleted, and 13/13 moved bodies preserved
  byte-for-byte.
- Public visibility is not a Release or announcement.

## Rollback

Before a visibility transition, discard this uncommitted export candidate or
delete the fresh public repository. The private source archive remains the
unchanged provenance record.
