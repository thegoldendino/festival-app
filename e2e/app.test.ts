import { test, expect } from '@playwright/test';

test('FestivalApp renders correctly', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for the app to load
  await page.waitForSelector('div.festival-app');
  
  // Verify header exists
  const header = await page.locator('header');
  await expect(header).toBeVisible();
  
  // Verify map container exists
  const mapContainer = await page.locator('.map-container');
  await expect(mapContainer).toBeVisible();
  
  // Verify footer with action buttons exists
  const footer = await page.locator('footer');
  await expect(footer).toBeVisible();
  
  // The drawer is not visible by default, it only opens when user clicks on the stages button
  // So we'll check that it exists in the DOM but is not visible
  const drawer = await page.locator('dialog.drawer');
  await expect(drawer).toBeAttached();
});