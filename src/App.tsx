import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { SiteLayout } from '@/components/layout/SiteLayout'
import { LandingPage } from '@/features/landing/LandingPage'
import { normalizeLanguage } from '@/locales/i18n'
import { applySeoMetadata, getSeoMetadata } from '@/lib/seo'

export function App() {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)

  useEffect(() => {
    applySeoMetadata(getSeoMetadata(language, window.location.href))
  }, [language])

  return (
    <SiteLayout>
      <LandingPage />
    </SiteLayout>
  )
}
