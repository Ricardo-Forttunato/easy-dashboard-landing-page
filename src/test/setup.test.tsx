import { render, screen } from '@testing-library/react'

describe('test environment', () => {
  it('provides React Testing Library DOM matchers', () => {
    render(<button type="button">Solicitar demonstração</button>)

    expect(screen.getByRole('button', { name: 'Solicitar demonstração' })).toBeInTheDocument()
  })
})
