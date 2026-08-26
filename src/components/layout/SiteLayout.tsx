import { Box, Button, Container, Link, Stack, Typography } from '@mui/material'
import { useEffect, type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { normalizeLanguage, type AppLanguage } from '@/locales/i18n'

const navigationItems = [
  { href: '#overview', labelKey: 'navigation.overview' },
  { href: '#capabilities', labelKey: 'navigation.capabilities' },
  { href: '#privacy', labelKey: 'navigation.privacy' },
  { href: '#contact', labelKey: 'navigation.contact' },
] as const

const languages: readonly { code: AppLanguage; labelKey: string }[] = [
  { code: 'pt', labelKey: 'language.portuguese' },
  { code: 'en', labelKey: 'language.english' },
]

export function SiteLayout({ children }: PropsWithChildren) {
  const { i18n, t } = useTranslation()
  const activeLanguage = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)

  useEffect(() => {
    document.documentElement.lang = activeLanguage === 'pt' ? 'pt-BR' : 'en'
  }, [activeLanguage])

  function focusMainContent(): void {
    document.getElementById('main-content')?.focus()
  }

  function selectLanguage(language: AppLanguage): void {
    void i18n.changeLanguage(language)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Link
        href="#main-content"
        onClick={focusMainContent}
        sx={{
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.tooltip + 1,
          top: 16,
          left: 16,
          px: 2,
          py: 1.25,
          borderRadius: 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 4,
          transform: 'translateY(-200%)',
          '&:focus': {
            transform: 'translateY(0)',
          },
        }}
      >
        {t('common.skipToContent')}
      </Link>

      <Box
        component="header"
        sx={{
          position: 'sticky',
          zIndex: (theme) => theme.zIndex.appBar,
          top: 0,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'rgba(247, 249, 252, 0.96)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateAreas: {
                xs: '"brand language" "navigation navigation"',
                md: '"brand navigation language"',
              },
              gridTemplateColumns: { xs: '1fr auto', md: '1fr auto auto' },
              alignItems: 'center',
              gap: { xs: 1.5, md: 3 },
              py: 2,
            }}
          >
            <Link
              href="#overview"
              color="inherit"
              underline="none"
              sx={{ gridArea: 'brand', justifySelf: 'start' }}
            >
              <Typography component="span" variant="h6" sx={{ fontWeight: 800 }}>
                {t('common.brandName')}
              </Typography>
            </Link>

            <Box component="nav" aria-label={t('navigation.label')} sx={{ gridArea: 'navigation' }}>
              <Stack
                component="ul"
                direction="row"
                spacing={{ xs: 1.5, sm: 2.5 }}
                sx={{ p: 0, m: 0, listStyle: 'none', flexWrap: 'wrap' }}
              >
                {navigationItems.map(({ href, labelKey }) => (
                  <Box component="li" key={href}>
                    <Link href={href} color="text.primary">
                      {t(labelKey)}
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Stack
              role="group"
              aria-label={t('language.label')}
              direction="row"
              spacing={0.5}
              sx={{ gridArea: 'language', justifySelf: 'end' }}
            >
              {languages.map(({ code, labelKey }) => {
                const isActive = activeLanguage === code

                return (
                  <Button
                    key={code}
                    type="button"
                    size="small"
                    variant={isActive ? 'contained' : 'outlined'}
                    aria-label={t(labelKey)}
                    aria-pressed={isActive}
                    onClick={() => {
                      selectLanguage(code)
                    }}
                  >
                    {code.toUpperCase()}
                  </Button>
                )
              })}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Box component="main" id="main-content" tabIndex={-1}>
        {children}
      </Box>

      <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 5 }}>
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Typography color="text.secondary">{t('footer.tagline')}</Typography>
            <Box component="nav" aria-label={t('footer.label')}>
              <Stack direction="row" spacing={2.5} sx={{ flexWrap: 'wrap' }}>
                {navigationItems.slice(2).map(({ href, labelKey }) => (
                  <Link key={href} href={href} color="text.primary">
                    {t(labelKey)}
                  </Link>
                ))}
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} EasyDashboard. {t('footer.rights')}
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
