import { screen } from '@testing-library/react'

import { SiteLayout } from '@/components/layout/SiteLayout'
import { renderWithProviders } from '@/test/render'

describe('SiteLayout', () => {
  it('provides semantic landmarks and a keyboard-first skip link', async () => {
    const { user } = renderWithProviders(
      <SiteLayout>
        <h1>Conteúdo principal</h1>
      </SiteLayout>,
    )

    const skipLink = screen.getByRole('link', { name: 'Pular para o conteúdo principal' })

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')

    await user.tab()

    expect(skipLink).toHaveFocus()

    await user.click(skipLink)

    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('changes all shared navigation labels and the document language', async () => {
    const { user } = renderWithProviders(
      <SiteLayout>
        <h1>Conteúdo principal</h1>
      </SiteLayout>,
    )

    await user.click(screen.getByRole('button', { name: 'English' }))

    expect(document.documentElement).toHaveAttribute('lang', 'en')
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Capabilities' })).toHaveAttribute(
      'href',
      '#capabilities',
    )
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true')
  })
})
