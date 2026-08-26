import { screen } from '@testing-library/react'

import { Hero } from '@/features/landing/Hero'
import { renderWithProviders } from '@/test/render'

describe('Hero', () => {
  it('communicates product value, local processing, and the primary CTA in Portuguese', () => {
    renderWithProviders(<Hero />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Transforme seus dados em gráficos interativos — direto no navegador',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/entrada manual ou arquivos/i)).toBeInTheDocument()
    expect(screen.getByText(/nunca saem do seu dispositivo/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Solicitar uma demonstração' })).toHaveAttribute(
      'href',
      '#contact',
    )
    expect(screen.getByRole('img', { name: /tela principal do EasyDashboard/i })).toHaveAttribute(
      'fetchpriority',
      'high',
    )
  })

  it('provides equivalent English content', () => {
    renderWithProviders(<Hero />, { language: 'en' })

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Turn your data into interactive charts — directly in your browser',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/never leaves your device/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Request a demonstration' })).toBeInTheDocument()
  })
})
