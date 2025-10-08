import {expect, test as setup} from '@playwright/test';
import {STORAGE_STATE_SHIELD} from "../../playwright.config";

/**
 * Manual run to refresh session: npx playwright test --project=setup
 */
setup('log user in - ui', async ({page}) => {
    await page.goto('https://shield.stage.consoleconnect.com/login');

    await page.getByRole('textbox', {name: 'email'}).fill(process.env.USER_EMAIL!);
    await page.getByRole('textbox', {name: 'password'}).fill(process.env.USER_PASSWORD!);
    await page.getByRole('button', {name: 'log me in'}).click();

    await expect(page).toHaveURL('https://shield.stage.consoleconnect.com/dashboard');

    // Save the storage state to persist the login session
    await page.context().storageState({path: STORAGE_STATE_SHIELD});
});
