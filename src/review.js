import { collectValidatedArtifacts } from "./export.js";

const REVIEW_INSTRUCTIONS = `Review this compacted AGENTS.md package against the original.

Check:

1. whether any operational instruction disappeared;
2. whether exceptions and qualifying conditions were preserved;
3. whether every routed guide is reachable from AGENTS.md;
4. whether anything moved out should remain always loaded;
5. whether anything still active could safely be condition-routed;
6. whether the selected compression mode is appropriate for this repository;
7. whether every folded duplicate had equivalent scope and conditions;
8. whether each canonical occurrence preserved the original instruction;
9. whether repetition counts are correct;
10. whether any merely similar or context-dependent instruction was folded;
11. whether mixed-category blocks were safely divided or conservatively retained.

Do not rewrite everything.

Return only:

- the specific changes you recommend;
- the reason for each change;
- whether the change should be applied to the active AGENTS.md or one routed guide.

The final decision remains with the user.`;

function assertNonNegativeInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`INVALID_REDUCTION_FACTS: ${label} must be a non-negative integer`);
  }
}

function percentage(part, whole) {
  if (whole === 0) return 0;
  return Math.round((part / whole) * 1000) / 10;
}

function countCharacters(value) {
  return Array.from(value).length;
}

export function createReductionFacts(result) {
  const originalCharacters = result?.counts?.before?.characters;
  const activeCharacters = result?.counts?.after?.characters;
  const retainedSourceCharacters = result?.counts?.retainedSourceCharacters;
  const externalizedSourceCharacters =
    result?.counts?.externalizedSourceCharacters;
  const sourceSpans = result?.counts?.sourceSpans;
  const retainedSpans = result?.counts?.retainedSpans;
  const movedSpans = result?.counts?.movedSpans;
  const collapsedDuplicateOccurrences =
    result?.counts?.collapsedDuplicateOccurrences;
  const exactDuplicateCharactersFolded =
    result?.counts?.exactDuplicateCharactersFolded;
  const uniqueInstructionsDeleted = result?.counts?.uniqueInstructionsDeleted;
  const unaccountedSourceSpans = result?.counts?.unaccountedSourceSpans;
  const guideCount = result?.guides?.length;
  const packageContents = [
    result?.activeAgentsMd?.content,
    ...(Array.isArray(result?.guides)
      ? result.guides.map((guide) => guide?.content)
      : []),
    result?.moveMap?.content,
  ];
  if (packageContents.some((content) => typeof content !== "string")) {
    throw new TypeError(
      "INVALID_REDUCTION_FACTS: complete package artifacts must be strings",
    );
  }
  const completePackageCharacters = packageContents.reduce(
    (total, content) => total + countCharacters(content),
    0,
  );

  for (const [label, value] of [
    ["original characters", originalCharacters],
    ["active characters", activeCharacters],
    ["retained source characters", retainedSourceCharacters],
    ["externalized source characters", externalizedSourceCharacters],
    ["source spans", sourceSpans],
    ["retained spans", retainedSpans],
    ["moved spans", movedSpans],
    ["collapsed duplicate occurrences", collapsedDuplicateOccurrences],
    ["exact duplicate characters folded", exactDuplicateCharactersFolded],
    ["unique instructions deleted", uniqueInstructionsDeleted],
    ["unaccounted source spans", unaccountedSourceSpans],
    ["guide count", guideCount],
    ["complete package characters", completePackageCharacters],
  ]) {
    assertNonNegativeInteger(value, label);
  }
  if (originalCharacters === 0) {
    throw new TypeError("INVALID_REDUCTION_FACTS: original characters must be greater than zero");
  }
  if (retainedSourceCharacters > originalCharacters) {
    throw new TypeError("INVALID_REDUCTION_FACTS: retained source characters exceed the original");
  }
  if (retainedSpans + movedSpans + collapsedDuplicateOccurrences !== sourceSpans) {
    throw new TypeError("INVALID_REDUCTION_FACTS: source-span dispositions do not balance");
  }
  if (uniqueInstructionsDeleted !== 0 || unaccountedSourceSpans !== 0) {
    throw new TypeError("INVALID_REDUCTION_FACTS: source accounting is incomplete");
  }

  const activeDifference = originalCharacters - activeCharacters;
  const activeFile =
    activeDifference > 0
      ? {
          kind: "reduction",
          characters: activeDifference,
          percentage: percentage(activeDifference, originalCharacters),
        }
      : activeDifference < 0
        ? {
            kind: "increase",
            characters: Math.abs(activeDifference),
            percentage: percentage(Math.abs(activeDifference), originalCharacters),
          }
        : { kind: "unchanged", characters: 0, percentage: 0 };
  const packageDifference = completePackageCharacters - originalCharacters;
  const completePackage = {
    characters: completePackageCharacters,
    relativeToOriginal:
      packageDifference > 0
        ? {
            kind: "increase",
            characters: packageDifference,
            percentage: percentage(packageDifference, originalCharacters),
          }
        : packageDifference < 0
          ? {
              kind: "reduction",
              characters: Math.abs(packageDifference),
              percentage: percentage(
                Math.abs(packageDifference),
                originalCharacters,
              ),
            }
          : { kind: "unchanged", characters: 0, percentage: 0 },
  };
  return Object.freeze({
    originalCharacters,
    activeCharacters,
    retainedSourceCharacters,
    guideCount,
    sourceSpanCount: sourceSpans,
    retainedSpanCount: retainedSpans,
    movedSpanCount: movedSpans,
    collapsedDuplicateOccurrences,
    exactDuplicateCharactersFolded,
    uniqueInstructionsDeleted,
    unaccountedSourceSpans,
    outcome:
      activeFile.kind === "reduction"
        ? "COMPACTED"
        : "NO_ACTIVE_REDUCTION",
    actualActiveFile: Object.freeze(activeFile),
    completePackage: Object.freeze({
      ...completePackage,
      relativeToOriginal: Object.freeze(completePackage.relativeToOriginal),
    }),
    sourceExternalization: Object.freeze({
      kind: externalizedSourceCharacters > 0 ? "externalized" : "unchanged",
      characters: externalizedSourceCharacters,
      percentage: percentage(externalizedSourceCharacters, originalCharacters),
    }),
  });
}

function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

export function formatActualActiveReduction(facts) {
  if (facts.actualActiveFile.kind === "reduction") {
    return `Actual active AGENTS.md reduction: ${formatPercent(facts.actualActiveFile.percentage)} (${facts.actualActiveFile.characters} fewer characters). Outcome: COMPACTED.`;
  }
  if (facts.actualActiveFile.kind === "increase") {
    return `Actual active AGENTS.md change: ${formatPercent(facts.actualActiveFile.percentage)} increase (${facts.actualActiveFile.characters} more characters). Outcome: NO_ACTIVE_REDUCTION. The selected mode did not reduce the active file; do not replace the original solely for context reduction.`;
  }
  return "Actual active AGENTS.md change: unchanged. Outcome: NO_ACTIVE_REDUCTION. The selected mode did not reduce the active file; do not replace the original solely for context reduction.";
}

export function formatSourceExternalization(facts) {
  if (facts.sourceExternalization.kind === "externalized") {
    return `Source instructions externalized: ${formatPercent(facts.sourceExternalization.percentage)} (${facts.sourceExternalization.characters} characters moved to guides).`;
  }
  return "Source instructions externalized: 0.0% (0 characters moved to guides).";
}

export function formatCompletePackage(facts) {
  const comparison = facts.completePackage.relativeToOriginal;
  const relativeText =
    comparison.kind === "increase"
      ? `${formatPercent(comparison.percentage)} larger than the original`
      : comparison.kind === "reduction"
        ? `${formatPercent(comparison.percentage)} smaller than the original`
        : "the same size as the original";
  const activeBoundary =
    facts.actualActiveFile.kind === "reduction"
      ? `The ${formatPercent(facts.actualActiveFile.percentage)} result applies to the always-loaded active AGENTS.md, not to total repository text.`
      : "The active-file comparison applies to the always-loaded active AGENTS.md, not to total repository text.";
  const preservationReason =
    comparison.kind === "increase"
      ? "The complete package is larger because moved instructions and their traceability are preserved."
      : "The complete package preserves moved instructions and their traceability.";

  return `Complete emitted package: ${facts.completePackage.characters} Unicode code points (${relativeText}). ${preservationReason} ${activeBoundary}`;
}

export function formatReductionFacts(facts) {
  return [
    "Character-count basis: Unicode code points; LF and trailing newline included.",
    `Original source characters: ${facts.originalCharacters}`,
    `Generated active AGENTS.md characters: ${facts.activeCharacters}`,
    `Retained source-instruction characters: ${facts.retainedSourceCharacters}`,
    `Emitted guide count: ${facts.guideCount}`,
    `Source span count: ${facts.sourceSpanCount}`,
    `Retained active span count: ${facts.retainedSpanCount}`,
    `Moved-to-guide span count: ${facts.movedSpanCount}`,
    `Exact duplicate occurrences folded: ${facts.collapsedDuplicateOccurrences}`,
    `Exact duplicate characters folded: ${facts.exactDuplicateCharactersFolded}`,
    `Unique instructions deleted: ${facts.uniqueInstructionsDeleted}`,
    `Unaccounted source spans: ${facts.unaccountedSourceSpans}`,
    `Outcome: ${facts.outcome}`,
    `Complete active-file comparison: ${formatActualActiveReduction(facts)}`,
    `Source externalization: ${formatSourceExternalization(facts)}`,
    `Complete package comparison: ${formatCompletePackage(facts)}`,
  ].join("\n");
}

function formatSourceAccounting(result) {
  return [
    "## Source-span disposition ledger",
    JSON.stringify(result.sourceAccounting.dispositions, null, 2),
    "",
    "## Exact-duplicate groups and canonical selections",
    JSON.stringify(result.sourceAccounting.duplicateGroups, null, 2),
    "",
    "## Potential but uncollapsed exact-body duplicates",
    JSON.stringify(result.sourceAccounting.potentialDuplicates, null, 2),
    "",
    "## Ambiguous mixed-category spans retained active",
    JSON.stringify(result.sourceAccounting.ambiguousOwnershipSpanIds, null, 2),
  ].join("\n");
}

function packageSection(label, path, content) {
  return [
    `## ${label}: ${path}`,
    `--- BEGIN ${path} ---`,
    content,
    `--- END ${path} ---`,
  ].join("\n");
}

export function buildReviewPrompt(
  input,
  mode,
  result,
  { validate } = {},
) {
  const artifacts = collectValidatedArtifacts(input, mode, result, {
    ...(validate ? { validate } : {}),
  });
  const facts = createReductionFacts(result);

  return [
    "# AGENTS.md Compactor — Review with your AI",
    "",
    "We make the first cut.",
    "Your AI reviews it.",
    "You make the final decision.",
    "This action only copies the package to the clipboard; this tool does not send it to an AI service.",
    "",
    "## Selected mode",
    mode,
    "",
    "## Exact reduction facts",
    formatReductionFacts(facts),
    "",
    formatSourceAccounting(result),
    "",
    "## Review instructions",
    REVIEW_INSTRUCTIONS,
    "",
    packageSection("Original pasted source", "original-AGENTS.md", input),
    ...artifacts.flatMap((artifact) => [
      "",
      packageSection("Generated artifact", artifact.path, artifact.content),
    ]),
    "",
  ].join("\n");
}

export { REVIEW_INSTRUCTIONS };
