import { test, expect } from '@playwright/test';

// const testData=  JSON.parse(JSON.stringify(require("../test_data/sampleData.json")))
// import {myTestData} from "../test_data/sampleData.json"


import myData from "../test_data/sampleData.json"

interface TestData{
  URL:string,
  myTestData: Record<string,string>,
  searchData:{
    searchwith:string
  }
}

const testdata =myData as TestData
test.describe.configure({mode:"serial"})




for (const [key,value] of Object.entries(testdata.myTestData)) {


  test(`data driven testing using Json ${key}`, async ({ page }) => {
  await page.goto(testdata.URL);
  await expect(page).toHaveTitle("Google");

  await page.getByTitle("Search").fill(value)
  await page.keyboard.press("Enter")


});
}


test('data driven testing using Json ', async ({ page }) => {
  await page.goto(testdata.URL);
 

  await page.getByTitle("Search").fill(testdata.searchData.searchwith)
  await page.keyboard.press("Enter")
  
}
)



