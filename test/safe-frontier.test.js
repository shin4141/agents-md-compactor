import assert from "node:assert/strict";
import { test } from "node:test";

import {
  MODES,
  assertValidCompactionResult,
  compactAgentsMd,
  parseInstructionSpans,
} from "../src/compactor.js";
import {
  collectValidatedArtifacts,
  createDeterministicZip,
} from "../src/export.js";
import { buildReviewPrompt } from "../src/review.js";

const MIXED_SOURCE = `# Core Authority

Always retain the universal authority, safety, evidence, and completion core.

## V12 → V13 Handoff Discipline

Completion integrity and Gate selection remain mandatory.

When the user selects \`Handoff\`, follow \`docs/handoff_command.md\`.

When creating a capsule, follow the capsule standard.

Minimal handoff:

\`\`\`text
State: PASS / DELAY / BLOCK / UNKNOWN
Restart: <exact path>
\`\`\`

## Operational Judgment Core References

Judgment is not label selection.

Before choosing a gate, consult the relevant operational reference when that judgment is needed.

- Next 0.01 selection: read \`field_notes/021.md\`.
  Use when selecting the next action.
- CAP selection: read \`field_notes/023.md\`.
  Use when choosing CAP.

If the relevant reference has not been checked, do not output GO.

The references remain canonical operating origins.

## Continuation Proof Selection

Before modifying files or authority during a continuation, use the minimum sufficient proof required by the continuation dependency.

Keep authority, BLOCK, evidence, and every exception active here.

Operational origin and validation:

- [Proof selection](field_notes/125.md)
- [Validation](validation/125.md)

## V13 Lite Footer / Canonical Base Report

At the end of each task, include the universal base report.

\`\`\`text
Gate: GO / HOLD / CAP / BLOCK
Decision Owner: <one line>
Completion: <one line>
\`\`\`

### Conditional Extensions

Do not include every extension by default.

Add only the extension whose trigger applies:

- Context Health: when risk is YELLOW or RED.
- Completion Evidence: when claiming verification or completion.

Absence of a conditional extension must not be read as evidence of safety or completion.

## Signal Format: Active Signals vs Parked Horizons

Always separate active signals from parked horizons.

Use:

\`\`\`text
Signal: BLUE / YELLOW
Parked Horizons: <future only>
\`\`\`

Rules:

- Parked horizons are not TODOs.
- Never present a parked horizon as active work.

Example:

\`\`\`text
Signal: BLUE / 完了
Parked Horizons: 将来
\`\`\`

## Context Health Self-Check

At the start and end of each bounded task, perform a context-health self-check.

Include the Context Health extension when risk is \`YELLOW\` or \`RED\`, materially changes, or the next action depends on context health. A routine \`BLUE\` result may remain implicit in an ordinary base report, but omission is not an affirmative safe-continuation judgment.

The operator must not carry routine monitoring.

Use this format:

\`\`\`text
Risk: BLUE / YELLOW / RED
Action: Continue / Compact / Stop
\`\`\`

Risk rules:

- \`BLUE\`: all anchors are clear.
- \`YELLOW\`: uncertainty is material; proceed only under CAP.
- \`RED\`: stop work and preserve a reconnect route.

Completion rule:

- If risk is \`YELLOW\` or \`RED\`, preserve the exact handoff state.
- Never ask the Decision Owner to perform routine cleanup.

Completion Line:

\`\`\`text
Context risk must remain proactively visible.
\`\`\`

## 0.01 Update Check

At the end of each loop, evaluate the next operating condition.

Include this extension only for a +0.01 candidate or 0.99 risk.

Use this format:

\`\`\`text
Score: +0.01 / 1.00 / 0.99
Risk: <exact risk>
\`\`\`

Scoring:

- +0.01 improves a future condition.
- 1.00 completes without compounding.
- 0.99 adds restart friction.

Repo/path rule:

- If a required path is unresolved, do not infer it.
- Preserve the unresolved path as carryover.

## Concept Promotion Gate

Never promote a hypothesis without an explicit promotion check.

Canonical promotion is HOLD unless the promotion record includes:

- what is being promoted
- verification or evidence used
- owner approval when authority changes

Example:

仮説は検証待ちのまま保持する。

Universal suffix:

The final authority and rollback condition remain active.
`;

function exactGuideSource(guide, spanId) {
  const opener = `<!-- source-span: ${spanId} -->\n`;
  const closer = `<!-- /source-span: ${spanId} -->`;
  const start = guide.content.indexOf(opener);
  assert.notEqual(start, -1);
  const contentStart = start + opener.length;
  const end = guide.content.indexOf(closer, contentStart);
  assert.notEqual(end, -1);
  return guide.content.slice(contentStart, end);
}

function detailSpans(source) {
  return parseInstructionSpans(source).filter(
    (span) => span.structuralType === "conditional-detail",
  );
}

test("audited mixed sections retain active core and move only exact subordinate details", () => {
  const details = detailSpans(MIXED_SOURCE);
  assert.equal(details.length, 11);

  for (const mode of MODES) {
    const result = compactAgentsMd(MIXED_SOURCE, mode);
    assertValidCompactionResult(MIXED_SOURCE, mode, result);
    assert.deepEqual(
      result.guides.map((guide) => guide.path),
      ["agent-guides/handoff.md", "agent-guides/other.md"],
    );

    for (const span of details) {
      const guide = result.guides.find((candidate) =>
        candidate.spanIds.includes(span.id),
      );
      assert.ok(guide, `${mode} routes ${span.id}`);
      assert.equal(exactGuideSource(guide, span.id), span.text);
      const disposition = result.sourceAccounting.dispositions.find(
        (entry) => entry.sourceSpanId === span.id,
      );
      assert.equal(disposition.disposition, "MOVED_TO_GUIDE");
      assert.equal(disposition.scopeClassification, "CONDITIONAL");
    }

    for (const retained of [
      "Always retain the universal authority, safety, evidence, and completion core.",
      "Completion integrity and Gate selection remain mandatory.",
      "Keep authority, BLOCK, evidence, and every exception active here.",
      "At the end of each task, include the universal base report.",
      "Absence of a conditional extension must not be read as evidence of safety or completion.",
      "- `YELLOW`: uncertainty is material; proceed only under CAP.",
      "- `RED`: stop work and preserve a reconnect route.",
      "Scoring:",
      "- If a required path is unresolved, do not infer it.",
      "The final authority and rollback condition remain active.",
    ]) {
      assert.equal(result.activeAgentsMd.content.includes(retained), true);
    }

    assert.equal(result.counts.uniqueInstructionsDeleted, 0);
    assert.equal(result.counts.unaccountedSourceSpans, 0);
    assert.equal(result.counts.collapsedDuplicateOccurrences, 0);
    assert.equal(
      result.counts.retainedSpans + result.counts.movedSpans,
      result.counts.sourceSpans,
    );
  }
});

test("inline reconnect routes sit beside authored triggers and use stable anchors", () => {
  const result = compactAgentsMd(MIXED_SOURCE, "Balanced");
  const active = result.activeAgentsMd.content;

  assert.match(
    active,
    /When the user selects `Handoff`[^\n]*\n\n- When the user selects `Handoff` → read `agent-guides\/handoff\.md#minimal-handoff`/u,
  );
  assert.match(
    active,
    /consult the relevant operational reference when that judgment is needed\.\n\n- When an operational judgment needs its routed reference → read `agent-guides\/other\.md#operational-judgment-references`/u,
  );
  assert.match(
    active,
    /Add only the extension whose trigger applies:\n\n- Extensions—Context Health: risk is YELLOW or RED; Evidence: claiming verification or completion → read `agent-guides\/other\.md#conditional-report-extensions`/u,
  );
  assert.match(
    active,
    /Include the Context Health extension[^\n]+\n\n- When Context Health output or YELLOW\/RED follow-up is required → read `agent-guides\/other\.md#context-health-procedure`/u,
  );

  const anchors = result.guides
    .flatMap((guide) => result.activeAgentsMd.routes
      .find((route) => route.path === guide.path)?.entries ?? [])
    .map((entry) => entry.guideAnchor);
  assert.deepEqual(anchors, [
    "minimal-handoff",
    "operational-judgment-references",
    "continuation-proof-references",
    "conditional-report-extensions",
    "signal-format",
    "context-health-procedure",
    "update-check-output",
    "concept-promotion-record",
  ]);
  for (const guide of result.guides) {
    const entries = result.activeAgentsMd.routes
      .find((route) => route.path === guide.path)?.entries ?? [];
    for (const entry of entries) {
      assert.equal(active.split(entry.path).length - 1, 1);
      assert.equal(
        guide.content.split(`<a id="${entry.guideAnchor}"></a>`).length - 1,
        1,
      );
    }
  }
});

test("co-located format/example details remain separate exact source spans", () => {
  const result = compactAgentsMd(MIXED_SOURCE, "Balanced");
  const other = result.guides.find((guide) => guide.category === "other");
  const details = detailSpans(MIXED_SOURCE);
  const signal = details.filter(
    (span) => span.conditionalDetailKind === "signal-format",
  );
  const promotion = details.filter(
    (span) => span.conditionalDetailKind === "concept-promotion-record",
  );

  assert.equal(signal.length, 2);
  assert.equal(promotion.length, 2);
  assert.equal(
    other.content.split('<a id="signal-format"></a>').length - 1,
    1,
  );
  assert.equal(
    other.content.split('<a id="concept-promotion-record"></a>').length - 1,
    1,
  );
  for (const span of [...signal, ...promotion]) {
    assert.equal(exactGuideSource(other, span.id), span.text);
  }
  assert.match(other.content, /仮説は検証待ちのまま保持する。/u);
});

test("guarded H3 detail moves Definitions, Scoring, Example, and its code fence intact", () => {
  const source = `# Root

## Conditional Build Procedure

Always retain the universal prefix.

When release validation is required, use the definitions, scoring, and example in the conditional procedure below.

### Conditional Procedure

Definitions:

- \`READY\`: verification is complete.
- \`WAIT\`: verification remains open.

Scoring:

1. Score exact evidence.
2. Preserve every qualifier.

Example:

\`\`\`text
State: READY / WAIT
Evidence: <exact path>
\`\`\`

### Universal Suffix

Always retain this exception and safety qualifier.
`;
  const spans = parseInstructionSpans(source);
  const detail = spans.find(
    (span) => span.structuralType === "conditional-detail",
  );
  assert.ok(detail);
  assert.match(detail.text, /Definitions:/u);
  assert.match(detail.text, /Scoring:/u);
  assert.match(detail.text, /Example:/u);
  assert.match(detail.text, /```text/u);

  for (const mode of MODES) {
    const result = compactAgentsMd(source, mode);
    const guide = result.guides.find((candidate) => candidate.category === "other");
    assert.ok(guide);
    assert.equal(exactGuideSource(guide, detail.id), detail.text);
    assert.match(result.activeAgentsMd.content, /Always retain the universal prefix/u);
    assert.match(
      result.activeAgentsMd.content,
      /Always retain this exception and safety qualifier/u,
    );
    assert.match(
      result.activeAgentsMd.content,
      /When the adjacent authored conditional trigger applies → read `agent-guides\/other\.md#conditional-build-procedure-conditional-procedure`/u,
    );
  }
});

test("ambiguous or protected H3 lookalikes stay wholly active", () => {
  const sources = [
    `# Root

## Procedure

These details may be useful.

### Conditional Details

Definitions:

- Keep this active.
`,
    `# Root

## Procedure

When validation is required, use the conditional details below.

### Conditional Details

The Decision Owner retains final authority for every task.
`,
  ];

  for (const source of sources) {
    for (const mode of MODES) {
      const result = compactAgentsMd(source, mode);
      assert.equal(result.guides.length, 0);
      assert.equal(result.counts.movedSpans, 0);
      assert.equal(result.activeAgentsMd.content.includes(source.trim()), true);
    }
  }
});

test("continuation routes coalesce complete authored triggers and paths", () => {
  const source = `# Core

Always retain core authority.

## V13 Lite Footer / Canonical Base Report

Keep the base report active.

Add only the extension whose trigger applies:

- Context Health: when context risk changes.
- Chat Continuation: when branching or corrections create continuity risk.
- Context Compression / Handoff: when raw history is unsafe or the user selects \`Handoff\`.
- 0.01 Update Check: when a \`+0.01 candidate\` or \`0.99 risk\` affects the next loop.

Absence of a conditional extension is not evidence of safety.

## Chat Continuation

At the end of each task report, include a short chat-continuation signal when the task involved significant context, multiple decisions, long-running discussion, or handoff-sensitive work.

## Context Compression

At the end of task reports involving long context, repeated decisions, handoff-sensitive work, or accumulated project state, include a short Context Compression signal.
`;
  const result = compactAgentsMd(source, "Balanced");
  const routeLines = result.activeAgentsMd.content
    .split("\n")
    .filter((line) =>
      /handoff\.md#(?:chat-continuation|context-compression)/u.test(line),
    );
  const [chatRoute, contextRoute] = routeLines;

  assert.equal(routeLines.length, 2);
  assert.match(chatRoute, /^- Chat continuation:/u);
  assert.match(chatRoute, /significant context/u);
  assert.match(chatRoute, /multiple decisions/u);
  assert.match(chatRoute, /long-running discussion/u);
  assert.match(chatRoute, /branching or corrections create continuity risk/u);
  assert.match(contextRoute, /^- Context compression:/u);
  assert.match(contextRoute, /long context/u);
  assert.match(contextRoute, /repeated decisions/u);
  assert.match(contextRoute, /accumulated project state/u);
  assert.match(contextRoute, /raw history is unsafe or the user selects `Handoff`/u);
  const extensionRouteLine = result.activeAgentsMd.content
    .split("\n")
    .find((line) => line.startsWith("- Extensions—"));
  assert.match(
    extensionRouteLine,
    /0\.01: a `\+0\.01 candidate` or `0\.99 risk` affects the next loop/u,
  );
  const legacyRoute = `- Conditional continuation guidance: At the end of each task report, include a short chat-continuation signal when the task involved significant context, multiple decisions, long-running discussion, or handoff-sensitive work; Chat Continuation when branching or corrections create continuity risk: read \`agent-guides/handoff.md#chat-continuation\`; At the end of task reports involving long context, repeated decisions, handoff-sensitive work, or accumulated project state, include a short Context Compression signal; Context Compression / Handoff when raw history is unsafe or the user selects \`Handoff\`: read \`agent-guides/handoff.md#context-compression\``;
  assert.ok(routeLines.join("\n").length < legacyRoute.length);
  assert.equal(new Set(routeLines).size, 2);
});

test("grouped router targets every moved anchor exactly once without changing source bytes", () => {
  const sourceBefore = MIXED_SOURCE;
  const result = compactAgentsMd(MIXED_SOURCE, "Balanced");
  const entries = result.activeAgentsMd.routes.flatMap(
    (route) => route.entries ?? [],
  );

  assert.equal(MIXED_SOURCE, sourceBefore);
  assert.equal(new Set(entries.map((entry) => entry.path)).size, entries.length);
  for (const entry of entries) {
    const guide = result.guides.find((candidate) =>
      entry.path.startsWith(candidate.path),
    );
    assert.ok(guide);
    assert.equal(
      result.activeAgentsMd.content.split(`read \`${entry.path}\``).length - 1,
      1,
    );
    assert.equal(
      guide.content.split(`<a id="${entry.guideAnchor}"></a>`).length - 1,
      1,
    );
  }

  for (const disposition of result.sourceAccounting.dispositions.filter(
    (entry) => entry.disposition === "MOVED_TO_GUIDE",
  )) {
    const span = parseInstructionSpans(MIXED_SOURCE).find(
      (candidate) => candidate.id === disposition.sourceSpanId,
    );
    const guide = result.guides.find(
      (candidate) => candidate.path === disposition.canonicalDestination,
    );
    assert.equal(exactGuideSource(guide, span.id), span.text);
  }
});

test("router budget rendering is deterministic while guide and accounting bytes stay fixed", () => {
  const results = MODES.map((mode) => compactAgentsMd(MIXED_SOURCE, mode));
  const baseline = results[0];
  const routerLines = (result) => result.activeAgentsMd.content
    .split("\n")
    .filter((line) => line.includes("read `agent-guides/"));

  for (const result of results.slice(1)) {
    assert.deepEqual(
      result.guides.map((guide) => [guide.path, guide.content]),
      baseline.guides.map((guide) => [guide.path, guide.content]),
    );
    assert.deepEqual(result.sourceAccounting, baseline.sourceAccounting);
    assert.equal(result.moveMap.content, baseline.moveMap.content);
    assert.deepEqual(routerLines(result), routerLines(baseline));
  }
});

test("Review and deterministic ZIP retain the complete mixed package", () => {
  const result = compactAgentsMd(MIXED_SOURCE, "Balanced");
  const artifacts = collectValidatedArtifacts(MIXED_SOURCE, "Balanced", result);
  const review = buildReviewPrompt(MIXED_SOURCE, "Balanced", result);
  const first = createDeterministicZip(artifacts);
  const second = createDeterministicZip([...artifacts].reverse());

  assert.deepEqual(second, first);
  assert.deepEqual(
    artifacts.map((artifact) => artifact.path),
    [
      "AGENTS.md",
      "agent-guides/handoff.md",
      "agent-guides/other.md",
      "move-map.md",
    ],
  );
  assert.equal(review.includes(MIXED_SOURCE), true);
  for (const artifact of artifacts) {
    assert.equal(review.includes(artifact.content), true);
  }
  assert.match(review, /完了/u);
  assert.match(review, /仮説は検証待ちのまま保持する。/u);
  assert.equal(result.counts.uniqueInstructionsDeleted, 0);
  assert.equal(result.counts.unaccountedSourceSpans, 0);
});
