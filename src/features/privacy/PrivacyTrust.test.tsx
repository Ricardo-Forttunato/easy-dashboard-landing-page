import { screen } from '@testing-library/react'

import { ContactForm } from '@/features/contact/ContactForm'
import { PrivacyTrust } from '@/features/privacy/PrivacyTrust'
import { renderWithProviders } from '@/test/render'

describe('PrivacyTrust', () => {
  it('distinguishes browser-local dashboard data from the limited contact exception', () => {
    renderWithProviders(<PrivacyTrust />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Privacidade com limites claros' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/entradas manuais, conteúdo de arquivos, conjuntos derivados/i),
    ).toHaveTextContent('não envia nem armazena esses dados em servidores')
    expect(screen.getByText(/a única exceção é o contato comercial voluntário/i)).toHaveTextContent(
      'nome, e-mail profissional, empresa opcional, mensagem e confirmação',
    )
    expect(
      screen.getByText(/procedimentos preliminares relacionados a um possível contrato/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/vercel, resend e caixa de entrada/i)).toBeInTheDocument()
    expect(screen.getByText(/processamento principal nos Estados Unidos/i)).toBeInTheDocument()
    expect(screen.getByText(/não prometemos exclusão imediata/i)).toBeInTheDocument()
  })

  it('offers descriptive legal and LGPD-rights destinations', () => {
    renderWithProviders(<PrivacyTrust />)

    expect(screen.getByRole('link', { name: 'Como exercer seus direitos LGPD' })).toHaveAttribute(
      'href',
      '#privacy-rights',
    )
    expect(
      screen.getByRole('link', { name: 'Solicitar seus direitos por e-mail' }),
    ).toHaveAttribute('href', 'mailto:ricardo.forttunato@gmail.com')
    expect(
      screen.getByRole('link', { name: 'Direitos dos titulares na ANPD (site externo)' }),
    ).toHaveAttribute('href', expect.stringContaining('gov.br/anpd'))
    expect(
      screen.getByRole('link', { name: 'Aditivo de tratamento da Vercel (site externo)' }),
    ).toHaveAttribute('href', 'https://vercel.com/legal/dpa')
    expect(
      screen.getByRole('link', { name: 'Aditivo de tratamento da Resend (site externo)' }),
    ).toHaveAttribute('href', 'https://resend.com/legal/dpa')
  })

  it('provides equivalent English trust content', () => {
    renderWithProviders(<PrivacyTrust />, { language: 'en' })

    expect(
      screen.getByRole('heading', { level: 2, name: 'Privacy with clear boundaries' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/manual entries, file contents, derived datasets/i)).toHaveTextContent(
      'does not send or store this data on servers',
    )
    expect(screen.getByText(/primary processing in the United States/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'How to exercise your LGPD rights' }),
    ).toBeInTheDocument()
  })
})

describe('ContactForm privacy integration', () => {
  it('links the acknowledgement to the complete privacy boundary', () => {
    renderWithProviders(<ContactForm />)

    expect(
      screen.getByText(/este formulário envia somente os dados mínimos de contato/i),
    ).toHaveTextContent('não inclua dados de dashboards')
    expect(
      screen.getByRole('link', { name: 'Ler informações completas de privacidade' }),
    ).toHaveAttribute('href', '#privacy-details')
    expect(
      screen.getByRole('checkbox', { name: /li e compreendi o aviso de privacidade/i }),
    ).toBeInTheDocument()
  })
})
