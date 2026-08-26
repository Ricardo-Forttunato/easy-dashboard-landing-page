import { expect, type Locator, type Page, test } from '@playwright/test'

test.use({ locale: 'pt-BR' })

async function focusWithTab(page: Page, target: Locator): Promise<void> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    await page.keyboard.press('Tab')
    if (await target.evaluate((element) => element === document.activeElement)) {
      return
    }
  }

  throw new Error('Target was not reached with Tab navigation')
}

async function fillContactForm(page: Page): Promise<void> {
  await page.getByRole('textbox', { name: 'Nome' }).fill('Ana Silva')
  await page.getByRole('textbox', { name: 'E-mail profissional' }).fill('ana@example.com')
  await page.getByRole('textbox', { name: 'Empresa (opcional)' }).fill('Acme')
  await page.getByRole('textbox', { name: 'Como podemos ajudar?' }).fill('Quero uma demonstração.')
  await page.getByRole('checkbox', { name: /li e compreendi/i }).check()
}

test('CTA and contact request succeed with Tab and Enter', async ({ page }) => {
  let submittedBody: unknown
  await page.route('**/api/contact', async (route) => {
    submittedBody = route.request().postDataJSON()
    await route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: '{"status":"accepted"}',
    })
  })
  await page.goto('/')

  await expect(page.getByRole('link', { name: 'Solicitar uma demonstração' })).toBeInViewport()

  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo principal' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()

  const cta = page.getByRole('link', { name: 'Solicitar uma demonstração' })
  await focusWithTab(page, cta)
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Solicite uma demonstração' })).toBeInViewport()

  await fillContactForm(page)
  await page.getByRole('button', { name: 'Enviar solicitação' }).focus()
  await page.keyboard.press('Enter')

  await expect(page.getByRole('status')).toContainText('Recebemos sua solicitação')
  expect(submittedBody).toEqual({
    name: 'Ana Silva',
    email: 'ana@example.com',
    company: 'Acme',
    message: 'Quero uma demonstração.',
    privacyAcknowledged: true,
    website: '',
  })
})

test('contact delivery errors are generic and recoverable', async ({ page }) => {
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: '{"error":"delivery_unavailable","internal":"must not appear"}',
    })
  })
  await page.goto('/#contact')
  await fillContactForm(page)

  await page.getByRole('button', { name: 'Enviar solicitação' }).click()

  await expect(page.getByRole('alert')).toContainText('Não foi possível enviar agora')
  await expect(page.getByText('must not appear')).toHaveCount(0)
  await expect(page.getByRole('textbox', { name: 'E-mail profissional' })).toHaveValue(
    'ana@example.com',
  )
})
