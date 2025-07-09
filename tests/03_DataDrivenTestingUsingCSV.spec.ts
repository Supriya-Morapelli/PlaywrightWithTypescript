import { test, expect } from '@playwright/test';

import {parse} from 'csv-parse/sync'
import fs from 'fs';
import path from 'path';


interface TestData{
  TestCase:string,
  Skill1:string,
  Skill2:string

}

const dataSets=parse(
    fs.readFileSync(path.join(__dirname,'../test_data/testdata.csv')),
    {
        columns:true,
        skipEmptyLines:true,
    }
) as TestData[]

test.describe.configure({mode:"serial"})


for(const dataset of dataSets){


test(`data driven testing using CSV ${dataset.TestCase}`, async ({ page }) => {
  await page.goto(process.env.URL as string);
  await expect(page).toHaveTitle("Google");

  await page.getByTitle("Search").fill(dataset.Skill1)
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