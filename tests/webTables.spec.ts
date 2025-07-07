import { test, expect, Page, Locator } from "@playwright/test"



test("Basic WebTable", async ({ page }) => {

    await page.goto("https://letcode.in/table")
    const table = page.locator("#simpletable")
    const header = table.locator("thead");
    console.log(await header.allTextContents());
    const rows = table.locator("tbody tr");
    console.log("rows count: " + await rows.count())

    const columns = rows.first().locator("td");

    console.log("columns count: " + await columns.count())
    //Way 1 using playwright hasText
    // await checkBoxCheck(rows, page, "Raj")
    //   await checkBoxCheck(rows, page, "Chatterjee")



    //Way 2

    for (let i = 0; i < await rows.count(); i++) {
        const row = rows.nth(i);
        const cols = row.locator("td");
        for (let j = 0; j < await cols.count(); j++) {
            if (await cols.nth(j).textContent() == "Raj") {
                console.log(await cols.nth(2).textContent());
                await cols.last().locator("input").check();

            }

        }

    }
    


})

async function checkBoxCheck(rows: Locator, page: Page, name: string) {
    const nameMatch = rows.filter({
        has: page.locator("td"),
        hasText: name
    })

    await nameMatch.locator("input").check();
}


test("webTable Calculation", async ({ page }) => {
    await page.goto("https://letcode.in/table")
    const table = page.locator("#shopping")

    const tbody = table.locator("tbody")

    const tfoot = table.locator("tfoot")


    const rows = tbody.locator("tr")
    console.log("rows count: " + await rows.count())
    let total = 0;

    for (let i = 0; i < await rows.count(); i++) {
        let price = await rows.nth(i).locator("td").last().textContent();
        total += Number(price)
    }

    let actual = await tfoot.locator("td").last().textContent();

    expect(Number(actual)).toBe(total)
    console.log(actual, total)


})


test("Sorting WebTable", async ({ page }) => {

    await page.goto("https://kitchen.applitools.com/ingredients/table")
    
    const tableHeader = page.locator("#column-button-name");
    const OriginalData = await page.locator("//tbody/tr/td[1]").allTextContents();
    const OriginalData1 = await page.locator("//tbody/tr/td[1]").allTextContents();
    console.log("Original Data: " + OriginalData)

    await tableHeader.click();
    const namesRowAsc = await page.locator("//tbody/tr/td[1]").allTextContents();
    console.log("Data after asc: " + namesRowAsc)

    expect(namesRowAsc).toEqual(OriginalData.sort((a, b) => a.localeCompare(b)))


    await tableHeader.click();
    const namesRowDes = await page.locator("//tbody/tr/td[1]").allTextContents();
    console.log("Data after des: " + namesRowDes)
    expect(namesRowDes).toEqual(OriginalData.sort((a, b) => b.localeCompare(a)))

    await tableHeader.click();
    const namesRowOrg = await page.locator("//tbody/tr/td[1]").allTextContents();
    console.log("Data after org: " + namesRowOrg)
    expect(namesRowOrg).toEqual(OriginalData1)




})


test("Pagination Table", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/")
    const element = page.getByText("Pagination Web Table")
    await element.scrollIntoViewIfNeeded();
    const rows = page.locator("#productTable tbody tr")

    const pages = page.locator(".pagination li a")
    console.log("Number of Pages: " + await pages.count())


    for (let i = 0; i < await pages.count(); i++) {
        if (i > 0) {
            await pages.nth(i).click();

        }

        for (let i = 0; i < await rows.count(); i++) {

            let tds = rows.nth(i).locator("td")
            for (let j = 0; j < await tds.count() - 1; j++) {
                console.log(await tds.nth(j).textContent())
            }
        }

    }

})