import { Page, Locator } from '@playwright/test'
import { HeaderComponent } from "../components/HeaderComponent";
 
export class HomePage {
    page: Page;
    productLinks: Locator;
    header: HeaderComponent;
    constructor(page: Page) {
        this.header = new HeaderComponent(page);
        this.page = page;
        this.productLinks = page.locator('.product-grid div div div h2 a');
    }
 
async searchProduct(productName: string){
    await this.header.search(productName)
}
 
    async clickOnDesiredProduct(productName: string): Promise<void> {
        const count = await this.productLinks.count();
        for (let i = 0; i < count; i++) {
            const text = await this.productLinks.nth(i).textContent();
            if (text?.trim() === productName) {
                await this.productLinks.nth(i).click();
                break;
            }
        }
    }
}
 
 