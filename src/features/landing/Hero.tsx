import { Box, Container, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { PrimaryCta } from '@/components/ui/PrimaryCta'

export function Hero() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      id="overview"
      aria-labelledby="overview-title"
      sx={{ py: { xs: 3, md: 11 }, scrollMarginTop: '6rem' }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 1.5, md: 3 }} sx={{ alignItems: 'flex-start', maxWidth: 880 }}>
          <Typography
            component="p"
            variant="overline"
            color="primary.main"
            sx={{ fontWeight: 800 }}
          >
            {t('hero.eyebrow')}
          </Typography>
          <Typography id="overview-title" component="h1" variant="h1">
            {t('hero.title')}
          </Typography>
          <Typography component="p" variant="h5" color="text.secondary">
            {t('hero.description')}
          </Typography>
          <Typography component="p" sx={{ fontWeight: 700 }}>
            {t('hero.privacy')}
          </Typography>
          <PrimaryCta href="#contact">{t('hero.cta')}</PrimaryCta>
        </Stack>
      </Container>
    </Box>
  )
}
