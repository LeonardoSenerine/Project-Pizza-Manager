import { expect, test } from '@playwright/test';

test('update profile successfull', async ({ page }) => {
    await page.goto('/', {
        waitUntil: 'networkidle'
    })

    await page.getByRole('button', { name: 'diabao' }).click()
    await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

    await page.getByRole('textbox', { name: 'Nome' }).fill('Rocket piroca')

    await page.getByRole('textbox', { name: 'Descrição' }).fill('bem promensa mesmo')

    await page.getByRole('button', { name: 'Salvar' }).click()

    await page.waitForLoadState('networkidle')

    const toast = page.getByText('Perfil atualizado com sucesso!')
    expect(toast).toBeVisible()

    await page.getByRole('button', { name: 'Close' }).click()
    await page.waitForTimeout(250)
    expect(page.getByRole('button', { name: 'Rocket piroca' })).toBeVisible()

});