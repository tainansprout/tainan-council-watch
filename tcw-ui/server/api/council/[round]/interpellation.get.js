// 搜質詢頁的預設畫面：每個局處取最新 4 筆（其他結果由 Algolia 在瀏覽器端查）
const N_PER_CAT = 4

export default defineEventHandler((event) => {
  const { round } = getRouterParams(event)
  const districtMap = readCouncil(round, 'district-map')
  const councilorMap = readCouncil(round, 'councilor-map')
  const allSayitStats = readCouncil(round, 'sayit/stats')

  const nSayitPerCat = { org: {} }
  const defaultSayList = listDir(`council/${round}/sayit`)
    .filter(name => name.endsWith('.json') && name !== 'stats.json')
    .map(name => readSayit(round, name.replace(/\.json$/, '')))
    .flatMap((person) => {
      if (!person.sayit) {
        return []
      }
      return person.sayit
        .filter(sayit => !sayit.date.startsWith('Invalid'))
        .map(sayit => ({ ...sayit, councilorId: person.id, councilorRound: round }))
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((sayit) => {
      let shouldExisted = false
      sayit.relatedOrgs.forEach((org) => {
        if (!nSayitPerCat.org[org]) {
          nSayitPerCat.org[org] = 0
        }
        if (nSayitPerCat.org[org] < N_PER_CAT) {
          nSayitPerCat.org[org] += 1
          shouldExisted = true
        }
      })
      return shouldExisted
    })

  return {
    districtMap,
    councilorMap,
    defaultSayList,
    defaultSayitStats: allSayitStats.all
  }
})
