import { test, expect } from '@playwright/test';

test('sign up succesfully', async ({ page }) => {
    await page.goto('/sign-up', {
        waitUntil: 'networkidle'
    })
    await page.getByRole('textbox', { name: 'Nome do estabelecimento' }).fill('Pizza Shop')
    await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')
    await page.getByRole('textbox', { name: 'Seu email' }).fill('johndoe@example.com')
    await page.getByRole('textbox', { name: 'Seu celular' }).fill('1231231231')

    await page.getByRole('button', { name: 'Finalizar cadastro' }).click()
    const toast = page.getByText('Restaurante cadastrado com sucesso.')
    expect(toast).toBeVisible()
    await page.waitForTimeout(2000)
});
test('sign up error', async ({ page }) => {
    await page.goto('/sign-up', {
        waitUntil: 'networkidle'
    })
    await page.getByRole('textbox', { name: 'Nome do estabelecimento' }).fill('bora bil')
    await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')
    await page.getByRole('textbox', { name: 'Seu email' }).fill('johndoe@example.com')
    await page.getByRole('textbox', { name: 'Seu celular' }).fill('1231231231')

    await page.getByRole('button', { name: 'Finalizar cadastro' }).click()
    const toast = page.getByText('Erro ao cadastrar restaurante')
    expect(toast).toBeVisible()
    await page.waitForTimeout(2000)
});
test('navigate to new login page', async ({ page }) => {
    await page.goto('/sign-up', {
        waitUntil: 'networkidle'
    })
    await page.getByRole('link', { name: 'Fazer login' }).click()
    expect(page.url()).toContain('/sign-in')

});