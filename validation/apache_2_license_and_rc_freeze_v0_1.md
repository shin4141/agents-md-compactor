# Apache-2.0 integration and release-candidate freeze v0.1

## Approval and bounded scope

Shin approved the Apache License 2.0 selection. This record covers the bounded
release-candidate freeze that began at
`3967330cccc5f4344a5207f5f460b804d5f2d4ff` on
`codex/v0-1-contract-vertical`.

The change adds the root `LICENSE`, sets the package metadata, replaces the
active stale README no-license statement with the license link, records this
verification, and advances the restartable handoff. It does not change product
behavior, the engine, tests, privacy behavior, evidence values, historical
artifacts, screenshot bytes, visibility, tags, releases, npm publishing, or
Fable review.

## License surface

- `LICENSE` is the complete, unmodified official Apache License 2.0 text.
- `package.json` declares the SPDX identifier `Apache-2.0`.
- `README.md` contains the compact public license section linking to the
  repository-relative `LICENSE` file.
- No `NOTICE` file is required: the tracked tree has no third-party notice
  obligation, vendored third-party notice, or dependency lockfile that would
  introduce one.

## Stale-claim review

The active README license-status statement was replaced. A targeted
tracked-document search found no other active stale license-status,
license-pending, or all-rights-reserved public claim. Earlier validation
records that accurately describe their historical pre-license state remain
unchanged.

## Verification

- Official-text comparison: `LICENSE` is byte-identical to
  `https://www.apache.org/licenses/LICENSE-2.0.txt`; SHA-256:
  `c71d239df91726fc519c6eb72d318ec65820627232b2f796219e87dcf35d0ab4`.
- Package metadata: `package.json` has exactly `"license": "Apache-2.0"`.
- Approved screenshot assets remain unchanged:
  - `docs/images/public_v0_1/public-v0_1-result-metrics.png`:
    `dc7a2200368b3421b39d90d3bdb5735a8f067a56d48ec5b8213245c0fc2a3abb`
  - `docs/images/public_v0_1/public-v0_1-input-mode.png`:
    `e650e12d15e5f4382670739094d1f7e8001c6ac4de79b5ef380d1c000d32bc4c`
  - `docs/images/public_v0_1/public-v0_1-artifacts-review.png`:
    `3cfbb0e26804257912fa9163319f5eb8fb2d4b62fdf91e058cde9d2797106267`
- `npm test`: PASS — 107 passed, 0 failed.
- `git diff --check`: PASS.
- Repository visibility is unchanged. No GitHub release, tag, npm publish, or
  Fable action occurred.

## Rollback and next gate

Revert the bounded release-candidate commit and run `npm test`; this removes
only the Apache-2.0 license surface and this release-candidate record. No data
migration or product rollback is required.

Next gate:
`HOLD — controlled visibility transition and final Fable review preparation`
