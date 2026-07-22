import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const raylibRepoUrl = process.env.RAYLIB_CANVAS_RAYLIB_REPO ?? "https://github.com/raysan5/raylib.git";
const raylibTag = process.env.RAYLIB_CANVAS_RAYLIB_TAG ?? "6.0";
const raylibCommit = "dbc56a87da87d973a9c5baa4e7438a9d20121d28";
const vendorDir = process.env.RAYLIB_CANVAS_RAYLIB_VENDOR_DIR ?? "vendor/raylib";
const force = process.argv.includes("--force");

function git(args, options = {}) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options
  }).trim();
}

function assertExpectedCheckout() {
  const head = git(["-C", vendorDir, "rev-parse", "HEAD"]);

  if (head !== raylibCommit) {
    throw new Error(
      [
        `Expected raylib ${raylibTag} at ${raylibCommit}, but ${vendorDir} is at ${head}.`,
        `Run \`npm run init:raylib -- --force\` to replace the checkout.`
      ].join("\n")
    );
  }
}

function hasExpectedSourceCopy() {
  if (!existsSync(`${vendorDir}/src/raylib.h`)) {
    return false;
  }

  const provenancePath = `${vendorDir}/RAYLIB-CANVAS-PROVENANCE.md`;
  if (!existsSync(provenancePath)) {
    return false;
  }

  return readFileSync(provenancePath, "utf8").includes(raylibCommit);
}

function writeProvenance() {
  writeFileSync(
    `${vendorDir}/RAYLIB-CANVAS-PROVENANCE.md`,
    [
      "# raylib provenance",
      "",
      "This directory vendors raylib for the optional canvas-rasterizer raylib WASM backend.",
      "",
      `- Upstream: ${raylibRepoUrl.replace(/\.git$/, "")}`,
      "- Version: raylib 6.0",
      `- Tag: \`${raylibTag}\``,
      `- Commit: \`${raylibCommit}\``,
      "- License: zlib/libpng, preserved in `LICENSE`",
      "",
      "The backend build compiles the small canvas-rasterizer raylib C binding with raylib's",
      "`PLATFORM_MEMORY` and `GRAPHICS_API_OPENGL_SOFTWARE` flags.",
      ""
    ].join("\n")
  );
}

if (existsSync(vendorDir)) {
  if (!force) {
    if (existsSync(`${vendorDir}/.git`)) {
      assertExpectedCheckout();
    } else if (!hasExpectedSourceCopy()) {
      throw new Error(
        [
          `${vendorDir} already exists but is not the expected raylib ${raylibTag} checkout.`,
          `Run \`npm run init:raylib -- --force\` to replace it with a fresh clone.`
        ].join("\n")
      );
    }

    writeProvenance();
    console.log(`raylib ${raylibTag} sources are already available at ${vendorDir}`);
    process.exit(0);
  }

  rmSync(vendorDir, { recursive: true, force: true });
}

mkdirSync(dirname(vendorDir), { recursive: true });

execFileSync(
  "git",
  ["clone", "--branch", raylibTag, "--depth", "1", "--single-branch", raylibRepoUrl, vendorDir],
  { stdio: "inherit" }
);

assertExpectedCheckout();
writeProvenance();

console.log(`raylib ${raylibTag} vendored at ${vendorDir}`);
