import { Box, Link, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/ui/Section'
import { privacyContent, privacyLinks } from '@/features/privacy/privacyContent'
import { normalizeLanguage } from '@/locales/i18n'

export function PrivacyTrust() {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)
  const content = privacyContent[language]
  const topics = [
    content.localProcessing,
    content.contact,
    content.lawfulBasis,
    content.processors,
    content.transfer,
    content.retention,
  ]

  return (
    <Section id="privacy" title={content.title}>
      <Typography color="text.secondary">{content.intro}</Typography>
      <Link href="#privacy-rights" sx={{ alignSelf: 'flex-start', fontWeight: 700 }}>
        {content.rightsJump}
      </Link>

      <Box
        id="privacy-details"
        tabIndex={-1}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          gap: 2,
          scrollMarginTop: '6rem',
        }}
      >
        {topics.map((topic) => (
          <Paper component="article" key={topic.title} variant="outlined" sx={{ p: 3 }}>
            <Typography component="h3" variant="h6" gutterBottom>
              {topic.title}
            </Typography>
            <Typography color="text.secondary">{topic.text}</Typography>

            {topic === content.processors ? (
              <Stack component="ul" spacing={1} sx={{ mb: 0, mt: 2, pl: 2.5 }}>
                <li>
                  <Link href={privacyLinks.vercelDpa}>{content.processorsLinks.vercel}</Link>
                </li>
                <li>
                  <Link href={privacyLinks.resendDpa}>{content.processorsLinks.resend}</Link>
                </li>
              </Stack>
            ) : null}

            {topic === content.transfer ? (
              <Link href={privacyLinks.anpdTransfers} sx={{ display: 'inline-block', mt: 2 }}>
                {content.transfer.anpdLink}
              </Link>
            ) : null}
          </Paper>
        ))}
      </Box>

      <Paper
        id="privacy-rights"
        component="article"
        tabIndex={-1}
        variant="outlined"
        sx={{ p: 3, scrollMarginTop: '6rem' }}
      >
        <Typography component="h3" variant="h6" gutterBottom>
          {content.rights.title}
        </Typography>
        <Typography color="text.secondary">{content.rights.text}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
          <Link href="mailto:ricardo.forttunato@gmail.com">{content.rights.emailLink}</Link>
          <Link href={privacyLinks.anpdRights}>{content.rights.anpdLink}</Link>
        </Stack>
      </Paper>
    </Section>
  )
}
