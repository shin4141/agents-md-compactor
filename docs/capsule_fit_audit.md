# Compactor Capsule Fit Audit

## Identity and purpose

- Destination: standalone `shin4141/agents-md-compactor`
- Purpose: accept one pasted `AGENTS.md`, preserve the source separately,
  retain universally required instructions in the active file, move
  conditional instructions into reconnectable guides, preserve source
  accounting, and emit a reviewable package.
- V13 capsule-standard source:
  `shin4141/decision-os-v13-loopkit@c81b907951cb223106717b040aa2da034800d81d`
- Compactor source commit used:
  `c93e3db7fb2eb0d9327e3ef14963ab370731ec32`
- As-of: 2026-08-07

This file is the canonical durable Fit Audit record for this repository. Other
operating surfaces may summarize or link to it; they do not replace it.

## V13 source pointers

- [Universal Core and durable record](https://github.com/shin4141/decision-os-v13-loopkit/blob/c81b907951cb223106717b040aa2da034800d81d/docs/new_repo_scaffold_standard.md#2-transfer-the-universal-core)
- [Active / Conditional / Excluded placement](https://github.com/shin4141/decision-os-v13-loopkit/blob/c81b907951cb223106717b040aa2da034800d81d/docs/new_repo_scaffold_standard.md#5-place-each-selected-guard-deliberately)
- [Fit Audit re-evaluation trigger](https://github.com/shin4141/decision-os-v13-loopkit/blob/c81b907951cb223106717b040aa2da034800d81d/docs/new_repo_scaffold_standard.md#fit-audit-re-evaluation-trigger)
- [Compactor regression case](https://github.com/shin4141/decision-os-v13-loopkit/blob/c81b907951cb223106717b040aa2da034800d81d/docs/new_repo_scaffold_standard.md#compactor-regression-case)

## Live Dogfood Observation 002

[`validation/live_dogfood_observation_002.md`](../validation/live_dogfood_observation_002.md)
is the bounded record of the one local observation. It used canonical source
commit `c93e3db7fb2eb0d9327e3ef14963ab370731ec32`, its root `AGENTS.md`, and
Balanced mode. The ordinary UI returned `NO_ACTIVE_REDUCTION`: 7,587 source
code points became 7,763 generated active code points (+176 / +2.3%), with
zero generated guides. The generated package was recovered through the
documented Review with your AI clipboard path and installed only in an
isolated copy.

A fresh Codex context rooted in that generated persistent instruction surface
received no transient marker prompt and ended its neutral read-only response
with `🪶 Core only`. This is `PASS` for the zero-guide receipt case only: the
receipt matches zero generated guides. The fresh project surface did not expose
`.git`, so canonical Gate reconstruction was correctly reported as `UNKNOWN`;
that is an environment/repository-identity limitation, not a Compactor product
defect. Observation 001 remains `GENERATION OBSERVED / TRANSPORT INCOMPLETE`,
and A-3 remains `INVALID OBSERVATION — WRONG WORKSPACE`; neither is counted as
receipt evidence.

## Active guards

1. **Source / generated identity.** The root repository `AGENTS.md` is the
   source operating capsule; emitted `AGENTS.md` files are generated artifacts.
   Preserve both with explicit identities. Risk: source replacement or review
   of the wrong instruction surface. Sources: Compactor regression case;
   `README.md#how-the-third-option-works`.
2. **Recursive-compaction gate.** Do not treat an already-generated package as
   ordinary source. A recursive experiment requires separate authorization and
   exact provenance; uncertainty produces `HOLD` / `UNKNOWN`. Risk: double
   compaction can erase lineage or route an already-routed instruction again.
   Source: Compactor regression case.
3. **Persistent versus transient setup.** User-equivalent dogfood may rely only
   on repository-persistent instructions. Developer-only prompts, transient
   marker instructions, and hand-written feather markers cannot establish
   ordinary first-use evidence. Risk: a special prompt can manufacture the
   expected receipt. Source: Compactor regression case.
4. **Instruction, safety, and accounting integrity.** Do not call a generated
   package complete when a source instruction, active authority or safety
   boundary, disposition, or reconnect route is unaccounted for. Risk:
   active-file reduction can hide instruction loss. Sources: Compactor
   regression case; Active / Conditional / Excluded placement.
5. **Receipt and public-claim boundary.** The feather receipt is a declaration,
   not proof of guide reading or runtime compliance. Keep implemented, tested,
   locally observed, publicly released, and externally adopted claims
   separate. Risk: marker presence can be overstated as compliance or general
   performance. Sources: Compactor regression case; Universal Core.
6. **Fresh source of truth.** Establish repository, commit, source input, mode,
   and generated-package identity before relying on an observation. Risk: a
   correct result against a stale or different artifact is not current proof.
   Source: Universal Core.
7. **Restartability and Missing Closure.** Do not guess missing state. Preserve
   the Current Gate, source of truth, next action, prohibited continuation, and
   unresolved evidence. Risk: context loss can silently promote permission or
   completion. Source: Universal Core.
8. **Responsibility transfer.** A handoff assigns the next executable
   responsibility, not only information. Routine cleanup remains with the
   executing AI. Risk: work becomes ownerless or is returned to Shin without a
   decision need. Source: Universal Core.

## Conditional guards

1. **Live dogfood and later review sequence.** Exact reconnect trigger: before
   running live Compactor dogfood, installing a generated package, starting the
   fresh dogfood session, interpreting its receipt, creating the later
   fictional measured sample, or beginning Fable review, read
   [`docs/live_dogfood_protocol.md`](live_dogfood_protocol.md). Risk: the run can
   become developer-special, lose source/generated identity, or skip the
   required pre-Fable order. Sources: Compactor regression case; Active /
   Conditional / Excluded placement.
2. **Handoff procedure.** Exact reconnect trigger: when the user selects
   `Handoff`, read [`docs/handoff_command.md`](handoff_command.md). Risk: a
   compact transfer can omit ownership or Missing Closure. Sources: Universal
   Core; Active / Conditional / Excluded placement.
3. **Public evidence detail.** Exact reconnect trigger: before changing a
   public README claim or making a marker, guide-reading, compliance,
   reduction, token, cost, time, or performance claim, read
   [`validation/lightweight_guidance_receipt_feather_marker_v0_1.md`](../validation/lightweight_guidance_receipt_feather_marker_v0_1.md)
   and the evidence boundary in [`README.md`](../README.md). Risk: a fixed
   declaration or corpus result can be promoted into unsupported general proof.
   Sources: Compactor regression case; Active / Conditional / Excluded
   placement.

## Excluded guards

1. **V13 production code and full V13 instruction surface.** Excluded because
   this is a standalone V11 product. Importing V13 implementation or all V13
   rules would widen the product and recreate the oversized always-loaded
   surface this capsule is meant to avoid. Sources: Universal Core; Active /
   Conditional / Excluded placement.
2. **Unrelated destination domains.** API routes, scraping/crawling, external
   contact workflows, market prediction, payment, accounts, hosted services,
   and autonomous integration guards are excluded from this capsule because
   the frozen v0.1 product is a local single-input browser tool and those
   surfaces are not authorized. Re-evaluate rather than silently importing
   them if the destination changes. Sources: Active / Conditional / Excluded
   placement; Fit Audit re-evaluation trigger.
3. **Fable instructions in the active core.** Detailed Fable procedure is
   excluded from the always-loaded surface because Fable is not the next step.
   Its reconnect point remains in the conditional dogfood protocol. Risk:
   activating it now would skip live dogfood and the fictional measured sample.
   Sources: Active / Conditional / Excluded placement; Compactor regression
   case.

## Closed observation

1. **CLOSED — zero-guide receipt case.** Observation 002 established one local
   fresh Codex context that emitted `🪶 Core only` from the generated persistent
   package without a transient marker prompt. Its zero generated guides match
   that declaration. This closes only that bounded observation; it does not
   prove general runtime compliance. Source:
   [`validation/live_dogfood_observation_002.md`](../validation/live_dogfood_observation_002.md).

## UNKNOWN

1. Whether a nonzero generated-guide case will report the guides actually read
   correctly remains `UNKNOWN`. Observation 002 emitted zero guides, so it
   cannot establish conditional-guide use or reporting. The marker contract and
   tests do not prove runtime compliance. Source: Compactor regression case;
   Observation 002.
2. Automatic product-level recognition and rejection of already-generated
   Compactor input is not established. This capsule supplies an operator gate;
   it does not claim runtime detection. Product behavior change is future work
   unless separately authorized. Source: Compactor regression case.

## Candidate coverage

| Required candidate area | Disposition |
| --- | --- |
| source versus generated identity | Active 1 |
| double / recursive compaction | Active 2; runtime detection UNKNOWN 2 |
| persistent versus transient instruction | Active 3 |
| reconnectable guidance | Conditional 1–3 with active routes in `AGENTS.md`; nonzero-guide reporting UNKNOWN 1 |
| user-equivalent versus developer-only dogfood | Active 3; Conditional 1; zero-guide local receipt CLOSED 1 |
| context loss and restartability | Active 7; Conditional 2 |
| instruction / safety-boundary loss | Active 4 |
| public claim versus evidence | Active 5; Conditional 3 |
| source-of-truth / As-of freshness | Active 6 |
| Missing Closure must not be guessed | Active 7 |
| handoff transfers responsibility | Active 8; Conditional 2 |
| routine cleanup remains with executing AI | Active 8 |

## Re-evaluation trigger

Re-run this Fit Audit and update this same file before authorizing work when the
Destination / Purpose or a material operating surface changes. Examples
include local-only to hosted/public service behavior, no API to API use,
manual operation to automation, single pasted input to repository scanning, or
a separately authorized recursive-compaction feature. The examples are not a
fixed taxonomy.

Also re-evaluate if live dogfood falsifies an Active or Conditional guard,
reveals a missing destination risk, or closes an `UNKNOWN` in a way that changes
the required operating surface.
