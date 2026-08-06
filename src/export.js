import { assertValidCompactionResult } from "./compactor.js";

export const ZIP_DOWNLOAD_NAME = "agents-md-compactor-output.zip";
export const ZIP_MEDIA_TYPE = "application/zip";
export const ZIP_FIXED_DOS_TIME = 0;
export const ZIP_FIXED_DOS_DATE = 0x0021;
export const ZIP_UTF8_FLAG = 0x0800;
export const ZIP_UNIX_FILE_MODE = 0o100644;

const UTF8_ENCODER = new TextEncoder();
const MAX_UINT16 = 0xffff;
const MAX_UINT32 = 0xffffffff;
const ZIP_VERSION = 20;
const ZIP_VERSION_MADE_BY_UNIX = 0x0314;
const ZIP_STORED_METHOD = 0;

export class ArtifactExportError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "ArtifactExportError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new ArtifactExportError(code, message);
}

function comparePaths(left, right) {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function pathRank(path) {
  if (path === "AGENTS.md") return 0;
  if (path === "move-map.md") return 2;
  return 1;
}

function canonicalArtifactOrder(artifacts) {
  return [...artifacts].sort((left, right) => {
    const rankDifference = pathRank(left.path) - pathRank(right.path);
    return rankDifference || comparePaths(left.path, right.path);
  });
}

function assertSafePath(path) {
  if (typeof path !== "string" || path.length === 0) {
    fail("INVALID_ARTIFACT", "artifact path must be a non-empty string");
  }
  if (
    path.startsWith("/") ||
    path.startsWith("\\") ||
    /^[A-Za-z]:/.test(path)
  ) {
    fail("UNSAFE_PATH", `absolute artifact path is not allowed: ${path}`);
  }
  if (path.includes("\\")) {
    fail("UNSAFE_PATH", `artifact paths must use forward slashes: ${path}`);
  }

  const segments = path.split("/");
  if (
    segments.some(
      (segment) => segment.length === 0 || segment === "." || segment === "..",
    )
  ) {
    fail("UNSAFE_PATH", `artifact path contains traversal: ${path}`);
  }
}

export function validateArtifactInventory(artifacts) {
  if (!Array.isArray(artifacts) || artifacts.length === 0) {
    fail("INVALID_ARTIFACT", "artifact inventory must be a non-empty array");
  }
  if (artifacts.length > MAX_UINT16) {
    fail("ZIP_LIMIT", "artifact inventory exceeds the ZIP entry limit");
  }

  const paths = new Set();
  for (const artifact of artifacts) {
    if (!artifact || typeof artifact !== "object" || Array.isArray(artifact)) {
      fail("INVALID_ARTIFACT", "each artifact must be an object");
    }
    assertSafePath(artifact.path);
    if (typeof artifact.content !== "string") {
      fail("INVALID_ARTIFACT", `artifact content must be a string: ${artifact.path}`);
    }
    if (artifact.content.length === 0) {
      fail("INVALID_ARTIFACT", `artifact content must not be empty: ${artifact.path}`);
    }
    if (paths.has(artifact.path)) {
      fail("DUPLICATE_PATH", `duplicate artifact path: ${artifact.path}`);
    }
    paths.add(artifact.path);
  }

  return true;
}

export function collectValidatedArtifacts(
  input,
  mode,
  result,
  { validate = assertValidCompactionResult } = {},
) {
  validate(input, mode, result);

  const artifacts = canonicalArtifactOrder([
    {
      path: result.activeAgentsMd.path,
      content: result.activeAgentsMd.content,
    },
    ...result.guides.map((guide) => ({
      path: guide.path,
      content: guide.content,
    })),
    {
      path: result.moveMap.path,
      content: result.moveMap.content,
    },
  ]);

  validateArtifactInventory(artifacts);
  return artifacts.map((artifact) => Object.freeze({ ...artifact }));
}

export function assertVisibleInventory(artifacts, visiblePaths) {
  validateArtifactInventory(artifacts);
  if (!Array.isArray(visiblePaths)) {
    fail("INVENTORY_MISMATCH", "visible artifact inventory must be an array");
  }

  const artifactPaths = artifacts.map((artifact) => artifact.path);
  if (
    artifactPaths.length !== visiblePaths.length ||
    artifactPaths.some((path, index) => path !== visiblePaths[index])
  ) {
    fail(
      "INVENTORY_MISMATCH",
      "ZIP entry inventory differs from the visible generated inventory",
    );
  }
  return true;
}

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < table.length; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) !== 0 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let value = 0xffffffff;
  for (const byte of bytes) {
    value = CRC32_TABLE[(value ^ byte) & 0xff] ^ (value >>> 8);
  }
  return (value ^ 0xffffffff) >>> 0;
}

function makeHeader(length) {
  const bytes = new Uint8Array(length);
  return { bytes, view: new DataView(bytes.buffer) };
}

function concatenate(parts) {
  const length = parts.reduce((total, part) => total + part.length, 0);
  const combined = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    combined.set(part, offset);
    offset += part.length;
  }
  return combined;
}

function prepareEntries(artifacts) {
  validateArtifactInventory(artifacts);
  return canonicalArtifactOrder(artifacts).map((artifact) => {
    const nameBytes = UTF8_ENCODER.encode(artifact.path);
    const contentBytes = UTF8_ENCODER.encode(artifact.content);
    if (nameBytes.length > MAX_UINT16) {
      fail("ZIP_LIMIT", `artifact path is too long for ZIP: ${artifact.path}`);
    }
    if (contentBytes.length > MAX_UINT32) {
      fail("ZIP_LIMIT", `artifact is too large for ZIP: ${artifact.path}`);
    }
    return {
      ...artifact,
      nameBytes,
      contentBytes,
      crc: crc32(contentBytes),
    };
  });
}

export function createDeterministicZip(artifacts) {
  const entries = prepareEntries(artifacts);
  const localParts = [];
  const centralParts = [];
  let localOffset = 0;

  for (const entry of entries) {
    const local = makeHeader(30);
    local.view.setUint32(0, 0x04034b50, true);
    local.view.setUint16(4, ZIP_VERSION, true);
    local.view.setUint16(6, ZIP_UTF8_FLAG, true);
    local.view.setUint16(8, ZIP_STORED_METHOD, true);
    local.view.setUint16(10, ZIP_FIXED_DOS_TIME, true);
    local.view.setUint16(12, ZIP_FIXED_DOS_DATE, true);
    local.view.setUint32(14, entry.crc, true);
    local.view.setUint32(18, entry.contentBytes.length, true);
    local.view.setUint32(22, entry.contentBytes.length, true);
    local.view.setUint16(26, entry.nameBytes.length, true);
    local.view.setUint16(28, 0, true);
    localParts.push(local.bytes, entry.nameBytes, entry.contentBytes);

    const central = makeHeader(46);
    central.view.setUint32(0, 0x02014b50, true);
    central.view.setUint16(4, ZIP_VERSION_MADE_BY_UNIX, true);
    central.view.setUint16(6, ZIP_VERSION, true);
    central.view.setUint16(8, ZIP_UTF8_FLAG, true);
    central.view.setUint16(10, ZIP_STORED_METHOD, true);
    central.view.setUint16(12, ZIP_FIXED_DOS_TIME, true);
    central.view.setUint16(14, ZIP_FIXED_DOS_DATE, true);
    central.view.setUint32(16, entry.crc, true);
    central.view.setUint32(20, entry.contentBytes.length, true);
    central.view.setUint32(24, entry.contentBytes.length, true);
    central.view.setUint16(28, entry.nameBytes.length, true);
    central.view.setUint16(30, 0, true);
    central.view.setUint16(32, 0, true);
    central.view.setUint16(34, 0, true);
    central.view.setUint16(36, 0, true);
    central.view.setUint32(
      38,
      (ZIP_UNIX_FILE_MODE * 0x10000) >>> 0,
      true,
    );
    central.view.setUint32(42, localOffset, true);
    centralParts.push(central.bytes, entry.nameBytes);

    localOffset +=
      local.bytes.length + entry.nameBytes.length + entry.contentBytes.length;
    if (localOffset > MAX_UINT32) {
      fail("ZIP_LIMIT", "ZIP local data exceeds the 32-bit archive limit");
    }
  }

  const centralDirectory = concatenate(centralParts);
  if (centralDirectory.length > MAX_UINT32) {
    fail("ZIP_LIMIT", "ZIP central directory exceeds the 32-bit archive limit");
  }

  const end = makeHeader(22);
  end.view.setUint32(0, 0x06054b50, true);
  end.view.setUint16(4, 0, true);
  end.view.setUint16(6, 0, true);
  end.view.setUint16(8, entries.length, true);
  end.view.setUint16(10, entries.length, true);
  end.view.setUint32(12, centralDirectory.length, true);
  end.view.setUint32(16, localOffset, true);
  end.view.setUint16(20, 0, true);

  return concatenate([...localParts, centralDirectory, end.bytes]);
}
