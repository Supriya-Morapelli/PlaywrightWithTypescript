import { Page, Locator, expect } from '@playwright/test'
 
export class ThankyouPage {
    page: Page;
    msgLocator: string;
    orderId: string;
    constructor(page: Page) {
        this.page = page;
        this.msgLocator = "div.section div strong";
        this.orderId = "ul.details>li"
 
 
    }
 
    async orderConfirmation() {
        const message = await this.page.textContent(this.msgLocator);
        console.log(message)
        await expect.soft(this.page.locator(this.msgLocator)).toHaveText("Your order has been successfully processed!");
 
 
    }
    async printOrderId() {
 
        const msg = await this.page.textContent(this.orderId);
        console.log(msg);
    }
}
 