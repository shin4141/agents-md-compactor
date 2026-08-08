import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  CONTENT_SECURITY_POLICY,
  DEMONSTRATED_SAMPLE_SOURCE_PATH,
  handleStaticRequest,
} from "../server.js";
import { compactAgentsMd } from "../src/compactor.js";
import { createCompactorController } from "../src/ui.js";

const ROOT = new URL("../", import.meta.url);
const productionFiles = [
  "server.js",
  "src/compactor.js",
  "src/export.js",
  "src/review.js",
  "src/ui.js",
  "public/app.js",
  "public/index.html",
  "public/styles.css",
];

function read(path) {
  return readFileSync(new URL(path, ROOT), "utf8");
}

async function localRequest(method, path = "/") {
  const result = { status: null, headers: {}, body: "" };
  const request = Object.freeze({ method, url: path });
  const response = {
    writeHead(status, headers) {
      result.status = status;
      result.headers = Object.fromEntries(
        Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]),
      );
    },
    end(body) {
      result.body = body ? Buffer.from(body).toString("utf8") : "";
    },
  };
  await handleStaticRequest(request, response, {
    onError(error) {
      throw error;
    },
  });
  return result;
}

test("production code references no prohibited network, persistence, analytics, cookie, or service-worker API", () => {
  const source = productionFiles.map((path) => read(path)).join("\n");
  const prohibited = [
    /\bfetch\s*\(/u,
    /\bXMLHttpRequest\b/u,
    /\bWebSocket\b/u,
    /\bEventSource\b/u,
    /\bsendBeacon\b/u,
    /\blocalStorage\b/u,
    /\bsessionStorage\b/u,
    /\bindexedDB\b/iu,
    /\bcaches\s*\./u,
    /serviceWorker\s*\.\s*register/u,
    /document\s*\.\s*cookie/u,
    /\bgtag\s*\(/u,
    /\banalytics\s*\(/u,
  ];

  for (const pattern of prohibited) {
    assert.doesNotMatch(source, pattern);
  }
  assert.doesNotMatch(read("server.js"), /request\s*\.\s*on\s*\(/u);
});

test("HTML and CSS use only local assets and no submitting form target", () => {
  const html = read("public/index.html");
  const css = read("public/styles.css");
  const origins = [...html.matchAll(/(?:src|href)="([^"]+)"/gu)].map(
    (match) => match[1],
  );

  assert.ok(origins.length > 0);
  assert.ok(origins.every((origin) => origin.startsWith("/")));
  assert.doesNotMatch(html, /<form[^>]+action=/iu);
  assert.doesNotMatch(html, /<script[^>]+src="(?:https?:)?\/\//iu);
  assert.doesNotMatch(html, /<link[^>]+href="(?:https?:)?\/\//iu);
  assert.doesNotMatch(css, /@import|url\(\s*["']?(?:https?:)?\/\//iu);
});

test("the demonstrated sample is shipped locally in the initial page", async () => {
  const page = await localRequest("GET", "/");
  const source = read(DEMONSTRATED_SAMPLE_SOURCE_PATH);
  const match = page.body.match(
    /<script id="demonstrated-sample-source"[^>]*>([\s\S]*?)<\/script>/u,
  );

  assert.ok(match, "initial page includes the demonstrated sample data");
  assert.equal(JSON.parse(match[1]), source);
  assert.equal(source, read("evidence/public_rc_v0_1/BEFORE_AGENTS.md"));
  assert.doesNotMatch(page.body, /__DEMONSTRATED_SAMPLE_SOURCE_JSON__/u);
  assert.doesNotMatch(read("public/app.js"), /\bfetch\s*\(/u);
});

test("static server accepts only GET and HEAD, rejects content methods, and sends strict CSP", async () => {
  const get = await localRequest("GET");
  assert.equal(get.status, 200);
  assert.equal(
    get.headers["content-security-policy"],
    CONTENT_SECURITY_POLICY,
  );
  for (const directive of [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "connect-src 'none'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "worker-src 'none'",
  ]) {
    assert.ok(CONTENT_SECURITY_POLICY.includes(directive));
  }

  const head = await localRequest("HEAD", "/src/compactor.js");
  assert.equal(head.status, 200);
  assert.equal(head.body, "");
  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    const response = await localRequest(method, "/");
    assert.equal(response.status, 405);
    assert.equal(response.headers.allow, "GET, HEAD");
  }
  assert.equal((await localRequest("GET", "/upload")).status, 404);
});

test("generation and explicit copy, review, and ZIP actions work with network and storage globals disabled", async () => {
  const source = read("test/fixtures/duplicate-japanese.md");
  const copied = [];
  const downloads = [];
  const state = {
    input: source,
    mode: "Balanced",
    paths: [],
    selected: null,
    result: null,
    error: null,
  };
  const view = {
    getInput: () => state.input,
    getMode: () => state.mode,
    getSelectedPath: () => state.selected,
    getVisibleFilePaths: () => state.paths,
    showResult(viewModel) {
      state.result = viewModel;
      state.paths = viewModel.files.map((file) => file.path);
      state.selected = state.paths[0];
    },
    showError(message) {
      state.error = message;
    },
    showActionFeedback() {},
  };
  const controller = createCompactorController(view, {
    clipboard: { writeText: async (text) => copied.push(text) },
    download: { save: async (bytes) => downloads.push(bytes) },
  });
  const descriptors = new Map();
  for (const key of [
    "fetch",
    "XMLHttpRequest",
    "WebSocket",
    "EventSource",
    "localStorage",
    "sessionStorage",
    "indexedDB",
    "caches",
  ]) {
    descriptors.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, {
      configurable: true,
      get() {
        throw new Error(`prohibited global accessed: ${key}`);
      },
    });
  }

  try {
    assert.ok(controller.generate());
    assert.equal(state.error, "");
    await controller.copySelected();
    await controller.copyReviewPrompt();
    await controller.downloadZip();
    assert.equal(copied.length, 2);
    assert.equal(downloads.length, 1);
    assert.ok(downloads[0] instanceof Uint8Array);
  } finally {
    for (const [key, descriptor] of descriptors) {
      if (descriptor) {
        Object.defineProperty(globalThis, key, descriptor);
      } else {
        delete globalThis[key];
      }
    }
  }
});

test("UI and README state the local-only and clipboard-review boundary", () => {
  const html = read("public/index.html").replace(/\s+/gu, " ");
  const readme = read("README.md").replace(/\s+/gu, " ");
  for (const statement of [
    "Your AGENTS.md stays on your device.",
    "No upload · No storage · No analytics · No training",
    "Processing happens locally in your browser.",
    "only copies a review package to your clipboard",
    "that service’s data policy applies",
  ]) {
    assert.ok(html.includes(statement), `UI includes: ${statement}`);
    assert.ok(readme.includes(statement), `README includes: ${statement}`);
  }
  for (const boundary of [
    /does not transmit your input/iu,
    /or persist your input/iu,
    /no analytics, telemetry/iu,
    /training-data collection/iu,
    /This boundary does not cover browser extensions, operating-system compromise, modified copies/iu,
  ]) {
    assert.match(readme, boundary);
  }
  const noUseSentence = readme.match(/The shipped application[^.]*\./u);
  assert.ok(noUseSentence);
  assert.doesNotMatch(noUseSentence[0], /\binspect\b|\bsell\b/iu);
  const uiNoUseSentence = html.match(/The shipped application[^.]*\./u);
  assert.ok(uiNoUseSentence);
  assert.match(uiNoUseSentence[0], /does not transmit or persist your input/iu);
  assert.match(uiNoUseSentence[0], /no analytics, telemetry, or training-data collection/iu);
  assert.doesNotMatch(uiNoUseSentence[0], /\binspect\b|\bsell\b/iu);
  assert.match(read("src/review.js"), /only copies the package to the clipboard/iu);
  assert.match(html, /does not call or send content to an AI service/iu);
});

test("UI and README state the canonical Unicode code-point count basis", () => {
  const html = read("public/index.html").replace(/\s+/gu, " ");
  const readme = read("README.md").replace(/\s+/gu, " ");
  const basis =
    "Count basis: Unicode code points; LF and trailing newline included.";

  assert.ok(html.includes(basis));
  assert.match(
    html,
    /Original<\/dt>\s*<dd><span id="before-count"><\/span> Unicode code points/iu,
  );
  assert.match(
    readme,
    /Unicode code points with LF line endings and any trailing newline included/iu,
  );
});
