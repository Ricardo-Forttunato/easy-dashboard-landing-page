import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { SiteLayout } from '@/components/layout/SiteLayout'
import { Section } from '@/components/ui/Section'
import { normalizeLanguage } from '@/locales/i18n'
import { applySeoMetadata, getSeoMetadata } from '@/lib/seo'

export function App() {
  const { i18n, t } = useTranslation()
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)

  useEffect(() => {
    applySeoMetadata(getSeoMetadata(language, window.location.href))
  }, [language])

  return (
    <SiteLayout>
      <Section
        id="overview"
        title={t('shell.title')}
        eyebrow={t('shell.eyebrow')}
        headingLevel="h1"
      >
        <Typography component="p" variant="h5" color="text.secondary">
          {t('shell.description')}
        </Typography>
      </Section>

      <Section id="capabilities" title={t('shell.capabilitiesTitle')}>
        <Typography color="text.secondary">{t('shell.capabilitiesDescription')}</Typography>
      </Section>

      <Section id="privacy" title={t('shell.privacyTitle')}>
        <Typography color="text.secondary">{t('shell.privacyDescription')}</Typography>
      </Section>

      <Section id="contact" title={t('shell.contactTitle')}>
        <Typography color="text.secondary">{t('shell.contactDescription')}</Typography>
      </Section>
    </SiteLayout>
  )
}
