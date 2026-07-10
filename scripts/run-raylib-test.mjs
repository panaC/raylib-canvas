import { spawnSync } from "node:child_process";
import { join } from "node:path";

const suite = process.argv[2];
const vitest = join("node_modules", "vitest", "vitest.mjs");
const env = {
  ...process.env,
  RAYLIB_CANVAS_RENDERER: "raylib"
};

const commands = {
  unit: [process.execPath, [vitest, "run", "tests/unit"]],
  pdfjs: [process.execPath, [vitest, "run", "tests/pdfjs"]],
  wpt: [process.execPath, ["scripts/wpt-run.mjs", "--suite", "smoke"]]
};

const command = commands[suite];

if (!command) {
  throw new Error(`Unknown raylib test suite "${suite}". Use unit, pdfjs, or wpt.`);
}

const result = spawnSync(command[0], command[1], {
  env,
  stdio: "inherit",
  shell: false
});

if (typeof result.status === "number") {
  process.exitCode = result.status;
} else if (result.error) {
  throw result.error;
} else {
  process.exitCode = 1;
}
