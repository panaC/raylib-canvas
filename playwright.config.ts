import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  outputDir: "test-results/playwright",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    headless: true
  },
  webServer: {
    command: "npm run demo:build && npm run demo:serve",
    url: "http://127.0.0.1:4173/examples/basic.html",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  }
});
