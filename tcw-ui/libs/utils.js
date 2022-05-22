import Markdown from '@nuxt/content/parsers/markdown'
import { getDefaults, processMarkdownOptions } from '@nuxt/content/lib/utils'
import { NAV_HEIGHT, NUMBER_2_ZH } from './defs'

export function parseMarkdown (md) {
  const options = getDefaults()
  processMarkdownOptions(options)
  return new Markdown(options.markdown).toJSON(md) // toJSON() is async
}

export function scrollTo (el) {
  if (!el) {
    return
  }
  const offset = el.offsetTop - NAV_HEIGHT
  setTimeout(() => {
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    })
  })
}

export function number2zh (number) {
  number = number.toString()
  const nthRegex = /st|nd|rd|th/
  const isNth = number.match(nthRegex)
  number = number.replace(nthRegex, '')
  const zh = NUMBER_2_ZH[number]

  if (!zh) {
    throw new Error(`Undefined number: ${number}`)
  }
  if (isNth) {
    return `第${zh}`
  }
  return zh
}
