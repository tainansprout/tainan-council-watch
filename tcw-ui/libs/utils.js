import Markdown from '@nuxt/content/parsers/markdown'
import { getDefaults, processMarkdownOptions } from '@nuxt/content/lib/utils'

export function parseMarkdown (md) {
  const options = getDefaults()
  processMarkdownOptions(options)
  return new Markdown(options.markdown).toJSON(md) // toJSON() is async
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
