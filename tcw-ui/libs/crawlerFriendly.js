// import { cleanMarkdown } from './markdownUtils'

const TITLE_TAIL = '台南市議會觀測站'

export const SITE_URL = (typeof process !== 'undefined' && process.env && process.env.SITE_URL) || 'https://tcco.tnsprout.org'

export function genMeta (name, content) {
  const nameAttr = name.startsWith('og:') ? 'property' : 'name'
  return {
    key: name,
    [nameAttr]: name,
    content
  }
}

export const SITE_NAME = TITLE_TAIL
export const SITE_DESCRIPTION = '台南新芽整理台南市議員的質詢紀錄，依選區、議員、局處查詢每位議員問了什麼，並附議事錄原文出處。'

// 網址統一成結尾有斜線、不帶查詢參數（GitHub Pages 會把沒有斜線的資料夾 301 到有斜線的）
export function canonicalUrl (path) {
  const clean = (path || '/').split(/[?#]/)[0]
  return `${SITE_URL}${clean.endsWith('/') ? clean : `${clean}/`}`
}

// 回傳 useHead 用的 { title, meta, link, script }
// title、description、coverUrl 是字串；url 是網址路徑（給 canonical、og:url）；type 是 og:type；jsonLd 是 schema.org 物件或陣列
export function friendlyHeader ({ title, description, coverUrl, url, type, jsonLd }) {
  const head = { meta: [], link: [], script: [] }

  // always set title, so we get correct tag
  const prefix = title || ''
  const titleStr = prefix ? `${prefix} | ${TITLE_TAIL}` : TITLE_TAIL

  head.title = titleStr
  head.meta.push(genMeta('og:title', titleStr))
  head.meta.push(genMeta('twitter:title', titleStr))
  head.meta.push(genMeta('og:site_name', SITE_NAME))
  head.meta.push(genMeta('og:locale', 'zh_TW'))
  head.meta.push(genMeta('og:type', type || 'website'))
  if (url) {
    const canonical = canonicalUrl(url)
    head.link.push({ key: 'canonical', rel: 'canonical', href: canonical })
    head.meta.push(genMeta('og:url', canonical))
  }

  if (description) {
    head.meta.push(genMeta('description', description))
    head.meta.push(genMeta('og:description', description))
    head.meta.push(genMeta('twitter:description', description))
  }
  if (coverUrl) {
    let coverUrlStr = coverUrl
    if (coverUrlStr.startsWith('/')) {
      coverUrlStr = `${SITE_URL}${coverUrlStr}`
    } else if (!coverUrlStr.startsWith('http')) {
      coverUrlStr = `${SITE_URL}/${coverUrlStr}`
    }
    head.meta.push(genMeta('og:image', coverUrlStr))
    head.meta.push(genMeta('twitter:image', coverUrlStr))
    head.meta.push(genMeta('twitter:card', 'summary_large_image'))
  }
  if (jsonLd) {
    head.script.push({
      key: 'ld-json',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]).replace(/</g, '\\u003c')
    })
  }
  return head
}
