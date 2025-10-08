import {defineConfig, devices} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import * as dotenv from 'dotenv';
import * as path from 'path';
import assert = require("node:assert");

dotenv.config({path: path.resolve(__dirname, '.env')});

assert(process.env.USER_EMAIL, 'USER_EMAIL env var is not set');
assert(process.env.USER_PASSWORD, 'USER_PASSWORD env var is not set');
assert(process.env.API_TOKEN, 'API_TOKEN env var is not set');

export const STORAGE_STATE_SHIELD = path.join(__dirname, '.auth/user-shield.json');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    timeout: 120_000,
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'setup',
            testMatch: '**/*.ui.setup.ts',
            use: {...devices['Desktop Chrome']},
        },
        {
            name: 'chromium',
            testMatch: /.*ui.spec.ts/,
            use: {
                ...devices['Desktop Chrome'],
            },
            dependencies: ['setup']
        },
        {
            name: 'api-setup',
            testMatch: '**/*.api.setup.ts',
        },
        {
            name: 'api',
            testMatch: /.*api.spec.ts/,
            dependencies: ['api-setup']
        },

        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        //
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
