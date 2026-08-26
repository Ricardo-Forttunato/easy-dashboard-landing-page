import { CssBaseline, ThemeProvider } from '@mui/material'
import { render, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'

import { createI18nInstance, type AppLanguage } from '@/locales/i18n'
import { theme } from '@/theme/theme'

interface ProviderRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  language?: AppLanguage
}

export function renderWithProviders(
  ui: ReactElement,
  { language = 'pt', ...renderOptions }: ProviderRenderOptions = {},
) {
  const testI18n = createI18nInstance(language)
  const user = userEvent.setup()
  const renderResult = render(
    <I18nextProvider i18n={testI18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {ui}
      </ThemeProvider>
    </I18nextProvider>,
    renderOptions,
  )

  return {
    ...renderResult,
    i18n: testI18n,
    user,
  }
}
