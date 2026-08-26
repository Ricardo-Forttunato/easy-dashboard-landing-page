import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const colors = {
  primary: '#0B57D0',
  primaryDark: '#073B94',
  ink: '#111827',
  mutedInk: '#374151',
  canvas: '#F7F9FC',
  paper: '#FFFFFF',
  border: '#CBD5E1',
  success: '#146C43',
  error: '#B42318',
} as const

const focusStyles = {
  outline: `3px solid ${colors.ink}`,
  outlineOffset: '3px',
} as const

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      contrastText: colors.paper,
    },
    background: {
      default: colors.canvas,
      paper: colors.paper,
    },
    text: {
      primary: colors.ink,
      secondary: colors.mutedInk,
    },
    divider: colors.border,
    success: {
      main: colors.success,
    },
    error: {
      main: colors.error,
    },
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: 'clamp(2rem, 7vw, 4.5rem)',
      fontWeight: 750,
      letterSpacing: '-0.04em',
      lineHeight: 1.05,
    },
    h2: {
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.15,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.65,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          minWidth: '320px',
          scrollPaddingTop: '6rem',
        },
        body: {
          minWidth: '320px',
          minHeight: '100vh',
          margin: 0,
          overflowX: 'hidden',
        },
        '#root': {
          minHeight: '100vh',
        },
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])': {
          '&:focus-visible': focusStyles,
        },
        '@media (forced-colors: active)': {
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])': {
            '&:focus-visible': {
              outline: '3px solid CanvasText',
            },
          },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            scrollBehavior: 'auto !important',
            transitionDuration: '0.01ms !important',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 10,
          paddingInline: 20,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textUnderlineOffset: '0.18em',
        },
      },
    },
  },
})

export const theme = responsiveFontSizes(baseTheme)
