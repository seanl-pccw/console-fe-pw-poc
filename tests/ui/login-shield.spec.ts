import {expect, test} from "@playwright/test";
import {LoginPageShield} from "../../src/pages/shield/LoginPageShield";

test('Login valid Shield user', async ({page}) => {
    const loginPageShield = new LoginPageShield(page);
    await loginPageShield.goto();
    await loginPageShield.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await expect(page).toHaveURL('https://shield.stage.consoleconnect.com/dashboard');
});

test('Login invalid Shield user', async ({page}) => {
    const loginPageShield = new LoginPageShield(page);
    await loginPageShield.goto();
    await loginPageShield.login('invalid@user.com', 'invalid@password');

    await expect(loginPageShield.errorText).toBeVisible();
});