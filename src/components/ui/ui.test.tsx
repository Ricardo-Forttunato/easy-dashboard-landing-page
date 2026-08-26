import { screen } from '@testing-library/react'

import { PrimaryCta } from '@/components/ui/PrimaryCta'
import { Section } from '@/components/ui/Section'
import { StatusMessage } from '@/components/ui/StatusMessage'
import { renderWithProviders } from '@/test/render'

describe('shared UI primitives', () => {
  it('creates a labelled semantic section with the requested heading level', () => {
    renderWithProviders(
      <Section id="capabilities" title="Recursos" headingLevel="h2">
        <p>Conteúdo</p>
      </Section>,
    )

    expect(screen.getByRole('region', { name: 'Recursos' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Recursos', level: 2 })).toBeInTheDocument()
  })

  it('supports link CTAs and accessible status announcements', () => {
    renderWithProviders(
      <>
        <PrimaryCta href="#contact">Solicitar demonstração</PrimaryCta>
        <StatusMessage severity="error">Não foi possível enviar.</StatusMessage>
      </>,
    )

    expect(screen.getByRole('link', { name: 'Solicitar demonstração' })).toHaveAttribute(
      'href',
      '#contact',
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível enviar.')
  })
})
