import { Before, After, Status,setWorldConstructor  } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import fs from 'fs';
import path from 'path';
 
Before(async function (this: CustomWorld) {
  await this.init();
});
 
 
After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const dir = './screenshots';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
 
    const fileName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_') + '.png';
    const filePath = path.join(dir, fileName);
 
    await this.page.screenshot({ path: filePath, fullPage: true });
    const image = fs.readFileSync(filePath);
    this.attach(image, 'image/png');
 
    console.log(`📸 Screenshot saved: ${filePath}`);
  }
 
  await this.close();
});