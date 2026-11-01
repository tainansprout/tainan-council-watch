// 讀 content/ 底下的 JSON 和 Markdown，取代 Nuxt 2 的 @nuxt/content。
// 只在 dev 和 nuxt generate 預先產生頁面時執行，部署出去的是靜態檔。
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { marked } from 'marked'
import YAML from 'yaml'

const CONTENT_DIR = join(process.cwd(), 'content')
const cache = new Map()

function cached (key, load) {
  if (!cache.has(key)) {
    cache.set(key, load())
  }
  return cache.get(key)
}

export function contentExists (path) {
  return existsSync(join(CONTENT_DIR, path))
}

export function readJson (path) {
  return cached(path, () => JSON.parse(readFileSync(join(CONTENT_DIR, path), 'utf-8')))
}

export function listDir (path) {
  return readdirSync(join(CONTENT_DIR, path)).sort()
}

// Markdown：frontmatter 放 data，內文轉成 html
export function readMarkdown (path) {
  return cached(path, () => {
    const raw = readFileSync(join(CONTENT_DIR, path), 'utf-8')
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    const data = m ? (YAML.parse(m[1]) || {}) : {}
    const body = m ? m[2] : raw
    return { ...data, html: body.trim() ? marked.parse(body) : '' }
  })
}

// 網址參數會拼進檔案路徑，只接受 3rd、4th 這種屆次和英數字的議員 id
const ROUND_RE = /^\d+(st|nd|rd|th)$/
const ID_RE = /^[0-9A-Za-z]+$/

function checkRound (round) {
  if (!ROUND_RE.test(round || '')) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown round' })
  }
}

export function readCouncil (round, name) {
  checkRound(round)
  const path = `council/${round}/${name}.json`
  if (!contentExists(path)) {
    throw createError({ statusCode: 404, statusMessage: `Not found: ${path}` })
  }
  return readJson(path)
}

export function readSayit (round, councilorId) {
  checkRound(round)
  if (!ID_RE.test(councilorId || '')) {
    return null
  }
  const path = `council/${round}/sayit/${councilorId}.json`
  return contentExists(path) ? readJson(path) : null
}

export function readDistrictMeta (round, districtTitle) {
  checkRound(round)
  const path = `council/${round}/meta-${districtTitle}.md`
  return contentExists(path) ? readMarkdown(path) : null
}

export function articleCategories () {
  return listDir('setting')
    .filter(name => name.endsWith('.json'))
    .map(name => readJson(`setting/${name}`))
    .filter(setting => setting.type === 'articleCategory')
    .sort((a, b) => a.order - b.order)
}

export function articles () {
  return listDir('article')
    .filter(name => name.endsWith('.md'))
    // 網址用 frontmatter 的 slug（例如 LOOK0427），沒有才用檔名
    .map(name => ({ slug: name.replace(/\.md$/, ''), ...readMarkdown(`article/${name}`) }))
    .sort((a, b) => `${b.createdAt}`.localeCompare(`${a.createdAt}`))
}
