import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertValidCompactionResult,
  compactAgentsMd,
} from "../../src/compactor.js";
import { collectValidatedArtifacts } from "../../src/export.js";
import { createReductionFacts } from "../../src/review.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");
const MODES = ["Conservative", "Balanced", "Aggressive"];
const EXPECTED_ARTIFACTS = [
  "AGENTS.md",
  "agent-guides/handoff.md",
  "agent-guides/other.md",
  "move-map.md",
];
const EXPECTED_HASHES = new Map([
  ["AGENTS.md", "b60acc020ddad730ba7c7528dc9a98e349646c4eb47b24054ac4bf87bf1f3bfe"],
  ["agent-guides/handoff.md", "7951186b3f6ca7d578c853e419df212e2cd0e2893fd57aa2c7bf1590968d5b39"],
  ["agent-guides/other.md", "68e32ca18e842676087e06f5e273c503dfbd4df4757a9daaf596cd8f58a598a5"],
  ["move-map.md", "745211070a2153d114b1e5dc646e79764ddcefb66393f0675185372f8e4ecd2c"],
]);
const EXPECTED_MOVED_BODY_HASHES = new Map([
  ["S004-663955ad", "11baecefe1bf483b0bed2d8e5711f2999e86081ad338e76d289501a030f637de"],
  ["S006-1e9d1890", "537be96903735db31fa987a40311ce8cf04cd58cde8cb40f65e826953835ffbc"],
  ["S010-5ac15e07", "6b9747b00ebe37cf2274babcf178c41f4c6113a95a3ea889eba8998023b8d9dc"],
  ["S012-01555c74", "b27ca801df14abd15cd4e2d61be0768d495ce0a09d44c72847d91027c28d737c"],
  ["S015-811cff13", "e78f5e66337d7df6706767982add865daf0bd6d22106baf5b608570602663b42"],
  ["S017-bbbdf827", "3bd459ebd1117b04c30932119964b03aebeb3d9eadefa3a41107cea8ec7224bc"],
  ["S018-5ad40d78", "dcc08fca58368bc72bb0bb6303def2ab2b4d108937935bdde6d43a26c3c320a7"],
  ["S021-bc0e9b6c", "76b31bc3756eeb34d489bb04a0cc35e8e397c77db3b0e644b09517623c69a4a3"],
  ["S023-cc0695ff", "c6c901c6430b27d1354523c2ea4d87a0d1af513010a4d09d8f97218bafd03d9a"],
  ["S026-35b2982a", "476480555c5f0a530728f682414b4f4a195130fa96d18a7b1790db0195d2dad7"],
  ["S029-5257e34a", "08b595d95fb48e62c5154f8fb69a43ba9fc9663580fae4779ac17a74ae6e7f12"],
  ["S030-45819aca", "5cb4917844a4d2c6b3302ff7b7de9c789a8f95461379f98103ec519ed17442c1"],
  ["S031-839255fb", "7aa407951eaac7a1109e485b70271498af6c3b35e550fe96e2138309b6c2f45e"],
]);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function codePoints(value) {
  return Array.from(value).length;
}

function occurrences(value, needle) {
  return value.split(needle).length - 1;
}

function read(path) {
  return readFileSync(join(HERE, path));
}

function validateManifest() {
  const manifest = read("SHA256SUMS").toString("utf8").trim().split("\n");
  for (const line of manifest) {
    const match = line.match(/^([0-9a-f]{64})  (.+)$/u);
    assert.ok(match, `valid SHA256SUMS row: ${line}`);
    const [, expected, path] = match;
    assert.equal(sha256(read(path)), expected, `manifest hash: ${path}`);
  }
}

function guideBody(guide, spanId) {
  const opener = `<!-- source-span: ${spanId} -->\n`;
  const closer = `<!-- /source-span: ${spanId} -->`;
  const start = guide.content.indexOf(opener);
  assert.notEqual(start, -1, `guide marker exists: ${spanId}`);
  const bodyStart = start + opener.length;
  const end = guide.content.indexOf(closer, bodyStart);
  assert.notEqual(end, -1, `guide marker closes: ${spanId}`);
  return guide.content.slice(bodyStart, end);
}

function reconnectTargetForSpan(guide, spanId) {
  const marker = `<!-- source-span: ${spanId} -->`;
  const markerOffset = guide.content.indexOf(marker);
  assert.notEqual(markerOffset, -1);
  const anchors = [
    ...guide.content
      .slice(0, markerOffset)
      .matchAll(/<a id="([^"]+)"><\/a>/gu),
  ];
  assert.ok(anchors.length > 0, `physical anchor precedes ${spanId}`);
  return `${guide.path}#${anchors.at(-1)[1]}`;
}

validateManifest();
const sourceBuffer = read("BEFORE_AGENTS.md");
const source = sourceBuffer.toString("utf8");
assert.equal(sha256(sourceBuffer), "e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db");
assert.equal(codePoints(source), 20664);
assert.equal(source.length, 20671);
assert.equal(sourceBuffer.length, 20705);
assert.ok(!source.includes("\r"));
assert.ok(source.endsWith("\n"));

for (const mode of MODES) {
  const result = compactAgentsMd(source, mode);
  assertValidCompactionResult(source, mode, result);
  const facts = createReductionFacts(result);
  const artifacts = collectValidatedArtifacts(source, mode, result);
  assert.deepEqual(artifacts.map(({ path }) => path), EXPECTED_ARTIFACTS);

  for (const artifact of artifacts) {
    const expected = read(join("expected", artifact.path));
    assert.equal(Buffer.compare(Buffer.from(artifact.content), expected), 0, `${mode}: ${artifact.path}`);
    assert.equal(sha256(expected), EXPECTED_HASHES.get(artifact.path));
  }

  assert.equal(codePoints(result.activeAgentsMd.content), 14284);
  assert.equal(result.counts.before.characters - result.counts.after.characters, 6380);
  assert.equal(facts.actualActiveFile.percentage, 30.9);
  assert.equal(facts.outcome, "COMPACTED");
  assert.equal(result.sourceAccounting.dispositions.length, 41);
  assert.equal(result.counts.retainedSpans, 28);
  assert.equal(result.counts.movedSpans, 13);
  assert.equal(result.counts.collapsedDuplicateOccurrences, 0);
  assert.equal(result.counts.uniqueInstructionsDeleted, 0);
  assert.equal(result.counts.unaccountedSourceSpans, 0);

  const guides = new Map(result.guides.map((guide) => [guide.path, guide]));
  const moved = result.sourceAccounting.dispositions.filter(
    ({ disposition }) => disposition === "MOVED_TO_GUIDE",
  );
  assert.equal(moved.length, EXPECTED_MOVED_BODY_HASHES.size);
  const movedTargets = new Map();
  for (const disposition of moved) {
    const sourceBody = source.slice(disposition.sourceStart, disposition.sourceEnd);
    assert.equal(sha256(sourceBody), EXPECTED_MOVED_BODY_HASHES.get(disposition.sourceSpanId));
    const guide = result.guides.find(({ spanIds }) => spanIds.includes(disposition.sourceSpanId));
    assert.ok(guide, `${mode}: guide owns ${disposition.sourceSpanId}`);
    assert.equal(guideBody(guide, disposition.sourceSpanId), sourceBody);
    movedTargets.set(
      disposition.sourceSpanId,
      reconnectTargetForSpan(guide, disposition.sourceSpanId),
    );
  }

  const entries = result.activeAgentsMd.routes.flatMap((route) => route.entries ?? []);
  assert.equal(entries.length, 10);
  assert.equal(new Set(entries.map(({ path }) => path)).size, 10);
  for (const entry of entries) {
    const [path, anchor] = entry.path.split("#");
    const guide = guides.get(path);
    assert.ok(guide, `${mode}: route file exists: ${path}`);
    assert.equal(occurrences(guide.content, `<a id="${anchor}"></a>`), 1);
    assert.equal(occurrences(result.activeAgentsMd.content, `read \`${entry.path}\``), 1);
    assert.ok(
      [...movedTargets.values()].some(
        (target) => target === entry.path,
      ),
      `${mode}: route reaches moved material: ${entry.path}`,
    );
  }

  const completePackage = artifacts.reduce(
    (total, artifact) => total + codePoints(artifact.content),
    0,
  );
  assert.equal(completePackage, 32383);
}

console.log(JSON.stringify({
  classification: "PASS",
  command: `node ${relative(ROOT, fileURLToPath(import.meta.url))}`,
  modes: MODES,
  originalCodePoints: 20664,
  activeCodePoints: 14284,
  actualReductionCodePoints: 6380,
  actualReductionPercentage: 30.9,
  completePackageCodePoints: 32383,
  completePackageIncreasePercentage: 56.7,
  sourceSpans: 41,
  retainedSpans: 28,
  movedSpans: 13,
  routes: 10,
}));
