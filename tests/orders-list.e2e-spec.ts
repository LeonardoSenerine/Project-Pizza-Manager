import { test, expect } from '@playwright/test';

test('order-list', async ({ page }) => {
    await page.goto('/orders', {
        waitUntil: 'networkidle'
    })
    expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeVisible()

    await page.waitForTimeout(200)
});