import { test, expect } from '@playwright/test';

test('display day orders amount metrics', async ({ page }) => {
    await page.goto('/', {
        waitUntil: 'networkidle'
    })
    expect(page.getByText('20', { exact: true })).toBeVisible()
    expect(page.getByText('-5% em relação a ontem')).toBeVisible()
    await page.waitForTimeout(200)
});
test('display month orders amount metrics', async ({ page }) => {
    await page.goto('/', {
        waitUntil: 'networkidle'
    })
    expect(page.getByText('213.123')).toBeVisible()
    expect(page.getByText('+10000% em relação ao mês')).toBeVisible()
    await page.waitForTimeout(200)
});
test('display total orders amount metrics', async ({ page }) => {
    await page.goto('/', {
        waitUntil: 'networkidle'
    })
    expect(page.getByText('R$ 1.000.000.000.000.000,00')).toBeVisible()
    expect(page.getByText('10% em relação ao mês passado')).toBeVisible()
    await page.waitForTimeout(200)
});
test('display canceled orders amount metrics', async ({ page }) => {
    await page.goto('/', {
        waitUntil: 'networkidle'
    })
    expect(page.getByText('1.000.000.000.000', { exact: true })).toBeVisible()
    expect(page.getByText('-5% em relação ao mês passado')).toBeVisible()
    await page.waitForTimeout(200)
});
