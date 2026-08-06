# V13 Safe Reduction Frontier v0.1

## Phase 1 — Pre-Implementation Corpus Audit

Audit state:

- product starting commit:
  `1995fd25e57b5be2ace6c5cbdfb814c30b34fe9c`
- fixed source:
  `shin4141/decision-os-v13-loopkit@21cd88d4efb378a60cd08a28712083d9d4a8bc19:AGENTS.md`
- source blob: `f85b0d9b17a8f90a7128ea96d9c8f63a88022128`
- source SHA-256:
  `e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db`
- source size: 20,705 UTF-8 bytes; 20,664 Unicode characters
- current repaired result: 17,350 active characters; 3,314 / 16.0%
  actual reduction; two whole sections moved

This inventory was completed before classifier code changed. Candidate
dispositions use exactly the authorized frontier classes. A top-level mixed
span is classified `MOVE_CONDITIONAL_DETAIL` only where the subordinate audit
below identifies exact authored ranges; all material outside those ranges stays
active.

### Complete Top-Level Span Inventory

| Source span | Heading path | Chars | Current disposition | Candidate disposition | Exact trigger / active core | Candidate destination and reconnect | Risk and human-benchmark comparison |
|---|---|---:|---|---|---|---|---|
| `S001-30725667` | Agent Operating Rule | 190 | retained / unqualified active | `KEEP_ACTIVE_CORE` | repository purpose before file generation or change | active `AGENTS.md` | Product purpose is always loaded; human kept it verbatim. |
| `S002-e745d209` | Agent Operating Rule → V12 → V13 Handoff Discipline | 1,589 | retained / universal | `MOVE_CONDITIONAL_DETAIL` | V12 completion integrity, Gate selection, and the exact `Handoff` trigger stay active | minimal template only → `agent-guides/handoff.md#minimal-handoff`; route immediately after the authored Handoff trigger | Human merged the section semantically. Only the authored minimal template is byte-movable; all completion/evidence/Gate rules stay active. |
| `S003-d94a1f59` | Agent Operating Rule → Operational Judgment Core References | 2,310 | retained / universal | `MOVE_CONDITIONAL_DETAIL` | “consult the relevant operational reference when that judgment is needed” and both closing no-GO obligations stay active | exact conditional inventory → `agent-guides/other.md#operational-judgment-references` | Human rewrote this as a routing table. Moving only the already-authored conditional inventory avoids rewriting and retains canon/authority language active. |
| `S004-bc770a79` | Agent Operating Rule → Continuation Proof Selection | 2,221 | retained / universal | `MOVE_CONDITIONAL_DETAIL` | proof selection, authority, BLOCK, assertion, reconciliation, transport, and exceptions stay active | only the final origin/validation inventory → `agent-guides/other.md#continuation-proof-references` | Human summarized it and omitted precise guards. Authority-sensitive procedures are blocked; the independently introduced final two-link inventory is safe and small. |
| `S005-4a57ac48` | Agent Operating Rule → V13 Lite Footer / Canonical Base Report | 3,317 | retained / universal | `MOVE_CONDITIONAL_DETAIL` | universal base-report obligation, complete base template/rules, H3 heading, “Add only the extension whose trigger applies,” and absence warning stay active | exact six-item extension list → `agent-guides/other.md#conditional-report-extensions` | Human split and rewrote it. Only the authored conditional list moves; the universal report and its safeguards do not. |
| `S006-b23b837c` | Agent Operating Rule → Signal Format: Active Signals vs Parked Horizons | 1,077 | retained / universal | `MOVE_CONDITIONAL_DETAIL` | signal/parked-horizon separation and all seven rules stay active | exact format and example, separate spans co-located at `agent-guides/other.md#signal-format` | Human reduced this to a short route. The format and example are authored subordinate blocks; rules remain active and are not fused. |
| `S007-5ad40d78` | Agent Operating Rule → Chat Continuation Footer | 1,494 | moved / conditional | `MOVE_WHOLE_SECTION` | significant context, multiple decisions, long discussion, or handoff sensitivity | existing `agent-guides/handoff.md#chat-continuation` | Already accepted and byte-exact. Human shortened it semantically. Preserve unchanged. |
| `S008-191240a4` | Agent Operating Rule → Context Health Self-Check | 2,190 | retained / universal | `MOVE_CONDITIONAL_DETAIL` | start/end self-check, inclusion trigger, all BLUE/YELLOW/RED definitions, governance, and proactive completion line stay active | exact conditional output format and YELLOW/RED completion procedure → `agent-guides/other.md#context-health-procedure` | Human summarized/routed it. Risk definitions are not moved because they are required to decide activation; only post-classification details move. |
| `S009-77272f81` | Agent Operating Rule → 0.01 Update Check | 1,018 | retained / universal | `MOVE_CONDITIONAL_DETAIL` | every-loop evaluation, conditional inclusion rule, all scoring definitions, and repo/path consequences stay active | exact conditional output template → `agent-guides/other.md#update-check-output` | Human reduced it to a short trigger. Scoring is kept because it is required before the conditional output decision. |
| `S010-14a75900` | Agent Operating Rule → Concept Promotion Gate | 989 | retained / universal | `MOVE_CONDITIONAL_DETAIL` | no-promotion rule, visible status, HOLD obligation, owner-approval condition, and promotion trigger stay active | exact record-field list and example, separate spans co-located at `agent-guides/other.md#concept-promotion-record` | Human rewrote it. The active sentence still requires every listed field; no authority rule is moved or weakened. |
| `S011-839255fb` | Agent Operating Rule → Context Compression Footer | 2,306 | moved / conditional | `MOVE_WHOLE_SECTION` | long context, repeated decisions, handoff-sensitive work, or accumulated state | existing `agent-guides/handoff.md#context-compression` | Already accepted and byte-exact. Human shortened it semantically. Preserve unchanged. |
| `S012-29801bdc` | Agent Operating Rule → Agent Rule | 348 | retained / universal | `KEEP_ACTIVE_CORE` | V12 state, completion, restartability, and next-loop distinctions | active `AGENTS.md` | Human merged this semantically. Core completion/evidence boundary remains active. |
| `S013-c33efafc` | Do Not Overbuild | 490 | retained / universal | `KEEP_ACTIVE_CORE` | explicit no-build/no-integration CAP and activation boundary | active `AGENTS.md` | Human summarized it and omitted some boundaries. Any reduction requires semantic rewriting. |
| `S014-7f2d47ff` | Output Discipline | 189 | retained / universal | `KEEP_ACTIVE_CORE` | every loop record | active `AGENTS.md` | Human did not preserve an equivalent complete field list. All fields stay active. |
| `S015-41796859` | Gate Discipline | 108 | retained / universal | `KEEP_ACTIVE_CORE` | all Gate selection | active `AGENTS.md` | Human merged it. Exact enum and prohibition stay active. |
| `S016-d8175206` | Safety Rule heading context | 14 | retained / universal | `KEEP_ACTIVE_CORE` | governs the following safety siblings | active `AGENTS.md` | Structural heading context; no independent reduction. Human reorganized safety. |
| `S017-6bfd9194` | Safety Rule → Aspire/Carrier/re-entry | 83 | retained / ambiguous | `BLOCKED_UNIVERSAL_OR_AMBIGUOUS` | any damaging loop | active `AGENTS.md` | Safety consequence is condition-bound but prohibited from routing; human rewrote safety. |
| `S018-e06d7ab6` | Safety Rule → high uncertainty | 52 | retained / unqualified active | `BLOCKED_UNIVERSAL_OR_AMBIGUOUS` | high uncertainty | active `AGENTS.md` | Short safety rule; routing would add risk and overhead. Human rewrote safety. |
| `S019-c165a0c8` | Safety Rule → prompt injection | 273 | retained / universal | `BLOCKED_UNIVERSAL_OR_AMBIGUOUS` | prompt-injection-like text in any named surface | active `AGENTS.md` | Repository-wide safety and Owner approval stay active. Human rewrote it. |
| `S020-18d24722` | CAP Rule | 230 | retained / universal | `KEEP_ACTIVE_CORE` | every CAP decision | active `AGENTS.md` | Human merged it semantically. Exact required limits stay active. |
| `S021-def16235` | BLOCK Rule | 172 | retained / universal | `KEEP_ACTIVE_CORE` | every BLOCK decision | active `AGENTS.md` | Human merged it semantically. Reconsideration boundary stays active. |

### Independently Reviewable Subordinate Inventory

Source ranges are zero-based UTF-16 offsets used by the contract. Character
counts are Unicode code points. Every implemented range must become its own
source span; ranges are not allowed to overlap or leave a gap in source
accounting.

| Audit ID | Parent | Range | Chars | Candidate class | What remains active | Destination / reconnect | Risk decision |
|---|---|---:|---:|---|---|---|---|
| `A02.1` | `S002` Minimal handoff template | 1488–1779 | 291 | `MOVE_CONDITIONAL_DETAIL` | exact `When the user selects Handoff` instruction plus completion/Gate rules | `handoff.md#minimal-handoff`; insert route immediately after the trigger | Complete fenced template; safe. |
| `A03.1` | `S003` conditional reference inventory | 1999–3614 | 1,615 | `MOVE_CONDITIONAL_DETAIL` | consult obligation, no-GO rule, HOLD/CAP fallback, canon status | `other.md#operational-judgment-references` | Exact list items carry their own operation triggers; safe. |
| `A04.1` | `S004` proof-option definitions | 4256–4934 | 678 | `BLOCKED_UNIVERSAL_OR_AMBIGUOUS` | entire block | none | Contains authority, BLOCK, proof sufficiency, and Decision Owner recovery boundaries. |
| `A04.2` | `S004` pending-assertion rule/template | 4934–5099 | 165 | `BLOCKED_UNIVERSAL_OR_AMBIGUOUS` | entire block | none | Condition and evidence consequence must stay together; a route would cost about as much as the template. |
| `A04.3` | `S004` origin/validation inventory | 6105–6310 | 205 | `MOVE_CONDITIONAL_DETAIL` | all proof/authority/reconciliation/transport rules | `other.md#continuation-proof-references` | Independently introduced two-link inventory only; safe. |
| `A05.1` | `S005` canonical base-report template | 6568–6871 | 303 | `BLOCKED_UNIVERSAL_OR_AMBIGUOUS` | complete template | none | Explicitly the only universal default report; must remain active. |
| `A05.2` | `S005` conditional extension list | 8433–9438 | 1,005 | `MOVE_CONDITIONAL_DETAIL` | H3, default prohibition, activation obligation, absence warning | `other.md#conditional-report-extensions` | Complete six-item conditional list; safe. |
| `A06.1` | `S006` Signal/Parked format | 9820–10054 | 231 | `MOVE_CONDITIONAL_DETAIL` | separation obligation and all rules | `other.md#signal-format` | Complete `Use:` fenced format; safe when route is adjacent to the format obligation. |
| `A06.2` | `S006` Signal/Parked rules | 10054–10477 | 423 | `KEEP_ACTIVE_CORE` | entire rules block | active | Defines meaning and parked-boundary status; not moved. |
| `A06.3` | `S006` authored example | 10477–10711 | 230 | `COLOCATE_WITHOUT_FUSION` | all rules | same `other.md#signal-format`, separate source span | Complete Example block; safe, one route shared with the format. |
| `A08.1` | `S008` Context Health output format | 12765–13018 | 253 | `MOVE_CONDITIONAL_DETAIL` | exact inclusion trigger and all risk definitions | `other.md#context-health-procedure` | Complete conditional template; safe. |
| `A08.2` | `S008` BLUE/YELLOW/RED risk rules | 13018–13907 | 889 | `KEEP_ACTIVE_CORE` | entire risk block | active | Needed to decide whether the conditional procedure route activates. Moving it would create circular routing. |
| `A08.3` | `S008` YELLOW/RED completion procedure | 13907–14208 | 301 | `MOVE_CONDITIONAL_DETAIL` | inclusion trigger, risk definitions, proactive completion line | same `other.md#context-health-procedure`, separate source span | Both bullets are explicitly YELLOW/RED; safe after classification. |
| `A08.4` | `S008` proactive completion line | 14208–14395 | 187 | `KEEP_ACTIVE_CORE` | entire line/template | active | Universal responsibility/Decision Owner boundary. |
| `A09.1` | `S009` conditional output template | 14739–14924 | 185 | `MOVE_CONDITIONAL_DETAIL` | every-loop evaluation, include-only trigger, scoring, path rules | `other.md#update-check-output` | Complete fenced template loaded only when extension is included; safe. |
| `A09.2` | `S009` Scoring definitions | 14924–15219 | 295 | `KEEP_ACTIVE_CORE` | entire scoring block | active | Required to decide +0.01/1.00/0.99 before output activation. |
| `A09.3` | `S009` repo/path condition and consequences | 15219–15413 | 194 | `BLOCKED_UNIVERSAL_OR_AMBIGUOUS` | entire block | active | Condition, prohibitions, and carryover consequence are inseparable; route overhead would erase most gain. |
| `A10.1` | `S010` prior rule and status templates | 15574–15794 | 220 | `KEEP_ACTIVE_CORE` | entire block | active | Defines the universal promotion guard and visible status. |
| `A10.2` | `S010` promotion-record field list | 15921–16185 | 264 | `MOVE_CONDITIONAL_DETAIL` | promotion HOLD sentence and owner-approval condition remain active | `other.md#concept-promotion-record` | Exact required-field inventory; safe. |
| `A10.3` | `S010` authored example | 16185–16402 | 217 | `COLOCATE_WITHOUT_FUSION` | promotion rule, HOLD obligation, record trigger | same `other.md#concept-promotion-record`, separate source span | Complete Example block; safe, no fusion. |
| `A20.1` | `S020` CAP concrete-limit inventory | 20377–20499 | 122 | `BLOCKED_UNIVERSAL_OR_AMBIGUOUS` | complete CAP Rule, obligation, and all limit axes | active | Independent review proposed movement, then retracted it: the SHA-bound universal-rules regression protects the complete CAP Rule, and separating its axes would cross the protected CAP/Gate boundary. |

Audit correction: the initial subordinate table represented `S020` only at
top-level granularity. Reviewer 2 surfaced `A20.1` after the first checkpoint.
It was explicitly classified before any CAP-specific classifier change, no CAP
movement was accepted, and the complete CAP Rule remained active throughout.
The second review retracted the candidate after applying the protected-core
constraint and existing exact historical regression.

### Audit Conclusions Before Code

- Whole-section routing remains limited to `S007` and `S011`.
- Nine subordinate source ranges are eligible to move and two authored examples
  are eligible to co-locate as separate spans, totaling 4,797 candidate source
  characters before generated-route overhead.
- All universal prefixes/suffixes, Context Health risk definitions, 0.01
  scoring, authority, evidence, completion, safety, Gate, CAP/BLOCK, and
  Decision Owner/final-Seat material remain active.
- No exact duplicate exists; `FOLD_EXACT_DUPLICATE` has no fixed-corpus
  candidate and equivalence rules must not change.
- Co-location is allowed only for source spans sharing a stable anchored guide
  subsection. Source markers, IDs, and dispositions remain separate; no text is
  fused.
- The safe candidate set was derived from the exact historical Markdown
  boundaries, not the human benchmark. The human result changed every mixed
  family semantically; it remains comparison evidence only.

## Implemented Frontier Transformations

The initial implementation checkpoint is
`4eae6529301065428e7c53233deef2f491074dfb`. Independent review then found
that its physically valid routes omitted authored trigger branches. The
reconnect correction is
`68e1c1d922dc89241d1442732cc0b235b6f73017`. The complete implementation
applies only authorized classes A through D. Class E remains unchanged and has
no candidate in this corpus.

### Whole Sections Preserved From the Prior Repair

| Source family | Source chars | Destination | Stable route |
|---|---:|---|---|
| Chat Continuation Footer | 1,494 | `agent-guides/handoff.md` | `#chat-continuation` |
| Context Compression Footer | 2,306 | `agent-guides/handoff.md` | `#context-compression` |

Both sections still move whole, byte-for-byte. Their generated routes are
coalesced into one router line while retaining the complete leading trigger of
each section, the corresponding authored conditional-extension trigger,
distinct paths, and distinct anchors. This explicitly preserves branching,
corrections, multiple/repeated decisions, handoff sensitivity, accumulated
state, and user-selected `Handoff`. No user-authored source instruction is
fused.

### Added Conditional-Detail Extractions

| Audit ID | Source chars | Destination anchor | Result |
|---|---:|---|---|
| `A02.1` | 291 | `handoff.md#minimal-handoff` | exact fenced template moved after active `Handoff` trigger |
| `A03.1` | 1,615 | `other.md#operational-judgment-references` | exact condition-bearing reference inventory moved |
| `A04.3` | 205 | `other.md#continuation-proof-references` | exact final reference inventory moved |
| `A05.2` | 1,005 | `other.md#conditional-report-extensions` | exact conditional extension list moved |
| `A06.1` | 231 | `other.md#signal-format` | exact fenced format moved |
| `A06.3` | 230 | `other.md#signal-format` | exact example co-located as a separate source span |
| `A08.1` | 253 | `other.md#context-health-procedure` | exact conditional output format moved |
| `A08.3` | 301 | `other.md#context-health-procedure` | exact YELLOW/RED procedure co-located separately |
| `A09.1` | 185 | `other.md#update-check-output` | exact conditional output template moved |
| `A10.2` | 264 | `other.md#concept-promotion-record` | exact record-field list moved |
| `A10.3` | 217 | `other.md#concept-promotion-record` | exact example co-located as a separate source span |
| **Total** | **4,797** | | **11 exact source spans** |

Each generated route is inserted at the recorded authored trigger boundary.
Co-located source spans retain separate source markers, IDs, dispositions, and
byte payloads. The implementation also recognizes a tightly guarded authored
H3 detail subtree for the required general regression coverage; a heading is
not sufficient without an immediately preceding conditional detail/procedure
introduction, and universal, authority, safety, completion, and ambiguous
lookalikes stay active.

## Rejected Candidates and Exact Frontier Boundary

The following independently reviewable material was intentionally not moved:

- `A04.1` proof definitions and `A04.2` pending assertion: authority, proof
  sufficiency, Decision Owner recovery, and condition/consequence boundaries;
- `A05.1` base report template: explicitly universal default output;
- `A06.2` signal rules: define the active meaning and horizon boundary;
- `A08.2` Context Health risk definitions: required before the conditional
  procedure can be selected;
- `A08.4` proactive completion: universal responsibility and Decision Owner
  boundary;
- `A09.2` scoring and `A09.3` repository/path consequences: required before
  activation, or inseparable from the condition;
- `A10.1` promotion rule and status: universal promotion guard;
- the CAP concrete-limit inventory: a reviewer proposed its extraction, but
  the complete CAP Rule is protected by the pre-existing exact-historical
  universal-rules regression and defines the CAP/Gate boundary; moving it
  would violate the authorized protected-core constraint;
- all remaining completion, evidence, Gate, safety, CAP/BLOCK, authority, and
  final-Seat material.

Reducing these ranges would require a model-authored summary, fusion of
non-identical rules, moving a rule needed to decide whether its own route
applies, or repository-specific interpretation. No such transformation was
implemented. There is still no exact duplicate to fold.

## Exact Classifier and Source-Accounting Changes

- Mixed sections are decomposed only at bounded authored structures: complete
  fences, independently introduced inventories or conditional lists, explicit
  examples/procedures, and tightly guarded H3 subtrees.
- The parser emits non-overlapping `block-fragment` and `conditional-detail`
  spans with original source offsets. Every non-whitespace source byte belongs
  to exactly one retained, moved, or exact-fold accounting span.
- Active fragments from a decomposed mixed section are forced retained in all
  modes; the legacy whole-block classifier cannot move the remaining mandatory
  core.
- Moved details are reproduced between source markers and grouped under stable
  guide anchors without merging their payloads.
- Inline routes use original insertion offsets and are validated against their
  source span and guide anchor. The two whole-section handoff routes are the
  only generated routes coalesced.
- The conditional-extension route deterministically carries every authored
  list trigger in the active file. Its Chat and Context Compression triggers
  are also joined to the corresponding handoff-anchor routes, so an active
  trigger cannot be circular or semantically stranded.
- Result validation rejects overlapping detail ranges, invalid insertion
  offsets, missing source payloads, missing routes, empty guides, and
  unaccounted non-whitespace source text.
- Exact-duplicate equivalence and repetition signaling were not loosened.

An independent interval check found four formatting line-feed separators at
UTF-16 offsets 19,857, 19,941, 19,994, and 20,268 outside the 41 instruction
span bodies. Generated blank-line separators replace them. They contain no
instruction text, so every instruction-bearing span remains accounted exactly
once and `unaccountedSourceSpans` is zero; the ledger is intentionally an
instruction-span ledger, not a claim that original inter-block whitespace is
byte-identical.

## Three-Mode Exact Corpus Replay

The final engine was run directly on the fixed Git object. The source identity,
SHA-256, byte count, and character count were asserted before generation.

| Mode | Original | Complete active | Actual reduction | Whole moved | Detail moved | Externalized source | Generated router | Folded | Retained / universal | Guides | Outcome |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| Conservative | 20,664 | 14,589 | 6,075 / 29.4% | 2 | 11 | 8,597 / 41.6% | 2,268 | 0 | 28 / 18 | handoff, other | `COMPACTED` |
| Balanced | 20,664 | 14,589 | 6,075 / 29.4% | 2 | 11 | 8,597 / 41.6% | 2,268 | 0 | 28 / 18 | handoff, other | `COMPACTED` |
| Aggressive | 20,664 | 14,589 | 6,075 / 29.4% | 2 | 11 | 8,597 / 41.6% | 2,268 | 0 | 28 / 18 | handoff, other | `COMPACTED` |

`Generated router` is the character count of the nine emitted route lines,
joined by newline for measurement. All three modes contain 41 accounted source
spans, zero deleted unique instructions, and zero unaccounted spans. The modes
correctly converge because this corpus reaches the same structural safety
boundary in each mode.

### Stable Routes and Artifact Inventory

The complete route inventory is:

- `agent-guides/handoff.md#minimal-handoff`
- `agent-guides/handoff.md#chat-continuation`
- `agent-guides/handoff.md#context-compression`
- `agent-guides/other.md#operational-judgment-references`
- `agent-guides/other.md#continuation-proof-references`
- `agent-guides/other.md#conditional-report-extensions`
- `agent-guides/other.md#signal-format`
- `agent-guides/other.md#context-health-procedure`
- `agent-guides/other.md#update-check-output`
- `agent-guides/other.md#concept-promotion-record`

Every mode emits exactly:

- `AGENTS.md` — 14,589 characters; SHA-256
  `583a13c409a2e56e42e607b208a9eac206e30f1148239855e2d947812f0e9034`;
- `agent-guides/handoff.md` — 4,527 characters; SHA-256
  `7951186b3f6ca7d578c853e419df212e2cd0e2893fd57aa2c7bf1590968d5b39`;
- `agent-guides/other.md` — 5,804 characters; SHA-256
  `68e32ca18e842676087e06f5e273c503dfbd4df4757a9daaf596cd8f58a598a5`;
- `move-map.md` — 7,768 characters; SHA-256
  `745211070a2153d114b1e5dc646e79764ddcefb66393f0675185372f8e4ecd2c`.

The deterministic ZIP is 33,360 bytes with SHA-256
`c3a214b4f403c2b08ae8756b7c1a60d04ed4776968d2e053766cdc7b6e4fe114`.
Its entries exactly equal the four visible artifacts, including when the input
artifact enumeration is reversed. Review with Your AI includes the exact
original and every complete artifact. Its character count/SHA-256 by mode is:

- Conservative: 77,045 /
  `b43431bf013dae0ab9a2f42fd777099b5c90a8eec3b772dc894e98ee60a88bc8`;
- Balanced: 77,041 /
  `ace618470330c8792173ab5ff7165b5f38fb9db167d32a0659c01a5d836289d0`;
- Aggressive: 77,043 /
  `17fc7f0b556aa723be392387f843d1ff890ac96c6d6d053b4dcff5aaec7c1aa4`.

## Comparison Baselines

### Previous Bounded Result

The previous repaired engine produced 17,350 active characters and a 3,314 /
16.0% actual reduction. The repaired frontier produces 14,589 active
characters and a 6,075 / 29.4% reduction:

- 2,761 fewer active characters than the previous repaired package;
- 2,761 additional characters of actual reduction;
- 13.4 percentage points greater actual reduction.

Every increment comes from the 4,797 audited source characters minus the added
active routing/accounting overhead. No percentage target influenced the
classification boundary.

### Human+AI Semantic Benchmark

The human+AI result remains 11,141 characters and 46.1% reduction. The repaired
deterministic active file is 3,448 characters larger and its reduction is 16.7
percentage points lower. The difference remains attributable to semantic
consolidation, paraphrase, template/rule removal, and repository-aware
judgment. It is not treated as an automatically safe or required target.

## Focused and Regression Verification

The suite contains 102 tests: the existing 95 plus seven safe-frontier tests.
The new tests prove:

- active-core plus exact conditional-detail extraction in all three modes;
- authored detail, nested subtree, template, fence, Definitions, Scoring, and
  Example preservation;
- conditional reference-inventory routing and universal prefix/suffix
  retention;
- stable adjacent subsection routes and Chat/Context route coalescing;
- ambiguous or protected mixed sections remain active;
- co-located spans remain distinct, with no semantic fusion;
- complete source accounting and complete Review/ZIP packages with Unicode.

The unchanged regression suite covers copy behavior, repetition, privacy,
server/CSP, and the UI. Final verification: 102 tests, 102 passed, 0 failed,
0 skipped, 0 cancelled, and 0 todo. `git diff --check` passed.

## Independent Semantic Reviews

Both reviewers independently regenerated the strongest Balanced package at
`68e1c1d922dc89241d1442732cc0b235b6f73017` from the fixed Git object and
compared the complete original with active `AGENTS.md`, both guides,
`move-map.md`, and all routes.

### Review 1

Final classification: `NO_CHANGE` on all six questions.

- all universal authority, safety, evidence, completion, Gate, CAP/BLOCK, and
  Decision Owner material remains active;
- all six conditional-extension trigger families remain active;
- Chat and Context routes contain both the whole-section and extension-list
  trigger sets, including user-selected `Handoff`;
- all 13 moved spans are byte-identical inside their source markers;
- all ten route targets have one physical stable anchor;
- no retained span is safely eligible under the fixed low-risk rules, and the
  protected CAP Rule is not an extraction candidate.

The reviewer found no `REAL_MEANING_LOSS`, `BROKEN_RECONNECT`,
`SAFE_MISSED_OPPORTUNITY`, or disguised semantic rewrite.

### Review 2 and Reconnect Correction

On the initial checkpoint, Reviewer 2 correctly classified two issues as
`BROKEN_RECONNECT`: the conditional-extension route was circular because its
six activation conditions were guide-only, and the coalesced Chat/Context
route labels omitted authored trigger branches. That package was not accepted
or pushed as the final result.

The correction at `68e1c1d922dc89241d1442732cc0b235b6f73017` carries every
authored conditional-extension trigger in active generated routing, preserves
the complete whole-section triggers, and joins the Chat/Context extension
triggers to their matching stable anchors. The fresh independent re-audit
classified questions 1 through 5 as `NO_CHANGE` and question 6 as
`SEMANTIC_REWRITE_ONLY`:

- no lost condition, exception, or authority boundary;
- user-selected `Handoff` explicitly reaches
  `agent-guides/handoff.md#context-compression`;
- every route target and guide anchor occurs exactly once;
- all 41 instruction-span bodies occur exactly once in their canonical homes;
- the previously suggested CAP-list extraction was retracted because the
  entire `S040-18d24722` CAP Rule is `UNIVERSAL / GLOBAL / REQUIRED`, protected
  by the exact historical Aggressive regression, and part of the protected
  CAP/Gate boundary.

No `REAL_MEANING_LOSS`, `BROKEN_RECONNECT`, or
`SAFE_MISSED_OPPORTUNITY` remains in the strongest package.

## Cleanup and Privacy Regression

Before removal, `/private/tmp/agents-md-compactor-repair.L1qSDJ` was verified
as the previously reported disposable replay root. It contained only the
expected `v13.git` and `v12.git` bare repositories with their canonical GitHub
remotes. The exact root was removed and its absence was verified. No cleanup
decision was returned to Shin.

No browser, server, clipboard, ZIP, persistence, or network implementation was
changed in this vertical. The production-code privacy scan, local-assets check,
strict server/CSP checks, network/storage-disabled generation/export flow,
explicit copy and Review actions, deterministic local ZIP, and UI regressions
all pass. No external-corpus distribution measurement began.

## Known Limitations

- Classification is bounded lexical/structural logic, not semantic proof.
- Unrecognized authored structures remain active even if a human could safely
  summarize or reorganize them.
- Character reduction is not a token, cost, time, speed, recall, compliance,
  or instruction-obedience guarantee.
- Routes and the Lightweight Guidance Receipt do not guarantee that an agent
  reads or follows a guide.
- This validates one fixed historical corpus; no external-corpus distribution
  measurement was started.
- The human benchmark's remaining advantage is not available without crossing
  the prohibited semantic or repository-knowledge boundary.

## Rollback

Revert implementation commits
`4eae6529301065428e7c53233deef2f491074dfb` and
`68e1c1d922dc89241d1442732cc0b235b6f73017`, plus the final record commit,
run `npm test`, and replay the exact fixed Git object. No migration,
persistence, network state, or stored user data exists. The prior deterministic
result is the 17,350-character active file at
`1995fd25e57b5be2ace6c5cbdfb814c30b34fe9c`.

## Final Classification and Gate

Classification:

`CAP — BYTE-PRESERVING FRONTIER REACHED`

The result improves actual active reduction from 16.0% to 29.4%. Every added
movement is an authorized structural, byte-preserving, reconnectable
transformation; zero unique instructions are deleted; zero instruction spans
are unaccounted; and two independent reviews of the corrected strongest
package find no meaning loss, broken reconnect, or safe missed opportunity.
The exact blocked ranges above show that further meaningful reduction requires
semantic rewriting, fusion, or repository-specific judgment.

Current Gate:

`HOLD — deterministic byte-preserving frontier established`

Only Shin may accept or reject this demonstrated frontier. External-corpus
distribution measurement may begin only after acceptance. No release,
publication, external testing, hosting, repository visibility change, pricing,
branding, marketing claim, or scope expansion is authorized by this record.
