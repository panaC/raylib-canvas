import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import esbuild from "esbuild";

mkdirSync("examples/dist", { recursive: true });

await esbuild.build({
  entryPoints: [resolve("examples/basic.js")],
  bundle: true,
  sourcemap: true,
  target: "es2022",
  format: "esm",
  outfile: "examples/dist/basic.js",
  alias: {
    "canvas-rasterizer": "./src/index.ts",
    pngjs: "./node_modules/pngjs/browser.js"
  }
});
