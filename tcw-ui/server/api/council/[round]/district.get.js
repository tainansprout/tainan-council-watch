// 選區頁：?district=1st 時附上選區情報（CMS 的 meta-第N選區.md）與各議員的質詢局處統計
export default defineEventHandler((event) => {
  const { round } = getRouterParams(event)
  const { district: districtId } = getQuery(event)
  const districtMap = readCouncil(round, 'district-map')
  let meta = districtId ? districtMap[districtId] : undefined
  let stats = {}
  if (meta) {
    const cms = readDistrictMeta(round, meta.districtTitle)
    // CMS 檔不存在時 html 是 null，頁面顯示「待撰寫」；檔案在但內文空白就什麼都不顯示（同 Nuxt 2 版）
    meta = { ...meta, intro: { html: cms ? cms.html : null } }
    const allSayitStats = readCouncil(round, 'sayit/stats')
    stats = meta.councilors.reduce((stats, councilor) => {
      const sayit = readSayit(round, councilor.id)
      if (sayit) {
        stats[councilor.id] = sayit.stats
      }
      return stats
    }, { total: allSayitStats[districtId] })
  }
  return { districtMap, meta: meta || null, stats }
})
