import socialImageUrl from '@/assets/easydashboard-main-screen.png'
import type { AppLanguage } from '@/locales/i18n'
import { en } from '@/locales/en'
import { pt } from '@/locales/pt'

interface SeoMetadata {
  alternateLanguage: AppLanguage
  canonicalUrl: string
  description: string
  htmlLanguage: 'pt-BR' | 'en'
  imageUrl: string
  language: AppLanguage
  openGraphLocale: 'pt_BR' | 'en_US'
  title: string
}

const seoCopy = {
  pt: pt.translation.seo,
  en: en.translation.seo,
} as const

export function getSeoMetadata(language: AppLanguage, siteUrl: string): SeoMetadata {
  const canonicalUrl = new URL('/', siteUrl).toString()
  const copy = seoCopy[language]

  return {
    language,
    alternateLanguage: language === 'pt' ? 'en' : 'pt',
    htmlLanguage: language === 'pt' ? 'pt-BR' : 'en',
    openGraphLocale: language === 'pt' ? 'pt_BR' : 'en_US',
    canonicalUrl,
    imageUrl: new URL(socialImageUrl, canonicalUrl).toString(),
    title: copy.title,
    description: copy.description,
  }
}

function upsertMeta(selectorAttribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${selectorAttribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(selectorAttribute, key)
    document.head.append(element)
  }

  element.content = content
}

function upsertLink(rel: string, href: string, hrefLang?: string): void {
  const selector = hrefLang
    ? `link[rel="${rel}"][hreflang="${hrefLang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let element = document.head.querySelector<HTMLLinkElement>(selector)

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    if (hrefLang) {
      element.hreflang = hrefLang
    }
    document.head.append(element)
  }

  element.href = href
}

export function applySeoMetadata(metadata: SeoMetadata): void {
  document.title = metadata.title
  document.documentElement.lang = metadata.htmlLanguage

  upsertMeta('name', 'description', metadata.description)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', 'EasyDashboard')
  upsertMeta('property', 'og:title', metadata.title)
  upsertMeta('property', 'og:description', metadata.description)
  upsertMeta('property', 'og:url', metadata.canonicalUrl)
  upsertMeta('property', 'og:image', metadata.imageUrl)
  upsertMeta('property', 'og:locale', metadata.openGraphLocale)
  upsertMeta(
    'property',
    'og:locale:alternate',
    metadata.alternateLanguage === 'pt' ? 'pt_BR' : 'en_US',
  )

  upsertLink('canonical', metadata.canonicalUrl)
  upsertLink('alternate', metadata.canonicalUrl, 'pt-BR')
  upsertLink('alternate', metadata.canonicalUrl, 'en')
  upsertLink('alternate', metadata.canonicalUrl, 'x-default')

  let structuredData = document.head.querySelector<HTMLScriptElement>(
    '#easydashboard-structured-data',
  )

  if (!structuredData) {
    structuredData = document.createElement('script')
    structuredData.id = 'easydashboard-structured-data'
    structuredData.type = 'application/ld+json'
    document.head.append(structuredData)
  }

  structuredData.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'EasyDashboard',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web browser',
    inLanguage: metadata.htmlLanguage,
    description: metadata.description,
    image: metadata.imageUrl,
    url: metadata.canonicalUrl,
  })
}
