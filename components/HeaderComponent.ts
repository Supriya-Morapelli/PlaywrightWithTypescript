import { Page, Locator } from '@playwright/test'
 
export class HeaderComponent {
     page: Page;
    searchBar: Locator;
    searchButton: Locator;
   
    constructor(page: Page) {
        this.page=page;
        this.searchBar = this.page.locator("input#small-searchterms")
        this.searchButton = this.page.locator("[value='Search']")
 
    }
 
 
    async search(name:string){
        await this.searchBar.fill(name);
        await this.searchButton.click();
        await this.page.waitForTimeout(2000)
    }
 
}
//