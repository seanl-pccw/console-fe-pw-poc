import {test as base, expect} from '@playwright/test';
import {MarketplaceProductPage} from "./shield/MarketplaceProductPage";

export const test = base.extend<{
    marketplaceProductPage: MarketplaceProductPage;
}>({
    marketplaceProductPage: async ({page}, use) => {
        await use(new MarketplaceProductPage(page));
    },
});

export {expect};