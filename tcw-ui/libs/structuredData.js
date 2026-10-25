// schema.org 結構化資料（JSON-LD）。只放頁面上看得到的資訊
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, canonicalUrl } from './crawlerFriendly'

const PUBLISHER = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#publisher`,
  name: '台南新芽',
  url: 'https://www.tnsprout.org/'
}

const COUNCIL = {
  '@type': 'GovernmentOrganization',
  name: '臺南市議會',
  url: 'https://www.tncc.gov.tw/'
}

export function websiteLd () {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    inLanguage: 'zh-Hant-TW',
    publisher: PUBLISHER
  }
}

// items：[[名稱, 路徑], ...]
export function breadcrumbLd (items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: canonicalUrl(path)
    }))
  }
}

export function councilorLd (councilor, path, roundLabel) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: councilor.name,
    url: canonicalUrl(path),
    image: councilor.bgUrl ? `${SITE_URL}${councilor.bgUrl}` : undefined,
    jobTitle: `臺南市議會${roundLabel}議員（${councilor.districtTitle}）`,
    memberOf: COUNCIL,
    affiliation: councilor.party ? { '@type': 'Organization', name: councilor.party } : undefined,
    sameAs: councilor.pageLink ? [councilor.pageLink] : undefined
  }
}

export function articleLd (article, path) {
  const image = article.coverImage
    ? (article.coverImage.startsWith('http') ? article.coverImage : `${SITE_URL}${article.coverImage.startsWith('/') ? '' : '/'}${article.coverImage}`)
    : undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary || undefined,
    image,
    datePublished: article.createdAt || undefined,
    url: canonicalUrl(path),
    inLanguage: 'zh-Hant-TW',
    publisher: PUBLISHER,
    author: PUBLISHER
  }
}
