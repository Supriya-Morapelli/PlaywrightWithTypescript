import { Page, Locator, expect } from '@playwright/test';
 
export class ShoppingCart {
    page: Page;
    country: string;
    termsCheckbox: string;
    checkOutbtn: string;
    productInCart: string;
    constructor(page: Page) {
        this.page = page;
        this.country = "#CountryId";
        this.termsCheckbox = "#termsofservice";
        this.checkOutbtn = "#checkout";
        this.productInCart = "[class='product-name']"
 
    }
 
 
    async productShouldBeDisplayedInCart(name: string) {
        const productNameInCart = await this.page.locator(this.productInCart).last().textContent();
        expect(productNameInCart).toEqual(name)
    }
 
 
 
    async chooseCountry(countryName: string) {
        await this.page.waitForSelector(this.country);
        const countrydd = this.page.locator(this.country);
        await countrydd.selectOption(countryName);
        await this.page.waitForLoadState("load");
 
    }
    async checkOut(productName: string, countryName: string) {
 
        if (productName === "$25 Virtual Gift Card") {
            await this.page.waitForSelector(this.termsCheckbox);
            await this.page.locator(this.termsCheckbox).check();
        }
        else {
            await this.chooseCountry(countryName);
            await this.page.waitForSelector(this.termsCheckbox);
            await this.page.locator(this.termsCheckbox).check();
        }
 
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(this.checkOutbtn)
        await this.page.locator(this.checkOutbtn).click();
        await this.page.waitForLoadState("load");
    }
 
 
 
 
 
 
 
 
 
}