// 給 MCP 和其他程式讀的議員清單：選區、議員基本資料、CMS 補充的經歷、各局處質詢數
// nuxt generate 時預先產生成 /data/{屆}/councilors.json
export default defineEventHandler((event) => {
  const { round } = getRouterParams(event)
  const districtMap = readCouncil(round, 'district-map')
  const councilors = []
  const districts = Object.values(districtMap).map((district) => {
    const cms = readDistrictMeta(round, district.districtTitle) || {}
    district.councilors.forEach((councilor) => {
      const meta = cms[`councilor-${councilor.id}`] || {}
      const sayit = readSayit(round, councilor.id)
      councilors.push({
        id: councilor.id,
        name: councilor.name,
        party: councilor.party,
        districtId: district.districtId,
        districtTitle: district.districtTitle,
        townList: district.townList,
        pageLink: councilor.pageLink,
        jobHistory: meta['job-history'] || '',
        jobPeriod: meta['job-period'] || '',
        miscTitle: meta['misc-title'] || '',
        miscContent: meta['misc-content'] || '',
        interpellationCount: sayit ? sayit.sayit.length : 0,
        orgStats: sayit ? sayit.stats.org : []
      })
    })
    return {
      id: district.districtId,
      title: district.districtTitle,
      townList: district.townList,
      quota: Number(district.districtQuota) || null
    }
  })
  return { round, districts, councilors }
})
