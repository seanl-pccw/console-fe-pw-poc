import {expect, test as setup} from '@playwright/test';
import {LoginApi} from "../../src/apis/shield/LoginApi";

/**
 * Manual run to refresh session: npx playwright test --project=setup
 */
setup('log user in - api', async ({context}) => {
    const loginApi = new LoginApi(context.request);
    const loginResponse = await loginApi.loginShield(
        process.env.USER_EMAIL!,
        process.env.USER_PASSWORD!
    )
    if (!loginResponse.ok()) {
        console.log('API Response:', await loginResponse.json());
    }
    expect(loginResponse.ok()).toBeTruthy();
    const responseBody = await loginResponse.json();

    // Save the token value to env var
    process.env.API_TOKEN = responseBody.token;
});
