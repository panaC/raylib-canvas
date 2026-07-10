import { rmSync } from "node:fs";

const paths = [
  "dist",
  "examples/dist",
  "test-results",
  "playwright-report",
  "coverage"
];

const dryRun = process.argv.includes("--dry-run");

for (const path of paths) {
  if (dryRun) {
    console.log(`Would remove ${path}`);
    continue;
  }

  rmSync(path, { recursive: true, force: true });
  console.log(`Removed ${path}`);
}

console.log("");
console.log("Next commands from a clean checkout:");
console.log("  npm run init:raylib        # ensure vendor/raylib exists");
console.log("  npm run build              # rebuild package output");
console.log("  npm run build:raylib-wasm  # rebuild optional raylib WASM artifacts");
console.log("  npm test                   # run the default checked suite");
console.log("  npm test:raylib            # run the raylib checked suite");
