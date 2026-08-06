import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { compactAgentsMd } from "../src/compactor.js";
import { collectValidatedArtifacts } from "../src/export.js";
import {
  REVIEW_INSTRUCTIONS,
  buildReviewPrompt,
  createReductionFacts,
  formatActualActiveReduction,
  formatCompletePackage,
  formatSourceExternalization,
} from "../src/review.js";

const LARGE_FIXTURE = readFileSync(
  new URL("./fixtures/large-bloated.md", import.meta.url),
  "utf8",
);
const JAPANESE_FIXTURE = readFileSync(
  new URL("./fixtures/japanese-operations.md", import.meta.url),
  "utf8",
);
const SMALL_FIXTURE = readFileSync(
  new URL("./fixtures/small-clean.md", import.meta.url),
  "utf8",
);

test("reduction facts keep generated-file and retained-source comparisons distinct", () => {
  const result = compactAgentsMd(LARGE_FIXTURE, "Balanced");
  const facts = createReductionFacts(result);

  assert.deepEqual(facts, {
    originalCharacters: 2132,
    activeCharacters: 1141,
    retainedSourceCharacters: 602,
    guideCount: 4,
    sourceSpanCount: 12,
    retainedSpanCount: 7,
    movedSpanCount: 5,
    collapsedDuplicateOccurrences: 0,
    exactDuplicateCharactersFolded: 0,
    uniqueInstructionsDeleted: 0,
    unaccountedSourceSpans: 0,
    outcome: "COMPACTED",
    actualActiveFile: {
      kind: "reduction",
      characters: 991,
      percentage: 46.5,
    },
    completePackage: {
      characters: 5874,
      relativeToOriginal: {
        kind: "increase",
        characters: 3742,
        percentage: 175.5,
      },
    },
    sourceExternalization: {
      kind: "externalized",
      characters: 1528,
      percentage: 71.7,
    },
  });
  assert.equal(
    facts.activeCharacters,
    Array.from(result.activeAgentsMd.content).length,
    "actual reduction counts every generated router and receipt character",
  );
  assert.equal(
    formatActualActiveReduction(facts),
    "Actual active AGENTS.md reduction: 46.5% (991 fewer characters). Outcome: COMPACTED.",
  );
  assert.equal(
    formatSourceExternalization(facts),
    "Source instructions externalized: 71.7% (1528 characters moved to guides).",
  );
  assert.equal(
    formatCompletePackage(facts),
    "Complete emitted package: 5874 Unicode code points (175.5% larger than the original). The complete package is larger because moved instructions and their traceability are preserved. The 46.5% result applies to the always-loaded active AGENTS.md, not to total repository text.",
  );
});

test("a small file may return NO_ACTIVE_REDUCTION without claiming a saving", () => {
  const result = compactAgentsMd(SMALL_FIXTURE, "Balanced");
  const facts = createReductionFacts(result);

  assert.equal(facts.outcome, "NO_ACTIVE_REDUCTION");
  assert.equal(result.guides.length, 0, "no split is forced for a clean small file");
  assert.deepEqual(facts.actualActiveFile, {
    kind: "increase",
    characters: 176,
    percentage: 55.7,
  });
  const message = formatActualActiveReduction(facts);
  assert.match(message, /did not reduce the active file/);
  assert.match(message, /do not replace the original solely for context reduction/);
  assert.doesNotMatch(message, /saving/i);
  assert.equal(
    formatSourceExternalization(facts),
    "Source instructions externalized: 0.0% (0 characters moved to guides).",
  );
});

test("realistic bloated English, Japanese, and mixed fixtures compact in Balanced", () => {
  for (const fixture of [
    "realistic-large-english",
    "realistic-large-japanese",
    "realistic-large-mixed",
  ]) {
    const source = readFileSync(
      new URL(`./fixtures/${fixture}.md`, import.meta.url),
      "utf8",
    );
    const result = compactAgentsMd(source, "Balanced");
    const facts = createReductionFacts(result);

    assert.ok(Array.from(source).length >= 3000, `${fixture} is realistically large`);
    assert.equal(facts.outcome, "COMPACTED");
    assert.equal(facts.actualActiveFile.kind, "reduction");
    assert.ok(facts.activeCharacters < facts.originalCharacters);
    assert.ok(facts.actualActiveFile.percentage > 0);
    assert.ok(result.guides.length >= 3);
  }
});

test("guide receipt metadata does not duplicate the active receipt contract", () => {
  const result = compactAgentsMd(LARGE_FIXTURE, "Balanced");
  const activeRule =
    "End every response with `🪶 Core only`, or `🪶 Core + <guides actually read>` using ` · ` in canonical order.";

  assert.ok(result.activeAgentsMd.content.includes(activeRule));
  for (const guide of result.guides) {
    assert.ok(guide.content.includes(`Canonical receipt name: \`${guide.category}\`.`));
    assert.ok(!guide.content.includes(activeRule));
    assert.ok(!guide.content.includes("## Lightweight Guidance Receipt"));
  }
});

test("Review with your AI prompt contains the exact source, artifacts, mode, facts, and instructions", () => {
  const sourceBytes = Buffer.from(JAPANESE_FIXTURE, "utf8");
  const result = compactAgentsMd(JAPANESE_FIXTURE, "Balanced");
  const artifacts = collectValidatedArtifacts(
    JAPANESE_FIXTURE,
    "Balanced",
    result,
  );
  const prompt = buildReviewPrompt(JAPANESE_FIXTURE, "Balanced", result);

  assert.deepEqual(Buffer.from(JAPANESE_FIXTURE, "utf8"), sourceBytes);
  assert.ok(prompt.includes(JAPANESE_FIXTURE));
  assert.match(prompt, /## Selected mode\nBalanced/);
  assert.match(
    prompt,
    /Character-count basis: Unicode code points; LF and trailing newline included\./,
  );
  assert.ok(prompt.includes(REVIEW_INSTRUCTIONS));
  assert.match(prompt, /Unique instructions deleted: 0/);
  assert.match(prompt, /Unaccounted source spans: 0/);
  assert.match(prompt, /Emitted guide count: 7/);
  assert.match(prompt, /Outcome: NO_ACTIVE_REDUCTION/);
  assert.match(prompt, /Source instructions externalized:/);
  assert.match(prompt, /Complete emitted package:/);
  assert.match(
    prompt,
    /complete package is larger because moved instructions and their traceability are preserved/,
  );
  assert.match(
    prompt,
    /applies to the always-loaded active AGENTS\.md, not to total repository text/,
  );
  assert.match(prompt, /## Source-span disposition ledger/);
  assert.match(prompt, /## Exact-duplicate groups and canonical selections/);
  assert.match(prompt, /## Potential but uncollapsed exact-body duplicates/);
  assert.match(prompt, /## Ambiguous mixed-category spans retained active/);
  for (const number of [7, 8, 9, 10, 11]) {
    assert.match(prompt, new RegExp(`${number}\\.`));
  }
  for (const artifact of artifacts) {
    assert.ok(prompt.includes(`--- BEGIN ${artifact.path} ---`));
    assert.ok(prompt.includes(artifact.content));
  }
  assert.ok(!prompt.includes("�"), "review package contains no mojibake marker");
});
