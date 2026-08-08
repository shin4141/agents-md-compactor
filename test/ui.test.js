import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { compactAgentsMd } from "../src/compactor.js";
import {
  createCompactorController,
  createFileNavigator,
  createOutcomePresentation,
  createResultViewModel,
} from "../src/ui.js";

const LARGE_FIXTURE = readFileSync(
  new URL("./fixtures/large-bloated.md", import.meta.url),
  "utf8",
);
const JAPANESE_FIXTURE = readFileSync(
  new URL("./fixtures/japanese-operations.md", import.meta.url),
  "utf8",
);
const DEMONSTRATED_SAMPLE = readFileSync(
  new URL("../evidence/public_rc_v0_1/BEFORE_AGENTS.md", import.meta.url),
  "utf8",
);
const INDEX_HTML = readFileSync(
  new URL("../public/index.html", import.meta.url),
  "utf8",
);
const STYLES = readFileSync(
  new URL("../public/styles.css", import.meta.url),
  "utf8",
);
const UI_SOURCE = readFileSync(new URL("../src/ui.js", import.meta.url), "utf8");

function createView({ input = LARGE_FIXTURE, mode = "Balanced" } = {}) {
  let currentInput = input;
  let currentMode = mode;
  let currentError = "";
  let currentResult = null;
  let resultRenderCount = 0;
  let selectedPath = null;
  let visiblePaths = [];
  let actionFeedback = { message: "", type: "success" };
  let sampleState = "idle";
  let inputFocusCount = 0;
  let generateFocusCount = 0;
  let resultClearCount = 0;

  return {
    getInput: () => currentInput,
    getMode: () => currentMode,
    getSelectedPath: () => selectedPath,
    getVisibleFilePaths: () => [...visiblePaths],
    showError(message) {
      currentError = message;
    },
    showResult(result) {
      currentResult = result;
      resultRenderCount += 1;
      visiblePaths = result.files.map((file) => file.path);
      selectedPath = result.files[0].path;
    },
    showActionFeedback(message, type) {
      actionFeedback = { message, type };
    },
    setInput(value) {
      currentInput = value;
    },
    setMode(value) {
      currentMode = value;
    },
    setSampleState(value) {
      sampleState = value;
    },
    clearResult() {
      currentResult = null;
      visiblePaths = [];
      selectedPath = null;
      resultClearCount += 1;
    },
    focusInput() {
      inputFocusCount += 1;
    },
    focusGenerate() {
      generateFocusCount += 1;
    },
    selectPath(path) {
      if (!visiblePaths.includes(path)) {
        throw new RangeError(`Unknown visible path: ${path}`);
      }
      selectedPath = path;
    },
    setVisiblePaths(paths) {
      visiblePaths = [...paths];
    },
    snapshot() {
      return {
        input: currentInput,
        mode: currentMode,
        error: currentError,
        result: currentResult,
        resultRenderCount,
        selectedPath,
        visiblePaths,
        actionFeedback,
        sampleState,
        inputFocusCount,
        generateFocusCount,
        resultClearCount,
      };
    },
  };
}

test("Generate waits for invocation and calls the contract with the exact mode", () => {
  const calls = [];
  const view = createView();
  const controller = createCompactorController(view, {
    compact(input, mode) {
      calls.push({ input, mode });
      return compactAgentsMd(input, mode);
    },
  });

  assert.deepEqual(calls, [], "mounting does not generate");
  controller.generate();

  assert.equal(calls.length, 1);
  assert.equal(calls[0].input, LARGE_FIXTURE);
  assert.equal(calls[0].mode, "Balanced");
  assert.equal(view.snapshot().input, LARGE_FIXTURE);
});

test("sample-first flow loads the exact historical source and uses the ordinary product path", () => {
  const calls = [];
  const view = createView({ input: "user source", mode: "Aggressive" });
  const controller = createCompactorController(view, {
    demonstratedSampleSource: DEMONSTRATED_SAMPLE,
    compact(input, mode) {
      calls.push({ input, mode });
      return compactAgentsMd(input, mode);
    },
  });

  controller.loadDemonstratedSample();
  const loaded = view.snapshot();
  assert.equal(loaded.input, DEMONSTRATED_SAMPLE);
  assert.equal(loaded.mode, "Balanced");
  assert.equal(loaded.sampleState, "loaded");
  assert.equal(loaded.result, null);
  assert.equal(loaded.inputFocusCount, 0);
  assert.equal(loaded.generateFocusCount, 1);
  assert.deepEqual(calls, [], "loading the sample does not inject a result");

  const result = controller.generate();
  assert.deepEqual(calls, [
    { input: DEMONSTRATED_SAMPLE, mode: "Balanced" },
  ]);
  assert.equal(result.counts.beforeCharacters, 20_664);
  assert.equal(result.counts.activeCharacters, 14_284);
  assert.match(result.counts.actualActiveComparison, /30\.9%/u);
  assert.equal(result.counts.movedSpanCount, 13);
  assert.equal(result.counts.uniqueInstructionsDeleted, 0);
  assert.equal(view.snapshot().sampleState, "generated");
});

test("Try your own AGENTS.md clears the demonstrated sample and result", () => {
  const view = createView();
  const controller = createCompactorController(view, {
    demonstratedSampleSource: DEMONSTRATED_SAMPLE,
  });

  controller.loadDemonstratedSample();
  controller.generate();
  controller.tryOwnAgentsMd();

  const reset = view.snapshot();
  assert.equal(reset.input, "");
  assert.equal(reset.mode, "Balanced");
  assert.equal(reset.result, null);
  assert.deepEqual(reset.visiblePaths, []);
  assert.equal(reset.sampleState, "idle");
  assert.equal(reset.inputFocusCount, 1);
  assert.equal(reset.generateFocusCount, 1);
  assert.equal(reset.resultClearCount, 2);
});

test("a successful result exposes active AGENTS.md, every guide, and move-map.md", () => {
  const result = compactAgentsMd(LARGE_FIXTURE, "Balanced");
  const viewModel = createResultViewModel(result);
  const navigator = createFileNavigator(viewModel.files);
  const expectedFiles = [
    result.activeAgentsMd,
    ...result.guides.toSorted((left, right) =>
      left.path < right.path ? -1 : left.path > right.path ? 1 : 0,
    ),
    result.moveMap,
  ];

  assert.deepEqual(
    viewModel.files.map((file) => file.path),
    expectedFiles.map((file) => file.path),
  );
  assert.equal(navigator.selected.path, "AGENTS.md");

  for (const expected of expectedFiles) {
    const selected = navigator.select(expected.path);
    assert.equal(selected.content, expected.content);
  }
});

test("counts are rendered from the contract result", () => {
  const result = compactAgentsMd(LARGE_FIXTURE, "Balanced");
  const viewModel = createResultViewModel(result);

  assert.deepEqual(viewModel.counts, {
    beforeCharacters: result.counts.before.characters,
    activeCharacters: result.counts.after.characters,
    retainedSourceCharacters: result.counts.retainedSourceCharacters,
    guideCount: result.guides.length,
    sourceSpanCount: result.counts.sourceSpans,
    retainedSpanCount: result.counts.retainedSpans,
    movedSpanCount: result.counts.movedSpans,
    collapsedDuplicateOccurrences:
      result.counts.collapsedDuplicateOccurrences,
    exactDuplicateCharactersFolded:
      result.counts.exactDuplicateCharactersFolded,
    uniqueInstructionsDeleted: 0,
    unaccountedSourceSpans: 0,
    outcome: "COMPACTED",
    metric: result.counts.monotonicityMetric,
    actualActiveComparison:
      "Actual active AGENTS.md reduction: 46.5% (991 fewer characters). Outcome: COMPACTED.",
    sourceExternalization:
      "Source instructions externalized: 71.7% (1528 characters moved to guides).",
    completePackageCharacters: 7362,
    completePackageComparison:
      "Complete emitted package: 7362 Unicode code points (245.3% larger than the original). The complete package is larger because moved instructions and their traceability are preserved. The 46.5% result applies to the always-loaded active AGENTS.md, not to total repository text.",
  });
});

test("no-growth view models separate actual active change from source externalization", () => {
  const result = compactAgentsMd(JAPANESE_FIXTURE, "Balanced");
  const viewModel = createResultViewModel(result);

  assert.equal(viewModel.counts.outcome, "NO_ACTIVE_REDUCTION");
  assert.match(viewModel.counts.actualActiveComparison, /35.6% increase/);
  assert.match(
    viewModel.counts.actualActiveComparison,
    /do not replace the original solely for context reduction/,
  );
  assert.equal(
    viewModel.counts.sourceExternalization,
    "Source instructions externalized: 84.8% (524 characters moved to guides).",
  );
  assert.match(viewModel.counts.completePackageComparison, /Complete emitted package: 6658/);
  assert.match(viewModel.counts.completePackageComparison, /977\.3% larger/);
  assert.match(
    viewModel.counts.completePackageComparison,
    /active-file comparison applies to the always-loaded active AGENTS\.md/,
  );
});

test("COMPACTED and NO_ACTIVE_REDUCTION have distinct, non-celebratory presentations", () => {
  const compacted = createResultViewModel(
    compactAgentsMd(LARGE_FIXTURE, "Balanced"),
  ).presentation;
  const noReduction = createResultViewModel(
    compactAgentsMd(JAPANESE_FIXTURE, "Balanced"),
  ).presentation;

  assert.deepEqual(compacted, {
    outcome: "COMPACTED",
    heading: "Active AGENTS.md reduced.",
    explanation:
      "The complete generated active file is smaller than the original.",
    actualActiveValue: "46.5%",
  });
  assert.deepEqual(noReduction, {
    outcome: "NO_ACTIVE_REDUCTION",
    heading: "No active-file reduction in this mode.",
    explanation:
      "Source instructions were externalized, but router and receipt overhead made the active file larger.",
    actualActiveValue: "35.6% larger",
  });
  assert.doesNotMatch(noReduction.heading + noReduction.explanation, /saving|saved|better/i);

  assert.deepEqual(
    createOutcomePresentation({
      outcome: "NO_ACTIVE_REDUCTION",
      actualActiveFile: { kind: "unchanged", percentage: 0 },
      sourceExternalization: { characters: 0 },
    }),
    {
      outcome: "NO_ACTIVE_REDUCTION",
      heading: "No active-file reduction in this mode.",
      explanation:
        "The complete generated active file is the same size as the original.",
      actualActiveValue: "Same size",
    },
  );
});

test("page hierarchy keeps reduction primary and gates downstream actions", () => {
  const expectedFlow = [
    "Try sample or paste AGENTS.md",
    "Choose a mode",
    "Generate",
    "Inspect the result",
    "Review with your AI",
    "Copy files or download ZIP",
  ];
  let previousIndex = -1;
  for (const label of expectedFlow) {
    const nextIndex = INDEX_HTML.indexOf(label, previousIndex + 1);
    assert.ok(nextIndex > previousIndex, `${label} follows the page flow`);
    previousIndex = nextIndex;
  }

  assert.match(
    INDEX_HTML,
    /<section id="results"[^>]*hidden>/,
  );
  for (const id of ["review-with-ai", "copy-selected", "download-zip"]) {
    assert.match(
      INDEX_HTML,
      new RegExp(`<button id="${id}"[^>]*disabled>`),
    );
  }
  assert.ok(
    INDEX_HTML.indexOf("Primary metric") <
      INDEX_HTML.indexOf("Source instructions externalized"),
  );
  assert.ok(
    INDEX_HTML.indexOf("Primary metric") <
      INDEX_HTML.indexOf("Complete emitted package"),
  );
  assert.match(
    UI_SOURCE,
    /copyButton\.disabled = false;[\s\S]*reviewButton\.disabled = false;[\s\S]*downloadButton\.disabled = false;/,
  );
});

test("semantic status, focus, and selected-artifact hooks are present", () => {
  assert.match(INDEX_HTML, /id="error-output"[^>]*role="alert"[^>]*aria-live="assertive"/);
  assert.match(INDEX_HTML, /id="result-status"[^>]*role="status"[^>]*aria-live="polite"/);
  assert.match(INDEX_HTML, /id="action-feedback"[^>]*role="status"[^>]*aria-live="polite"/);
  assert.match(INDEX_HTML, /id="file-preview"[^>]*tabindex="0"[^>]*aria-labelledby="selected-file"/);
  assert.match(STYLES, /:focus-visible/);
  assert.match(STYLES, /outline:\s*3px solid/);
  assert.match(UI_SOURCE, /setAttribute\("aria-pressed", String\(isSelected\)\)/);
  assert.match(STYLES, /button\[aria-pressed="true"\]::before/);
  assert.match(STYLES, /content:\s*"✓ Selected"/);
});

test("receipt, review, and Japanese preview readability remain explicit", () => {
  assert.match(
    INDEX_HTML,
    /The receipt shows which instruction layers the agent says it actually used\. It is a declaration, not proof\./,
  );
  assert.match(INDEX_HTML, /🪶 Core only/);
  assert.match(INDEX_HTML, /🪶 Core \+ testing/);
  assert.match(INDEX_HTML, /🪶 Core \+ release · security/);
  assert.match(
    INDEX_HTML,
    /We make the first cut\. Your AI reviews it\. You make the final decision\./,
  );

  const japaneseView = createResultViewModel(
    compactAgentsMd(JAPANESE_FIXTURE, "Balanced"),
  );
  assert.ok(
    japaneseView.files.some((file) => /[\u3040-\u30ff\u3400-\u9fff]/u.test(file.content)),
  );
  assert.match(STYLES, /\.markdown-preview\s*\{[\s\S]*line-break:\s*strict/);
  assert.match(STYLES, /\.markdown-preview\s*\{[\s\S]*overflow-wrap:\s*anywhere/);
  assert.match(STYLES, /\.markdown-preview\s*\{[\s\S]*word-break:\s*normal/);
});

for (const emptyInput of ["", " \n\t "]) {
  test(`empty input ${JSON.stringify(emptyInput)} shows a visible error`, () => {
    const view = createView({ input: emptyInput });
    const controller = createCompactorController(view);

    assert.equal(controller.generate(), null);
    assert.match(view.snapshot().error, /^EMPTY_INPUT:/);
    assert.equal(view.snapshot().resultRenderCount, 0);
  });
}

test("an invalid mode shows a visible error", () => {
  const view = createView({ mode: "balanced" });
  const controller = createCompactorController(view);

  assert.equal(controller.generate(), null);
  assert.match(view.snapshot().error, /^INVALID_MODE:/);
  assert.equal(view.snapshot().resultRenderCount, 0);
});

test("a contract exception is visible and preserves the previous success", () => {
  const view = createView();
  let shouldThrow = false;
  const controller = createCompactorController(view, {
    compact(input, mode) {
      if (shouldThrow) {
        throw new Error("CONTRACT_FAILURE: deliberate test failure");
      }
      return compactAgentsMd(input, mode);
    },
  });

  controller.generate();
  const previous = view.snapshot().result;
  shouldThrow = true;

  assert.equal(controller.generate(), null);
  assert.match(view.snapshot().error, /^CONTRACT_FAILURE:/);
  assert.equal(view.snapshot().result, previous);
  assert.equal(view.snapshot().resultRenderCount, 1);
});

test("malformed result validation errors are visible without partial output", () => {
  const view = createView();
  const controller = createCompactorController(view, {
    compact(input, mode) {
      const malformed = structuredClone(compactAgentsMd(input, mode));
      malformed.activeAgentsMd.content = "";
      return malformed;
    },
  });

  assert.equal(controller.generate(), null);
  assert.match(view.snapshot().error, /^MALFORMED_RESULT:/);
  assert.equal(view.snapshot().resultRenderCount, 0);
});

test("changing modes changes the exact contract call without changing source", () => {
  const calls = [];
  const view = createView({ mode: "Conservative" });
  const controller = createCompactorController(view, {
    compact(input, mode) {
      calls.push(mode);
      return compactAgentsMd(input, mode);
    },
  });

  controller.generate();
  view.setMode("Aggressive");
  controller.generate();

  assert.deepEqual(calls, ["Conservative", "Aggressive"]);
  assert.equal(view.snapshot().input, LARGE_FIXTURE);
});

test("copy waits for an explicit action and writes the exact selected artifact", async () => {
  const copied = [];
  const view = createView();
  const controller = createCompactorController(view, {
    clipboard: {
      async writeText(content) {
        copied.push(content);
      },
    },
  });

  controller.generate();
  assert.deepEqual(copied, [], "generation does not copy");

  const selected = view.snapshot().result.files[0];
  await controller.copySelected();

  assert.deepEqual(copied, [selected.content]);
  assert.deepEqual(view.snapshot().actionFeedback, {
    message: `Copied ${selected.path}.`,
    type: "success",
  });
});

test("switching files changes copied content and reported artifact name", async () => {
  const copied = [];
  const view = createView();
  const controller = createCompactorController(view, {
    clipboard: {
      async writeText(content) {
        copied.push(content);
      },
    },
  });

  controller.generate();
  const guide = view
    .snapshot()
    .result.files.find((file) => file.path.startsWith("agent-guides/"));
  assert.ok(guide);
  view.selectPath(guide.path);
  await controller.copySelected();

  assert.deepEqual(copied, [guide.content]);
  assert.equal(view.snapshot().actionFeedback.message, `Copied ${guide.path}.`);
});

test("clipboard rejection is visible and preserves the generated result", async () => {
  const view = createView();
  const controller = createCompactorController(view, {
    clipboard: {
      async writeText() {
        throw new Error("permission denied");
      },
    },
  });

  controller.generate();
  const beforeFailure = view.snapshot();
  assert.equal(await controller.copySelected(), null);
  const afterFailure = view.snapshot();

  assert.match(afterFailure.actionFeedback.message, /Copy failed: permission denied/);
  assert.equal(afterFailure.actionFeedback.type, "error");
  assert.equal(afterFailure.result, beforeFailure.result);
  assert.equal(afterFailure.resultRenderCount, 1);
  assert.deepEqual(afterFailure.visiblePaths, beforeFailure.visiblePaths);
});

test("Review with your AI waits for an explicit action and copies the full package", async () => {
  const copied = [];
  const view = createView({ input: JAPANESE_FIXTURE, mode: "Balanced" });
  const controller = createCompactorController(view, {
    clipboard: {
      async writeText(content) {
        copied.push(content);
      },
    },
  });

  controller.generate();
  assert.deepEqual(copied, [], "generation does not copy a review package");

  const prompt = await controller.copyReviewPrompt();
  const rendered = view.snapshot().result;
  assert.equal(copied.length, 1);
  assert.equal(copied[0], prompt);
  assert.match(prompt, /## Selected mode\nBalanced/);
  assert.ok(prompt.includes(JAPANESE_FIXTURE));
  assert.ok(prompt.includes(rendered.files[0].content));
  for (const artifact of rendered.files) {
    assert.ok(prompt.includes(`--- BEGIN ${artifact.path} ---`));
    assert.ok(prompt.includes(artifact.content));
  }
  assert.match(prompt, /Unique instructions deleted: 0/);
  assert.match(prompt, /Unaccounted source spans: 0/);
  assert.deepEqual(view.snapshot().actionFeedback, {
    message: "Copied Review with your AI package.",
    type: "success",
  });
  assert.equal(view.snapshot().input, JAPANESE_FIXTURE);
});

test("review clipboard rejection is visible and non-destructive", async () => {
  const view = createView({ input: JAPANESE_FIXTURE });
  const controller = createCompactorController(view, {
    clipboard: {
      async writeText() {
        throw new Error("review permission denied");
      },
    },
  });

  controller.generate();
  const beforeFailure = view.snapshot();
  assert.equal(await controller.copyReviewPrompt(), null);
  const afterFailure = view.snapshot();

  assert.match(
    afterFailure.actionFeedback.message,
    /Review copy failed: review permission denied/,
  );
  assert.equal(afterFailure.actionFeedback.type, "error");
  assert.equal(afterFailure.result, beforeFailure.result);
  assert.equal(afterFailure.resultRenderCount, 1);
  assert.equal(afterFailure.input, JAPANESE_FIXTURE);
});

test("ZIP download uses the stable name and current visible inventory", async () => {
  const saves = [];
  const view = createView();
  const controller = createCompactorController(view, {
    download: {
      async save(bytes, metadata) {
        saves.push({ bytes, metadata });
      },
    },
  });

  controller.generate();
  const bytes = await controller.downloadZip();

  assert.ok(bytes instanceof Uint8Array);
  assert.equal(saves.length, 1);
  assert.equal(saves[0].bytes, bytes);
  assert.deepEqual(saves[0].metadata, {
    name: "agents-md-compactor-output.zip",
    type: "application/zip",
  });
  assert.equal(
    view.snapshot().actionFeedback.message,
    "Downloaded agents-md-compactor-output.zip.",
  );
});

test("no ZIP is built or downloaded without a valid current result", async () => {
  let buildCount = 0;
  let saveCount = 0;
  const view = createView();
  const controller = createCompactorController(view, {
    buildZip() {
      buildCount += 1;
      return new Uint8Array();
    },
    download: {
      async save() {
        saveCount += 1;
      },
    },
  });

  assert.equal(await controller.downloadZip(), null);
  assert.equal(buildCount, 0);
  assert.equal(saveCount, 0);
  assert.match(view.snapshot().actionFeedback.message, /NO_RESULT/);
});

test("ZIP download rejects an inventory differing from the visible files", async () => {
  let saveCount = 0;
  const view = createView();
  const controller = createCompactorController(view, {
    download: {
      async save() {
        saveCount += 1;
      },
    },
  });

  controller.generate();
  view.setVisiblePaths([...view.snapshot().visiblePaths, "unexpected.md"]);

  assert.equal(await controller.downloadZip(), null);
  assert.equal(saveCount, 0);
  assert.match(view.snapshot().actionFeedback.message, /INVENTORY_MISMATCH/);
});
