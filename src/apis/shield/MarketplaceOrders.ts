import {APIRequestContext, APIResponse} from "@playwright/test";

export class MarketplaceOrders {
    readonly context: APIRequestContext;

    constructor(context: APIRequestContext) {
        this.context = context;
    }

    async terminateOrder(serviceId: string, customerId: string): Promise<APIResponse> {
        return await this.context.post('https://shield-api.stage.consoleconnect.com/v2/admin/marketplace-orders',
            {
                headers: {
                    'shield-token': process.env.API_TOKEN
                },
                data: {
                    orderAction: "TERMINATE",
                    serviceId: serviceId,
                    customerId: customerId,
                }
            });
    }
}
