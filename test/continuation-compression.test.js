import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

const FIXTURE = readFileSync(
  new URL(
    "./fixtures/continuation-compression-conditional.md",
    import.meta.url,
  ),
  "utf8",
);

const ELIGIBLE_HEADINGS = new Set([
  "Chat Continuation",
  "Context Compression",
  "チャット継続",
  "文脈圧縮",
]);

function eligibleSpans(source) {
  return parseInstructionSpans(source).filter((span) =>
    ELIGIBLE_HEADINGS.has(span.headingContext.at(-1)),
  );
}

function exactGuideSource(guide, spanId) {
  const opener = `<!-- source-span: ${spanId} -->\n`;
  const closer = `<!-- /source-span: ${spanId} -->`;
  const start = guide.content.indexOf(opener);
  assert.notEqual(start, -1, `missing source opener for ${spanId}`);
  const contentStart = start + opener.length;
  const end = guide.content.indexOf(closer, contentStart);
  assert.notEqual(end, -1, `missing source closer for ${spanId}`);
  return guide.content.slice(contentStart, end);
}

test("eligible English and Japanese H2 continuation/compression sections route intact in every mode", () => {
  const spans = eligibleSpans(FIXTURE);
  assert.equal(spans.length, 4);

  for (const mode of MODES) {
    const result = compactAgentsMd(FIXTURE, mode);
    assertValidCompactionResult(FIXTURE, mode, result);

    const guide = result.guides.find(
      (candidate) => candidate.path === "agent-guides/handoff.md",
    );
    assert.ok(guide, `${mode} must emit the handoff guide`);
    assert.equal(result.guides.length, 1);
    assert.deepEqual(new Set(guide.spanIds), new Set(spans.map((span) => span.id)));

    for (const span of spans) {
      assert.equal(exactGuideSource(guide, span.id), span.text);
      const disposition = result.sourceAccounting.dispositions.find(
        (entry) => entry.sourceSpanId === span.id,
      );
      assert.equal(disposition.disposition, "MOVED_TO_GUIDE");
      assert.equal(
        disposition.canonicalDestination,
        "agent-guides/handoff.md",
      );
      assert.equal(disposition.scopeClassification, "CONDITIONAL");
    }

    const route = result.activeAgentsMd.routes.find(
      (candidate) => candidate.path === "agent-guides/handoff.md",
    );
    assert.deepEqual(
      route.entries.map((entry) => entry.path),
      [
        "agent-guides/handoff.md#chat-continuation",
        "agent-guides/handoff.md#context-compression",
      ],
    );
    assert.equal(
      result.activeAgentsMd.content.includes(
        "read `agent-guides/handoff.md#chat-continuation`",
      ),
      true,
    );
    assert.equal(
      result.activeAgentsMd.content.includes(
        "read `agent-guides/handoff.md#context-compression`",
      ),
      true,
    );
    assert.equal(
      guide.content.split('<a id="chat-continuation"></a>').length - 1,
      1,
    );
    assert.equal(
      guide.content.split('<a id="context-compression"></a>').length - 1,
      1,
    );
    assert.equal(result.counts.uniqueInstructionsDeleted, 0);
    assert.equal(result.counts.unaccountedSourceSpans, 0);
    assert.equal(
      result.counts.retainedSpans +
        result.counts.movedSpans +
        result.counts.collapsedDuplicateOccurrences,
      result.counts.sourceSpans,
    );
    assert.match(result.activeAgentsMd.content, /Always preserve source evidence/);
    assert.match(result.activeAgentsMd.content, /safety boundaries/);
    assert.match(result.activeAgentsMd.content, /Decision Owner's final authority/);
  }
});

test("similar headings without bounded conditional ownership stay active in every mode", () => {
  const source = `# Core

## Chat Continuation

This section describes ongoing work and useful conversation habits.

## Session Continuation

When significant context has accumulated, the Decision Owner keeps final authority.

## Context Compaction

Every task must retain mandatory completion evidence.

## セッション継続

必要に応じて継続方法を検討する。

## コンテキスト圧縮

文脈が長くなった場合も、すべてのタスクで最終判断を保持する。

## Safety Rule

Never weaken repository-wide safety rules.

## Evidence Rule

Every task must preserve mandatory completion evidence.
`;
  const spans = parseInstructionSpans(source);

  for (const mode of MODES) {
    const result = compactAgentsMd(source, mode);
    assertValidCompactionResult(source, mode, result);
    assert.equal(result.guides.length, 0);
    assert.equal(result.counts.movedSpans, 0);
    assert.equal(result.counts.retainedSpans, spans.length);
    assert.equal(result.counts.uniqueInstructionsDeleted, 0);
    assert.equal(result.counts.unaccountedSourceSpans, 0);
    assert.match(result.activeAgentsMd.content, /repository-wide safety/);
    assert.match(result.activeAgentsMd.content, /mandatory completion evidence/);
    for (const span of spans) {
      assert.ok(
        result.activeAgentsMd.content.includes(span.text.trim()),
        `${mode} must retain ${span.id}`,
      );
    }
  }
});

test("nested lookalikes do not escape their universal H2 parent", () => {
  const source = `# Core

## Universal completion and authority

Always retain the Decision Owner boundary and completion evidence.

### Chat Continuation

When significant context has accumulated, report CHAT_CONTINUE or HANDOFF_NOW.

### Context Compression

When raw history becomes inefficient, report KEEP or COMPRESS.
`;

  for (const mode of MODES) {
    const result = compactAgentsMd(source, mode);
    assert.equal(result.guides.length, 0);
    assert.equal(result.counts.movedSpans, 0);
    assert.match(result.activeAgentsMd.content, /Decision Owner boundary/);
    assert.match(result.activeAgentsMd.content, /CHAT_CONTINUE or HANDOFF_NOW/);
    assert.match(result.activeAgentsMd.content, /KEEP or COMPRESS/);
  }
});

test("review and deterministic ZIP contain the complete repaired package with exact Unicode", () => {
  const result = compactAgentsMd(FIXTURE, "Balanced");
  const artifacts = collectValidatedArtifacts(FIXTURE, "Balanced", result);
  const firstZip = createDeterministicZip(artifacts);
  const secondZip = createDeterministicZip([...artifacts].reverse());
  const review = buildReviewPrompt(FIXTURE, "Balanced", result);

  assert.deepEqual(secondZip, firstZip);
  assert.deepEqual(
    artifacts.map((artifact) => artifact.path),
    ["AGENTS.md", "agent-guides/handoff.md", "move-map.md"],
  );
  for (const artifact of artifacts) {
    assert.equal(review.includes(artifact.content), true);
  }
  for (const span of eligibleSpans(FIXTURE)) {
    assert.equal(review.includes(span.text), true);
  }
  assert.match(review, /チャット継続/u);
  assert.match(review, /文脈圧縮/u);
  assert.match(review, /agent-guides\/handoff\.md#chat-continuation/u);
  assert.match(review, /agent-guides\/handoff\.md#context-compression/u);
  assert.equal(result.counts.uniqueInstructionsDeleted, 0);
  assert.equal(result.counts.unaccountedSourceSpans, 0);
});
