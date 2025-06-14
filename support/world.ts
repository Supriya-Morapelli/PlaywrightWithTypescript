 
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
 
 
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  productName?: string;
 
 
  constructor(options: IWorldOptions) {
    super(options);
  }
 
  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }
 
  async close() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}
 
setWorldConstructor(CustomWorld);
 
 