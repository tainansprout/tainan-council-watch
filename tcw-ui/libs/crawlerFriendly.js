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

// 回傳 useHead 用的 { title, meta }，三個參數都是字串
export function friendlyHeader ({ title, description, coverUrl }) {
  const head = { meta: [] }

  // always set title, so we get correct tag
  const prefix = title || ''
  const titleStr = prefix ? `${prefix} | ${TITLE_TAIL}` : TITLE_TAIL

  head.title = titleStr
  head.meta.push(genMeta('og:title', titleStr))
  head.meta.push(genMeta('twitter:title', titleStr))

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
  return head
}
