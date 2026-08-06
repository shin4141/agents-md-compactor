import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  compactAgentsMd,
  parseInstructionSpans,
} from "../src/compactor.js";

function fixture(name) {
  return readFileSync(new URL(`./fixtures/${name}.md`, import.meta.url), "utf8");
}

function artifactText(result) {
  return [
    result.activeAgentsMd.content,
    ...result.guides.map((guide) => guide.content),
  ].join("\n");
}

for (const [name, expectedGlobalText, expectedConditionalText] of [
  [
    "duplicate-english",
    "- Always preserve the original source text.",
    "- For testing tasks, run the regression suite.",
  ],
  [
    "duplicate-japanese",
    "- 必ず元の指示文を保持する。",
    "- テスト作業の場合、回帰検証を実行する。",
  ],
]) {
  test(`${name} folds exact global and conditional repetitions with traceable canonical homes`, () => {
    const source = fixture(name);
    const result = compactAgentsMd(source, "Balanced");
    const [globalGroup, conditionalGroup] = result.sourceAccounting.duplicateGroups;

    assert.equal(globalGroup.occurrenceCount, 3);
    assert.equal(globalGroup.destination, "AGENTS.md");
    assert.equal(globalGroup.scopeClassification, "UNIVERSAL");
    assert.equal(conditionalGroup.occurrenceCount, 2);
    assert.equal(conditionalGroup.destination, "agent-guides/testing.md");
    assert.equal(conditionalGroup.scopeClassification, "CONDITIONAL");
    assert.equal(result.counts.collapsedDuplicateOccurrences, 3);
    assert.ok(result.counts.exactDuplicateCharactersFolded > 0);
    assert.equal(result.counts.uniqueInstructionsDeleted, 0);
    assert.equal(result.counts.unaccountedSourceSpans, 0);

    const spansById = new Map(
      parseInstructionSpans(source).map((span) => [span.id, span]),
    );
    const canonicalMovedCharacters = result.sourceAccounting.dispositions
      .filter((entry) => entry.disposition === "MOVED_TO_GUIDE")
      .reduce(
        (total, entry) =>
          total + Array.from(spansById.get(entry.sourceSpanId).text).length,
        0,
      );
    assert.equal(
      result.counts.externalizedSourceCharacters,
      canonicalMovedCharacters,
      "collapsed duplicates do not inflate source externalization",
    );

    const emitted = artifactText(result);
    assert.equal(emitted.split(expectedGlobalText).length - 1, 1);
    assert.equal(emitted.split(expectedConditionalText).length - 1, 1);
    for (const group of result.sourceAccounting.duplicateGroups) {
      const signal = `Source repetition: ${group.occurrenceCount} equivalent occurrences were folded into this canonical rule.`;
      assert.equal(emitted.split(signal).length - 1, 1);
      assert.equal(group.collapsedSpanIds.length, group.occurrenceCount - 1);
      for (const id of group.collapsedSpanIds) {
        const disposition = result.sourceAccounting.dispositions.find(
          (entry) => entry.sourceSpanId === id,
        );
        assert.equal(disposition.disposition, "COLLAPSED_EXACT_DUPLICATE");
        assert.equal(disposition.canonicalSpanId, group.canonicalSpanId);
        assert.equal(disposition.canonicalDestination, group.destination);
      }
    }
  });
}

test("semantic ownership splits safe siblings, honors a primary activation, and retains ambiguity", () => {
  const source = fixture("mixed-semantic-ownership");
  const spans = parseInstructionSpans(source);
  const result = compactAgentsMd(source, "Balanced");
  const dispositions = result.sourceAccounting.dispositions;
  const testing = spans.find((span) => span.text.includes("For testing tasks"));
  const release = spans.find((span) => span.text.includes("For release tasks"));
  const primary = spans.find((span) => span.text.includes("run tests"));
  const ambiguous = spans.find((span) => span.text.includes("testing or preparing"));

  assert.equal(testing.structuralType, "list-item");
  assert.equal(release.structuralType, "list-item");
  assert.equal(
    dispositions.find((entry) => entry.sourceSpanId === testing.id)
      .canonicalDestination,
    "agent-guides/testing.md",
  );
  assert.equal(
    dispositions.find((entry) => entry.sourceSpanId === release.id)
      .canonicalDestination,
    "agent-guides/release.md",
  );
  assert.equal(
    dispositions.find((entry) => entry.sourceSpanId === primary.id)
      .canonicalDestination,
    "agent-guides/release.md",
    "release activation owns intact testing/security actions",
  );
  assert.equal(
    dispositions.find((entry) => entry.sourceSpanId === ambiguous.id)
      .disposition,
    "RETAINED_ACTIVE",
  );
  assert.ok(result.sourceAccounting.ambiguousOwnershipSpanIds.includes(ambiguous.id));

  const releaseGuide = result.guides.find((guide) => guide.category === "release");
  assert.ok(releaseGuide.content.includes(release.text.trim()));
  assert.ok(releaseGuide.content.includes(primary.text.trim()));
  assert.notEqual(release.id, primary.id, "co-located rules remain separate spans");
  assert.equal(
    releaseGuide.content.match(/<!-- source-span:/gu)?.length,
    2,
    "co-location does not fuse source spans",
  );
  assert.ok(result.activeAgentsMd.content.includes(ambiguous.text.trim()));
});

test("sentences, shared consequences, procedures, qualifiers, and attached code remain intact", () => {
  const source = [
    "# Governed structures",
    "",
    "## Release procedure",
    "",
    "Before release, run the regression suite unless the emergency rollback procedure applies.",
    "",
    "1. Prepare the package.",
    "2. Verify the package.",
    "",
    "```sh",
    "npm test",
    "```",
    "",
  ].join("\n");
  const spans = parseInstructionSpans(source);
  const result = compactAgentsMd(source, "Balanced");

  assert.equal(spans.length, 2, "the authored H1/H2 boundary remains safe");
  const governed = spans.find((span) => span.text.includes("Before release"));
  assert.ok(governed);
  assert.match(governed.text, /unless the emergency rollback procedure applies/);
  assert.match(governed.text, /1\. Prepare the package\./);
  assert.match(governed.text, /```sh\nnpm test\n```/);
  assert.equal(result.counts.collapsedDuplicateOccurrences, 0);
  assert.ok(
    [result.activeAgentsMd.content, ...result.guides.map((guide) => guide.content)]
      .some((content) => content.includes(governed.text.trim())),
    "the governed structure has one intact canonical home",
  );
});

test("global and task-specific exact bodies form separate groups and remain potential cross-scope duplicates", () => {
  const source = [
    "# Scope qualification",
    "",
    "## Core rules",
    "",
    "- Always preserve source evidence.",
    "- Always preserve source evidence.",
    "",
    "## Testing",
    "",
    "- Always preserve source evidence.",
    "- Always preserve source evidence.",
    "",
  ].join("\n");
  const result = compactAgentsMd(source, "Balanced");

  assert.equal(result.sourceAccounting.duplicateGroups.length, 2);
  assert.deepEqual(
    result.sourceAccounting.duplicateGroups.map((group) => group.scopeClassification),
    ["UNIVERSAL", "CONDITIONAL"],
  );
  assert.equal(result.counts.collapsedDuplicateOccurrences, 2);
  assert.equal(result.sourceAccounting.potentialDuplicates.length, 1);
  assert.equal(
    artifactText(result).split("- Always preserve source evidence.").length - 1,
    2,
    "global and task-specific canonical instructions both remain",
  );
  assert.equal(
    result.sourceAccounting.duplicateGroups[0].destination,
    "AGENTS.md",
    "active universal occurrence is the canonical global home",
  );
});

test("unique exceptions, merely similar wording, and different modality never fold", () => {
  const source = [
    "# Conservative duplicate boundary",
    "",
    "## Core rules",
    "",
    "- Always preserve source evidence.",
    "- Always preserve the source evidence.",
    "- For every task, you should preserve source evidence.",
    "- For every task, you must preserve source evidence.",
    "- Never publish automatically unless the Decision Owner approves.",
    "- Never publish automatically except during an approved rollback.",
    "",
  ].join("\n");
  const result = compactAgentsMd(source, "Balanced");

  assert.equal(result.sourceAccounting.duplicateGroups.length, 0);
  assert.equal(result.counts.collapsedDuplicateOccurrences, 0);
  for (const line of source.split("\n").filter((line) => line.startsWith("- "))) {
    assert.ok(artifactText(result).includes(line));
  }
});

test("every source span has one canonical disposition and no body is copied to multiple homes", () => {
  const source = fixture("mixed-semantic-ownership");
  const result = compactAgentsMd(source, "Balanced");
  const dispositions = result.sourceAccounting.dispositions;
  const sourceIds = parseInstructionSpans(source).map((span) => span.id);

  assert.deepEqual(
    dispositions.map((entry) => entry.sourceSpanId),
    sourceIds,
  );
  assert.equal(new Set(sourceIds).size, sourceIds.length);
  assert.equal(result.counts.unaccountedSourceSpans, 0);
  for (const disposition of dispositions) {
    assert.ok(
      [
        "RETAINED_ACTIVE",
        "MOVED_TO_GUIDE",
        "COLLAPSED_EXACT_DUPLICATE",
      ].includes(disposition.disposition),
    );
    const canonicalHomes = [
      ...(result.activeAgentsMd.retainedSpanIds.includes(
        disposition.canonicalSpanId,
      )
        ? ["AGENTS.md"]
        : []),
      ...result.guides
        .filter((guide) => guide.spanIds.includes(disposition.canonicalSpanId))
        .map((guide) => guide.path),
    ];
    assert.deepEqual(canonicalHomes, [disposition.canonicalDestination]);
  }
});
