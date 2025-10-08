import {Locator, Page} from "@playwright/test";

export class MarketplaceProductPage {
    readonly page: Page;
    readonly orderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderButton = page.getByTestId('btn-order-new-product')
    }

    async goto() {
        await this.page.goto('https://shield.stage.consoleconnect.com/products');
        await this.page.waitForLoadState("networkidle")
    }

    async orderIodProduct() {
        // Search for Internet on Demand and click to Order
        await this.page.getByRole('searchbox', {name: 'Name or description'}).click();
        await this.page.getByRole('searchbox', {name: 'Name or description'}).fill('Internet on Demand');
        await this.page.getByRole('link', {name: 'Internet on Demand Logo'}).click();
        await this.page.getByTestId('marketplace-cta-button').click();

        // Populate Company and IDs
        await this.page.getByRole('button', {name: 'Show suggestions'}).click();
        await this.page.getByRole('combobox', {name: 'Company *'}).fill('QE1');
        await this.page.getByRole('option', {name: 'QE1(L2Connections-SoS)', exact: true}).click();
        await this.page.getByRole('textbox', {name: 'Sales Record ID *'}).fill('260675');
        await this.page.getByRole('textbox', {name: 'Unique Service Number (USN) *'}).fill('S1234512345');
        await this.page.getByTestId('configuration-btn').click();

        // Select Service options
        await this.page.getByRole('button', {name: 'Show suggestions'}).click();
        await this.page.getByRole('option', {name: 'QE1 IoD - do not delete (1000'}).click();
        await this.page.locator('label').filter({hasText: 'Burstable bandwidthAllow your'}).locator('svg').click();
        await this.page.getByTestId('cc-rate-limit-plusButton').first().click();
        await this.page.getByTestId('cc-rate-limit-plusButton').first().click();
        await this.page.getByTestId('cc-rate-limit-plusButton').nth(1).click();
        await this.page.locator('label').filter({hasText: 'Private ASN - dynamic'}).locator('svg').click();
        await this.page.getByTestId('duration-dropdown-select').selectOption('12');

        // Cancel order
        await this.page.getByTestId('cancel-btn').click();
    }

}
