# Claim-to-test matrix

| Bounded claim | Direct evidence |
|---|---|
| Exact source identity and bytes | `BEFORE_AGENTS.md`, `SHA256SUMS`, `test/historical-frontier.test.js` |
| Counts use Unicode code points with LF/final LF included | `src/compactor.js`, `test/compactor.test.js`, `test/historical-frontier.test.js` |
| Actual reduction uses the complete active artifact | `test/review.test.js`, `test/historical-frontier.test.js` |
| Complete package size is separate from active reduction | `src/review.js`, `test/review.test.js`, `test/ui.test.js`, `test/historical-frontier.test.js` |
| 41 spans have exactly one disposition: 28 active, 13 moved | `test/historical-frontier.test.js`, `reproduce.mjs` |
| Four generated artifacts match fixed hashes | `SHA256SUMS`, `test/historical-frontier.test.js`, `reproduce.mjs` |
| All 13 moved bodies retain exact bytes | `test/historical-frontier.test.js`, `reproduce.mjs` |
| Ten routes reach existing files, physical anchors, and moved material | `test/historical-frontier.test.js`, `reproduce.mjs` |
| All three modes reach the same safe frontier on this hard corpus | `test/historical-frontier.test.js`, `reproduce.mjs` |
| Review exposes the active and complete-package comparison | `test/review.test.js`, `test/ui.test.js` |
| ZIP and Review retain the complete generated package | `test/export.test.js`, `test/review.test.js`, `test/safe-frontier.test.js` |
| Local-only privacy contract remains current | `test/privacy.test.js` |

These checks establish deterministic behavior for the checked-in fixtures and
fixed historical bytes. They do not establish model obedience, runtime recall,
semantic equivalence, general-corpus performance, token/cost/latency savings,
safety certification, adoption, or release readiness.
