import { test, expect } from '@playwright/test';



test('Read env', async ({ page }) => {
  await page.goto(process.env.URL as string);
  await expect(page).toHaveTitle("Google");
});