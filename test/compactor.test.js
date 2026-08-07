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
    Conservative: "78becd813c6357d9237ff2c2f6eaa3748dc115bf887bb2252f0fa07b37c35a64",
    Balanced: "a303198bdc842b39271178ee43a76e544b8a3406446461e4caf9a0d8e3695224",
    Aggressive: "e0e333b4cd9c9c406f4adc0b5086d74940ab23b58ad69865ee82241986e750e4",
  },
  "large-bloated": {
    Conservative: "24280df79b1f0302081991de05a6f64ac0a010bd07971cfe797dc73ebee59b83",
    Balanced: "40adc2f2c3c6cf4fa7c6703f39f94be5c60ef46dbb273341e4b95b0fdec32709",
    Aggressive: "35e10d85eae956da689b9423a272d484e8cd7196db29af6066c861ccd693dc85",
  },
  "japanese-operations": {
    Conservative: "f21ee3103b115c9a6ad2e41215a9b94f42ae51b91b8160233cf69970ad070baf",
    Balanced: "82feec091d92ffb5d80c7b90e8faf6b358f8e136e9565d4b958eab4585710ff7",
    Aggressive: "fce03c94799176628ec5571b83a583e6d7d39f7c186bd6c0efa0cdd8e47d56f4",
  },
  "mixed-operations": {
    Conservative: "38e46747b0b5cf45290f49af5759d6b5018fe58f4cc9a7aafa907552130ce904",
    Balanced: "57327dda7c31bf487c40b09ab60616641526304705f81bca716bcde42cc5adde",
    Aggressive: "c376a1bb7ddec50e4514ddeb1370448db827b040436026f930f8e2e548158252",
  },
  "realistic-large-english": {
    Conservative: "18330302c65d93207f58300bfe3932649db12778951c89a2d369d9c8aa198600",
    Balanced: "49ad2403370c99cd86a74fc475ed8eaa7ba9a06a2b26a6ad7c71b8b4b509d1f9",
    Aggressive: "8920f1eea873471c0a4fa09fbe53829735b84f6f859905cecdade8f4f01deaa0",
  },
  "realistic-large-japanese": {
    Conservative: "e2faadb7b33e68795ed24c60472c10a4dfd7bada985a8844b09cdeef08100bb7",
    Balanced: "fe515a0ddee3327f67056c9e82c533ab2af5a9f188c225d165688d166621ee8c",
    Aggressive: "a986c244bf2b63daf1eff6aa8be12abff258ba6972266913f7af382ee8edda0a",
  },
  "realistic-large-mixed": {
    Conservative: "886e775318853463044f75ffaceb590436ef6218c6a83a3311604c8527f9aaf7",
    Balanced: "0262d4b9a365bea668f446e7067e6297c90850d902b9197795e6efb8b3d54ced",
    Aggressive: "e09a2c546e4b667828ac273d856acc108f51c71bc42e29b8671a165c2295c184",
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
