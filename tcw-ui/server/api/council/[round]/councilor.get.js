// 議員頁：?councilor=<id> 時附上 CMS 補充資料與質詢（新到舊）
export default defineEventHandler((event) => {
  const { round } = getRouterParams(event)
  const { councilor: councilorId } = getQuery(event)
  const districtMap = readCouncil(round, 'district-map')
  const counsMap = readCouncil(round, 'councilor-map')
  let councilor = councilorId ? counsMap[councilorId] : undefined
  let sayit = { sayit: [] }
  if (councilor) {
    const found = readSayit(round, councilorId)
    if (found) {
      sayit = { ...found, sayit: [...found.sayit].sort((a, b) => b.date.localeCompare(a.date)) }
    }
    const cms = readDistrictMeta(round, councilor.districtTitle)
    if (cms) {
      councilor = { ...councilor, ...cms[`councilor-${councilorId}`] }
    }
  }
  return { districtMap, counsMap, councilor: councilor || null, sayit }
})
