# Final Engine vs Human Compression Benchmark v0.1

## Classification and Direct Answer

- Classification: `HOLD — SAFE BUT OVERPROTECTIVE`
- Final engine commit:
  `9abf9acf1fe6078ad7069aa67653f6c2dcf80073`
- Branch: `codex/v0-1-contract-vertical`
- Current Gate:
  `HOLD — awaiting authorization for one bounded capability repair`

Direct product-capability answer: the final v0.1 engine does **not** currently
produce an acceptable useful reduction on this historical AGENTS.md. All three
modes preserve every source span and add 176 generated characters. This is not
`BLOCK — SEMANTIC COMPACTION REQUIRED`, because two intact authored sections
totaling 3,800 source characters are clearly conditional and align with the
existing handoff guide family. A bounded deterministic classifier repair could
route those sections without rewriting their meaning.

The implementation and privacy contracts remain complete. The capability claim
is held pending Shin's decision on that one bounded repair. This record does not
describe v0.1 as product-complete.

## Exact Inputs

Both sources were read as exact UTF-8 blobs from one disposable bare clone of
`shin4141/decision-os-v13-loopkit`. Neither source repository was modified.

| Role | Exact identity | Git blob | SHA-256 | Bytes | Characters |
|---|---|---|---|---:|---:|
| Original | `21cd88d4efb378a60cd08a28712083d9d4a8bc19:AGENTS.md` | `f85b0d9b17a8f90a7128ea96d9c8f63a88022128` | `e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db` | 20,705 | 20,664 |
| Human+AI benchmark | `e3d1b29f4bfb0215ebde66ea60376c01b7f87327:AGENTS.md` | `2deb6f610f8e3a4e67808a0182cb2439a7abc447` | `bb14c77c6b45c6bf365902b47729b455df566fa98688956824e072c352f2dae7` | 11,147 | 11,141 |

The human benchmark removes 9,523 complete-file characters, a 46.1% reduction.
It has 10 major parsed spans versus 21 in the original. A line diff reports 231
insertions and 389 deletions, confirming that it is a substantial rewrite and
reorganization rather than only deletion or externalization.

## Final Three-Mode Run

The production `compactAgentsMd` and result validator at the fixed engine commit
were run directly against the original blob. Complete active AGENTS.md and move
map artifacts were captured for every mode. No guide was emitted, so each
complete package contained exactly `AGENTS.md` and `move-map.md`.

| Mode | Active characters | Actual active change | Retained spans | Moved spans | Folded duplicates | Guides | Outcome | Difference from human |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| Conservative | 20,840 | 176 larger / -0.9% reduction | 21 | 0 | 0 | 0 | `NO_ACTIVE_REDUCTION` | 9,699 larger |
| Balanced | 20,840 | 176 larger / -0.9% reduction | 21 | 0 | 0 | 0 | `NO_ACTIVE_REDUCTION` | 9,699 larger |
| Aggressive | 20,840 | 176 larger / -0.9% reduction | 21 | 0 | 0 | 0 | `NO_ACTIVE_REDUCTION` | 9,699 larger |

Every mode is 87.1% larger than the human result and trails its reduction by
47.0 percentage points. Mode selection has no effect on this corpus.

The three active files are byte-identical after UTF-8 encoding:

- `AGENTS.md`: 20,840 characters; SHA-256
  `5941332050b1797e356d2fe3fd9ba82315cac0c931b812c955853c25c407acc0`
- `move-map.md`: 3,609 characters; SHA-256
  `ea2b2c8c58e353690802b64b87d7b3206a5eb6fa3481e438a620d2707e837e9b`

The source ledger classifies 18 spans as `UNIVERSAL`, two as
`UNQUALIFIED_ACTIVE`, and one as `AMBIGUOUS`. All 21 remain active. Universal
rules retained: 18 of 18. Conditional rules externalized: 0. Exact duplicate
groups and potential exact duplicates: 0. No instruction, condition, exception,
authority boundary, or reconnect route is lost by the engine; no reconnect
route is generated because nothing moves.

## Semantic Comparison

The human result preserves the repository purpose verbatim, then rewrites the
remaining 20 original spans into nine topical sections. It is not automatically
the semantic oracle. It consolidates repeated ideas, substitutes summaries for
templates and examples, adds explicit authority language, and relies on named
repository references. Those operations exceed exact-body folding and
condition-routing.

| Original material | Engine result | Human result | Gap class | Finding |
|---|---|---|---|---|
| `S001` repository purpose | retained verbatim | retained verbatim | A | Correct always-loaded core. |
| `S002`, `S012`, `S015`, `S017`, `S018`, `S020`, `S021`: completion, Gate, CAP/BLOCK, safety | all retained | semantically merged into human section 3 | A, E | Authority and safety are properly protected. The human gain comes from paraphrase and cross-span consolidation, not an exact duplicate. |
| `S003`: operational judgment references | retained | rewritten as a compact routing table in human section 6 | A, E | Active trigger-to-reference routes must remain reachable. The human table uses semantic rewriting and repository knowledge. |
| `S003`: Field Note lifecycle status | retained statement that canon-promoted notes are non-optional operational origins | human section 1 calls Field Notes advisory memory and not authority | E, F | This is a material authority-model rewrite, even though human section 6 still makes selected references conditional requirements. It cannot be treated as byte-preserving compression. |
| `S004`: continuation proof selection | retained | summarized across human sections 2 and 5 | A, E, F | Evidence and authority boundaries deserve protection. The human text omits the three explicit guard choices and the precise missing-artifact reconciliation exception and prerequisites. |
| `S005`: canonical base report plus nested conditional extensions | retained as one span | split and rewritten into human sections 8 and 9 | A, C, E | The base report is universal. The nested `Conditional Extensions` subsection is structurally separable in principle, but the current H2-primary parser keeps the H3 subtree attached; the human text also rewrites it. |
| `S006`: active signals versus parked horizons | retained | reduced to a route and short extension trigger | E, F | The human relies on a repository reference and drops the full format, example, and parked-horizon rules. Existing v0.1 guide ownership is not singular enough to move it safely as-is. |
| `S007`: Chat Continuation Footer | retained as `UNIVERSAL` | reduced into human section 9 | B | The authored leading trigger limits it to significant-context or handoff-sensitive work. It is a complete H2 span and fits the existing handoff guide family, but `Chat Continuation` is not recognized as a handoff heading and later absolute words overprotect the whole span. |
| `S008`: Context Health Self-Check | retained | summarized and routed in human sections 6 and 9 | A, C, E | It contains a universal start/end self-check plus conditional extension rules. Moving the intact span would be unsafe; useful reduction needs structural separation or rewriting. |
| `S009`: 0.01 Update Check | retained | reduced to a short trigger | E | The existing guide taxonomy has no singular safe owner. Human compression summarizes the scoring contract. |
| `S010`: Concept Promotion Gate | retained | rewritten into human section 7 | A, E | Promotion and owner-approval boundaries are authority-sensitive; the human result consolidates wording rather than routing an unchanged span. |
| `S011`: Context Compression Footer | retained as `UNIVERSAL` | reduced and routed in human sections 5, 6, and 9 | B | The opening trigger limits it to long, repeated, or handoff-sensitive context. It is a complete H2 span and fits the handoff guide family, but `Context Compression` is not recognized as a handoff heading and later absolute words overprotect it. |
| `S013`: Do Not Overbuild | retained | summarized in human section 4 | A, E, F | The no-expansion rule is correctly protected. The human result removes the Auto-Spend cross-repository activation boundary and the explicit safe starting surfaces. |
| `S014`: Output Discipline | retained | not preserved as an equivalent field list | F | The human base report does not explicitly retain previous loop, residue, next variable, Carrier impact, re-entry capacity, cap/recheck condition, and next-loop command as one required set. |
| `S019`: prompt-injection safety | retained | rewritten as bullets in human section 4 | A, E | Correct safety protection; reduction comes from restructuring, not conditional routing. |
| New human authority and routing language | not present in original and therefore not generated | adds Shin/final-Seat authority, authorized-surface enumeration, routine-cleanup ownership, and additional reference routes | E | This is repository-aware policy editing, not compression of exact source bytes. |

### What the Human Compression Did That the Engine Did Not

1. Merged near-duplicate completion, Gate, CAP/BLOCK, reporting, and handoff
   concepts across separate authored sections.
2. Rewrote long templates, definitions, examples, and rationale into shorter
   normative summaries.
3. Reorganized 21 original spans into 10 topical spans.
4. Substituted compact reference routes for embedded operating detail and
   depended on knowledge of existing repository files.
5. Added or clarified Decision Owner, authority, cleanup, and current-scope
   rules that were not exact source bodies.
6. Removed some precise exceptions and required field sets. Those removals may
   be intentional product evolution, but they are not proven meaning-preserving
   compaction.

### What the Engine Protected Correctly

- the repository purpose and completion-before-next-loop boundary;
- final authority, evidence, and continuation-proof requirements;
- the universal canonical base report;
- Gate vocabulary and CAP/BLOCK semantics;
- safety, prompt-injection, and no-overbuild rules;
- concept-promotion and owner-approval boundaries; and
- every original condition and exception, with zero deletion and zero
  unaccounted spans.

### Engine-Moved Rules That the Human Kept Active

None. The engine moved zero spans and emitted zero guides.

### Condition, Exception, Authority, and Reconnect Audit

- Engine: no lost condition, exception, authority boundary, or source span;
  zero moved spans means there is no missing generated reconnect route.
- Human benchmark: removes the explicit Destination Identity guard choice and
  missing-artifact reconciliation prerequisites; drops the Auto-Spend
  activation boundary and the complete Output Discipline field set; and changes
  Field Notes from canon-promoted operational origins to advisory memory.
- Human reconnect behavior: keeps or adds compact routes to named repository
  references, but its safety depends on those files existing and carrying the
  omitted detail. That dependency is repository knowledge, not something the
  standalone pasted-file engine may assume.

## Gap Classification Summary

- **A — Correct conservative refusal:** dominant for authority, completion,
  safety, evidence, Gate, and universal report rules.
- **B — Classifier overprotection:** established for `S007` Chat Continuation
  and `S011` Context Compression.
- **C — Missing structural decomposition:** present where universal H2 material
  contains an authored conditional H3 subtree or mixed universal/conditional
  sections, especially `S005` and `S008`.
- **D — Safe exact-duplicate opportunity:** not observed. The final engine found
  zero exact groups and zero potential exact duplicates.
- **E — Requires semantic rewriting or repository knowledge:** explains most of
  the human benchmark's 46.1% reduction.
- **F — Human benchmark may have compressed too aggressively:** applies to the
  omitted continuation-guard choices, missing-artifact exception details,
  Auto-Spend activation boundary, full Output Discipline field set, and several
  footer formats and examples.

## One Bounded Repair Candidate — Not Implemented

Authorize one focused classifier repair inside the existing `handoff` category:

1. recognize standalone authored H2 headings for `Chat Continuation` and
   `Context Compression` as handoff/restart guidance;
2. require an explicit leading conditional trigger and reject movement when the
   same span contains a genuinely unqualified authority, safety, completion, or
   evidence rule;
3. make the active route mention context continuation/compression as well as
   handoff/restart, so the reconnect condition remains visible;
4. preserve each moved span byte-for-byte in the generated handoff guide; and
5. add a focused SHA-bound test requiring only `S007` and `S011` to move while
   all other historical spans remain retained, source accounting stays exact,
   and complete active-file reduction becomes positive.

Those two spans contain 1,494 and 2,306 characters respectively: 3,800 source
characters before small router/receipt overhead. That is enough to establish a
meaningful net reduction candidate without merging, summarizing, deleting, or
using repository-specific knowledge. This estimate is not an implemented or
tested result.

Do not broaden the repair into semantic deduplication, a new guide taxonomy,
repository scanning, source rewriting, or automatic reliance on existing Field
Notes. Do not implement it without Shin's authorization.

## Verification and Completion

- Final engine used: yes, exact commit recorded above.
- All three modes run: yes.
- Complete packages captured and hashed: yes.
- Exact original and human sources compared numerically and semantically: yes.
- Original source repositories modified: no.
- Product code, classifier, tests, UI, privacy, fixtures, and output contract
  changed: no.
- Benchmark classification: `HOLD — SAFE BUT OVERPROTECTIVE`.
- Current Gate:
  `HOLD — awaiting authorization for one bounded capability repair`.

Completion Line: the final-engine capability benchmark is complete, but useful
v0.1 capability on this historical corpus is not yet established. The next
decision is whether Shin authorizes the one bounded repair candidate above.
