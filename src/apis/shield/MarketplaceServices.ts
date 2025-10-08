import {APIRequestContext} from "@playwright/test";

export class MarketplaceServices {
    readonly context: APIRequestContext;

    constructor(context: APIRequestContext) {
        this.context = context;
    }

    async getServices() {
        return await this.context.get('https://shield-api.stage.consoleconnect.com/v2/admin/marketplace-orders/search?criteria=%7B%22status%22%3A%5B%22PROCESSING%22%2C%22SUBMITTED%22%2C%22MIGRATING%22%5D%7D&order=created_at%20DESC&page=1',
            {
                headers: {
                    'shield-token': process.env.API_TOKEN
                },
            });
    }
}
