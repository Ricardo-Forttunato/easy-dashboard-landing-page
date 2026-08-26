import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/features/contact/ContactForm'
import { ProductDemo } from '@/features/demonstration/ProductDemo'
import { ProductVisuals } from '@/features/demonstration/ProductVisuals'
import { Hero } from '@/features/landing/Hero'

export function LandingPage() {
  const { t } = useTranslation()

  return (
    <>
      <Hero />
      <Section id="capabilities" title={t('shell.capabilitiesTitle')}>
        <Typography color="text.secondary">{t('shell.capabilitiesDescription')}</Typography>
        <ProductDemo />
        <ProductVisuals placement="details" />
      </Section>
      <Section id="privacy" title={t('shell.privacyTitle')}>
        <Typography color="text.secondary">{t('shell.privacyDescription')}</Typography>
      </Section>
      <Section id="contact" title={t('contact.title')}>
        <Typography color="text.secondary">{t('contact.description')}</Typography>
        <ContactForm />
      </Section>
    </>
  )
}
