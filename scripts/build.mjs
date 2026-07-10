import { execFileSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import esbuild from "esbuild";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const external = Object.keys(packageJson.dependencies ?? {});

rmSync("dist", { recursive: true, force: true });

const shared = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  external,
  sourcemap: true,
  target: "es2022",
  platform: "neutral"
};

await Promise.all([
  esbuild.build({
    ...shared,
    format: "esm",
    define: {
      RAYLIB_CANVAS_IMPORT_META_URL: "import.meta.url"
    },
    outfile: "dist/index.js"
  }),
  esbuild.build({
    ...shared,
    format: "cjs",
    define: {
      RAYLIB_CANVAS_IMPORT_META_URL: "undefined"
    },
    outfile: "dist/index.cjs"
  })
]);

const tsc = join("node_modules", "typescript", "bin", "tsc");
execFileSync(process.execPath, [tsc, "--emitDeclarationOnly"], { stdio: "inherit" });
