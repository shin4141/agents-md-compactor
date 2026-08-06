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
    Conservative: "0c7655d6395270aafa4723e28305ae6253c8d67286f205451b18c242c4132b24",
    Balanced: "3fe8cd069594820b7dfa6ba797df1414cc7e61fcd53b0197326a1aaf40fc14e3",
    Aggressive: "9265bdb342aa811eebdf3e472c7a9de9a6c8e7822462e4f4b51f718cb9f28d80",
  },
  "medium-specialist": {
    Conservative: "cb7a8dc3b50a012f4c40f477440ff2c7a1235f7bf3574ca6f68e7f29542fe368",
    Balanced: "21437ae1d7ffc0b9a04f0c58673e5b4a0f54f1e4719897e650452183354568e6",
    Aggressive: "4eb562d6442dbc473c009246168ec02b8d462bcb8d838750c52525ea5302caf5",
  },
  "large-bloated": {
    Conservative: "06705c94de06b989beabd799cc8b9bb55a76418232ad7d0dd55a7cd91f0b425c",
    Balanced: "0010268800344d4a7f1de17dca2d0b045454182eb3592e5b8e59420997f43401",
    Aggressive: "542bd5497a3169d5b55cd48a77a76b9bc03bb13deef7aeea8302397ec62cf6ef",
  },
  "japanese-operations": {
    Conservative: "782c2cb0272c8b9554336d21cd144cf5ddd61f58ed679458369235ae6370741e",
    Balanced: "0ccb09bcbbbd0e0392beb2f9f931d294f6204465529630a6953b0cee9614fcd2",
    Aggressive: "5b2f05b6a038a6f56b317a2d8e6a60d647896aa60693e81f47ae29144fb37b00",
  },
  "mixed-operations": {
    Conservative: "11ce7cfaade2661941219b9a9f6c3276c071d72609eadc9e0750fd45073509db",
    Balanced: "79eb6c9fd9ab453f788f0948f1b4b92375d14de7619a7608181d0cfcf5027c13",
    Aggressive: "26280e8ab994f7c070fc98b5eef7a1af7296d9547c2b50b87b0c921cb4348e34",
  },
  "realistic-large-english": {
    Conservative: "c54dbd1cdde655da62d99c74aabb0d45c6c026004ccdda941e630d99015fd50a",
    Balanced: "9c1865b7cd6ff7084335a7a321efc9ce37bd83c0be271d54e911cda3e3fb4ad9",
    Aggressive: "95bc57f3860a3ea27f12239663246f2efc497f732aa507ac3932de40adaba501",
  },
  "realistic-large-japanese": {
    Conservative: "5c37f445700388ccc16b4866e6d529d4496c70d1b8729698ccd4a5d61ec63e7e",
    Balanced: "a12cf77b5d80cc7265bbdcf25e47baaad0963670cb661eadbb56a29246a1c985",
    Aggressive: "91fdfdf3b1360c0014c8b6f5a1f6adbb6bde5246ed042271e085f54aef0a493c",
  },
  "realistic-large-mixed": {
    Conservative: "526f4e24e34465a17ec7d46c7fec4dca493088923dc99d09722d91242a0f0f3c",
    Balanced: "d4d860c26d776cc38680e8d6e2485ca4fbce910ff2d67df3ffaf83ab6f5be837",
    Aggressive: "ee981fe38102c23f042995ecb2c025e474412d52695e97defc253e3af1ab4422",
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
  assert.match(result.activeAgentsMd.content, /does not prove model compliance/);
  const receiptRule = result.activeAgentsMd.content
    .split("\n")
    .find((line) => line.startsWith("End each completed response"));
  assert.ok(receiptRule);
  assert.match(receiptRule, /guides actually read, in canonical order/);
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

test("receipt category formatting keeps core first and normalizes duplicates", () => {
  assert.equal(formatGuidanceReceipt([]), "🪶 core");
  assert.equal(
    formatGuidanceReceipt([
      "security",
      "testing",
      "security",
      "core",
      "release",
    ]),
    "🪶 core · testing · release · security",
  );
  assert.throws(
    () => formatGuidanceReceipt(["not-generated"]),
    /INVALID_RECEIPT: unknown receipt category/,
  );
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
