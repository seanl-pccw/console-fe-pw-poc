import {test} from "../../src/pages/base";

test.use({storageState: '.auth/user-shield.json'});

test.beforeEach(async ({page}) => {
    await page.goto('https://shield.stage.consoleconnect.com/dashboard');
})

test('Order IOD product', async ({marketplaceProductPage}) => {
    await marketplaceProductPage.goto()
    await marketplaceProductPage.orderIodProduct()
});
