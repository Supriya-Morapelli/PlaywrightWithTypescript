import { expect, Page, Locator } from '@playwright/test'
 
const testData = JSON.parse(JSON.stringify(require('../test_data/testdata.json')))
 
export class LoginPage {
    page: Page;
    loginLink: Locator;
    emailInput: Locator
    passwordInput: Locator
    loginButton: Locator
    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByText('Log in');
        this.emailInput = page.locator("[id='Email']");
        this.passwordInput = page.locator("[id='Password']");
        this.loginButton = page.locator("//input[@value='Log in']");
    }
 
    async gotoPage() {
       
        await this.page.goto(testData.BASE_URL);
    }
    async waitForElement() {
        await this.page.waitForTimeout(2000);
       
    }
    async waitforNw() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState("load");
 
    }
    async enterLoginCredentials(username:string,password:string) {
     
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
       
    }
    async clickLoginBtn() {
         await this.loginButton.click();
 
    }
    async homePageShouldBeDisplayed(){
       
    await expect(this.page).toHaveURL("https://demowebshop.tricentis.com/");
 
 
    }
}
 