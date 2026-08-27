import { expect, type Locator, type Page, test } from '@playwright/test'

test.use({ locale: 'pt-BR' })

async function focusWithTab(page: Page, target: Locator): Promise<void> {
  for (let attempt = 0; attempt < 45; attempt += 1) {
    await page.keyboard.press('Tab')
    if (await target.evaluate((element) => element === document.activeElement)) return
  }

  throw new Error('Target was not reached with Tab navigation')
}

test('reaches privacy disclosures and LGPD rights using only Tab and Enter', async ({ page }) => {
  await page.goto('/')

  const privacyNavigation = page.getByRole('link', { name: 'Privacidade', exact: true }).first()
  await focusWithTab(page, privacyNavigation)
  await page.keyboard.press('Enter')

  await expect(
    page.getByRole('heading', { name: 'Privacidade com limites claros' }),
  ).toBeInViewport()
  await expect(page.getByText(/não envia nem armazena esses dados em servidores/i)).toBeVisible()
  await expect(page.getByText(/a única exceção é o contato comercial voluntário/i)).toBeVisible()

  const rightsLink = page.getByRole('link', { name: 'Como exercer seus direitos LGPD' })
  await focusWithTab(page, rightsLink)
  await page.keyboard.press('Enter')

  await expect(page.getByRole('heading', { name: 'Seus direitos e nosso canal' })).toBeInViewport()

  const emailLink = page.getByRole('link', { name: 'Solicitar seus direitos por e-mail' })
  await focusWithTab(page, emailLink)
  await expect(emailLink).toBeFocused()
  await expect(emailLink).toHaveAttribute('href', 'mailto:ricardo.forttunato@gmail.com')

  const anpdLink = page.getByRole('link', {
    name: 'Direitos dos titulares na ANPD (site externo)',
  })
  await focusWithTab(page, anpdLink)
  await expect(anpdLink).toBeFocused()
})

test('connects the contact notice to the complete privacy details', async ({ page }) => {
  await page.goto('/#contact')

  const detailsLink = page.getByRole('link', { name: 'Ler informações completas de privacidade' })
  await detailsLink.scrollIntoViewIfNeeded()
  await detailsLink.focus()
  await page.keyboard.press('Enter')

  await expect(page.locator('#privacy-details')).toBeInViewport()
  await expect(page.getByText(/vercel, resend e caixa de entrada/i)).toBeVisible()
  await expect(
    page.getByRole('checkbox', { name: /li e compreendi o aviso de privacidade/i }),
  ).toBeVisible()
})
