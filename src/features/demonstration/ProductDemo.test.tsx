import { screen } from '@testing-library/react'
import { vi } from 'vitest'

import { ProductDemo } from '@/features/demonstration/ProductDemo'
import { ProductVisuals } from '@/features/demonstration/ProductVisuals'
import { renderWithProviders } from '@/test/render'

function emulateReducedMotion(matches: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: matches && query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

describe('ProductDemo', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('explains both input paths with fictional data and an equivalent chart summary', () => {
    renderWithProviders(<ProductDemo />)

    expect(
      screen.getByRole('region', { name: 'Demonstração interativa com dados fictícios' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/usa somente dados fictícios/i)).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Entrada manual' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'Upload de arquivo' })).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /projetos fictícios por trimestre/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('table', { name: 'Dados fictícios do gráfico' })).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(document.querySelector('input[type="file"]')).not.toBeInTheDocument()
  })

  it('switches workflows with keyboard controls and exposes the uploaded-file outcome', async () => {
    const { user } = renderWithProviders(<ProductDemo />)
    const manualTab = screen.getByRole('tab', { name: 'Entrada manual' })
    const uploadTab = screen.getByRole('tab', { name: 'Upload de arquivo' })

    await user.tab()
    expect(manualTab).toHaveFocus()
    await user.keyboard('{ArrowRight}{Enter}')

    expect(uploadTab).toHaveFocus()
    expect(uploadTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/vendas-exemplo\.csv/i)).toBeInTheDocument()
    expect(screen.getAllByText(/selecione as colunas categoria e valor/i)).toHaveLength(2)
    expect(screen.getByRole('status')).toHaveTextContent('Exibindo o fluxo Upload de arquivo')
  })

  it('uses a static, meaningful fallback when reduced motion is requested', () => {
    emulateReducedMotion(true)

    renderWithProviders(<ProductDemo />)

    expect(screen.getByTestId('example-chart')).toHaveAttribute('data-motion', 'off')
    expect(screen.getByText(/valores exibidos sem animação/i)).toBeInTheDocument()
  })

  it('provides equivalent English labels and descriptions', () => {
    renderWithProviders(<ProductDemo />, { language: 'en' })

    expect(
      screen.getByRole('region', { name: 'Interactive demonstration with fictional data' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Manual input' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'File upload' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /fictional projects by quarter/i })).toBeInTheDocument()
  })
})

describe('ProductVisuals', () => {
  it('prioritizes the hero visual and lazy-loads secondary product images', () => {
    const { rerender } = renderWithProviders(<ProductVisuals placement="hero" />)
    const heroImage = screen.getByRole('img', { name: /tela principal do EasyDashboard/i })

    expect(heroImage).toHaveAttribute('loading', 'eager')
    expect(heroImage).toHaveAttribute('fetchpriority', 'high')

    rerender(<ProductVisuals placement="details" />)

    const detailImages = screen.getAllByRole('img')
    expect(detailImages).toHaveLength(3)
    for (const image of detailImages) {
      expect(image).toHaveAttribute('loading', 'lazy')
    }
  })
})
