# Handoff Guidance

<a id="minimal-handoff"></a>
## Minimal Handoff

<!-- source-span: S004-663955ad -->
Minimal handoff:

```text
V12 Completion State:
PASS / DELAY / BLOCK / UNKNOWN

Completion Evidence:
<what proves the work is restartable>

Restart Path:
<how the future self or next agent resumes>

Known Gaps:
<what remains unverified or incomplete>

Then produce the V13 Loop Record.
```

<!-- /source-span: S004-663955ad -->

<a id="chat-continuation"></a>
## Chat Continuation

<!-- source-span: S018-5ad40d78 -->
## Chat Continuation Footer

At the end of each task report, include a short chat-continuation signal when the task involved significant context, multiple decisions, long-running discussion, or handoff-sensitive work.

This signal is not a perfect prediction.

It is an early warning, like notifying the operator at "50 seconds" so the human can decide before the context reaches "60 seconds."

Use this format:

```text
Chat Continuation:
CHAT_CONTINUE / PREPARE_HANDOFF / HANDOFF_NOW

Reason:
<1-2 lines>

Handoff Required:
yes / no
```

Definitions:

- `CHAT_CONTINUE`: The current chat/context can continue without meaningful restart risk.
- `PREPARE_HANDOFF`: The chat can continue, but a handoff should be prepared before the next large task, major decision, or new implementation loop.
- `HANDOFF_NOW`: Do not start the next significant task until a handoff is written.

Rules:

- This is an advisory signal, not an automatic cutoff.
- The human keeps the final Seat.
- Prefer `PREPARE_HANDOFF` when context has grown large, decisions have branched, commits/signals have accumulated, or the next agent would need substantial reconstruction.
- Use `HANDOFF_NOW` when continuing without a handoff would create high risk of context loss, duplicated work, mistaken next actions, or restart failure.
- Do not overuse `HANDOFF_NOW`.
- If this extension is triggered but context remains safe to continue, use `CHAT_CONTINUE`.
- If uncertain, prefer `PREPARE_HANDOFF` over silent continuation.

<!-- /source-span: S018-5ad40d78 -->

<a id="context-compression"></a>
## Context Compression

<!-- source-span: S031-839255fb -->
## Context Compression Footer

At the end of task reports involving long context, repeated decisions, handoff-sensitive work, or accumulated project state, include a short Context Compression signal.

This footer is not a perfect memory system.

It is an operational warning that the next large loop should restart from compressed anchors instead of full chat history.

Use this format:

```text
Context Compression:
KEEP / COMPRESS / HANDOFF

Reason:
<1-2 lines>

Preserve:
- <current signal>
- <latest pushed state>
- <allowed next action>
- <not allowed action>
- <next loop command>
- <known mistaken assumption pointer if any>

Restart From:
<file / commit / handoff / section>
```

Definitions:

* `KEEP`: Continue using the current context. No compression is needed yet.
* `COMPRESS`: Create or use a compressed handoff before the next large loop.
* `HANDOFF`: Do not start the next major task until a handoff or compressed restart anchor is written.

Rules:

* Do not keep all context just because it exists.
* Do not compress away restartability.
* Preserve current signal, latest pushed state, allowed actions, not allowed actions, and next loop command.
* Preserve pointers to known mistaken assumptions when relevant.
* Use `COMPRESS` when repeated context loading is becoming wasteful but the current task can still continue.
* Use `HANDOFF` when starting another major task without compressed anchors would create restart risk.
* If this extension is triggered but compression is not yet needed, use `KEEP`.
* If uncertain before a large task, prefer `COMPRESS` over silent continuation.
* After `COMPRESS` or `HANDOFF` is selected, use [Compact Restart Surface Mode](docs/context_compression.md#compact-restart-surface-mode) when a long or high-context continuation should restart from decision-relevant state rather than full history.
* Include Compression Accounting only when measurement or required-item retention accounting is materially relevant. No measurement is required for an ordinary handoff; `NOT MEASURED` is valid.
* Omission does not itself prove restartability. Do not call the mode successful if direction, Protected Object, ownership, Gate, authority, source pointers, or the next safe action is missing.
* This routing is conditional and adds no universal report block.

<!-- /source-span: S031-839255fb -->

Canonical receipt name: `handoff`.
