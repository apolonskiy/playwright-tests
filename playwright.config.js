import {devices, defineConfig}  from "@playwright/test";
import {baseUrl, isCi} from "./test.constants.js";

/** @type {import('@playwright/test').PlaywrightTestConfig} */
export default  defineConfig ({
  forbidOnly: isCi,
  retries: isCi ? 1 : 0,
  workers: 1,
  timeout: 60 * 6 * 1000, // 6 mins
  globalTimeout: 60 * 60 * 1000, // 60 mins
  expect: {
    timeout: 15 * 1000
  },
  testMatch: '/tests/*.spec.js',
  testIgnore: '.*(utils|page|index).(js|ts|mjs)',
  use: {
    headless: true,
    baseURL: baseUrl,
    viewport: {width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    actionTimeout: 60000,
    navigationTimeout: 120000,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  outputDir: "./playwright-results",
  reporter: [
    ["list"],
    ["json", {outputFile: "./playwright-results/test-results.json"}],
    ["junit", {outputFile: "./junit.xml"}]
  ],
  projects: [
    {
      name: "chromium",
      use: {...devices["Desktop Chrome"]}
    },
    {
      name: "webkit",
      use: {...devices["Desktop Safari"]}
    }
  ]
});