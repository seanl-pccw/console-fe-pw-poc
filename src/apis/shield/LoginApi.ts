import {APIRequestContext} from "@playwright/test";

export class LoginApi {
    readonly context: APIRequestContext;

    constructor(context: APIRequestContext) {
        this.context = context;
    }

    async loginShield(email: string, password: string) {
        return await this.context.put('https://shield-api.stage.consoleconnect.com/admin/auth/token', {
            form: {
                email: email,
                password: password
            }
        });
    }
}
