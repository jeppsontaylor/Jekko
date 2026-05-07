import { test, expect } from '@playwright/test';

test('dashboard has correct image assets', async ({ page, request }) => {
  await page.goto('/dashboard/');

  const logo = page.locator('img[alt="Jnoccio"]');
  await expect(logo).toBeVisible();
  const logoSrc = await logo.getAttribute('src');
  expect(logoSrc).toBe('/dashboard/assets/jnoccio_logo.png');

  const logoResponse = await request.get(logoSrc!);
  expect(logoResponse.status()).toBe(200);

  const splash = page.locator('img[alt="Jnoccio Fusion"]');
  const splashSrc = await splash.getAttribute('src');
  expect(splashSrc).toBe('/dashboard/assets/jnoccio_header.png');

  const splashResponse = await request.get(splashSrc!);
  expect(splashResponse.status()).toBe(200);
});

test('all tabs render without errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/dashboard/');
  await page.waitForTimeout(1000);

  const tabs = ['Board', 'Speed', 'Vault', 'Limits', 'Feed'];
  for (const label of tabs) {
    const btn = page.locator('.tab-btn', { hasText: label });
    await expect(btn).toBeVisible();
    await btn.click();
    await page.waitForTimeout(300);
  }

  expect(errors).toEqual([]);
});

test('limits tab shows rate limit observatory', async ({ page }) => {
  await page.goto('/dashboard/');
  await page.waitForTimeout(1000);

  await page.locator('.tab-btn', { hasText: 'Limits' }).click();
  await page.waitForTimeout(300);

  await expect(page.locator('h2', { hasText: 'Rate Limit Observatory' })).toBeVisible();
  await expect(page.locator('h3', { hasText: 'Context Runs' })).toBeVisible();
  await expect(page.locator('select[aria-label="Context model filter"]')).toBeVisible();
  await expect(page.locator('h3', { hasText: 'Known Capacity' })).toBeVisible();
  await expect(page.locator('h3', { hasText: 'Inferred Limits' })).toBeVisible();
  await expect(page.locator('h3', { hasText: 'Error Pattern Analysis' })).toBeVisible();
});
