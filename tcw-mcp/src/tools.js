// MCP 工具的查詢邏輯，全部唯讀：只讀網站公開的靜態 JSON，沒有任何寫入
export const ROUNDS = ['3rd', '4th']
export const DEFAULT_ROUND = '4th'
export const MAX_LIMIT = 50

const SITE_BASE = 'https://tcco.tnsprout.org'
// 和 tcw-ui/components/InterpellationSrcViewer.vue 一樣：議事錄切成每 10 頁一個 PDF
const PDF_SRC_BASE = 'https://tainansprout.github.io/tainan-council-data/interpellation/round'
const PAGE_PER_CHUNK = 10
const ROUND_ZH = { '3rd': '三', '4th': '四' }

export const SOURCE_NOTE = '摘要是觀測站整理的重點，引用時請以議事錄原文（pdfUrl）為準。'

export class ToolError extends Error {}

export function pdfUrl (round, meetingRound, page) {
  if (!page) {
    return null
  }
  const meeting = `${meetingRound}`.padStart(2, '0')
  const chunk = `${Math.ceil(page / PAGE_PER_CHUNK)}`.padStart(3, '0')
  const pageInChunk = page % PAGE_PER_CHUNK || PAGE_PER_CHUNK
  return `${PDF_SRC_BASE}/${round}/regular/${meeting}/${chunk}.pdf#page=${pageInChunk}`
}

function councilorUrl (round, id) {
  return `${SITE_BASE}/${round}/councilor/${id}/`
}

function meetingLabel (round, meetingRound) {
  return `第${ROUND_ZH[round]}屆第${meetingRound}次定期會`
}

// 選區可以給「第一選區」「1st」或行政區名稱（「新營」「新營區」）
function matchDistrict (councilor, district) {
  const town = district.replace(/區$/, '')
  return councilor.districtTitle === district ||
    councilor.districtId === district ||
    councilor.townList.some(t => t.replace(/區$/, '') === town)
}

// 議員可以給 ID 或姓名
function findCouncilor (councilors, councilor) {
  const key = councilor.trim()
  const found = councilors.filter(c => c.id === key.toUpperCase() || c.name === key)
  if (found.length === 1) {
    return found[0]
  }
  const partial = councilors.filter(c => c.name.includes(key))
  if (partial.length === 1) {
    return partial[0]
  }
  if (partial.length > 1) {
    throw new ToolError(`「${key}」對到多位議員：${partial.map(c => `${c.name}（${c.id}）`).join('、')}，請改用 ID。`)
  }
  throw new ToolError(`找不到議員「${key}」，可以先用 list_councilors 查 ID。`)
}

function brief (c) {
  return {
    id: c.id,
    name: c.name,
    party: c.party,
    district: c.districtTitle,
    towns: c.townList,
    interpellationCount: c.interpellationCount,
    url: councilorUrl(c.round, c.id)
  }
}

function withRound (data) {
  return data.councilors.map(c => ({ ...c, round: data.round }))
}

// 日期篩選：from、to 是 YYYY-MM-DD，含頭尾
function inRange (date, from, to) {
  return (!from || date >= from) && (!to || date <= to)
}

function page (items, limit, offset) {
  return {
    total: items.length,
    offset,
    limit,
    hasMore: offset + limit < items.length,
    items: items.slice(offset, offset + limit)
  }
}

// 關鍵字用空白分開，每個詞都要出現
function terms (query) {
  return (query || '').split(/\s+/).filter(Boolean)
}

export async function listCouncilors (data, { round, district, name, party }) {
  let councilors = withRound(await data.councilors(round))
  if (district) {
    councilors = councilors.filter(c => matchDistrict(c, district))
  }
  if (name) {
    councilors = councilors.filter(c => c.name.includes(name))
  }
  if (party) {
    councilors = councilors.filter(c => c.party.includes(party))
  }
  return { round, total: councilors.length, councilors: councilors.map(brief) }
}

export async function getCouncilor (data, { round, councilor }) {
  const c = findCouncilor(withRound(await data.councilors(round)), councilor)
  return {
    ...brief(c),
    round,
    jobHistory: c.jobHistory,
    jobPeriod: c.jobPeriod,
    miscTitle: c.miscTitle || undefined,
    miscContent: c.miscContent || undefined,
    councilPage: c.pageLink,
    orgStats: c.orgStats
  }
}

export async function listInterpellations (data, { round, councilor, keyword, org, from, to, limit, offset }) {
  const c = findCouncilor(withRound(await data.councilors(round)), councilor)
  const words = terms(keyword)
  const sayit = c.interpellationCount ? (await data.sayit(round, c.id)).sayit : []
  const items = sayit
    .filter(s => inRange(s.date, from, to))
    .filter(s => !org || s.relatedOrgs.includes(org))
    .filter(s => words.every(w => s.summary.includes(w) || s.say.includes(w) || s.relatedOrgs.includes(w)))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(s => ({
      date: s.date,
      meeting: meetingLabel(round, s.round),
      relatedOrgs: s.relatedOrgs,
      summary: s.summary,
      say: s.say,
      editorNote: s.editorNote || undefined,
      page: s.src[0] || null,
      pdfUrl: pdfUrl(round, s.round, s.src[0])
    }))
  return {
    round,
    councilor: brief(c),
    note: SOURCE_NOTE,
    ...page(items, limit, offset)
  }
}

export async function searchInterpellations (data, { query, round, councilor, district, org, from, to, limit, offset }) {
  const words = terms(query)
  if (!words.length) {
    throw new ToolError('query 不能是空的。')
  }
  const councilors = withRound(await data.councilors(round))
  const byId = Object.fromEntries(councilors.map(c => [c.id, c]))
  const only = councilor ? findCouncilor(councilors, councilor).id : null
  const items = (await data.searchRows(round))
    .filter(r => !only || r.councilorId === only)
    .filter(r => !district || matchDistrict(byId[r.councilorId], district))
    .filter(r => !org || r.relatedOrgs.includes(org))
    .filter(r => inRange(r.date, from, to))
    .filter(r => words.every(w => r.summary.includes(w) || r.relatedOrgs.includes(w) || byId[r.councilorId].name === w))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((r) => {
      const c = byId[r.councilorId]
      return {
        date: r.date,
        councilor: c.name,
        councilorId: c.id,
        party: c.party,
        district: c.districtTitle,
        meeting: meetingLabel(round, r.meetingRound),
        relatedOrgs: r.relatedOrgs,
        summary: r.summary,
        page: r.page,
        pdfUrl: pdfUrl(round, r.meetingRound, r.page),
        councilorUrl: councilorUrl(round, c.id)
      }
    })
  return {
    round,
    query,
    note: `只搜摘要和局處；要搜發言內容，請用 list_interpellations 的 keyword。${SOURCE_NOTE}`,
    ...page(items, limit, offset)
  }
}
