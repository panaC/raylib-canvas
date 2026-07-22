import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import esbuild from "esbuild";
import { WPT_SHIM_OUTPUT, WPT_SHIM_SOURCE } from "./wpt-config.mjs";

const RAYLIB_WPT_PRELOAD = "dist/native/raylib-canvas-wpt.js";

mkdirSync(dirname(WPT_SHIM_OUTPUT), { recursive: true });

await esbuild.build({
  entryPoints: [resolve(WPT_SHIM_SOURCE)],
  bundle: true,
  target: "es2022",
  platform: "browser",
  format: "iife",
  outfile: WPT_SHIM_OUTPUT,
  define: {
    "process.env.RAYLIB_CANVAS_CONTEXT": JSON.stringify(process.env.RAYLIB_CANVAS_CONTEXT ?? "")
  },
  alias: {
    pngjs: "./node_modules/pngjs/browser.js"
  }
});

if (process.env.RAYLIB_CANVAS_CONTEXT === "raylib") {
  if (!existsSync(RAYLIB_WPT_PRELOAD)) {
    throw new Error(
      `Raylib WPT preload is missing at ${RAYLIB_WPT_PRELOAD}. Run: npm run build:raylib-wasm`
    );
  }

  const preload = readFileSync(RAYLIB_WPT_PRELOAD, "utf8");
  const shim = readFileSync(WPT_SHIM_OUTPUT, "utf8");
  writeFileSync(WPT_SHIM_OUTPUT, `${preload}\n;${shim}`);
}

console.log(`WPT shim written to ${WPT_SHIM_OUTPUT}`);
