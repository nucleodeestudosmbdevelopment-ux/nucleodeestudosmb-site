import { mkdirSync, writeFileSync, rmSync, existsSync, readdirSync, copyFileSync, statSync } from "node:fs";
import { resolve, join } from "node:path";

const root = process.cwd();

const vercelOutput = resolve(root, ".vercel", "output");
const staticDir = resolve(vercelOutput, "static");
const funcDir = resolve(vercelOutput, "functions", "index.func");

if (existsSync(vercelOutput)) rmSync(vercelOutput, { recursive: true });
mkdirSync(staticDir, { recursive: true });
mkdirSync(funcDir, { recursive: true });

function copyDirRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// Copy static client assets
copyDirRecursive(resolve(root, "dist", "client"), staticDir);

// Copy server assets into the function
copyDirRecursive(resolve(root, "dist", "server"), funcDir);

// Create the function entry point — CommonJS handler wrapping the ESM fetch server
writeFileSync(
  resolve(funcDir, "entry.cjs"),
  `
"use strict";
let _serverPromise;
function getServer() {
  if (!_serverPromise) {
    _serverPromise = import("./server.js").then((m) => m.default);
  }
  return _serverPromise;
}

module.exports = async function handler(req, res) {
  try {
    const server = await getServer();
    const proto = ((req.headers["x-forwarded-proto"] || "https") + "").split(",")[0].trim();
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const url = new URL(req.url, proto + "://" + host);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value == null) continue;
      if (Array.isArray(value)) {
        for (const v of value) headers.append(key, v);
      } else {
        headers.set(key, String(value));
      }
    }

    let body = null;
    if (!["GET", "HEAD"].includes((req.method || "GET").toUpperCase())) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = Buffer.concat(chunks);
    }

    const request = new Request(url.toString(), { method: req.method, headers, body });
    const response = await server.fetch(request, {}, {});

    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    res.end(buffer);
  } catch (err) {
    console.error("[entry.cjs] unhandled error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};
`.trimStart()
);

// Function config — CJS entry wrapping the ESM server
writeFileSync(
  resolve(funcDir, ".vc-config.json"),
  JSON.stringify({ runtime: "nodejs22.x", handler: "entry.cjs", launcherType: "Nodejs" }, null, 2)
);

// Vercel output config — serve static files first, fallback to SSR function
writeFileSync(
  resolve(vercelOutput, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "^/assets/(.*)$",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index" },
      ],
    },
    null,
    2
  )
);

console.log("Vercel output generated at .vercel/output/");
