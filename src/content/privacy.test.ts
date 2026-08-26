import {
  approvedContactProcessors,
  contactDataBoundary,
  productDataBoundary,
} from '@/content/privacy'

describe('privacy data boundaries', () => {
  it('keeps every dashboard-data category browser-local without persistence', () => {
    expect(productDataBoundary.dataCategories).toEqual([
      'manual-inputs',
      'uploaded-files',
      'derived-datasets',
      'chart-data',
    ])
    expect(productDataBoundary.externalDestinations).toEqual([])
    expect(productDataBoundary.persistence).toBe('none')
  })

  it('limits the contact exception and processors to its documented purpose', () => {
    expect(contactDataBoundary.dataCategories).toEqual([
      'name',
      'work-email',
      'company',
      'message',
      'privacy-acknowledgement',
    ])
    expect(contactDataBoundary.prohibitedDataCategories).toEqual(
      expect.arrayContaining([...productDataBoundary.dataCategories]),
    )
    expect(approvedContactProcessors.map(({ name }) => name)).toEqual([
      'Vercel',
      'Resend',
      'EasyDashboard recipient mailbox',
    ])
  })
})
