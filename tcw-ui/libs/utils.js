// import Markdown from '@nuxt/content/parsers/markdown'
// import { getDefaults, processMarkdownOptions } from '@nuxt/content/lib/utils'

export function parseMarkdown (md) {
  return md
  // const options = getDefaults()
  // processMarkdownOptions(options)
  // return new Markdown(options.markdown).toJSON(md) // toJSON() is async
}

export function countRelatedOrgs (...sayitList) {
  const stats = {}
  sayitList.forEach((sayit) => {
    sayit.sayit.forEach((it) => {
      it.relatedOrgs.forEach((org) => {
        if (!stats[org]) {
          stats[org] = 0
        }
        stats[org] += 1
      })
    })
  })
  const statsRow = Object.keys(stats)
    .map((key) => {
      return {
        name: key,
        count: stats[key]
      }
    })
    .sort((a, b) => {
      return b.count - a.count
    })
  return statsRow
}

export function scrollTo (el) {
  if (!el) {
    return
  }
  const offset = el.offsetTop - 60
  setTimeout(() => {
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    })
  })
}
