import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  CompactorContractError,
  GUIDE_CATEGORIES,
  MODES,
  assertValidCompactionResult,
  compactAgentsMd,
  formatGuidanceReceipt,
  parseInstructionBlocks,
  parseInstructionSpans,
} from "../src/compactor.js";

const FIXTURES = [
  "small-clean",
  "medium-specialist",
  "large-bloated",
  "japanese-operations",
  "mixed-operations",
  "realistic-large-english",
  "realistic-large-japanese",
  "realistic-large-mixed",
];

const EXPECTED_HASHES = {
  "small-clean": {
    Conservative: "eb7539408d8e65a455af272b4a4ff0850d5ea74db4158ac8e17779e8dbb108e9",
    Balanced: "bb9bb328bb967ae643f99ad5cedab65d49b032b40a7dba83b633378ebd4682e4",
    Aggressive: "5df4b938d918d4f8827b797711a212396e901c9aa329242c004d9f6039a2ab40",
  },
  "medium-specialist": {
    Conservative: "0eca2c49a8c3c75c52a056203988f15838846f16a9a57811a40647a600ef0aea",
    Balanced: "e0f19baf23e0b8ba0627fef7a1ae7bab9323b0a157f4728416db888805356742",
    Aggressive: "60dd345e621efe014e236327e16fc48054b099f10907052e9d255848a750a348",
  },
  "large-bloated": {
    Conservative: "df60a6ce2043ddb9bcf9a74eef8605e5ad56481786c7fc15563da5e970317522",
    Balanced: "d488ec977953940fa7789aca96b810c0649ec38633144578a7ec10feafb6041b",
    Aggressive: "5f26f0b3717ff8fb528581fccb83885a5e23ef0283acaf5a653d7c0047ab2a50",
  },
  "japanese-operations": {
    Conservative: "46343c138914ade6e6f1a316969dba518aff0894d576d8ec41211e50bd92cc86",
    Balanced: "e86e6237a8ea851b3c8b4ade1657b635661b8e22ef862761997cf76889d3cb30",
    Aggressive: "eb2573765a138a4b0e115670fd4f24efc4baab2f77002d244689b68d0ed7dbb3",
  },
  "mixed-operations": {
    Conservative: "6d3d4db743ddaa49bfb018995c031c76c52bdb435ee3f3776b45f70e23f0d955",
    Balanced: "7ed49d3d509974dbd1eb97ef45e506994bae84a75bf39d871db1b024c8425788",
    Aggressive: "9acd2afae3a87582a101e93edd710fe91f87e661ef0fb2e823950a6dc1cac9c1",
  },
  "realistic-large-english": {
    Conservative: "482b77be9346d6c64222ba3d94cf69266ce25a9981f62908859ebc0a03a0639d",
    Balanced: "c4addea93f221a1824e9f31e79b57ce540f786857f2d15eb8d537b50b86a58ab",
    Aggressive: "47150dbedcc7dd46a531feb6819bc027a897cb6ca277a85a1935a3e4b3f0a7e8",
  },
  "realistic-large-japanese": {
    Conservative: "a140b9fca3e179a64e5d57d0c9880639b198b0667cfad393570567cf33da002a",
    Balanced: "316a992cb9ffdb98c29723ce871f29850708be7283f6f6397f2b8b15f6926b7f",
    Aggressive: "7e0b022cb361923051875b852db9fba43365b3e310c3226399bf0809a2e1f20e",
  },
  "realistic-large-mixed": {
    Conservative: "8ef2ea6bed64dae190ec2ecfec0021c1737be53a2285cf6476d34f497adcd2bb",
    Balanced: "ab907467b706c9bd5fc40d3495e69d81d9386809c742cf3aa0f838bd80863ab3",
    Aggressive: "69408b4f57ed6374d8b3f4e585f6d41e7e05fd015d16c47ee926d9822394be54",
  },
};

function readFixture(name) {
  return readFileSync(new URL(`./fixtures/${name}.md`, import.meta.url), "utf8");
}

function resultHash(result) {
  return createHash("sha256").update(JSON.stringify(result)).digest("hex");
}

function occurrences(values, target) {
  return values.filter((value) => value === target).length;
}

function entryForSourceText(source, result, needle) {
  const block = parseInstructionSpans(source).find((candidate) =>
    candidate.text.includes(needle),
  );
  assert.ok(block, `source block contains ${needle}`);
  const entry = result.moveMap.entries.find(
    (candidate) => candidate.id === block.id,
  );
  assert.ok(entry, `move-map contains ${block.id}`);
  return entry;
}

function verifyFixtureResult(source, result) {
  const spans = parseInstructionSpans(source);
  const spansById = new Map(spans.map((span) => [span.id, span]));
  const sourceIds = spans.map((span) => span.id);
  const entries = result.moveMap.entries;
  const entryIds = entries.map((entry) => entry.id);
  const retainedIds = result.activeAgentsMd.retainedSpanIds;
  const movedIds = result.guides.flatMap((guide) => guide.spanIds);
  const collapsedIds = entries
    .filter((entry) => entry.disposition === "COLLAPSED_EXACT_DUPLICATE")
    .map((entry) => entry.id);

  assert.deepEqual(entryIds, sourceIds, "every source span has one move-map entry");
  assert.equal(new Set(entryIds).size, entryIds.length, "source-span IDs are unique");
  assert.deepEqual(
    [...retainedIds, ...movedIds, ...collapsedIds].sort(),
    [...sourceIds].sort(),
    "every source span is retained, moved, or folded",
  );
  assert.equal(
    new Set([...retainedIds, ...movedIds, ...collapsedIds]).size,
    sourceIds.length,
    "no source span has two dispositions",
  );

  for (const entry of entries) {
    assert.match(result.moveMap.content, new RegExp(`\\| ${entry.id} \\|`));
    const span = spansById.get(entry.id);
    assert.ok(span);

    if (entry.result === "MOVED") {
      assert.equal(occurrences(movedIds, entry.id), 1);
      const guide = result.guides.find((candidate) =>
        candidate.spanIds.includes(entry.id),
      );
      assert.ok(guide, `moved source span ${entry.id} has a guide`);
      assert.equal(entry.destination, guide.path);
      assert.ok(guide.content.includes(span.text.trim()));
    } else if (entry.result === "RETAINED") {
      assert.equal(entry.result, "RETAINED");
      assert.equal(occurrences(retainedIds, entry.id), 1);
      assert.equal(entry.destination, "AGENTS.md");
      assert.ok(result.activeAgentsMd.content.includes(span.text.trim()));
    } else {
      assert.equal(entry.result, "COLLAPSED");
      assert.notEqual(entry.canonicalSpanId, entry.id);
      assert.ok(sourceIds.includes(entry.canonicalSpanId));
      assert.ok(entry.repetitionCount >= 2);
      assert.notEqual(entry.foldingReason, "not folded");
    }
  }

  const guidePaths = result.guides.map((guide) => guide.path);
  assert.equal(new Set(guidePaths).size, guidePaths.length);
  for (const guide of result.guides) {
    assert.ok(GUIDE_CATEGORIES.includes(guide.category));
    assert.ok(guide.content.trim().length > 0, "empty guides are omitted");
    assert.ok(guide.spanIds.length > 0, "guide contains a source span");
    assert.ok(
      guide.content.includes(
        `Canonical receipt name: \`${guide.category}\`.`,
      ),
    );
    assert.equal(
      occurrences(
        result.activeAgentsMd.routes.map((route) => route.path),
        guide.path,
      ),
      1,
      "each guide has one active route",
    );
    assert.equal(
      result.activeAgentsMd.content.split(`read \`${guide.path}\``).length - 1,
      1,
      "the active file renders one route per guide",
    );
  }
  for (const route of result.activeAgentsMd.routes) {
    assert.ok(guidePaths.includes(route.path), "no route points to a missing guide");
  }

  assert.equal(
    result.activeAgentsMd.content.split("## Lightweight Guidance Receipt").length - 1,
    1,
  );
  assert.match(result.activeAgentsMd.content, /This is a declaration, not proof\./);
  const receiptRule = result.activeAgentsMd.content
    .split("\n")
    .find((line) => line.startsWith("End every response"));
  assert.ok(receiptRule);
  assert.match(
    receiptRule,
    /`🪶 Core only`, or `🪶 Core \+ <guides actually read>` using ` · ` in canonical order/,
  );
  assert.ok(
    result.guides.every((guide) => receiptRule.includes(`\`${guide.category}\``)),
  );
  const ungeneratedCategories = GUIDE_CATEGORIES.filter(
    (category) =>
      !result.guides.some((guide) => guide.category === category),
  );
  if (result.guides.length === 0) {
    assert.doesNotMatch(receiptRule, /Available guide order:/);
  } else {
    assert.match(receiptRule, /Available guide order:/);
    assert.ok(
      ungeneratedCategories.every(
        (category) => !receiptRule.includes(`\`${category}\``),
      ),
    );
  }

  assert.equal(result.counts.sourceSpans, spans.length);
  assert.equal(result.counts.retainedSpans, retainedIds.length);
  assert.equal(result.counts.movedSpans, movedIds.length);
  assert.equal(result.counts.collapsedDuplicateOccurrences, collapsedIds.length);
  assert.equal(result.counts.uniqueInstructionsDeleted, 0);
  assert.equal(result.counts.unaccountedSourceSpans, 0);
  assert.equal(
    result.counts.monotonicityMetric,
    "retained source characters (Unicode code points)",
  );
}

test("canonical character metric counts Unicode code points, LF, and the trailing newline", () => {
  const source = "# Count fixture\n\nKeep 🪶.\n";
  const result = compactAgentsMd(source, "Balanced");

  assert.equal(result.counts.before.characters, Array.from(source).length);
  assert.equal(result.counts.before.utf8Bytes, Buffer.byteLength(source, "utf8"));
  assert.equal(source.length, result.counts.before.characters + 1);
  assert.equal(result.counts.before.lines, 4);
  assert.ok(source.endsWith("\n"));
});

test("instruction blocks keep governed Markdown structures together", () => {
  const source = [
    "# Root",
    "",
    "## Procedure",
    "",
    "Follow every step:",
    "",
    "1. Prepare.",
    "2. Execute.",
    "   - Keep this nested exception with step two.",
    "",
    "- Never publish automatically.",
    "  - Exception: publish only when the Decision Owner approves.",
    "",
    "### Required example",
    "",
    "```md",
    "## This is not a heading boundary",
    "```",
    "",
    "## Security",
    "",
    "When credentials are involved, inspect permissions.",
    "",
  ].join("\n");
  const blocks = parseInstructionBlocks(source);

  assert.equal(blocks.length, 3);
  assert.match(blocks[1].text, /## Procedure/);
  assert.match(blocks[1].text, /nested exception/);
  assert.match(blocks[1].text, /Never publish automatically/);
  assert.match(blocks[1].text, /only when the Decision Owner approves/);
  assert.match(blocks[1].text, /### Required example/);
  assert.match(blocks[1].text, /## This is not a heading boundary/);
  assert.doesNotMatch(blocks[2].text, /nested exception/);
});

test("mixed H1/H2 documents classify H2 blocks while keeping H3 descendants attached", () => {
  const source = [
    "# Repository Manual",
    "",
    "Document-wide authority remains active.",
    "",
    "## Testing",
    "",
    "When a test fails, run verification.",
    "",
    "### Failure details",
    "",
    "Keep this detail with Testing.",
    "",
    "## Release",
    "",
    "When preparing a release, verify packaging.",
    "",
    "# Final Authority",
    "",
    "The Decision Owner has final approval.",
    "",
  ].join("\n");
  const blocks = parseInstructionBlocks(source);

  assert.equal(blocks.length, 4);
  assert.deepEqual(blocks[0].headingContext, ["Repository Manual"]);
  assert.match(blocks[0].text, /Document-wide authority remains active/);
  assert.deepEqual(blocks[1].headingContext, ["Repository Manual", "Testing"]);
  assert.match(blocks[1].text, /### Failure details/);
  assert.match(blocks[1].text, /Keep this detail with Testing/);
  assert.doesNotMatch(blocks[2].text, /Failure details/);
  assert.deepEqual(blocks[3].headingContext, ["Final Authority"]);
});

test("universal English and Japanese rules stay active while explicit conditions route", () => {
  const source = [
    "# Classification Boundaries",
    "",
    "## Release Authority",
    "",
    "The Decision Owner must provide final approval for every task before any public release.",
    "",
    "## Testing Safety",
    "",
    "Never skip safety checks; all tasks must preserve evidence before handoff.",
    "",
    "## リリースでやってはいけないこと",
    "",
    "すべての作業で最終判断と承認の権限を保持し、公開を禁止する。",
    "",
    "## Notes",
    "",
    "Release packaging details and deployment records are maintained separately.",
    "",
    "## Conditional release operation",
    "",
    "When preparing a release, verify packaging and deployment evidence.",
    "",
    "## Failure response",
    "",
    "If a test fails, run testing verification.",
    "",
    "## Transfer procedure",
    "",
    "When handing work off, write the handoff record for the next agent.",
    "",
    "## 条件付き作業",
    "",
    "移行作業の場合、互換性を検証する。",
    "",
  ].join("\n");

  for (const mode of MODES) {
    const result = compactAgentsMd(source, mode);

    for (const universal of [
      "The Decision Owner must provide final approval",
      "Never skip safety checks",
      "すべての作業で最終判断",
      "Release packaging details",
    ]) {
      assert.equal(
        entryForSourceText(source, result, universal).result,
        "RETAINED",
        `${mode} keeps universal or ambiguous guidance active`,
      );
    }

    for (const [conditional, destination] of [
      ["When preparing a release", "agent-guides/release.md"],
      ["If a test fails", "agent-guides/testing.md"],
      ["When handing work off", "agent-guides/handoff.md"],
      ["移行作業の場合", "agent-guides/migration.md"],
    ]) {
      const entry = entryForSourceText(source, result, conditional);
      assert.equal(entry.result, "MOVED");
      assert.equal(entry.destination, destination);
    }
  }
});

test("exact historical defect excerpts stay active even in Aggressive mode", () => {
  const fixtures = [
    {
      name: "historical-v13-universal-rules",
      sha256: "5268c8bac862a0ce0066b36bf2fceb815027e4c1cc1e6af539a41fb67d4b04e7",
    },
    {
      name: "historical-v13-ja-operating-logic",
      sha256: "fdea90e973b0b1ea47995242b941db707d19ff56d3bb602747c882151d283bb1",
    },
    {
      name: "historical-v13-ja-prohibitions",
      sha256: "1602e803038f7fdef9c143f99cf07dd5e2387c05289580d4b229e5b65d78376c",
    },
  ];

  for (const fixture of fixtures) {
    const source = readFixture(fixture.name);
    assert.equal(createHash("sha256").update(source).digest("hex"), fixture.sha256);

    const result = compactAgentsMd(source, "Aggressive");
    assert.equal(result.guides.length, 0);
    assert.equal(result.counts.retainedSpans, result.counts.sourceSpans);
    assert.ok(
      result.moveMap.entries.every((entry) => entry.result === "RETAINED"),
    );
  }
});

test("a heading-free Markdown input remains one instruction block", () => {
  const source = "- Keep the parent rule.\n  - Keep its nested exception.\n";
  const blocks = parseInstructionBlocks(source);

  assert.equal(blocks.length, 1);
  assert.equal(blocks[0].text, source);
});

test("invalid inputs and unknown modes fail visibly", () => {
  assert.throws(
    () => compactAgentsMd("", "Balanced"),
    (error) => error instanceof CompactorContractError && error.code === "EMPTY_INPUT",
  );
  assert.throws(
    () => compactAgentsMd(" \n\t ", "Balanced"),
    (error) => error instanceof CompactorContractError && error.code === "EMPTY_INPUT",
  );
  assert.throws(
    () => compactAgentsMd("# Rules\n", "balanced"),
    (error) => error instanceof CompactorContractError && error.code === "INVALID_MODE",
  );
  assert.throws(
    () => compactAgentsMd("# Rules\n", "Unknown"),
    (error) => error instanceof CompactorContractError && error.code === "INVALID_MODE",
  );
  assert.throws(
    () => compactAgentsMd(`\ud800`, "Balanced"),
    (error) => error instanceof CompactorContractError && error.code === "INVALID_INPUT",
  );
});

test("malformed internal results fail visibly", () => {
  const source = readFixture("medium-specialist");
  const result = compactAgentsMd(source, "Balanced");
  const malformed = structuredClone(result);
  malformed.guides[0].content = "";

  assert.throws(
    () => assertValidCompactionResult(source, "Balanced", malformed),
    (error) =>
      error instanceof CompactorContractError &&
      error.code === "MALFORMED_RESULT",
  );
});

test("receipt category formatting uses the approved Core marker syntax", () => {
  assert.equal(formatGuidanceReceipt([]), "🪶 Core only");
  assert.equal(formatGuidanceReceipt(["core"]), "🪶 Core only");
  assert.equal(formatGuidanceReceipt(["testing"]), "🪶 Core + testing");
  assert.equal(
    formatGuidanceReceipt(["security", "release"]),
    "🪶 Core + release · security",
  );
  assert.equal(
    formatGuidanceReceipt([
      "release",
      "security",
      "release",
    ]),
    "🪶 Core + release · security",
  );
  assert.throws(
    () => formatGuidanceReceipt(["not-generated"]),
    /INVALID_RECEIPT: unknown receipt category/,
  );
});

test("a no-guide result requires the Core-only receipt without a guide suffix", () => {
  const result = compactAgentsMd(
    "# Core\n\nAlways retain this instruction.\n",
    "Balanced",
  );
  const receipt = result.activeAgentsMd.content
    .split("\n")
    .find((line) => line.startsWith("End every response"));

  assert.equal(result.guides.length, 0);
  assert.equal(
    receipt,
    "End every response with `🪶 Core only`, or `🪶 Core + <guides actually read>` using ` · ` in canonical order. This is a declaration, not proof.",
  );
  assert.doesNotMatch(receipt, /Available guide order:/);
});

test("Japanese and mixed fixtures route recognized operational categories", () => {
  const expectations = {
    "japanese-operations": [
      "testing",
      "release",
      "security",
      "handoff",
      "architecture",
      "migration",
      "incident-recovery",
    ],
    "mixed-operations": [
      "testing",
      "release",
      "security",
      "handoff",
      "incident-recovery",
    ],
  };

  for (const [fixture, categories] of Object.entries(expectations)) {
    const source = readFixture(fixture);
    for (const mode of MODES) {
      const result = compactAgentsMd(source, mode);
      assert.deepEqual(
        result.guides.map((guide) => guide.category),
        categories,
      );
      assert.ok(!JSON.stringify(result).includes("�"), "no mojibake marker");
    }
  }
});

for (const fixture of FIXTURES) {
  for (const mode of MODES) {
    test(`${fixture} / ${mode} contract`, () => {
      const source = readFixture(fixture);
      const originalBytes = Buffer.from(source, "utf8");
      const first = compactAgentsMd(source, mode);
      const second = compactAgentsMd(source, mode);

      assert.deepEqual(Buffer.from(source, "utf8"), originalBytes);
      assert.equal(first.originalInput, source);
      assert.deepEqual(first, second, "fixture output is deterministic");
      assert.equal(assertValidCompactionResult(source, mode, first), true);
      verifyFixtureResult(source, first);
      assert.equal(
        resultHash(first),
        EXPECTED_HASHES[fixture][mode],
        "fixture output matches its checked-in stable hash",
      );
    });
  }

  test(`${fixture} retained content is monotonic across modes`, () => {
    const source = readFixture(fixture);
    const conservative = compactAgentsMd(source, "Conservative");
    const balanced = compactAgentsMd(source, "Balanced");
    const aggressive = compactAgentsMd(source, "Aggressive");

    assert.ok(
      conservative.counts.retainedSourceCharacters >=
        balanced.counts.retainedSourceCharacters,
    );
    assert.ok(
      balanced.counts.retainedSourceCharacters >=
        aggressive.counts.retainedSourceCharacters,
    );
    assert.ok(
      conservative.counts.retainedBlocks >= balanced.counts.retainedBlocks,
    );
    assert.ok(
      balanced.counts.retainedBlocks >= aggressive.counts.retainedBlocks,
    );
  });
}
