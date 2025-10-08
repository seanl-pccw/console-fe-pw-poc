import {type Locator, type Page} from '@playwright/test';

export class LoginPageShield {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', {name: 'email'});
        this.passwordField = page.getByRole('textbox', {name: 'password'});
        this.loginButton = page.getByRole('button', {name: 'log me in'});
        this.errorText = page.getByText('Request failed with status code 401');
    }

    async goto() {
        await this.page.goto('https://shield.stage.consoleconnect.com/login');
    }

    async login(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}