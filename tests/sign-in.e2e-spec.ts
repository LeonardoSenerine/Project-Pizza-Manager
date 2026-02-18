import { test, expect } from '@playwright/test';

test('sign in succesfully', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle'
  })
  await page.getByRole('textbox', { name: 'Seu email' }).fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Enviamos um link de autentificação para seu email.')

  expect(toast).toBeVisible()
  await page.waitForTimeout(2000)
});
test('sign in with wronk credentials', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle'
  })
  await page.getByRole('textbox', { name: 'Seu email' }).fill('wrongdoe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Credenciais invalidas')

  expect(toast).toBeVisible()
  await page.waitForTimeout(2000)
});
test('navigate to new page', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle'
  })
  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()
  expect(page.url()).toContain('/sign-up')

});