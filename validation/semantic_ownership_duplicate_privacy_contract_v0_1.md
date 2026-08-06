# Semantic Ownership, Duplicate Folding, and Privacy Contract v0.1

## Classification and Anchors

- Classification: `PASS`
- Starting commit: `b5504aa2f7d1dc7656694a20021127fed26a239b`
- Implementation commit:
  `9e2903fec5de6dccb71cceb25e37c4fb8e03ce49`
- Branch: `codex/v0-1-contract-vertical`
- Live-browser qualification starting commit:
  `d4aa81ec0a85715b986436b8be1675d803332630`
- Current Gate:
  `HOLD — awaiting Shin acceptance of v0.1 meaning-preservation and privacy evidence`

The bounded implementation and operational qualification are complete. All
code-level, package-level, historical, live-server, live-browser, cleanup, and
shutdown checks pass. No product defect appeared during the live qualification,
and no product code changed during operational closeout.

> Machine-specific absolute paths are redacted in the public export. The
> private source archive preserves the original record.

## Exact Implementation Boundary

Implemented only:

1. source-span decomposition and three-state canonical disposition accounting;
2. activation-first semantic ownership for already supported guide categories;
3. conservative exact-duplicate grouping, canonical selection, and repetition
   signals;
4. source ledger, move-map, Review with Your AI, metrics, UI, README, static
   server, CSP, fixtures, tests, and historical replay updates needed to expose
   and verify those contracts; and
5. a verifiable local-only browser privacy boundary.

No LLM, Markdown AST dependency, new guide category, repository scanning,
source-file write, persistence, external service, analytics, authentication,
hosting, publication, branding expansion, or classifier redesign was added.

## Source-Disposition and Ownership Contract

`parseInstructionSpans` assigns stable sequential IDs, parent block identity,
source offsets, heading context, structural type, and untouched text. Every
span ends in exactly one disposition:

- `RETAINED_ACTIVE`
- `MOVED_TO_GUIDE`
- `COLLAPSED_EXACT_DUPLICATE`

Each ledger entry records its source range and body hash, canonical span,
canonical destination, collapsed span list, exact repetition count, scope,
condition signature, obligation strength, and folding reason. Generated-result
validation independently rebuilds the ledger and rejects missing, duplicated,
or inconsistent dispositions. `Unique instructions deleted` and `Unaccounted
source spans` are both contractually zero.

Ownership is activation-first. An intact release-conditioned rule stays in the
release guide when its actions mention tests or secrets. Category terms inside
actions do not create additional canonical bodies. An inseparable condition
covering multiple task categories, or materially ambiguous ownership, remains
active.

## Safe Decomposition Contract

Division occurs only at authored sibling headings, sibling top-level list items
that each contain an independently classifiable instruction, or separate
paragraphs that each contain their own condition. A sentence, shared lead-in,
condition and consequence, rule and exception, ordered procedure, prohibition
and qualifier, or fenced code and its governing instruction stays intact.
Related spans may be co-located in one guide, but each keeps a separate
source-span wrapper and unchanged body. The implementation does not fuse,
summarize, or strengthen instructions.

## Exact-Duplicate and Repetition Contract

Bodies are compared only after CRLF/CR normalization to LF and removal of
surrounding blank lines. No wording, punctuation, case, synonym, modality, or
sentence-order normalization is performed. Folding additionally requires:

- equivalent `UNIVERSAL` scope, or the same conditional category and exact
  condition signature;
- the same obligation/prohibition strength;
- an independently decomposed sibling list item or conditioned paragraph;
- no exception, qualifier, descendant, procedure, example, or attached code;
  and
- no lost task-specific reconnection point.

An active universal occurrence is preferred; otherwise the earliest complete
equivalent occurrence is canonical. Each canonical group receives exactly one
adjacent factual line:

`Source repetition: N equivalent occurrences were folded into this canonical rule.`

The Markdown move map visibly lists canonical and collapsed span IDs,
destination, repetition count, scope, condition, and folding reason. Exact
bodies that cannot be combined across scope or context are reported as
potential but uncollapsed duplicates in the Review package.

## Accounting and Metrics

The primary metric remains the complete original versus the complete generated
active `AGENTS.md`, including routes and receipt. Separate secondary facts are:

- source instruction characters externalized to guides;
- exact duplicate occurrences folded;
- exact duplicate characters folded;
- unique instructions deleted: 0; and
- unaccounted source spans: 0.

Collapsed conditional occurrences do not inflate externalization. Small
duplicate fixtures honestly return `NO_ACTIVE_REDUCTION` when routing, receipt,
and repetition-signal overhead outweigh removed duplicate text.

## Local-Only Privacy Contract

The UI and README state:

> Your AGENTS.md stays on your device.
>
> No upload · No storage · No analytics · No training

They also state that processing, generation, preview, explicit copy,
review-package creation, and ZIP creation run locally; Review with Your AI only
copies to the clipboard; a destination service's policy applies after manual
paste; and the boundary does not cover extensions, a compromised operating
system, user modifications, or destination services.

Production-source scans and behavior tests confirm no `fetch`,
`XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon`, local/session
storage, IndexedDB, Cache Storage, service-worker registration, cookie access,
analytics call, external asset origin, model call, or upload route. Clipboard
writes and Blob downloads occur only after explicit button actions.

## CSP and Static-Server Boundary

The fixed route map serves only the required local HTML, CSS, JavaScript, and
contract modules. Only GET and HEAD are accepted. POST, PUT, PATCH, and DELETE
return 405 with `Allow: GET, HEAD`; `/upload` returns 404. The handler never
subscribes to or reads a request body and never logs pasted content.

Every response includes `Cache-Control: no-store`, `Referrer-Policy:
no-referrer`, `X-Content-Type-Options: nosniff`, and this CSP:

```text
default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'none'; img-src 'none'; font-src 'none'; media-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; worker-src 'none'; manifest-src 'none'
```

The clipboard fallback uses a local CSS class, so no inline-style CSP exception
is required.

## Focused Qualification Matrix

All focused runs used Balanced mode.

| Fixture | Dispositions | Duplicate groups | Result |
|---|---|---|---|
| English duplicates | 8 spans: 3 retained, 2 moved, 3 collapsed | global 3 occurrences; testing 2 | 290→471, `NO_ACTIVE_REDUCTION`; 132 duplicate characters folded |
| Japanese duplicates | 8 spans: 3 retained, 2 moved, 3 collapsed | global 3 occurrences; testing 2 | 124→415, `NO_ACTIVE_REDUCTION`; 51 duplicate characters folded; Unicode clean |
| Mixed ownership | 6 spans: 3 retained, 3 moved | none | testing and release siblings split; release-primary block intact; ambiguous span retained |
| Realistic large English | 15 spans: 4 retained, 11 moved | none | 10,977→4,161, `COMPACTED`; 62.1% complete active reduction |

Additional regressions prove global and task-specific exact bodies form separate
groups, unique exceptions do not fold, merely similar text does not fold,
different modality does not fold, co-located rules remain distinct, all
canonical homes are singular, repetition counts/signals are exact, and
externalization excludes collapsed occurrences.

## Test and Package Evidence

- Previous suite: 79 tests.
- Focused additions: 12 tests.
- Total: 91 tests; 91 passed; 0 failed; 0 skipped; 0 cancelled; 0 todo.
- `git diff --check`: passed.
- Network/storage throwing-stub qualification: Generate, artifact copy, Review
  copy, and ZIP passed after prohibited globals were replaced by throwing
  getters.
- ZIP entries continue to byte-match the complete preview inventory in canonical
  order; deterministic hashes were refreshed only for the new source-span move
  map and legitimate generated-artifact changes.
- Realistic Balanced ZIP SHA-256 values:
  - English: `372f7947a8fce7002c5970b61a68cec953f3c99af8125264dddc472d15df0b5e`
  - Japanese: `5bc017703bc251e61c514b4a5f336dc1d0d651a28243fcd0d468c5965cbba345`
  - Mixed: `b307c35ea22b57ed3e949778051e53b365aa596cff9311aa4cbef3c7efcce8b1`

Review with Your AI now includes all dispositions, duplicate groups, canonical
selection, repetition counts, potential uncollapsed exact bodies, ambiguous
ownership spans, and checks 7–11. It remains clipboard-only and never applies a
recommendation automatically.

## SHA-Bound Historical Regression

Fresh temporary bare clones were made with local hooks disabled. Full historical
sources were not copied into or committed to this repository.

Before cleanup, `/private/tmp/agents-compactor-semantic-Xl0qOi` contained only
two bare repositories: `v13.git`, whose origin was
`https://github.com/shin4141/decision-os-v13-loopkit.git`, and `v12.git`, whose
origin was
`https://github.com/shin4141/decision-os-v12-completion-integrity.git`. The
approval reviewer repeated its internal schema failure for direct deletion, so
the exact root was removed through Finder's recoverable Trash operation. The
original root, `v13.git`, and `v12.git` paths were then all verified absent. No
broader path was touched.

| Trial | Exact source | Parsed spans | All three modes |
|---|---|---:|---|
| A / V13 English | `21cd88d:AGENTS.md`, SHA-256 `e8561604…63db` | 21 | 20,664→20,840; 21 retained; 0 moved/folded; `NO_ACTIVE_REDUCTION` |
| B / V13 Japanese | `21cd88d:AGENTS.ja.md`, SHA-256 `f49d3268…bd29` | 10 | 2,301→2,477; 10 retained; 0 moved/folded; `NO_ACTIVE_REDUCTION` |
| C / V12 control | `be1b3f7:docs/v12-short-agents.md`, SHA-256 `7d02f19b…5786a` | 1 | 1,014→1,190; 1 retained; 0 moved/folded; `NO_ACTIVE_REDUCTION` |

All nine runs had zero externalized characters, zero unique deletions, zero
unaccounted spans, a complete Review package, byte-identical decoded ZIP
inventory, and clean Unicode. Governance-heavy historical inputs remain honest
no-op recommendations; no compaction or duplicate fold was forced.

## Live Browser Privacy Qualification — PASS

### Launch and Shutdown

The canonical `npm run ui` command was attempted first. It failed before
process creation because the approval reviewer returned its known internal
`unknown_parameter: input[43].namespace` schema error. `package.json` confirmed
that the script is exactly `node server.js`. A direct
`/opt/homebrew/bin/node server.js` attempt was sandboxed from binding a socket
(`listen EPERM`), and its escalation hit the same approval schema error. The
authorized exact-equivalent command that successfully launched the checked-in
server was:

```sh
[REDACTED_LOCAL_PATH]
```

The server listened only at `127.0.0.1:4173` as PID `10260`. After the browser
run it was stopped with an interrupt. `lsof` reported no listener and a direct
request returned connection failure with HTTP code `000`.

### Seven-Action Matrix

The browser run used a fresh local context and a synthetic, non-secret
1,316-character AGENTS.md created only for qualification.

| Action | Live result | Request change |
|---|---|---|
| Generate | Balanced succeeded; active file, `agent-guides/security.md`, move map, outcome, and counts rendered; textarea stayed byte-for-byte unchanged | none |
| Change mode | selected value changed from Balanced to Aggressive without regenerating or changing the source | none |
| Copy one artifact | copied the exact selected 1,406-character active AGENTS.md | none |
| Copy Review with Your AI | copied a 9,980-character package containing the exact source, active file, move map, and review instructions | none |
| Download ZIP | UI reported successful explicit download | none |
| Reload | textarea returned empty and the results section was absent | initial local assets reloaded only |
| Close and open a fresh context | one new context opened with an empty textarea and no result | initial local assets loaded only |

The browser automation surface did not expose a native event for this Blob
download. The newly created file was independently located as
`[REDACTED_LOCAL_PATH]`, timestamped
2026-08-05 18:03:48 +0900. `unzip -t` reported no errors. Its exact inventory
was `AGENTS.md`, `agent-guides/security.md`, and `move-map.md`, matching the
visible live result, and its SHA-256 was
`526eb8db9ae28764acb2c87420995a75755a4b91a2328264d93a004901fd859e`.

### Request and Storage Evidence

The initial browser load observed only the local document and these six
same-origin static assets:

- `http://127.0.0.1:4173/styles.css`
- `http://127.0.0.1:4173/app.js`
- `http://127.0.0.1:4173/src/ui.js`
- `http://127.0.0.1:4173/src/compactor.js`
- `http://127.0.0.1:4173/src/export.js`
- `http://127.0.0.1:4173/src/review.js`

The observed asset ledger stayed at one stylesheet and five scripts through
Generate, mode change, artifact copy, Review creation, and ZIP export. No
external origin, content-bearing request, fetch, XHR, WebSocket, EventSource,
beacon, analytics, upload, or form submission appeared. Reload and the fresh
context loaded only the same local static set.

For `localStorage`, `sessionStorage`, IndexedDB, Cache Storage, cookies, and
service workers, the qualification browser deliberately withholds raw browser
profile APIs from automation. The result therefore relies on three bounded,
product-specific controls instead of claiming profile-wide inspection:

| Boundary | localStorage | sessionStorage | IndexedDB | Cache Storage | cookies | service workers | Live restoration result |
|---|---|---|---|---|---|---|---|
| Before interaction | no app use | no app use | no app use | no app use | no app use | no app registration | empty textarea; no result |
| After generation | no app use | no app use | no app use | no app use | no app use | no app registration | source remained only in active DOM/controller state |
| After reload | no app use | no app use | no app use | no app use | no app use | no app registration | empty textarea; no restored result |
| Fresh context | no app use | no app use | no app use | no app use | no app use | no app registration | empty textarea; no restored result |

The production-source test independently scans for and rejects all six storage
or registration surfaces, and the behavior test runs generation, clipboard,
Review, and ZIP with the prohibited network/storage globals replaced by
throwing getters. Those checks passed in the final 91-test run. Together with
the two live non-restoration boundaries, no application-created persistence or
pasted-content restoration was observed. Clipboard and ZIP were the two
explicitly requested output channels.

Browser diagnostics in the fresh context returned no warning or error entries.
No visible browser error, rejected action, server exception, or unexpected
console symptom appeared during the functional actions.

### Live CSP and HTTP Boundary

Live GET and HEAD responses returned 200 with `Cache-Control: no-store` and the
complete established CSP, including `connect-src 'none'`, `object-src 'none'`,
`base-uri 'none'`, and `form-action 'none'`. Synthetic-body POST, PUT, PATCH,
and DELETE requests each returned 405. `GET /upload` returned 404. The server
has no body reader or write path, and the repository remained unchanged after
the rejected requests.

## Known Limitations

- Structural decomposition is deliberately bounded, not a complete Markdown
  parser or semantic proof.
- Exact-duplicate folding is conservative and may leave useful duplicates
  separate when scope or attachment evidence is unclear.
- Character counts are not token, cost, speed, recall, or compliance measures.
- The receipt remains a declaration, not proof that routed guidance was read.
- Privacy claims cover this fixed application and server, not browser
  extensions, a compromised OS, user modifications, or services chosen after
  manual paste.
- The live browser automation surface does not provide raw browser-profile
  storage enumeration; application-level non-persistence is established by
  source prohibition, throwing-global behavior tests, and live reload/new-
  context non-restoration instead.

## Rollback

Revert implementation commit
`9e2903fec5de6dccb71cceb25e37c4fb8e03ce49` and the later validation/handoff
commit containing this record, run `npm test`, and replay the historical corpus
from fresh SHA-bound bare clones. No migration or stored user data exists.
