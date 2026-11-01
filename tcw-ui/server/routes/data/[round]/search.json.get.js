// 給 MCP 全站搜尋用的精簡索引：每個質詢議題一列，只放摘要和局處，不放發言內容（檔案才不會太大）
// nuxt generate 時預先產生成 /data/{屆}/search.json
const FIELDS = ['councilorId', 'date', 'meetingRound', 'page', 'relatedOrgs', 'summary']

export default defineEventHandler((event) => {
  const { round } = getRouterParams(event)
  const counsMap = readCouncil(round, 'councilor-map')
  const rows = Object.keys(counsMap).flatMap((councilorId) => {
    const sayit = readSayit(round, councilorId)
    return sayit
      ? sayit.sayit.map(say => [councilorId, say.date, say.round, say.src[0] || null, say.relatedOrgs, say.summary])
      : []
  })
  return { round, fields: FIELDS, rows }
})
