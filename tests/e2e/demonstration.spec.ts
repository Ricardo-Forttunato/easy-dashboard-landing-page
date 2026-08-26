import { expect, type Locator, type Page, test } from '@playwright/test'

test.use({ locale: 'pt-BR' })

async function focusWithTab(page: Page, target: Locator): Promise<void> {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await page.keyboard.press('Tab')
    if (await target.evaluate((element) => element === document.activeElement)) return
  }

  throw new Error('Target was not reached with Tab navigation')
}

test('explores both fictional workflows using only the keyboard', async ({ page }) => {
  const contactRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('/api/contact')) contactRequests.push(request.url())
  })

  await page.goto('/')

  const capabilitiesLink = page.getByRole('link', { name: 'Recursos', exact: true })
  await focusWithTab(page, capabilitiesLink)
  await page.keyboard.press('Enter')

  await expect(page.getByRole('heading', { name: 'Recursos do produto' })).toBeInViewport()
  await expect(page.getByText(/usa somente dados fictícios/i)).toBeVisible()

  const manualTab = page.getByRole('tab', { name: 'Entrada manual' })
  const uploadTab = page.getByRole('tab', { name: 'Upload de arquivo' })
  await focusWithTab(page, manualTab)
  await page.keyboard.press('ArrowRight')
  await expect(uploadTab).toBeFocused()
  await page.keyboard.press('Enter')

  await expect(uploadTab).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByText(/vendas-exemplo\.csv/i)).toBeVisible()
  await expect(page.getByRole('img', { name: /projetos fictícios por trimestre/i })).toBeVisible()
  await expect(page.locator('input[type="file"]')).toHaveCount(0)
  expect(contactRequests).toEqual([])
})

test('renders the static fallback and lazy secondary visuals with reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#capabilities')

  await expect(page.getByTestId('example-chart')).toHaveAttribute('data-motion', 'off')
  await expect(page.getByText(/valores exibidos sem animação/i)).toBeVisible()

  const secondaryImages = page.locator('#capabilities img[data-visual="secondary"]')
  await expect(secondaryImages).toHaveCount(3)
  for (const image of await secondaryImages.all()) {
    await expect(image).toHaveAttribute('loading', 'lazy')
  }
})
