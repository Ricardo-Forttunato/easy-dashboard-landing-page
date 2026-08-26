import i18n, { createInstance, type i18n as I18nInstance, type InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en } from '@/locales/en'
import { pt } from '@/locales/pt'

export type AppLanguage = 'pt' | 'en'

export const resources = { pt, en } as const

const supportedLanguages: readonly AppLanguage[] = ['pt', 'en']

export function normalizeLanguage(language: string | null | undefined): AppLanguage {
  const normalizedLanguage = language?.trim().toLowerCase()

  return normalizedLanguage?.startsWith('en') ? 'en' : 'pt'
}

export function resolvePreferredLanguage(languages: readonly string[]): AppLanguage {
  const supportedPreference = languages.find((language) =>
    supportedLanguages.some((supportedLanguage) =>
      language.toLowerCase().startsWith(supportedLanguage),
    ),
  )

  return normalizeLanguage(supportedPreference)
}

export function detectBrowserLanguage(): AppLanguage {
  if (typeof navigator === 'undefined') {
    return 'pt'
  }

  return resolvePreferredLanguage([...navigator.languages, navigator.language])
}

export function createI18nOptions(language: AppLanguage): InitOptions {
  return {
    resources,
    lng: language,
    fallbackLng: 'pt',
    supportedLngs: [...supportedLanguages],
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  }
}

export function createI18nInstance(language: AppLanguage = 'pt'): I18nInstance {
  const instance = createInstance()

  void instance.use(initReactI18next).init({
    ...createI18nOptions(language),
    initAsync: false,
  })

  return instance
}

function syncDocumentLanguage(language: string): void {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = normalizeLanguage(language) === 'pt' ? 'pt-BR' : 'en'
  }
}

i18n.on('languageChanged', syncDocumentLanguage)
void i18n.use(initReactI18next).init(createI18nOptions(detectBrowserLanguage()))
syncDocumentLanguage(i18n.language)

export async function changeAppLanguage(language: AppLanguage): Promise<void> {
  await i18n.changeLanguage(language)
}

export { i18n }
