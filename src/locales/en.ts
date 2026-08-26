import type { AppDictionary } from '@/locales/pt'

export const en = {
  translation: {
    common: {
      brandName: 'EasyDashboard',
      skipToContent: 'Skip to main content',
    },
    navigation: {
      label: 'Main navigation',
      overview: 'Overview',
      capabilities: 'Capabilities',
      privacy: 'Privacy',
      contact: 'Contact',
    },
    language: {
      label: 'Select language',
      portuguese: 'Português',
      english: 'English',
    },
    shell: {
      eyebrow: 'Browser-based B2B dashboards',
      title: 'Turn data into interactive charts with privacy',
      description:
        'A simple experience for creating visualizations from manually entered data or uploaded files.',
      capabilitiesTitle: 'Product capabilities',
      capabilitiesDescription:
        'The accessible demonstration will show how both input methods become interactive charts.',
      privacyTitle: 'Dashboard data stays on your device',
      privacyDescription:
        'Inputs, files, derived data, and charts are processed in the browser and are not sent to our servers.',
      contactTitle: 'Request a demonstration',
      contactDescription:
        'Commercial contact will be a separate journey and will request only the data needed to answer you.',
    },
    actions: {
      requestDemo: 'Request a demonstration',
    },
    footer: {
      label: 'Footer navigation',
      tagline: 'Interactive charts with your data under your control.',
      rights: 'All rights reserved.',
    },
    seo: {
      title: 'EasyDashboard | Private interactive charts',
      description:
        'Create interactive charts from manual input or files while keeping dashboard data in your browser.',
    },
  },
} as const satisfies AppDictionary
