import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage"
import { chromium } from "playwright"
import { CustomWorld } from '../support/world';
const testData = JSON.parse(JSON.stringify(require('../test_data/testdata.json')))
setDefaultTimeout(80 * 1000)

let loginPage: any;
Given('I am on the login page', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.gotoPage();
});



When('I enter a valid username and password', async function (this: CustomWorld) {
  await loginPage.enterLoginCredentials(testData.LOGIN_USERNAME, testData.LOGIN_PASSWORD);
});



When('I click the login button', async function (this: CustomWorld) {
  await loginPage.clickLoginBtn();
});


