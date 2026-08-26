import { applySeoMetadata, getSeoMetadata } from '@/lib/seo'

describe('localized SEO metadata', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  it('applies Portuguese title, description, Open Graph, canonical, and Schema.org data', () => {
    const metadata = getSeoMetadata('pt', 'https://example.com/')

    applySeoMetadata(metadata)

    expect(document.title).toBe('EasyDashboard | Gráficos interativos com privacidade')
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      expect.stringContaining('navegador'),
    )
    expect(document.querySelector('meta[property="og:locale"]')).toHaveAttribute('content', 'pt_BR')
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://example.com/',
    )

    const structuredData = document.querySelector('#easydashboard-structured-data')
    expect(structuredData).toHaveAttribute('type', 'application/ld+json')
    expect(JSON.parse(structuredData?.textContent ?? '{}')).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'EasyDashboard',
    })
  })

  it('provides equivalent English metadata', () => {
    expect(getSeoMetadata('en', 'https://example.com/')).toMatchObject({
      language: 'en',
      openGraphLocale: 'en_US',
      title: 'EasyDashboard | Private interactive charts',
    })
  })
})
