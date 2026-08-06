# Other Conditional Guidance

<a id="operational-judgment-references"></a>
## Operational Judgment References

<!-- source-span: S006-1e9d1890 -->
- Next 0.01 selection: read `field_notes/021_required_intermediate_node.md`.
  Use when selecting the next action. The next 0.01 is the earliest missing required intermediate node between current state and target state.
- V12→V13 mapping: read `field_notes/022_v12_to_v13_mapping.md`.
  Use when converting a V12 completion state into a V13 next-loop gate. `PASS` does not automatically mean `GO`; `DELAY / BLOCK / UNKNOWN` must not produce `GO`.
- CAP axis and limit selection: read `field_notes/023_cap_axis_limit_selection.md`.
  Use when choosing `CAP`. `CAP` requires a concrete axis and limit. If no concrete limit can be derived, choose `HOLD` instead of arbitrary `CAP`.
- Execution Loop Gate:
  When asked to run or repeat a loop, do not GO from momentum.
  First check: exit condition, evidence source, touch surface, rollback, and debt risk.
  GO only when all five are clear and bounded.
  CAP if useful but limits/evidence are incomplete.
  HOLD if requirements or owner decision are unclear.
  BLOCK if the loop weakens measurement, hides debt, or violates constraints.
- Aspire / Carrier / Re-entry Capacity: read `field_notes/024_aspire_carrier_reentry_operational_definitions.md`.
  Use when judging whether a loop damages owner purpose, carrying capacity, or future restartability.
- Footer axis consolidation: read `field_notes/025_footer_axis_consolidation.md`.
  Use when deciding whether the canonical base report needs a conditional Context Health, Chat Continuation, Context Compression, Handoff, completion-evidence, branch-authority, or 0.01 extension. More report blocks are not better.

<!-- /source-span: S006-1e9d1890 -->

<a id="continuation-proof-references"></a>
## Continuation Proof References

<!-- source-span: S010-5ac15e07 -->
Operational origin and validation:

- [Field Note 125](field_notes/125_execution_context_proof_selection.md)
- [Field Note 125 operational validation](validation/field_note_125_operational_validation.md)

<!-- /source-span: S010-5ac15e07 -->

<a id="conditional-report-extensions"></a>
## Conditional Report Extensions

<!-- source-span: S012-01555c74 -->
- Context Health: when Context Risk is `YELLOW` or `RED`, materially changes, or continuation depends on context health.
- Chat Continuation: when significant context, branching, corrections, or handoff sensitivity create conversation-continuity risk.
- Context Compression / Handoff: when raw history is becoming inefficient or unsafe, or when the user selects `Handoff`.
- Completion Evidence: when claiming material inspection, verification, file changes, synchronization, or completion. Build Capsules must use the full canonical completion report in `templates/v13_build_capsule_minimum_contract.md`.
- Branch Authority: add `Active Branch` when active/parked branch state changes, or when proposing or continuing another execution action. It must agree with the base report's `Next Authorized Action`; do not repeat that field. Omission does not authorize branch succession.
- 0.01 Update Check: when the loop produces a `+0.01 candidate`, a `0.99 risk`, or a carryover that affects the next loop.

<!-- /source-span: S012-01555c74 -->

<a id="signal-format"></a>
## Signal and Parked-Horizon Format

<!-- source-span: S015-811cff13 -->
Use:

```text
Signal:
🟢 BLUE / <current completed repair>
+
🟢 BLUE / <current positive effect>
+
🟡 YELLOW / <current active cap if relevant>

Parked Horizons:
<future direction 1> / <future direction 2> / <future direction 3>
```

<!-- /source-span: S015-811cff13 -->

<!-- source-span: S017-bbbdf827 -->
Example:

```text
Signal:
🟢 BLUE / CLAUDE-CODE-ENTRY-POINT-PUSHED
+
🟢 BLUE / ADOPTION-SURFACE-WIDENED
+
🟡 YELLOW / FEATURE-GROWTH-CAP
+
🟡 YELLOW / PUBLIC-CAP

Parked Horizons:
CLAUDE-SKILLS / HOOKS / MCP / PLUGINIZATION / V1
```

<!-- /source-span: S017-bbbdf827 -->

<a id="context-health-procedure"></a>
## Context Health Procedure

<!-- source-span: S021-bc0e9b6c -->
Use this format:

```text
Context Risk:
BLUE / YELLOW / RED

Reason:
<one short line>

Action:
Continue Under Cap / Compact Handoff / Stop

Context Anchor:
<repo root, latest commit, or current gate that is material to the risk; otherwise UNKNOWN>
```

<!-- /source-span: S021-bc0e9b6c -->

<!-- source-span: S023-cc0695ff -->
Completion rule:

- If Context Risk is `YELLOW` or `RED`, do not ask the operator to decide routine cleanup.
- If risk remains `YELLOW` after the one bounded action, or is `RED`, produce a compact handoff with latest commit, current gate, allowed, blocked, completed, remaining, and next one action.

<!-- /source-span: S023-cc0695ff -->

<a id="update-check-output"></a>
## 0.01 Update Check Output

<!-- source-span: S026-35b2982a -->
Use this format:

```text
0.01 Update Check:
Variable:
Effect: cheaper / safer / clearer / more restartable
Score: +0.01 candidate / 1.00 / 0.99 risk
Risk:
Next carryover, if any:
```

<!-- /source-span: S026-35b2982a -->

<a id="concept-promotion-record"></a>
## Concept Promotion Record

<!-- source-span: S029-5257e34a -->
- what is being promoted
- why it is no longer only a hypothesis
- verification or evidence used
- falsifier or countercondition
- rollback / downgrade condition
- owner approval when the change affects public surface, outreach, authority, or irreversible action

<!-- /source-span: S029-5257e34a -->

<!-- source-span: S030-45819aca -->
Example:

The repair-distance hypothesis may be used as an adopted prior, but it must remain tagged as verification pending. It must not be treated as a verified principle until the Concept Promotion Gate is passed.

<!-- /source-span: S030-45819aca -->

Canonical receipt name: `other`.
