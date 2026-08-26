import { normalizeLanguage, resolvePreferredLanguage } from '@/locales/i18n'

describe('language resolution', () => {
  it('uses the first supported browser preference', () => {
    expect(resolvePreferredLanguage(['fr-FR', 'en-US', 'pt-BR'])).toBe('en')
  })

  it('falls back to Portuguese for unsupported or missing languages', () => {
    expect(resolvePreferredLanguage(['fr-FR', 'es-AR'])).toBe('pt')
    expect(normalizeLanguage(undefined)).toBe('pt')
  })
})
