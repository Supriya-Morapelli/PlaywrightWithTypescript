import {Given, When, Then,setDefaultTimeout } from "@cucumber/cucumber";
import { Locator } from '@playwright/test';
 
import { LoginPage } from '../pages/LoginPage';
 
//import { LoginPage } from "../pages/LoginPage.ts"
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage'
import { ShoppingCart } from '../pages/ShoppingCartPage';
import { CheckOutPage } from '../pages/CheckOutPage'
import { ThankyouPage } from '../pages/ThankYouPage';
import { CustomWorld } from '../support/world';
setDefaultTimeout(120 * 1000)
 
let loginpage: any;
let cartpage: any;
let homepage: any;
let shoppingcart: any;
let checkoutpage: any;
let thankyoupage: any;
 
 
 
 
When('I login with username {string} and password {string}', async function (this: CustomWorld, username: string, password: string)  {
  loginpage = new LoginPage(this.page);
  await loginpage.enterLoginCredentials(username,password);
  await loginpage.clickLoginBtn();
  await loginpage.waitForElement();
});
Then('I should be redirected to the home page', async function (this: CustomWorld) {
  await loginpage.homePageShouldBeDisplayed();
});
When('I search and select the product {string}', async function (this: CustomWorld, productName: string) {
  this.productName=productName;
  cartpage = new CartPage(this.page);
  const elementToscrolluptoInformation: Locator = this.page.getByText("Information")
  await cartpage.scrolling(elementToscrolluptoInformation);
 
  homepage = new HomePage(this.page);
  await homepage.searchProduct(productName)
  await homepage.clickOnDesiredProduct(productName);
  await loginpage.waitForElement();
});
When('I configure the product with desired options and add the product to the cart', async function (this: CustomWorld) {
  const element1 = this.page.locator("[class='qty-label']");
  await cartpage.scrolling(element1);
  await cartpage.clickOnAddToCartButton(this.productName,"Slow","2 GB ","320 GB ","Office Suite  [+100.00]",'2.2 GHz Intel Pentium Dual-Core E2200', '8GB [+60.00]',"Microsoft Office  [+50.00]","Windows 10  [+60.00]","Image Viewer ");
 
});
When('I go to the cart', async function (this: CustomWorld) {
  const element2 = this.page.locator(".ico-logout");
  await cartpage.scrolling(element2);
  await cartpage.hoveringAndGoToCart();
});
Then('I should see {string} in the cart', async function (this: CustomWorld, productnameinCart:string) {
  shoppingcart = new ShoppingCart(this.page);
  await shoppingcart.productShouldBeDisplayedInCart(productnameinCart);
});
When('I proceed to checkout', async function (this: CustomWorld) {
  const element3 = this.page.locator("#checkout");
  await cartpage.scrolling(element3);
  await shoppingcart.checkOut(this.productName,"India");
});
When('I enter shipping address and I place the order', async function (this: CustomWorld) {
  checkoutpage = new CheckOutPage(this.page);
   await checkoutpage.configureAddress(this.productName)
});
Then('I should see order confirmation', async function (this: CustomWorld) {
  thankyoupage = new ThankyouPage(this.page);
  await thankyoupage.orderConfirmation();
});
Then('I should see an order ID', async function (this: CustomWorld) {
  await thankyoupage.printOrderId();
});
 