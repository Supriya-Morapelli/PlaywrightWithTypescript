import { test, expect } from '@playwright/test';


import path from 'path';

import {readExcelFile,TestRecord} from '../Utils/excelHelper'

const filePath=path.join(__dirname,"../test_data/MyExcel.xlsx")


const dataSets:TestRecord[]= readExcelFile(filePath)
test.describe.configure({mode:"serial"})
for(const dataset of dataSets){


test(`data driven testing using CSV ${dataset.Skill2}`, async ({ page }) => {
  await page.goto(process.env.URL as string);
  await expect(page).toHaveTitle("Google");

  await page.getByTitle("Search").fill(dataset.Skill2)
  await page.keyboard.press("Enter")


});

}










































// const [dataSets]=parse(
//     fs.readFileSync(path.join(__dirname,'../test_data/testdata.csv')),
//     {
//         columns:true,
//         skipEmptyLines:true,
//     }
// )


// test.only('data driven testing using CSV ', async ({ page }) => {
//   await page.goto(process.env.URL as string);
 

//   await page.getByTitle("Search").fill(dataSets.name)
//   await page.keyboard.press("Enter")
  
// }
// )