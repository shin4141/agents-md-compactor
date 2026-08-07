# Fictional AGENTS.md Measured Sample 001

## Classification

`PASS — LOCAL FICTIONAL SAMPLE 001 FROZEN AND VERIFIED`

- Fictional sample: yes; this is an invented repository and invented source.
- Canonical product repository: `shin4141/agents-md-compactor`
- Canonical product base: `a41f20c0a679934157b38ef033b2d67e67f2e0b4`
- Local measurement branch: `codex/fictional-sample-001`
- Mode reserved for the one measurement: Balanced
- Historical 30.9% corpus: separate and not used to construct this source
- Product, README, historical evidence, screenshot, image, and Fable changes:
  none

## Fictional repository purpose and plausibility

Lumen Draft is a fictional desktop-first collaborative writing application for
editorial teams. Its imagined mature repository contains a Rust document
engine, TypeScript desktop shell, optional synchronization relay, and shared
format fixtures. Local documents remain usable offline.

The source is plausible for a long-lived repository because the core
authority, data-safety, architectural, and verification rules apply to routine
work, while accumulated procedures cover less frequent but consequential work:
document-format changes, sync-protocol changes, relay migrations, desktop
releases, incidents, platform-support changes, cross-session handoffs, and
reviews. The procedures contain ordinary templates and checklists an operating
team could retain after repeated releases and incidents.

The source was written as a coherent operating file before Compactor was run.
It was not copied from an existing fixture, benchmark, the historical V13
corpus, this repository's `AGENTS.md`, or a generated Compactor artifact. It was
not constructed from classifier keywords. No product result was available when
its identity was frozen.

## Frozen source identity

- Source path: `validation/fictional_sample_001/BEFORE_AGENTS.md`
- SHA-256:
  `335b64177c3f44bb557eb99712aa770272b924cf595a3adfcecfcefca9bca0c9`
- UTF-8 bytes: 13,413
- Unicode code points: 13,413
- Line endings: LF
- Trailing newline: included
- Second-level section count: 13
- Freeze point: before any product measurement

This identity is frozen. `BEFORE_AGENTS.md` must not be edited in response to
the product result. A mismatch in its hash is a stop condition, not a prompt to
repair the sample.

## Independent pre-measurement source sanity check

This high-level human-readable check was completed after the source identity
was frozen and before Compactor was run. It did not cause a source edit.

- Clearly universal / always active: 4 sections — authority and ownership;
  non-negotiable safety boundaries; repository shape and architecture; working
  defaults.
- Clearly conditional: 8 sections — document format; synchronization behavior;
  database migration; desktop release; incident response; platform support;
  handoff and restart; review checklist.
- Ambiguous: 1 section — verification baseline combines an always-relevant
  readiness baseline with additional checks triggered by the area changed.

The source is neither artificially all-conditional nor all-universal. This is
a sanity classification only and is not a prediction of product routing.

## One ordinary UI measurement

The frozen source was pasted into the normal local application started with
`npm run ui` and opened at `http://127.0.0.1:4173`. Balanced was selected and
Generate was chosen exactly once. No internal generation function was used as
the measurement path. The UI reported:

- Mode: Balanced
- Outcome: `COMPACTED`
- Original active file: 13,413 Unicode code points
- Generated active file: 10,799 Unicode code points
- Actual active-file reduction: 2,614 Unicode code points / 19.5%
- Source instructions externalized: 3,049 Unicode code points / 22.7%
- Complete emitted package: 17,889 Unicode code points
- Package delta versus source: +4,476 Unicode code points / +33.4%
- Source spans: 16
- Retained source: 10,362 Unicode code points across 13 spans
- Moved-to-guide spans: 3
- Exact duplicate occurrences folded: 0
- Exact duplicate characters folded: 0
- Unique instructions deleted: 0
- Unaccounted source spans: 0
- Generated guides: 3

Active-file reduction and source externalization are separate facts. This
sample's active file became smaller while its complete package became larger.

## Generated package identity

The normal UI's **Copy selected file** action recovered every generated text
artifact byte-exactly. The preserved files matched hashes calculated from the
live clipboard captures before they were written to the repository.

| Artifact | UTF-8 bytes | Unicode code points | SHA-256 |
|---|---:|---:|---|
| `generated/AGENTS.md` | 10,806 | 10,799 | `1c73b9fb2d91e117b16261e9263098c13237f86c91977d7400970d03fa370e91` |
| `generated/agent-guides/handoff.md` | 900 | 900 | `70b3c12c41ae41d1ebc8701c18aad84bfebe17b338b7d7c9ed73de41665a0a1a` |
| `generated/agent-guides/migration.md` | 1,175 | 1,175 | `ad5882138ae1550e549834f7da9d9a37573eda9c5d06f8b1ede2877472848295` |
| `generated/agent-guides/release.md` | 1,362 | 1,362 | `4a68f65e12fcc77913a60e7ee68d61462a1fc5c5a6ef28286f5a7345c6414612` |
| `generated/move-map.md` | 3,717 | 3,653 | `afeca0dddf7eb841b6474126fe641e1af54076d660ed4b5f3f27852b62a46ed3` |

The complete text package is these five artifacts: 17,960 UTF-8 bytes and
17,889 Unicode code points. `SHA256SUMS` records the source and artifact
identities. The UI's **Download ZIP** action was attempted, but the controlled
browser did not expose a downloaded file. A ZIP byte size and SHA-256 therefore
remain `UNKNOWN`; no ZIP was reconstructed from product internals. This does
not affect the byte-exact identity of the five complete constituent artifacts.

## Accounting, preservation, and reconnect verification

The generated move map contains 16 source identities: 13
`RETAINED_ACTIVE` and 3 `MOVED_TO_GUIDE`. It records zero folded spans. The UI
records zero unique instructions deleted and zero unaccounted source spans.
All gaps between ledger source ranges contain whitespace only, and every
retained source body is present in generated active `AGENTS.md`.

The three moved source bodies are each enclosed by exactly one opening and one
closing source-span marker in their canonical guide. In all three cases, the
marked guide body equals the source-range body after excluding one final LF
that separates adjacent source sections. No instruction text differs:

| Source span | Canonical guide | Preservation |
|---|---|---|
| `S009-bcc5f1f4` | `agent-guides/migration.md` | exact instruction body; one separator LF excluded |
| `S010-ee535b56` | `agent-guides/release.md` | exact instruction body; one separator LF excluded |
| `S013-5f067dd8` | `agent-guides/handoff.md` | exact instruction body; one separator LF excluded |

Generated active `AGENTS.md` contains three explicit, unique reconnect routes:

- release or public claims → `agent-guides/release.md`
- handoff or restart → `agent-guides/handoff.md`
- migration or compatibility → `agent-guides/migration.md`

The route target set exactly matches the emitted guide set. The product kept
the fictional document-format, synchronization, incident, platform, and review
material active; this measured result was accepted without editing the source
to encourage additional routing.

## Post-measurement source-freeze verification

After measurement and generated-artifact preservation,
`BEFORE_AGENTS.md` remained 13,413 bytes / 13,413 Unicode code points with
SHA-256
`335b64177c3f44bb557eb99712aa770272b924cf595a3adfcecfcefca9bca0c9`.
It was not edited after the product result was seen.

## Scope and verification

Changed product/runtime files: none. Changed README, historical evidence,
tests, screenshots, images, LICENSE, or feather-marker syntax: none. Fable was
not begun. The only intended changes are this fictional validation record, its
frozen source, the five copied generated artifacts, `SHA256SUMS`, and the
restartable handoff.

Verification for the bounded local sample includes source and artifact
SHA-256 checks, UTF-8 byte and Unicode code-point counts, complete accounting,
three moved-body comparisons, route/guide set equality, the repository test
suite, historical evidence reproduction, prohibited-path diff inspection, and
`git diff --check`.

Final results:

- `npm test`: 108 passed; 0 failed; 0 cancelled; 0 skipped; 0 todo
- `node evidence/public_rc_v0_1/reproduce.mjs`: PASS; historical 20,664 to
  14,284 / 30.9%, 41/28/13 accounting, and 10 routes unchanged
- `shasum -a 256 -c validation/fictional_sample_001/SHA256SUMS`: all six
  tracked identities OK
- intended changed paths only: `handoff/current_handoff.md` and
  `validation/fictional_sample_001*`
- `git diff --check`: PASS

## Claim boundary

This one fictional sample may establish only its own active-file result,
routing, accounting, reconnect, moved-body, and complete-package facts. It
cannot establish average reduction, tokens, cost, latency, quality,
superiority, general reliability, safety certification, semantic equivalence,
adoption, or runtime obedience.

The historical 20,664 to 14,284 code-point / 30.9% result remains evidence for
its separate fixed historical corpus only. It is not a baseline, expectation,
or comparison target for this fictional sample.

## Completion and next gate

**Local completion:** `PASS — FICTIONAL SAMPLE 001 FROZEN AND VERIFIED`.

**Remote publication:** Pending a non-interactive authorized write surface.
The source and measured result are already frozen and internally consistent;
the local commit is the publication candidate. No remote publication failure
changes the measured facts.

**Current Gate:** `HOLD — bounded fictional-sample Draft PR before Fable`.

**Next safe action:** Commit the bounded sample locally, then use an already
authorized non-interactive repository surface to push the branch and open a
Draft PR if available. Do not merge, begin Fable, create images, change product
behavior, or change public claims.

**Rollback:** Revert the bounded sample commit. This removes only the fictional
source, its generated package, checksums, validation record, and handoff update;
product behavior and historical evidence remain unchanged.
