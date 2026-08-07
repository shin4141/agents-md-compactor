import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { compactAgentsMd } from "../src/compactor.js";
import {
  collectValidatedArtifacts,
  createDeterministicZip,
  ZIP_FIXED_DOS_DATE,
  ZIP_FIXED_DOS_TIME,
  ZIP_UNIX_FILE_MODE,
  ZIP_UTF8_FLAG,
} from "../src/export.js";

const LARGE_FIXTURE = readFileSync(
  new URL("./fixtures/large-bloated.md", import.meta.url),
  "utf8",
);
const UNICODE_FIXTURES = [
  "japanese-operations",
  "mixed-operations",
  "realistic-large-english",
  "realistic-large-japanese",
  "realistic-large-mixed",
].map(
  (name) => ({
    name,
    source: readFileSync(
      new URL(`./fixtures/${name}.md`, import.meta.url),
      "utf8",
    ),
  }),
);
const UTF8_DECODER = new TextDecoder();
const UTF8_ENCODER = new TextEncoder();
const EXPECTED_REALISTIC_ZIP_HASHES = {
  "realistic-large-english":
    "77b66baf469cc8a4f0d3e97cf98f732d5b5f04b34884bc317a6bc1bdebde6eea",
  "realistic-large-japanese":
    "d52208a299609c7b298ce66521151916c6f895ecf2a4eae86c6a6204865655ee",
  "realistic-large-mixed":
    "e95a10ac8f9e5e126e1e3deb69cdca51efcdde1bb88a6a94f8285b7da6034195",
};

function inspectStoredZip(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const endOffset = bytes.length - 22;
  assert.equal(view.getUint32(endOffset, true), 0x06054b50);
  const entryCount = view.getUint16(endOffset + 10, true);
  const centralOffset = view.getUint32(endOffset + 16, true);
  const entries = [];
  let offset = centralOffset;

  for (let index = 0; index < entryCount; index += 1) {
    assert.equal(view.getUint32(offset, true), 0x02014b50);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const compressedLength = view.getUint32(offset + 20, true);
    const localOffset = view.getUint32(offset + 42, true);
    const path = UTF8_DECODER.decode(
      bytes.subarray(offset + 46, offset + 46 + nameLength),
    );

    assert.equal(view.getUint32(localOffset, true), 0x04034b50);
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const contentOffset =
      localOffset + 30 + localNameLength + localExtraLength;

    entries.push({
      path,
      content: bytes.slice(contentOffset, contentOffset + compressedLength),
      central: {
        versionMadeBy: view.getUint16(offset + 4, true),
        flags: view.getUint16(offset + 8, true),
        method: view.getUint16(offset + 10, true),
        time: view.getUint16(offset + 12, true),
        date: view.getUint16(offset + 14, true),
        compressedLength,
        uncompressedLength: view.getUint32(offset + 24, true),
        externalAttributes: view.getUint32(offset + 38, true),
      },
      local: {
        flags: view.getUint16(localOffset + 6, true),
        method: view.getUint16(localOffset + 8, true),
        time: view.getUint16(localOffset + 10, true),
        date: view.getUint16(localOffset + 12, true),
      },
    });

    offset += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

test("validated artifact inventory is canonical and excludes source/internal state", () => {
  const result = compactAgentsMd(LARGE_FIXTURE, "Balanced");
  const artifacts = collectValidatedArtifacts(
    LARGE_FIXTURE,
    "Balanced",
    result,
  );

  assert.deepEqual(
    artifacts.map((artifact) => artifact.path),
    [
      "AGENTS.md",
      "agent-guides/architecture.md",
      "agent-guides/handoff.md",
      "agent-guides/incident-recovery.md",
      "agent-guides/migration.md",
      "move-map.md",
    ],
  );
  assert.equal(artifacts.length, result.guides.length + 2);
  assert.ok(artifacts.every((artifact) => artifact.content.length > 0));
  assert.ok(artifacts.every((artifact) => artifact.path !== "originalInput"));
  assert.ok(!artifacts.some((artifact) => artifact.path.endsWith("other.md")));
});

test("ZIP entries exactly match preview bytes in canonical order", () => {
  const result = compactAgentsMd(LARGE_FIXTURE, "Balanced");
  const artifacts = collectValidatedArtifacts(
    LARGE_FIXTURE,
    "Balanced",
    result,
  );
  const entries = inspectStoredZip(createDeterministicZip(artifacts));

  assert.deepEqual(
    entries.map((entry) => entry.path),
    artifacts.map((artifact) => artifact.path),
  );
  for (const [index, entry] of entries.entries()) {
    assert.deepEqual(entry.content, UTF8_ENCODER.encode(artifacts[index].content));
  }
});

test("repeated and shuffled ZIP creation produces identical bytes", () => {
  const result = compactAgentsMd(LARGE_FIXTURE, "Balanced");
  const artifacts = collectValidatedArtifacts(
    LARGE_FIXTURE,
    "Balanced",
    result,
  );
  const first = createDeterministicZip(artifacts);
  const second = createDeterministicZip(artifacts);
  const shuffled = createDeterministicZip([...artifacts].reverse());

  assert.deepEqual(second, first);
  assert.deepEqual(shuffled, first);
});

test("ZIP metadata, timestamp, permissions, and storage method are fixed", () => {
  const result = compactAgentsMd(LARGE_FIXTURE, "Balanced");
  const artifacts = collectValidatedArtifacts(
    LARGE_FIXTURE,
    "Balanced",
    result,
  );
  const entries = inspectStoredZip(createDeterministicZip(artifacts));

  for (const entry of entries) {
    assert.equal(entry.central.versionMadeBy, 0x0314);
    assert.equal(entry.central.flags, ZIP_UTF8_FLAG);
    assert.equal(entry.local.flags, ZIP_UTF8_FLAG);
    assert.equal(entry.central.method, 0);
    assert.equal(entry.local.method, 0);
    assert.equal(entry.central.time, ZIP_FIXED_DOS_TIME);
    assert.equal(entry.local.time, ZIP_FIXED_DOS_TIME);
    assert.equal(entry.central.date, ZIP_FIXED_DOS_DATE);
    assert.equal(entry.local.date, ZIP_FIXED_DOS_DATE);
    assert.equal(entry.central.compressedLength, entry.central.uncompressedLength);
    assert.equal(
      entry.central.externalAttributes,
      (ZIP_UNIX_FILE_MODE * 0x10000) >>> 0,
    );
  }
});

test("ZIP safety rejects traversal, absolute, duplicate, and malformed entries", () => {
  const valid = { path: "AGENTS.md", content: "# Rules\n" };

  for (const unsafePath of [
    "../secret.md",
    "agent-guides/../secret.md",
    "/absolute.md",
    "C:/absolute.md",
    "agent-guides\\testing.md",
  ]) {
    assert.throws(
      () => createDeterministicZip([{ path: unsafePath, content: "x" }]),
      /UNSAFE_PATH/,
    );
  }
  assert.throws(
    () => createDeterministicZip([valid, { ...valid }]),
    /DUPLICATE_PATH/,
  );
  assert.throws(
    () => createDeterministicZip([{ path: "AGENTS.md", content: 42 }]),
    /INVALID_ARTIFACT/,
  );
  assert.throws(
    () => createDeterministicZip([{ path: "AGENTS.md", content: "" }]),
    /INVALID_ARTIFACT/,
  );
});

test("artifact collection rejects a malformed or non-canonical result", () => {
  const malformed = compactAgentsMd(LARGE_FIXTURE, "Balanced");
  malformed.guides[0].content = "";

  assert.throws(
    () => collectValidatedArtifacts(LARGE_FIXTURE, "Balanced", malformed),
    /MALFORMED_RESULT/,
  );
});

for (const { name, source } of UNICODE_FIXTURES) {
  test(`${name} ZIP preserves exact UTF-8 artifact bytes`, () => {
    const result = compactAgentsMd(source, "Balanced");
    const artifacts = collectValidatedArtifacts(source, "Balanced", result);
    const bytes = createDeterministicZip(artifacts);
    const entries = inspectStoredZip(bytes);

    assert.deepEqual(
      entries.map((entry) => entry.path),
      artifacts.map((artifact) => artifact.path),
    );
    for (const [index, entry] of entries.entries()) {
      assert.deepEqual(
        entry.content,
        UTF8_ENCODER.encode(artifacts[index].content),
      );
      assert.equal(
        UTF8_DECODER.decode(entry.content),
        artifacts[index].content,
      );
    }

    if (EXPECTED_REALISTIC_ZIP_HASHES[name]) {
      assert.equal(
        createHash("sha256").update(bytes).digest("hex"),
        EXPECTED_REALISTIC_ZIP_HASHES[name],
        "the semantic-accounting contract produces stable deterministic ZIP bytes",
      );
    }
  });
}
