import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { pathToFileURL } from "node:url";

export const DEFAULT_HOST = "127.0.0.1";
export const DEFAULT_PORT = 4173;
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "connect-src 'none'",
  "img-src 'none'",
  "font-src 'none'",
  "media-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "worker-src 'none'",
  "manifest-src 'none'",
].join("; ");

const routes = new Map([
  ["/", ["./public/index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["./public/index.html", "text/html; charset=utf-8"]],
  ["/styles.css", ["./public/styles.css", "text/css; charset=utf-8"]],
  ["/app.js", ["./public/app.js", "text/javascript; charset=utf-8"]],
  ["/src/ui.js", ["./src/ui.js", "text/javascript; charset=utf-8"]],
  ["/src/export.js", ["./src/export.js", "text/javascript; charset=utf-8"]],
  ["/src/review.js", ["./src/review.js", "text/javascript; charset=utf-8"]],
  [
    "/src/compactor.js",
    ["./src/compactor.js", "text/javascript; charset=utf-8"],
  ],
]);

function responseHeaders(extra = {}) {
  return {
    "Content-Security-Policy": CONTENT_SECURITY_POLICY,
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    ...extra,
  };
}

export async function handleStaticRequest(
  request,
  response,
  { onError = console.error } = {},
) {
  const method = request.method ?? "GET";
  if (method !== "GET" && method !== "HEAD") {
    response.writeHead(
      405,
      responseHeaders({
        Allow: "GET, HEAD",
        "Content-Type": "text/plain; charset=utf-8",
      }),
    );
    response.end("Method Not Allowed\n");
    return;
  }

  const pathname = new URL(
    request.url ?? "/",
    `http://${DEFAULT_HOST}`,
  ).pathname;
  const route = routes.get(pathname);
  if (!route) {
    response.writeHead(
      404,
      responseHeaders({ "Content-Type": "text/plain; charset=utf-8" }),
    );
    response.end("Not Found\n");
    return;
  }

  try {
    const [relativePath, contentType] = route;
    const body = await readFile(new URL(relativePath, import.meta.url));
    response.writeHead(
      200,
      responseHeaders({
        "Content-Type": contentType,
        "Content-Length": body.length,
      }),
    );
    response.end(method === "HEAD" ? undefined : body);
  } catch (error) {
    onError(error);
    response.writeHead(
      500,
      responseHeaders({ "Content-Type": "text/plain; charset=utf-8" }),
    );
    response.end("Internal Server Error\n");
  }
}

export function createStaticServer({ onError = console.error } = {}) {
  return createServer((request, response) => {
    void handleStaticRequest(request, response, { onError });
  });
}

export function startStaticServer({
  host = DEFAULT_HOST,
  port = DEFAULT_PORT,
  onError,
} = {}) {
  const server = createStaticServer({ ...(onError ? { onError } : {}) });
  server.listen(port, host, () => {
    console.log(`AGENTS.md Compactor running at http://${host}:${port}`);
  });
  return server;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  startStaticServer();
}
