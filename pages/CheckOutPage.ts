import { Page, Locator } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { CartPage } from './CartPage';
 
 
export class CheckOutPage {
    page: Page;
    BillingNewAddress_CountryId: string;
    BillingNewAddress_City: string;
    BillingNewAddress_Address1: string;
    BillingNewAddress_ZipPostalCode: string;
    BillingNewAddress_PhoneNumber: string;
    billing_Continuebtn: string;
    shippingaddress_Continuebtn: string;
    shippingMethod_Continuebtn: string;
    PaymentMethod_Continuebtn: string;
    PaymentInfo_Continuebtn: string;
    ConfirmOrder_Continuebtn: string;
    loginpage: LoginPage;
    cartpage: CartPage;
 
    constructor(page: Page) {
        this.page = page;
        this.BillingNewAddress_CountryId = "//select[@id='BillingNewAddress_CountryId']";
        this.BillingNewAddress_City = "#BillingNewAddress_City";
        this.BillingNewAddress_Address1 = "#BillingNewAddress_Address1";
        this.BillingNewAddress_ZipPostalCode = "#BillingNewAddress_ZipPostalCode";
        this.BillingNewAddress_PhoneNumber = "#BillingNewAddress_PhoneNumber";
 
        this.billing_Continuebtn = "//input[@onclick='Billing.save()']";
        this.shippingaddress_Continuebtn = "//input[@onclick='Shipping.save()']";
        this.shippingMethod_Continuebtn = "//input[@onclick='ShippingMethod.save()']";
        this.PaymentMethod_Continuebtn = "//input[@onclick='PaymentMethod.save()']";
        this.PaymentInfo_Continuebtn = "//input[@onclick='PaymentInfo.save()']";
        this.ConfirmOrder_Continuebtn = "//input[@onclick='ConfirmOrder.save()']";
        this.loginpage = new LoginPage(page)
        this.cartpage = new CartPage(page)
 
    }
 
 
    async configureAddress(proctName: string) {
 
        if (proctName === "$25 Virtual Gift Card") {
            await this.BillingAddress();
            await this.loginpage.waitforNw();
            await this.PaymentMethod();
            await this.loginpage.waitforNw();
            await this.PaymentInfo();
            await this.loginpage.waitforNw();
            const element5 = this.page.locator("//input[@onclick='ConfirmOrder.save()']");
            await this.cartpage.scrolling(element5);
            await this.loginpage.waitforNw();
            await this.ConfirmOrder();
        }
        else {
            await this.BillingAddress();
            await this.loginpage.waitforNw();
            await this.ShippingAddress();
            await this.loginpage.waitforNw();
            const element4 = this.page.locator("//input[@onclick='ShippingMethod.save()']");
            await this.cartpage.scrolling(element4);
            await this.loginpage.waitforNw();
            await this.ShippingMethod();
            await this.loginpage.waitforNw();
            await this.PaymentMethod();
            await this.loginpage.waitforNw();
            await this.PaymentInfo();
            await this.loginpage.waitforNw();
            const element5 = this.page.locator("//input[@onclick='ConfirmOrder.save()']");
            await this.cartpage.scrolling(element5);
            await this.loginpage.waitforNw();
            await this.ConfirmOrder();
        }
    }
 
    async BillingNewAddress(country: string, city: string, address: string, postalCode: string, phnoNo: string) {
 
        await this.page.waitForSelector(this.BillingNewAddress_CountryId, { timeout: 8000 });
        const cou = this.page.locator(this.BillingNewAddress_CountryId);
        await cou.selectOption(country);
        await this.page.waitForSelector(this.BillingNewAddress_City);
        await this.page.locator(this.BillingNewAddress_City).fill(city);
        await this.page.waitForSelector(this.BillingNewAddress_Address1)
        await this.page.locator(this.BillingNewAddress_Address1).fill(address);
        await this.page.waitForSelector(this.BillingNewAddress_ZipPostalCode)
        await this.page.locator(this.BillingNewAddress_ZipPostalCode).fill(postalCode);
        await this.page.waitForSelector(this.BillingNewAddress_PhoneNumber)
        await this.page.locator(this.BillingNewAddress_PhoneNumber).fill(phnoNo);
 
    }
    async BillingAddress() {
        await this.page.waitForSelector(this.billing_Continuebtn);
        await this.page.locator(this.billing_Continuebtn).click();
        await this.page.waitForLoadState('load');
        //await this.page.waitForTimeout(5000);
    }
    async ShippingAddress() {
        await this.page.waitForSelector(this.shippingaddress_Continuebtn);
        await this.page.waitForLoadState('load');
        await this.page.locator(this.shippingaddress_Continuebtn).click();
        await this.page.waitForLoadState('load');
        //await this.page.waitForTimeout(5000);
    }
    async ShippingMethod() {
 
        await this.page.waitForSelector(this.shippingMethod_Continuebtn);
        await this.page.waitForLoadState('load');
        await this.page.locator(this.shippingMethod_Continuebtn).click();
        await this.page.waitForLoadState('load');
        //await this.page.waitForTimeout(5000);
    }
    async PaymentMethod() {
        //await this.page.waitForLoadState('load');
        await this.page.waitForSelector(this.PaymentMethod_Continuebtn);
        await this.page.waitForLoadState('load');
        await this.page.locator(this.PaymentMethod_Continuebtn).click();
        await this.page.waitForLoadState('load');
        //await this.page.waitForTimeout(5000);
    }
    async PaymentInfo() {
        await this.page.waitForSelector(this.PaymentInfo_Continuebtn);
        await this.page.waitForLoadState('load');
        await this.page.locator(this.PaymentInfo_Continuebtn).click();
        await this.page.waitForLoadState('load');
        //await this.page.waitForTimeout(5000);
    }
    async ConfirmOrder() {
        await this.page.waitForSelector(this.ConfirmOrder_Continuebtn);
        await this.page.waitForLoadState('load');
        await this.page.locator(this.ConfirmOrder_Continuebtn).click();
        await this.page.waitForLoadState('load');
        //await this.page.waitForTimeout(5000);
    }
 
}