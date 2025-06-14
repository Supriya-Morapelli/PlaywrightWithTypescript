import { Page, Locator } from "@playwright/test";
 
export class CartPage {
    page: Page;
    processorRadiobtn: Locator;
    RAMRadiobtn: Locator;
    HDDRadiobtn: Locator;
    softwareCheckbox: Locator;
    quantityFld: Locator;
    addtoCartbutton: Locator;
    shoppingCartmenu: string;
    goToCartbtn: string;
    recipientName: Locator;
    recipientEmail: Locator;
    softwareCheckbocForSimpleCom: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.processorRadiobtn = page.getByLabel("Slow")
        this.RAMRadiobtn = page.getByLabel("8 GB  [+60.00]");
        this.HDDRadiobtn = page.getByLabel("400 GB  [+100.00]")
        this.softwareCheckbox = page.getByLabel("Office Suite  [+100.00]")
        this.quantityFld = page.locator("[class='qty-input']")
        this.addtoCartbutton = page.locator("[class='add-to-cart'] [value='Add to cart']")
        this.shoppingCartmenu = ".ico-cart";
        this.goToCartbtn = "//input[@value='Go to cart']";
        this.recipientName = page.locator(".recipient-name");
        this.recipientEmail = page.locator(".recipient-email")
        this.softwareCheckbocForSimpleCom = page.getByLabel("Image Viewer ")
    }
 
    async scrolling(element: Locator) {
        await element.scrollIntoViewIfNeeded();
        await element.isVisible();
    }
 
    async clickOnAddToCartButton(productName: string, processor: string, RAM: string, HDD: string, software: string, processorForOwnCom: string, RAMForOwnCom: string,softwareForOwnCom:string,OSForOwnCom:string,softwareForSimpleComp:string) {
 
        if (productName === "$25 Virtual Gift Card") {
 
            await this.recipientName.fill("Supriya")
            await this.recipientEmail.fill("supriya@gmail.com")
            await this.addtoCartbutton.click();
 
        }
        else if (productName === "14.1-inch Laptop") {
            await this.addtoCartbutton.click();
        }
        else if (productName === "Build your own computer") {
 
 
           
            const processorDropdown = this.page.locator('dt:has-text("Processor") + dd select');
            await processorDropdown.selectOption({ label: processorForOwnCom });
 
           
            const ramDropdown = this.page.locator('dt:has-text("RAM") + dd select');
            await ramDropdown.selectOption({ label: RAMForOwnCom });
 
            await this.page.getByLabel(HDD).check()
            await this.page.getByLabel(softwareForOwnCom).check()
            await this.page.getByLabel(OSForOwnCom).check();
            await this.quantityFld.clear();
            await this.quantityFld.fill("1");
            await this.addtoCartbutton.click();
 
 
        }
        else if(productName === "Simple Computer"){
             await this.chooseConfigurationForComputer(processor, RAM, HDD, softwareForSimpleComp);
 
        }
            else{
            await this.chooseConfigurationForComputer(processor, RAM, HDD, software);
 
 
        }
 
    }
 
    async chooseConfigurationForComputer(processor: string, RAM: string, HDD: string, software: string) {
        await this.page.getByLabel(processor).check()
        await this.page.getByLabel(RAM).check()
        await this.page.getByLabel(HDD).check()
        await this.page.getByLabel(software).check()
        await this.quantityFld.clear();
        await this.quantityFld.fill("1");
        await this.addtoCartbutton.click();
 
        // await this.processorRadiobtn.check();
        // await this.RAMRadiobtn.check();
        // await this.HDDRadiobtn.check();
        // await this.softwareCheckbox.check();
        //    await this.page.getByLabel()
        //     await this.quantityFld.clear();
        //     await this.quantityFld.fill("2");
        //     await this.addtoCartbutton.click();
    }
 
 
 
    async hoveringAndGoToCart() {
        await this.page.waitForTimeout(5000)
        await this.page.hover(this.shoppingCartmenu, { timeout: 10 * 1000 });
        await this.page.waitForSelector(this.goToCartbtn);
        await this.page.locator(this.goToCartbtn).click();
        await this.page.waitForLoadState('load');
    }
}