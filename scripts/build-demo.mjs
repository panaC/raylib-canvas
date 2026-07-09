import { mkdirSync } from "node:fs";
import esbuild from "esbuild";

mkdirSync("examples/dist", { recursive: true });

await esbuild.build({
  entryPoints: ["examples/basic.js"],
  bundle: true,
  sourcemap: true,
  target: "es2022",
  format: "esm",
  outfile: "examples/dist/basic.js",
  alias: {
    "@yourname/raylib-canvas": "./src/index.ts",
    pngjs: "./node_modules/pngjs/browser.js"
  }
});
