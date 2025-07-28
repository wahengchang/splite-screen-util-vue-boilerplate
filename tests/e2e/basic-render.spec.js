import { test, expect } from '@playwright/test';

test.describe('Basic Page Rendering', () => {
  test('should load the page without errors', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads successfully
    await expect(page).toHaveTitle(/Vue/);
    
    // Verify no console errors occurred
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    // Wait for Vue app to initialize
    await page.waitForLoadState('networkidle');
    
    // Verify no JavaScript errors
    expect(errors).toEqual([]);
  });

  test('should render main Vue components', async ({ page }) => {
    await page.goto('/');
    
    // Wait for Vue to mount
    await page.waitForLoadState('networkidle');
    
    // Check that Vue app root exists
    const app = page.locator('#app');
    await expect(app).toBeVisible();
    
    // Verify Vue components are rendered (adjust selectors based on your components)
    // These tests will need to be updated based on actual component structure
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load CSS and styling', async ({ page }) => {
    await page.goto('/');
    
    // Check that CSS files are loaded
    const styles = await page.evaluate(() => {
      return Array.from(document.styleSheets).length;
    });
    
    expect(styles).toBeGreaterThan(0);
  });
});