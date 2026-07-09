import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import esbuild from "esbuild";
import { WPT_SHIM_OUTPUT, WPT_SHIM_SOURCE } from "./wpt-config.mjs";

mkdirSync(dirname(WPT_SHIM_OUTPUT), { recursive: true });

await esbuild.build({
  entryPoints: [WPT_SHIM_SOURCE],
  bundle: true,
  target: "es2022",
  platform: "browser",
  format: "iife",
  outfile: WPT_SHIM_OUTPUT,
  alias: {
    pngjs: "./node_modules/pngjs/browser.js"
  }
});

console.log(`WPT shim written to ${WPT_SHIM_OUTPUT}`);
