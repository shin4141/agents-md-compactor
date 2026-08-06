import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

import {
  MODES,
  compactAgentsMd,
  parseInstructionBlocks,
  parseInstructionSpans,
} from "../src/compactor.js";
import {
  collectValidatedArtifacts,
  createDeterministicZip,
} from "../src/export.js";
import { buildReviewPrompt, createReductionFacts } from "../src/review.js";

const V13_REPOSITORY = "https://github.com/shin4141/decision-os-v13-loopkit.git";
const V12_REPOSITORY =
  "https://github.com/shin4141/decision-os-v12-completion-integrity.git";
const V13_PARENT = "21cd88d4efb378a60cd08a28712083d9d4a8bc19";
const V13_BENCHMARK = "e3d1b29f4bfb0215ebde66ea60376c01b7f87327";

const CORPUS = Object.freeze([
  {
    trial: "A",
    repository: V13_REPOSITORY,
    gitDirOption: "v13-git-dir",
    revision: V13_PARENT,
    path: "AGENTS.md",
    blob: "f85b0d9b17a8f90a7128ea96d9c8f63a88022128",
    sha256: "e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db",
    expectedCharacters: 20664,
    expectedBlocks: 18,
  },
  {
    trial: "B",
    repository: V13_REPOSITORY,
    gitDirOption: "v13-git-dir",
    revision: V13_PARENT,
    path: "AGENTS.ja.md",
    blob: "447b9f982abb80b991ca463d6cf430aea4a88e14",
    sha256: "f49d32685ee0814d4c963c2805643f8b6d8623f23e92ede083b45c599aebbd29",
    expectedCharacters: 2301,
    expectedBlocks: 10,
  },
  {
    trial: "C",
    repository: V12_REPOSITORY,
    gitDirOption: "v12-git-dir",
    revision: "be1b3f70128d67e642d288c2bab9b53719720c37",
    path: "docs/v12-short-agents.md",
    blob: "f20b7345efc7a102c179d75710ef01e380cda442",
    sha256: "7d02f19b5104fadea4355d7de2feb3bc2dc3ed95cd25a53d279f824b25e5786a",
    expectedCharacters: 1014,
    expectedBlocks: 1,
  },
]);

const HUMAN_BENCHMARK = Object.freeze({
  repository: V13_REPOSITORY,
  gitDirOption: "v13-git-dir",
  revision: V13_BENCHMARK,
  path: "AGENTS.md",
  blob: "2deb6f610f8e3a4e67808a0182cb2439a7abc447",
  sha256: "bb14c77c6b45c6bf365902b47729b455df566fa98688956824e072c352f2dae7",
  expectedCharacters: 11141,
});

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function parseOptions(arguments_) {
  const options = new Map();
  for (let index = 0; index < arguments_.length; index += 2) {
    const flag = arguments_[index];
    const value = arguments_[index + 1];
    if (!flag?.startsWith("--") || !value) {
      throw new Error(
        "Usage: node tools/replay_historical_corpus.mjs --v13-git-dir <bare.git> --v12-git-dir <bare.git>",
      );
    }
    options.set(flag.slice(2), value);
  }
  for (const required of ["v13-git-dir", "v12-git-dir"]) {
    if (!options.has(required)) {
      throw new Error(`Missing required option: --${required}`);
    }
  }
  return options;
}

function git(gitDir, ...arguments_) {
  return execFileSync("git", [`--git-dir=${gitDir}`, ...arguments_], {
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  });
}

function readVerifiedSource(spec, options) {
  const gitDir = options.get(spec.gitDirOption);
  const resolvedRevision = git(gitDir, "rev-parse", spec.revision).trim();
  assert.equal(resolvedRevision, spec.revision);
  const blob = git(gitDir, "rev-parse", `${spec.revision}:${spec.path}`).trim();
  assert.equal(blob, spec.blob);
  const source = git(gitDir, "show", `${spec.revision}:${spec.path}`);
  assert.equal(sha256(source), spec.sha256);
  assert.equal(Array.from(source).length, spec.expectedCharacters);
  return source;
}

function inspectStoredZip(bytes) {
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const entries = [];
  let offset = 0;

  while (view.getUint32(offset, true) === 0x04034b50) {
    const compressedSize = view.getUint32(offset + 18, true);
    const nameLength = view.getUint16(offset + 26, true);
    const extraLength = view.getUint16(offset + 28, true);
    const nameStart = offset + 30;
    const contentStart = nameStart + nameLength + extraLength;
    entries.push({
      path: decoder.decode(bytes.slice(nameStart, nameStart + nameLength)),
      content: decoder.decode(
        bytes.slice(contentStart, contentStart + compressedSize),
      ),
    });
    offset = contentStart + compressedSize;
  }

  assert.equal(view.getUint32(offset, true), 0x02014b50);
  return entries;
}

function assertCompletePackage(source, mode, result) {
  const artifacts = collectValidatedArtifacts(source, mode, result);
  const review = buildReviewPrompt(source, mode, result);
  const zip = createDeterministicZip(artifacts);
  const zipEntries = inspectStoredZip(zip);

  assert.ok(review.includes(source));
  for (const artifact of artifacts) {
    assert.ok(review.includes(`--- BEGIN ${artifact.path} ---`));
    assert.ok(review.includes(artifact.content));
  }
  assert.deepEqual(zipEntries, artifacts);
  return {
    artifacts: artifacts.map((artifact) => artifact.path),
    reviewCharacters: Array.from(review).length,
    reviewSha256: sha256(review),
    zipBytes: zip.length,
    zipSha256: sha256(zip),
  };
}

function assertLedger(source, result) {
  const sourceIds = parseInstructionSpans(source).map((span) => span.id);
  const entryIds = result.moveMap.entries.map((entry) => entry.id);
  const dispositionIds = [
    ...result.activeAgentsMd.retainedSpanIds,
    ...result.guides.flatMap((guide) => guide.spanIds),
    ...result.moveMap.entries
      .filter((entry) => entry.disposition === "COLLAPSED_EXACT_DUPLICATE")
      .map((entry) => entry.id),
  ];
  assert.deepEqual(entryIds, sourceIds);
  assert.deepEqual([...dispositionIds].sort(), [...sourceIds].sort());
  assert.equal(new Set(dispositionIds).size, sourceIds.length);
}

function qualifyRun(trial, source, mode) {
  const result = compactAgentsMd(source, mode);
  const facts = createReductionFacts(result);
  assertLedger(source, result);
  const packageEvidence = assertCompletePackage(source, mode, result);

  assert.equal(facts.uniqueInstructionsDeleted, 0);
  assert.equal(facts.unaccountedSourceSpans, 0);

  return {
    trial,
    mode,
    outcome: facts.outcome,
    originalCharacters: facts.originalCharacters,
    activeCharacters: facts.activeCharacters,
    actualChange: facts.actualActiveFile,
    externalizedCharacters: facts.sourceExternalization.characters,
    sourceBlocks: result.counts.sourceBlocks,
    sourceSpans: facts.sourceSpanCount,
    retainedSpans: facts.retainedSpanCount,
    movedSpans: facts.movedSpanCount,
    collapsedDuplicateOccurrences: facts.collapsedDuplicateOccurrences,
    exactDuplicateCharactersFolded: facts.exactDuplicateCharactersFolded,
    guideInventory: result.guides.map((guide) => guide.category),
    uniqueInstructionsDeleted: facts.uniqueInstructionsDeleted,
    unaccountedSourceSpans: facts.unaccountedSourceSpans,
    duplicateGroups: result.sourceAccounting.duplicateGroups,
    ambiguousOwnershipSpanIds:
      result.sourceAccounting.ambiguousOwnershipSpanIds,
    dispositions: result.sourceAccounting.dispositions,
    accountedExactlyOnce: true,
    ...packageEvidence,
  };
}

const options = parseOptions(process.argv.slice(2));
const resolvedParent = git(
  options.get("v13-git-dir"),
  "rev-parse",
  `${V13_BENCHMARK}^`,
).trim();
assert.equal(resolvedParent, V13_PARENT);

const runs = [];
const sources = {};
for (const spec of CORPUS) {
  const source = readVerifiedSource(spec, options);
  const blocks = parseInstructionBlocks(source);
  assert.equal(blocks.length, spec.expectedBlocks);
  sources[spec.trial] = {
    repository: spec.repository,
    revision: spec.revision,
    path: spec.path,
    blob: spec.blob,
    sha256: spec.sha256,
    utf8Bytes: Buffer.byteLength(source, "utf8"),
    characters: spec.expectedCharacters,
    parsedBlocks: blocks.length,
    parsedSpans: parseInstructionSpans(source).length,
  };
  for (const mode of MODES) {
    runs.push(qualifyRun(spec.trial, source, mode));
  }
}

const benchmarkSource = readVerifiedSource(HUMAN_BENCHMARK, options);
const benchmarkDifference =
  sources.A.characters - HUMAN_BENCHMARK.expectedCharacters;
const benchmark = {
  repository: HUMAN_BENCHMARK.repository,
  revision: HUMAN_BENCHMARK.revision,
  path: HUMAN_BENCHMARK.path,
  blob: HUMAN_BENCHMARK.blob,
  sha256: HUMAN_BENCHMARK.sha256,
  utf8Bytes: Buffer.byteLength(benchmarkSource, "utf8"),
  characters: HUMAN_BENCHMARK.expectedCharacters,
  parsedBlocks: parseInstructionBlocks(benchmarkSource).length,
  charactersSmallerThanTrialA: benchmarkDifference,
  percentageSmallerThanTrialA:
    Math.round((benchmarkDifference / sources.A.characters) * 1000) / 10,
};

console.log(
  JSON.stringify(
    {
      classification: "PASS",
      corpusMethod: "SHA-bound bare-repository replay",
      sources,
      runs,
      humanBenchmark: benchmark,
    },
    null,
    2,
  ),
);
