import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  assertValidCompactionResult,
  compactAgentsMd,
} from "../src/compactor.js";
import { collectValidatedArtifacts } from "../src/export.js";
import { createReductionFacts } from "../src/review.js";

const EVIDENCE = new URL("../evidence/public_rc_v0_1/", import.meta.url);
const SOURCE = readFileSync(new URL("BEFORE_AGENTS.md", EVIDENCE), "utf8");
const README = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const EVIDENCE_RECORD = readFileSync(new URL("EVIDENCE.md", EVIDENCE), "utf8");
const MODES = ["Conservative", "Balanced", "Aggressive"];
const ARTIFACT_HASHES = new Map([
  ["AGENTS.md", "934bfcb6355ddcb065e09da0071d1c5cac8b2d59ebdf6d3cc2bf0d8880652b35"],
  ["agent-guides/handoff.md", "7951186b3f6ca7d578c853e419df212e2cd0e2893fd57aa2c7bf1590968d5b39"],
  ["agent-guides/other.md", "68e32ca18e842676087e06f5e273c503dfbd4df4757a9daaf596cd8f58a598a5"],
  ["move-map.md", "745211070a2153d114b1e5dc646e79764ddcefb66393f0675185372f8e4ecd2c"],
]);
const MOVED_BODY_HASHES = new Map([
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

function count(value, needle) {
  return value.split(needle).length - 1;
}

function movedGuideBody(guide, spanId) {
  const opener = `<!-- source-span: ${spanId} -->\n`;
  const closer = `<!-- /source-span: ${spanId} -->`;
  const start = guide.content.indexOf(opener);
  assert.notEqual(start, -1);
  const bodyStart = start + opener.length;
  const end = guide.content.indexOf(closer, bodyStart);
  assert.notEqual(end, -1);
  return guide.content.slice(bodyStart, end);
}

function reconnectTargetForSpan(guide, spanId) {
  const markerOffset = guide.content.indexOf(`<!-- source-span: ${spanId} -->`);
  assert.notEqual(markerOffset, -1);
  const anchors = [
    ...guide.content
      .slice(0, markerOffset)
      .matchAll(/<a id="([^"]+)"><\/a>/gu),
  ];
  assert.ok(anchors.length > 0);
  return `${guide.path}#${anchors.at(-1)[1]}`;
}

test("tracked historical frontier is exact, routed, and self-contained in all modes", () => {
  for (const claim of [
    /20,664 → 14,284 Unicode code points/u,
    /30\.9% less active AGENTS\.md text/u,
    /0 unique instructions deleted/u,
    /13\/13 moved instruction bodies[\s>]+preserved byte-for-byte/u,
    /Conditional instructions move out of the always-loaded file without being\s+deleted; reconnect triggers remain active\./u,
    /32,383 Unicode code points/u,
    /\+56\.7% versus the original/u,
    /the active `AGENTS\.md`, not the total emitted\s+package/u,
  ]) {
    assert.match(README, claim);
  }
  assert.match(
    EVIDENCE_RECORD,
    /semantic rewrite baseline — not a lossless\s+compression target/u,
  );
  assert.match(EVIDENCE_RECORD, /32,383 code points/);
  assert.match(EVIDENCE_RECORD, /56\.7% larger/);
  assert.doesNotMatch(
    README,
    /total(?:-| )(?:emitted )?package reduction|token reduction|cost reduction|latency improvement|model-performance improvement/iu,
  );
  assert.equal(sha256(SOURCE), "e856160413a9d47622779dede6a2eeca9fd027284d815b155ab6e323a74863db");
  assert.equal(Array.from(SOURCE).length, 20664);
  assert.equal(SOURCE.length, 20671);
  assert.equal(Buffer.byteLength(SOURCE), 20705);
  assert.ok(!SOURCE.includes("\r"));
  assert.ok(SOURCE.endsWith("\n"));

  for (const mode of MODES) {
    const result = compactAgentsMd(SOURCE, mode);
    assertValidCompactionResult(SOURCE, mode, result);
    const facts = createReductionFacts(result);
    const artifacts = collectValidatedArtifacts(SOURCE, mode, result);

    assert.equal(result.counts.before.characters, 20664);
    assert.equal(result.counts.after.characters, 14284);
    assert.equal(facts.actualActiveFile.characters, 6380);
    assert.equal(facts.actualActiveFile.percentage, 30.9);
    assert.equal(facts.outcome, "COMPACTED");
    assert.equal(result.counts.sourceSpans, 41);
    assert.equal(result.counts.retainedSpans, 28);
    assert.equal(result.counts.movedSpans, 13);
    assert.equal(result.counts.collapsedDuplicateOccurrences, 0);
    assert.equal(result.counts.exactDuplicateCharactersFolded, 0);
    assert.equal(result.counts.uniqueInstructionsDeleted, 0);
    assert.equal(result.counts.unaccountedSourceSpans, 0);
    assert.equal(facts.completePackage.characters, 32383);
    assert.deepEqual(facts.completePackage.relativeToOriginal, {
      kind: "increase",
      characters: 11719,
      percentage: 56.7,
    });

    assert.deepEqual(artifacts.map(({ path }) => path), [...ARTIFACT_HASHES.keys()]);
    for (const artifact of artifacts) {
      const expected = readFileSync(new URL(`expected/${artifact.path}`, EVIDENCE), "utf8");
      assert.equal(artifact.content, expected, `${mode}: tracked ${artifact.path}`);
      assert.equal(sha256(artifact.content), ARTIFACT_HASHES.get(artifact.path));
    }

    const moved = result.sourceAccounting.dispositions.filter(
      ({ disposition }) => disposition === "MOVED_TO_GUIDE",
    );
    assert.equal(moved.length, 13);
    const movedTargets = new Map();
    for (const disposition of moved) {
      const sourceBody = SOURCE.slice(disposition.sourceStart, disposition.sourceEnd);
      assert.equal(sha256(sourceBody), MOVED_BODY_HASHES.get(disposition.sourceSpanId));
      const guide = result.guides.find(({ spanIds }) =>
        spanIds.includes(disposition.sourceSpanId),
      );
      assert.ok(guide);
      assert.equal(movedGuideBody(guide, disposition.sourceSpanId), sourceBody);
      movedTargets.set(
        disposition.sourceSpanId,
        reconnectTargetForSpan(guide, disposition.sourceSpanId),
      );
    }

    const guides = new Map(result.guides.map((guide) => [guide.path, guide]));
    const routes = result.activeAgentsMd.routes.flatMap(
      (route) => route.entries ?? [],
    );
    assert.equal(routes.length, 10);
    assert.equal(new Set(routes.map(({ path }) => path)).size, 10);
    for (const route of routes) {
      const [path, anchor] = route.path.split("#");
      const guide = guides.get(path);
      assert.ok(guide, `${mode}: existing route file`);
      assert.equal(count(guide.content, `<a id="${anchor}"></a>`), 1);
      assert.equal(count(result.activeAgentsMd.content, `read \`${route.path}\``), 1);
      assert.ok(
        [...movedTargets.values()].some(
          (target) => target === route.path,
        ),
        `${mode}: physical route reaches moved material`,
      );
    }
  }
});
