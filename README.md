# playwright-tests
Tiny showcase for Playwright tests structure, testing Linkedin sign in page.

## Prerequisites:
* `npx playwright install`;
* `npm ci`;

## Test execution
* In order to run test in single browser, use 
    * `test:chromium:local` or `test:safari:local`
* In case you'd like to run tests in multiple workers and browsers simultaneously, please modify `playwright.config.js` file, `workers` number to 2 and run `test:all:local` instead