import {
  assertValidCompactionResult,
  compactAgentsMd,
} from "./compactor.js";
import {
  assertVisibleInventory,
  collectValidatedArtifacts,
  createDeterministicZip,
  ZIP_DOWNLOAD_NAME,
  ZIP_MEDIA_TYPE,
} from "./export.js";
import {
  buildReviewPrompt,
  createReductionFacts,
  formatActualActiveReduction,
  formatCompletePackage,
  formatSourceExternalization,
} from "./review.js";

function requireViewMethod(view, name) {
  if (typeof view?.[name] !== "function") {
    throw new TypeError(`UI view must provide ${name}()`);
  }
}

export function createResultViewModel(result, artifacts) {
  const files =
    artifacts ??
    collectValidatedArtifacts(result.originalInput, result.mode, result);
  const reductionFacts = createReductionFacts(result);
  return {
    files,
    presentation: createOutcomePresentation(reductionFacts),
    counts: {
      beforeCharacters: reductionFacts.originalCharacters,
      activeCharacters: reductionFacts.activeCharacters,
      retainedSourceCharacters: reductionFacts.retainedSourceCharacters,
      guideCount: reductionFacts.guideCount,
      sourceSpanCount: reductionFacts.sourceSpanCount,
      retainedSpanCount: reductionFacts.retainedSpanCount,
      movedSpanCount: reductionFacts.movedSpanCount,
      collapsedDuplicateOccurrences:
        reductionFacts.collapsedDuplicateOccurrences,
      exactDuplicateCharactersFolded:
        reductionFacts.exactDuplicateCharactersFolded,
      uniqueInstructionsDeleted: reductionFacts.uniqueInstructionsDeleted,
      unaccountedSourceSpans: reductionFacts.unaccountedSourceSpans,
      outcome: reductionFacts.outcome,
      metric: result.counts.monotonicityMetric,
      actualActiveComparison: formatActualActiveReduction(reductionFacts),
      sourceExternalization: formatSourceExternalization(reductionFacts),
      completePackageCharacters: reductionFacts.completePackage.characters,
      completePackageComparison: formatCompletePackage(reductionFacts),
    },
  };
}

export function createOutcomePresentation(facts) {
  const { actualActiveFile, outcome, sourceExternalization } = facts;

  if (outcome === "COMPACTED") {
    return Object.freeze({
      outcome,
      heading: "Active AGENTS.md reduced.",
      explanation:
        "The complete generated active file is smaller than the original.",
      actualActiveValue: `${actualActiveFile.percentage.toFixed(1)}%`,
    });
  }

  if (actualActiveFile.kind === "increase") {
    const explanation =
      sourceExternalization.characters > 0
        ? "Source instructions were externalized, but router and receipt overhead made the active file larger."
        : "The complete generated active file is larger than the original.";
    return Object.freeze({
      outcome,
      heading: "No active-file reduction in this mode.",
      explanation,
      actualActiveValue: `${actualActiveFile.percentage.toFixed(1)}% larger`,
    });
  }

  return Object.freeze({
    outcome,
    heading: "No active-file reduction in this mode.",
    explanation:
      sourceExternalization.characters > 0
        ? "Source instructions were externalized, but the complete generated active file is the same size as the original."
        : "The complete generated active file is the same size as the original.",
    actualActiveValue: "Same size",
  });
}

export function createFileNavigator(files) {
  if (!Array.isArray(files) || files.length === 0) {
    throw new TypeError("Generated files must be a non-empty array");
  }

  let selected = files[0];

  return {
    get selected() {
      return selected;
    },
    select(path) {
      const match = files.find((file) => file.path === path);
      if (!match) {
        throw new RangeError(`Unknown generated file: ${path}`);
      }
      selected = match;
      return selected;
    },
  };
}

export function formatUiError(error) {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }
  return "UNKNOWN_ERROR: generation failed";
}

export function createCompactorController(
  view,
  {
    compact = compactAgentsMd,
    validate = assertValidCompactionResult,
    clipboard,
    download,
    buildZip = createDeterministicZip,
    buildReview = buildReviewPrompt,
  } = {},
) {
  for (const method of [
    "getInput",
    "getMode",
    "getSelectedPath",
    "getVisibleFilePaths",
    "showResult",
    "showError",
    "showActionFeedback",
  ]) {
    requireViewMethod(view, method);
  }

  let current = null;

  const refreshedArtifacts = () => {
    if (!current) {
      throw new Error("NO_RESULT: generate a valid result first");
    }
    const artifacts = collectValidatedArtifacts(
      current.input,
      current.mode,
      current.result,
      { validate },
    );
    assertVisibleInventory(artifacts, view.getVisibleFilePaths());
    return artifacts;
  };

  return {
    generate() {
      const input = view.getInput();
      const mode = view.getMode();

      try {
        const result = compact(input, mode);
        const artifacts = collectValidatedArtifacts(input, mode, result, {
          validate,
        });
        const viewModel = createResultViewModel(result, artifacts);
        view.showResult(viewModel);
        current = { input, mode, result };
        view.showError("");
        view.showActionFeedback("", "success");
        return viewModel;
      } catch (error) {
        view.showError(formatUiError(error));
        return null;
      }
    },
    async copySelected() {
      try {
        if (!clipboard || typeof clipboard.writeText !== "function") {
          throw new Error("CLIPBOARD_UNAVAILABLE: clipboard access is unavailable");
        }
        const artifacts = refreshedArtifacts();
        const selectedPath = view.getSelectedPath();
        const selected = artifacts.find(
          (artifact) => artifact.path === selectedPath,
        );
        if (!selected) {
          throw new Error(`UNKNOWN_ARTIFACT: ${selectedPath ?? "none"}`);
        }
        await clipboard.writeText(selected.content);
        view.showActionFeedback(`Copied ${selected.path}.`, "success");
        return selected;
      } catch (error) {
        view.showActionFeedback(
          `Copy failed: ${formatUiError(error)}`,
          "error",
        );
        return null;
      }
    },
    async copyReviewPrompt() {
      try {
        if (!clipboard || typeof clipboard.writeText !== "function") {
          throw new Error("CLIPBOARD_UNAVAILABLE: clipboard access is unavailable");
        }
        refreshedArtifacts();
        const prompt = buildReview(current.input, current.mode, current.result, {
          validate,
        });
        await clipboard.writeText(prompt);
        view.showActionFeedback(
          "Copied Review with your AI package.",
          "success",
        );
        return prompt;
      } catch (error) {
        view.showActionFeedback(
          `Review copy failed: ${formatUiError(error)}`,
          "error",
        );
        return null;
      }
    },
    async downloadZip() {
      try {
        if (!download || typeof download.save !== "function") {
          throw new Error("DOWNLOAD_UNAVAILABLE: browser download is unavailable");
        }
        const artifacts = refreshedArtifacts();
        const bytes = buildZip(artifacts);
        await download.save(bytes, {
          name: ZIP_DOWNLOAD_NAME,
          type: ZIP_MEDIA_TYPE,
        });
        view.showActionFeedback(
          `Downloaded ${ZIP_DOWNLOAD_NAME}.`,
          "success",
        );
        return bytes;
      } catch (error) {
        view.showActionFeedback(
          `ZIP export failed: ${formatUiError(error)}`,
          "error",
        );
        return null;
      }
    },
  };
}

function requiredElement(root, selector) {
  const element = root.querySelector(selector);
  if (!element) {
    throw new Error(`Missing required UI element: ${selector}`);
  }
  return element;
}

export function createDomView(root = document) {
  const source = requiredElement(root, "#source-agents-md");
  const mode = requiredElement(root, "#mode");
  const error = requiredElement(root, "#error-output");
  const results = requiredElement(root, "#results");
  const resultStatus = requiredElement(root, "#result-status");
  const outcomeHeading = requiredElement(root, "#outcome-heading");
  const outcomeExplanation = requiredElement(root, "#outcome-explanation");
  const beforeCount = requiredElement(root, "#before-count");
  const activeCount = requiredElement(root, "#active-count");
  const retainedCount = requiredElement(root, "#retained-count");
  const guideCount = requiredElement(root, "#guide-count");
  const sourceSpanCount = requiredElement(root, "#source-span-count");
  const movedSpanCount = requiredElement(root, "#moved-span-count");
  const foldedOccurrenceCount = requiredElement(
    root,
    "#folded-occurrence-count",
  );
  const foldedCharacterCount = requiredElement(root, "#folded-character-count");
  const uniqueDeletedCount = requiredElement(root, "#unique-deleted-count");
  const unaccountedSpanCount = requiredElement(root, "#unaccounted-span-count");
  const outcome = requiredElement(root, "#compaction-outcome");
  const actualActiveValue = requiredElement(root, "#actual-active-value");
  const actualActiveComparison = requiredElement(
    root,
    "#actual-active-comparison",
  );
  const sourceExternalization = requiredElement(
    root,
    "#source-externalization",
  );
  const completePackage = requiredElement(root, "#complete-package");
  const metric = requiredElement(root, "#count-metric");
  const fileList = requiredElement(root, "#file-list");
  const selectedFile = requiredElement(root, "#selected-file");
  const filePreview = requiredElement(root, "#file-preview");
  const actionFeedback = requiredElement(root, "#action-feedback");
  const copyButton = requiredElement(root, "#copy-selected");
  const reviewButton = requiredElement(root, "#review-with-ai");
  const downloadButton = requiredElement(root, "#download-zip");
  let navigator = null;

  return {
    getInput() {
      return source.value;
    },
    getMode() {
      return mode.value;
    },
    getSelectedPath() {
      return navigator?.selected.path ?? null;
    },
    getVisibleFilePaths() {
      return Array.from(
        fileList.querySelectorAll("button[data-path]"),
        (button) => button.dataset.path,
      );
    },
    showError(message) {
      error.textContent = message;
      error.hidden = message.length === 0;
    },
    showActionFeedback(message, type) {
      actionFeedback.textContent = message;
      actionFeedback.hidden = message.length === 0;
      actionFeedback.classList.toggle("error", type === "error");
      actionFeedback.classList.toggle("success", type === "success");
    },
    showResult(viewModel) {
      const nextNavigator = createFileNavigator(viewModel.files);
      const fragment = root.createDocumentFragment();
      const buttons = [];

      const showSelectedFile = (path) => {
        const file = nextNavigator.select(path);
        selectedFile.textContent = file.path;
        filePreview.textContent = file.content;

        for (const button of buttons) {
          const isSelected = button.dataset.path === file.path;
          button.classList.toggle("selected", isSelected);
          button.setAttribute("aria-pressed", String(isSelected));
        }
      };

      for (const file of viewModel.files) {
        const button = root.createElement("button");
        button.type = "button";
        button.textContent = file.path;
        button.dataset.path = file.path;
        button.setAttribute("aria-pressed", "false");
        button.setAttribute("aria-controls", "file-preview");
        button.addEventListener("click", () => showSelectedFile(file.path));
        buttons.push(button);
        fragment.append(button);
      }

      fileList.replaceChildren(fragment);
      beforeCount.textContent = viewModel.counts.beforeCharacters.toLocaleString(
        "en-US",
      );
      activeCount.textContent = viewModel.counts.activeCharacters.toLocaleString(
        "en-US",
      );
      retainedCount.textContent =
        viewModel.counts.retainedSourceCharacters.toLocaleString("en-US");
      guideCount.textContent = String(viewModel.counts.guideCount);
      sourceSpanCount.textContent = String(viewModel.counts.sourceSpanCount);
      movedSpanCount.textContent = String(viewModel.counts.movedSpanCount);
      foldedOccurrenceCount.textContent = String(
        viewModel.counts.collapsedDuplicateOccurrences,
      );
      foldedCharacterCount.textContent = String(
        viewModel.counts.exactDuplicateCharactersFolded,
      );
      uniqueDeletedCount.textContent = String(
        viewModel.counts.uniqueInstructionsDeleted,
      );
      unaccountedSpanCount.textContent = String(
        viewModel.counts.unaccountedSourceSpans,
      );
      outcome.textContent = viewModel.counts.outcome;
      outcomeHeading.textContent = viewModel.presentation.heading;
      outcomeExplanation.textContent = viewModel.presentation.explanation;
      resultStatus.dataset.outcome = viewModel.presentation.outcome;
      actualActiveValue.textContent = viewModel.presentation.actualActiveValue;
      actualActiveComparison.textContent =
        viewModel.counts.actualActiveComparison;
      sourceExternalization.textContent =
        viewModel.counts.sourceExternalization;
      completePackage.textContent = viewModel.counts.completePackageComparison;
      metric.textContent = viewModel.counts.metric;
      results.hidden = false;
      copyButton.disabled = false;
      reviewButton.disabled = false;
      downloadButton.disabled = false;
      navigator = nextNavigator;
      showSelectedFile(navigator.selected.path);
    },
  };
}

export function createBrowserClipboard(
  root = document,
  navigatorObject = globalThis.navigator,
) {
  return {
    async writeText(text) {
      if (typeof navigatorObject?.clipboard?.writeText === "function") {
        await navigatorObject.clipboard.writeText(text);
        return;
      }

      const temporary = root.createElement("textarea");
      temporary.value = text;
      temporary.setAttribute("readonly", "");
      temporary.className = "clipboard-fallback";
      root.body.append(temporary);
      temporary.select();
      const copied = root.execCommand?.("copy") === true;
      temporary.remove();
      if (!copied) {
        throw new Error("CLIPBOARD_UNAVAILABLE: clipboard access is unavailable");
      }
    },
  };
}

export function createBrowserDownload(root = document, urlApi = URL) {
  return {
    save(bytes, { name, type }) {
      const blob = new Blob([bytes], { type });
      const url = urlApi.createObjectURL(blob);
      const anchor = root.createElement("a");
      anchor.href = url;
      anchor.download = name;
      anchor.hidden = true;
      root.body.append(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => urlApi.revokeObjectURL(url), 0);
    },
  };
}

export function mountCompactorUi(root = document, dependencies) {
  const form = requiredElement(root, "#compactor-form");
  const copyButton = requiredElement(root, "#copy-selected");
  const reviewButton = requiredElement(root, "#review-with-ai");
  const downloadButton = requiredElement(root, "#download-zip");
  const controller = createCompactorController(
    createDomView(root),
    {
      clipboard: createBrowserClipboard(root),
      download: createBrowserDownload(root),
      ...dependencies,
    },
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    controller.generate();
  });
  copyButton.addEventListener("click", () => {
    void controller.copySelected();
  });
  reviewButton.addEventListener("click", () => {
    void controller.copyReviewPrompt();
  });
  downloadButton.addEventListener("click", () => {
    void controller.downloadZip();
  });

  return controller;
}
