import { act, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { ContactForm } from '@/features/contact/ContactForm'
import type { ContactRequest } from '@/features/contact/contactSchema'
import { renderWithProviders } from '@/test/render'

function createDeferredRequest() {
  let resolveRequest: (() => void) | undefined
  const promise = new Promise<void>((resolve) => {
    resolveRequest = resolve
  })

  return {
    promise,
    resolve: () => {
      resolveRequest?.()
    },
  }
}

async function fillValidContactForm(
  user: ReturnType<typeof import('@testing-library/user-event').default.setup>,
) {
  await user.type(screen.getByRole('textbox', { name: 'Nome' }), 'Ana Silva')
  await user.type(screen.getByRole('textbox', { name: 'E-mail profissional' }), 'ana@example.com')
  await user.type(screen.getByRole('textbox', { name: 'Empresa (opcional)' }), 'Acme')
  await user.type(
    screen.getByRole('textbox', { name: 'Como podemos ajudar?' }),
    'Quero conhecer o produto.',
  )
  await user.click(screen.getByRole('checkbox', { name: /li e compreendi/i }))
}

describe('ContactForm', () => {
  it('shows accessible field guidance without sending invalid data', async () => {
    const submitRequest = vi.fn<(request: ContactRequest) => Promise<void>>()
    const { user } = renderWithProviders(<ContactForm submitRequest={submitRequest} />)

    await user.click(screen.getByRole('button', { name: 'Enviar solicitação' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Revise os campos destacados')
    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveAccessibleDescription(
      'Informe seu nome.',
    )
    expect(
      screen.getByRole('textbox', { name: 'E-mail profissional' }),
    ).toHaveAccessibleDescription('Informe um e-mail válido.')
    expect(submitRequest).not.toHaveBeenCalled()
  })

  it('supports a keyboard submission and announces success', async () => {
    const submitRequest = vi.fn<(request: ContactRequest) => Promise<void>>().mockResolvedValue()
    const { user } = renderWithProviders(<ContactForm submitRequest={submitRequest} />)

    await fillValidContactForm(user)
    screen.getByRole('button', { name: 'Enviar solicitação' }).focus()
    await user.keyboard('{Enter}')

    expect(submitRequest).toHaveBeenCalledWith({
      name: 'Ana Silva',
      email: 'ana@example.com',
      company: 'Acme',
      message: 'Quero conhecer o produto.',
      privacyAcknowledged: true,
      website: '',
    })
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Recebemos sua solicitação. Entraremos em contato em breve.',
    )
  })

  it('prevents duplicate submissions and exposes a recoverable generic error', async () => {
    const deferredRequest = createDeferredRequest()
    const submitRequest = vi
      .fn<(request: ContactRequest) => Promise<void>>()
      .mockReturnValueOnce(deferredRequest.promise)
    const { user } = renderWithProviders(<ContactForm submitRequest={submitRequest} />)

    await fillValidContactForm(user)
    await user.click(screen.getByRole('button', { name: 'Enviar solicitação' }))

    expect(screen.getByRole('button', { name: 'Enviando solicitação…' })).toBeDisabled()
    screen
      .getByRole('form', { name: 'Solicitação de demonstração' })
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    expect(submitRequest).toHaveBeenCalledTimes(1)

    await act(async () => {
      deferredRequest.resolve()
      await deferredRequest.promise
    })

    submitRequest.mockRejectedValueOnce(new Error('provider details must stay private'))
    await fillValidContactForm(user)
    await user.click(screen.getByRole('button', { name: 'Enviar solicitação' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível enviar agora. Revise sua conexão e tente novamente.',
    )
    expect(screen.queryByText(/provider details/i)).not.toBeInTheDocument()
  })
})
