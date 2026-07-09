import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { WPT_REPORTS, WPT_SMOKE_TESTS_FILE, WPT_UPSTREAM_COMMIT } from "./wpt-config.mjs";

const args = new Set(process.argv.slice(2));
const json = args.has("--json");
const cwd = process.cwd();
const wptRoot = readOption("--wpt-root") ?? process.env.WPT_ROOT ?? ".wpt-upstream";
const canvasRoot = join(wptRoot, "html", "canvas");

const manifest = JSON.parse(readFileSync(join(cwd, "tests", "wpt", "progress-manifest.json"), "utf8"));
const smokeTests = readSmokeTests();
const missingWpt = !existsSync(canvasRoot);
const upstreamFiles = missingWpt ? [] : listFiles(canvasRoot)
  .map((file) => normalizePath(join("html", "canvas", relative(canvasRoot, file))))
  .filter(isAutomatedCanvasTest);

const upstreamSet = new Set(upstreamFiles);
const capabilityCounts = createCapabilityCounts();

for (const file of upstreamFiles) {
  capabilityCounts[classifyCapability(file)] += 1;
}

const report = {
  pinnedCommit: WPT_UPSTREAM_COMMIT,
  wptRoot,
  upstreamAvailable: !missingWpt,
  totalAutomatedCanvasTests: upstreamFiles.length,
  smokeTests: smokeTests.length,
  smokeMissingFromCheckout: smokeTests.filter((test) => !upstreamSet.has(test)),
  capabilityCounts,
  reports: {
    smoke: summarizeWptReport(WPT_REPORTS.smoke),
    full: summarizeWptReport(WPT_REPORTS.full)
  },
  setupCommand: "npm run wpt:setup",
  smokeCommand: "npm run test:wpt",
  fullCommand: "npm run wpt:full"
};

if (json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  printTextReport(report);
}

function readOption(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function readSmokeTests() {
  return readFileSync(WPT_SMOKE_TESTS_FILE, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
}

function createCapabilityCounts() {
  return {
    "smoke-gated": 0,
    blocked: 0,
    "unsupported-host": 0,
    pending: 0
  };
}

function listFiles(root) {
  const entries = readdirSync(root);
  const files = [];

  for (const entry of entries) {
    const path = join(root, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      files.push(...listFiles(path));
    } else {
      files.push(path);
    }
  }

  return files;
}

function normalizePath(path) {
  return path.split(sep).join("/");
}

function isAutomatedCanvasTest(path) {
  if (path.includes("/resources/") || path.includes("/tools/")) {
    return false;
  }

  if (path.endsWith("-ref.html") || path.endsWith("-expected.html") || path.endsWith("-manual.html")) {
    return false;
  }

  if (path.endsWith(".any.js") || path.endsWith(".window.js") || path.endsWith(".worker.js")) {
    return true;
  }

  return path.endsWith(".html");
}

function classifyCapability(path) {
  if (smokeTests.includes(path)) {
    return "smoke-gated";
  }

  for (const rule of manifest.rules ?? []) {
    if (path.startsWith(rule.prefix)) {
      return rule.status;
    }
  }

  return "pending";
}

function summarizeWptReport(path) {
  if (!existsSync(path)) {
    return {
      path,
      available: false
    };
  }

  const report = JSON.parse(readFileSync(path, "utf8"));
  const results = report.results ?? [];
  let expectedFiles = 0;
  let unexpectedFiles = 0;
  let unexpectedSubtests = 0;

  for (const result of results) {
    const unexpected = countUnexpected(result);

    if (unexpected === 0) {
      expectedFiles += 1;
    } else {
      unexpectedFiles += 1;
      unexpectedSubtests += unexpected;
    }
  }

  return {
    path,
    available: true,
    totalFiles: results.length,
    expectedFiles,
    unexpectedFiles,
    unexpectedSubtests
  };
}

function countUnexpected(result) {
  let count = isExpectedStatus(result.status, result.expected, "OK") ? 0 : 1;

  for (const subtest of result.subtests ?? []) {
    if (!isExpectedStatus(subtest.status, subtest.expected, "PASS")) {
      count += 1;
    }
  }

  return count;
}

function isExpectedStatus(status, expected, defaultExpected) {
  if (Array.isArray(expected)) {
    return expected.includes(status);
  }

  if (typeof expected === "string") {
    return status === expected;
  }

  return status === defaultExpected;
}

function printTextReport(result) {
  console.log("Canvas WPT Progress");
  console.log(`Pinned WPT: ${result.pinnedCommit}`);
  console.log(`WPT root: ${result.wptRoot}`);

  if (!result.upstreamAvailable) {
    console.log("");
    console.log("Executable upstream checkout not found.");
    console.log(`Run: ${result.setupCommand}`);
  } else {
    console.log("");
    console.log(`Total automated Canvas WPT files: ${result.totalAutomatedCanvasTests}`);
    console.log(`Official smoke tests: ${result.smokeTests}`);

    if (result.smokeMissingFromCheckout.length > 0) {
      console.log("Smoke tests missing from checkout:");
      for (const test of result.smokeMissingFromCheckout) {
        console.log(`  ${test}`);
      }
    }

    console.log("");
    console.log("Capability buckets:");
    console.log(`  smoke-gated: ${result.capabilityCounts["smoke-gated"]}`);
    console.log(`  blocked: ${result.capabilityCounts.blocked}`);
    console.log(`  unsupported-host: ${result.capabilityCounts["unsupported-host"]}`);
    console.log(`  pending: ${result.capabilityCounts.pending}`);
  }

  console.log("");
  printReportSummary("Smoke report", result.reports.smoke, result.smokeCommand);
  printReportSummary("Full report", result.reports.full, result.fullCommand);
}

function printReportSummary(label, report, command) {
  if (!report.available) {
    console.log(`${label}: not found (${report.path})`);
    console.log(`  Run: ${command}`);
    return;
  }

  console.log(`${label}: ${report.path}`);
  console.log(`  files: ${report.totalFiles}`);
  console.log(`  expected files: ${report.expectedFiles}`);
  console.log(`  unexpected files: ${report.unexpectedFiles}`);
  console.log(`  unexpected subtests/results: ${report.unexpectedSubtests}`);
}
