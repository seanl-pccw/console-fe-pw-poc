import {expect, test} from "@playwright/test";
import {MarketplaceOrders} from "../../src/apis/shield/MarketplaceOrders";

test('terminate order', async ({context}) => {
    const marketplaceApi = new MarketplaceOrders(context.request)

    const getResponse = await marketplaceApi.terminateOrder("", "")

    if (!getResponse.ok()) {
        console.log(await getResponse.json());
    }
    expect(getResponse.ok()).toBeTruthy();
    console.log(await getResponse.json());
});