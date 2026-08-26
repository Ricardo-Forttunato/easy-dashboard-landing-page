type ProductDataCategory = 'manual-inputs' | 'uploaded-files' | 'derived-datasets' | 'chart-data'

type ContactDataCategory = 'name' | 'work-email' | 'company' | 'message' | 'privacy-acknowledgement'

interface ProductDataBoundary {
  dataCategories: readonly ProductDataCategory[]
  externalDestinations: readonly never[]
  persistence: 'none'
  processingLocation: 'visitor-browser'
}

interface ContactDataBoundary {
  dataCategories: readonly ContactDataCategory[]
  prohibitedDataCategories: readonly ProductDataCategory[]
  purpose: 'commercial-contact-request'
  applicationPersistence: 'none'
}

interface ApprovedContactProcessor {
  name: 'Vercel' | 'Resend' | 'EasyDashboard recipient mailbox'
  purpose: string
  receives: 'contact-data-only'
}

export const productDataBoundary: ProductDataBoundary = {
  dataCategories: ['manual-inputs', 'uploaded-files', 'derived-datasets', 'chart-data'],
  processingLocation: 'visitor-browser',
  externalDestinations: [],
  persistence: 'none',
}

export const contactDataBoundary: ContactDataBoundary = {
  dataCategories: ['name', 'work-email', 'company', 'message', 'privacy-acknowledgement'],
  prohibitedDataCategories: [...productDataBoundary.dataCategories],
  purpose: 'commercial-contact-request',
  applicationPersistence: 'none',
}

export const approvedContactProcessors: readonly ApprovedContactProcessor[] = [
  {
    name: 'Vercel',
    purpose: 'Host the contact Function and validate the request at the server boundary.',
    receives: 'contact-data-only',
  },
  {
    name: 'Resend',
    purpose: 'Deliver the voluntary commercial-contact email.',
    receives: 'contact-data-only',
  },
  {
    name: 'EasyDashboard recipient mailbox',
    purpose: 'Receive and answer the voluntary commercial request.',
    receives: 'contact-data-only',
  },
]
