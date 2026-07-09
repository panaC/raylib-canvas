import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { WPT_SPARSE_PATHS, WPT_UPSTREAM_COMMIT } from "./wpt-config.mjs";

const wptRoot = process.env.WPT_ROOT ?? ".wpt-upstream";

if (!existsSync(join(wptRoot, ".git"))) {
  execFileSync("git", [
    "clone",
    "--depth",
    "1",
    "--filter=blob:none",
    "--sparse",
    "https://github.com/web-platform-tests/wpt.git",
    wptRoot
  ], { stdio: "inherit" });
}

execFileSync("git", ["-C", wptRoot, "fetch", "--depth", "1", "origin", WPT_UPSTREAM_COMMIT], { stdio: "inherit" });
execFileSync("git", ["-C", wptRoot, "checkout", WPT_UPSTREAM_COMMIT], { stdio: "inherit" });
execFileSync("git", ["-C", wptRoot, "sparse-checkout", "set", ...WPT_SPARSE_PATHS], { stdio: "inherit" });

console.log(`WPT checkout ready at ${wptRoot}`);
console.log(`Pinned commit: ${WPT_UPSTREAM_COMMIT}`);
