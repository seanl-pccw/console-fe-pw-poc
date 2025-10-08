import {expect, test} from "@playwright/test";
import {MarketplaceServices} from "../../src/apis/shield/MarketplaceServices";

test('get marketplace orders', async ({context}) => {
    const marketplaceApi = new MarketplaceServices(context.request)

    const getResponse = await marketplaceApi.getServices()

    if (!getResponse.ok()) {
        console.log(await getResponse.json());
    }
    expect(getResponse.ok()).toBeTruthy();
    console.log(await getResponse.json());
});