import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { WPT_REPORTS, WPT_SHIM_OUTPUT, WPT_SMOKE_TESTS_FILE } from "./wpt-config.mjs";

const suite = readOption("--suite") ?? "smoke";
const wptRoot = readOption("--wpt-root") ?? process.env.WPT_ROOT ?? ".wpt-upstream";
const browser = process.env.WPT_BROWSER ?? "chrome";
const shouldInstallBrowser = isEnabled(process.env.WPT_INSTALL_BROWSER);
const shouldInstallWebdriver = isEnabled(process.env.WPT_INSTALL_WEBDRIVER);
const browserBinary = shouldInstallBrowser
  ? undefined
  : process.env.WPT_BINARY ?? await findPlaywrightChromiumBinary(browser);
const python = process.env.PYTHON ?? "python";

if (suite !== "smoke" && suite !== "full") {
  throw new Error(`Unknown WPT suite "${suite}". Use "smoke" or "full".`);
}

assertExecutableWptCheckout(wptRoot);

execFileSync(process.execPath, ["scripts/build-wpt-shim.mjs"], { stdio: "inherit" });

const reportPath = WPT_REPORTS[suite];
mkdirSync(dirname(reportPath), { recursive: true });

const tests = suite === "smoke" ? [] : ["html/canvas"];
const args = [
  join(wptRoot, "wpt"),
  "run",
  "--yes",
  "--headless",
  "--inject-script",
  WPT_SHIM_OUTPUT,
  "--log-wptreport",
  reportPath
];

if (process.env.WPT_CHANNEL) {
  args.push("--channel", process.env.WPT_CHANNEL);
}

if (shouldInstallBrowser) {
  args.push("--install-browser");
}

if (shouldInstallWebdriver) {
  args.push("--install-webdriver");
}

if (browserBinary) {
  args.push("--binary", browserBinary);
}

if (process.env.WPT_WEBDRIVER_BINARY) {
  args.push("--webdriver-binary", process.env.WPT_WEBDRIVER_BINARY);
}

if (suite === "smoke") {
  const includeFile = join(dirname(reportPath), "smoke-include.txt");
  writeFileSync(includeFile, `${readSmokeTests().join("\n")}\n`);
  args.push("--include-file", includeFile);
}

args.push(browser, ...tests);

console.log(`Running WPT ${suite} suite with ${browser}`);
console.log(`Report: ${reportPath}`);

const result = spawnSync(python, args, { stdio: "inherit", shell: false });

if (typeof result.status === "number") {
  process.exitCode = result.status;
} else if (result.error) {
  throw result.error;
} else {
  process.exitCode = 1;
}

function readOption(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function isEnabled(value) {
  return value === "1" || value === "true";
}

function assertExecutableWptCheckout(root) {
  const requiredPaths = [
    join(root, "wpt"),
    join(root, "tools"),
    join(root, "resources", "testharness.js"),
    join(root, "html", "canvas", "resources", "canvas-tests.js")
  ];

  const missing = requiredPaths.filter((path) => !existsSync(path));

  if (missing.length > 0) {
    throw new Error(
      [
        `WPT checkout at ${root} is missing files required to execute tests:`,
        ...missing.map((path) => `  - ${path}`),
        "Run: npm run wpt:setup"
      ].join("\n")
    );
  }
}

function readSmokeTests() {
  return readFileSync(WPT_SMOKE_TESTS_FILE, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
}

async function findPlaywrightChromiumBinary(product) {
  if (product !== "chrome" && product !== "chromium") {
    return undefined;
  }

  try {
    const { chromium } = await import("@playwright/test");
    const executablePath = chromium.executablePath();
    return existsSync(executablePath) ? executablePath : undefined;
  } catch {
    return undefined;
  }
}
