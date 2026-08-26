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
    hero: {
      eyebrow: 'Browser-based B2B dashboards',
      title: 'Turn your data into interactive charts — directly in your browser',
      description:
        'Create charts from manual input or files, with no software installation or complex spreadsheets.',
      privacy: 'The data used in your charts is processed locally and never leaves your device.',
      cta: 'Request a demonstration',
    },
    contact: {
      title: 'Request a demonstration',
      description:
        'Briefly tell us what you need. We will use this data only to respond to your commercial enquiry.',
      formLabel: 'Demonstration request',
      name: 'Name',
      email: 'Work email',
      company: 'Company (optional)',
      message: 'How can we help?',
      nameError: 'Enter your name.',
      emailError: 'Enter a valid email address.',
      messageError: 'Briefly describe how we can help.',
      acknowledgementError: 'Confirm that you have read the privacy notice.',
      validationSummary: 'Review the highlighted fields and try again.',
      noticeTitle: 'How we handle the data in this form',
      notice:
        'Your name, email, company, and message will be used to respond to your commercial enquiry, based on pre-contractual steps taken at your request. This data will be sent to Vercel, Resend, and the EasyDashboard mailbox. Do not include dashboard, file, or chart data in the message.',
      rights:
        'You may request access, correction, or deletion at ricardo.forttunato@gmail.com. Processing may involve international transfers and retention by the providers and mailbox while your enquiry is handled.',
      acknowledgement: 'I have read and understood how my contact data will be handled.',
      website: 'Website',
      submit: 'Send request',
      submitting: 'Sending request…',
      success: 'We received your request. We will contact you soon.',
      failure: 'We could not send your request. Check your connection and try again.',
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
