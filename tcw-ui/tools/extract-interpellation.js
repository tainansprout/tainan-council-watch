const fs = require('fs')
const path = require('path')
const got = require('got')
const dayjs = require('dayjs')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const departmentMeta = require('../content/meta/departmentBrief.json')
const { districtName2Id, enableSentry, notifyJandi } = require('./utils')

enableSentry()

const NTH = '3rd'
const DEFAULT_SHEET_URI = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2_P-mrFZt2bSBuM_U2BuJR1FeRsKp0oxcFL7RcFheCUO1K86Liq9E3vu83FpkjHdrqjy-PWUBtFzc/pub?single=true&output=csv'

const DISTRICT_MAP = JSON.parse(
  fs.readFileSync(path.join(__dirname, `../content/council/${NTH}/district-map.json`))
)
const COUNCILOR_MAP = Object.values(
  JSON.parse(fs.readFileSync(path.join(__dirname, `../content/council/${NTH}/councilor-map.json`)))
)
const number2zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

const sayitMap = {}
const mappingErrors = {}
const orgSynonyms = {}

departmentMeta.departmentBrief.forEach((dep) => {
  if (dep.synonym && dep.synonym.length) {
    dep.synonym.forEach((name) => {
      orgSynonyms[name] = dep.abbr
    })
  }
})

function pushMapError (msg) {
  if (!mappingErrors[msg]) {
    mappingErrors[msg] = 0
  }
  mappingErrors[msg] += 1
}

function mergeRelatedOrgs (accumulator, stats) {
  for (const [org, count] of stats) {
    if (!accumulator.has(org)) {
      accumulator.set(org, count)
    } else {
      accumulator.set(org, accumulator.get(org) + count)
    }
  }
}

function countRelatedOrgs (sayit) {
  const stats = new Map()
  sayit.forEach((it) => {
    it.relatedOrgs.forEach((org) => {
      if (!stats.has(org)) {
        stats.set(org, 1)
      } else {
        stats.set(org, stats.get(org) + 1)
      }
    })
  })
  return stats
}

function dumpRelatedOrgs (stats) {
  const sortedRows = []
  for (const [name, count] of stats) {
    sortedRows.push({ name, count })
  }
  sortedRows.sort((a, b) => {
    return b.count - a.count
  })
  return sortedRows
}

function getDistrictId (districtName) {
  // sometime people use 第12選區 instead of 第十二選區
  districtName = districtName.replace(/1(\d)/, '十$1')
  number2zh.forEach((zh, number) => {
    districtName = districtName.replace(number, zh)
  })
  return districtName2Id[districtName]
}

function getCouncilorId (districtId, councilorName, sheetMeta) {
  const district = DISTRICT_MAP[districtId]
  councilorName = councilorName.replace(/[a-zA-Z‧・·．˙、議員\n ]/g, '')
  let councilor = null

  if (district) {
    councilor = district.councilors.find(councilor => councilor.abbr === councilorName)
  }

  if (!councilor) {
    // missing district is acceptable
    // pushMapError(`Councilor ${councilorName} in ${districtId} not existed`)

    // lookup councilor name directly
    councilor = COUNCILOR_MAP.find(councilor => councilor.abbr === councilorName)
  }

  if (councilor) {
    return councilor.id
  } else {
    const category = getErrorCategory(sheetMeta)
    pushMapError(`${category} | 出現不存在的議員："${councilorName}"`)
    return ''
  }
}

function getErrorCategory (sheetMeta) {
  let category = `定${sheetMeta.round}`
  if (sheetMeta.postfix) {
    category += `-${sheetMeta.postfix}`
  }
  return category
}

function parseOneLog (sheetMeta) {
  return new Promise((resolve, reject) => {
    const endpoint = sheetMeta.sheetUri || `${DEFAULT_SHEET_URI}&gid=${sheetMeta.sheetId}`
    let lastValidDate = null
    got.stream(endpoint)
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const districtId = getDistrictId(data.選區)
        const councilor = data.議員
        const src = data.議事錄頁碼開頭.replace(/[Ｐp. ]/ig, '').split('、').map(Number.parseInt)
        const date = dayjs(data.質詢日期).format('YYYY-MM-DD')

        if (!src.length || !src[0]) {
          const category = getErrorCategory(sheetMeta)
          pushMapError(`${category} | 無法認得的頁碼開頭："${data.質詢內容}"`)
        }

        if (!date.startsWith('Invalid')) {
          lastValidDate = date
        }

        const key = getCouncilorId(districtId, councilor, sheetMeta)
        if (!key) {
          // console.warn(`== Councilor not found in ${sheetMeta.sheetId}`)
          return
        }

        if (!sayitMap[key]) {
          sayitMap[key] = []
        }
        const relatedOrgs = data.質詢相關局處
          .replace(/\n/g, '、')
          .split('、')
          .map(org => org.trim())
          .map(org => orgSynonyms[org] || org)
          .filter(org => org && org && org !== '無')
        sayitMap[key].push({
          relatedOrgs,
          summary: data.質詢內容,
          editorNote: data.編按 || '',
          say: data['發言開頭2句話'],
          date: lastValidDate,
          type: sheetMeta.type,
          round: sheetMeta.round,
          src
        })
      })
      .on('end', () => {
        resolve()
      })
  })
}

async function parseLogs () {
  const sheetList = [
    { sheetId: '1909562558', type: '定期會', round: 1 },
    { sheetId: '956807492', type: '定期會', round: 1, postfix: '業務' },
    { sheetId: '1969300134', type: '定期會', round: 2 },
    { sheetId: '314210118', type: '定期會', round: 2, postfix: '業務' },
    { sheetId: '67860742', type: '定期會', round: 3 },
    { sheetId: '1585934193', type: '定期會', round: 4 },
    { sheetId: '618060648', type: '定期會', round: 5 },
    { type: '定期會', round: 6, sheetUri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMMal5SnyXJxMVyauHK9f34r30SOJHyvOs7UnAiuBWh58nK6ocstA_lh_76RRUC7a9P9fmjHmpgtVK/pub?gid=0&single=true&output=csv' }
  ]

  const statsPerDistricts = Object.values(DISTRICT_MAP).reduce((ret, district) => {
    ret.set(district.districtId, new Map())
    return ret
  }, new Map())

  for (const sheetMeta of sheetList) {
    await parseOneLog(sheetMeta)
  }

  Object.keys(sayitMap).forEach((councilorId) => {
    const filename = path.join(
      __dirname,
      `../content/council/${NTH}/sayit/${councilorId}.json`
    )
    const councilor = COUNCILOR_MAP.find(person => person.id === councilorId)
    const sayit = sayitMap[councilorId]
    const orgStats = countRelatedOrgs(sayit)
    mergeRelatedOrgs(statsPerDistricts.get(councilor.districtId), orgStats)

    fs.writeFileSync(filename, JSON.stringify({
      id: councilorId,
      sayit,
      stats: {
        org: dumpRelatedOrgs(orgStats)
      }
    }))
  })

  const sortedStatsPerDistricts = { all: new Map() }

  for (const [districtId, stats] of statsPerDistricts) {
    sortedStatsPerDistricts[districtId] = {
      org: dumpRelatedOrgs(stats)
    }
    mergeRelatedOrgs(sortedStatsPerDistricts.all, stats)
  }
  sortedStatsPerDistricts.all = {
    org: dumpRelatedOrgs(sortedStatsPerDistricts.all)
  }

  const overallStatsPath = path.join(
    __dirname,
    `../content/council/${NTH}/sayit/stats.json`
  )

  fs.writeFileSync(overallStatsPath, JSON.stringify(sortedStatsPerDistricts))

  const errors = Object.keys(mappingErrors)
  if (errors.length) {
    // eslint-disable-next-line no-console
    let msg = [`==== 發現 ${errors.length} 類錯誤 | 議事錄試算表 ====`]
    errors.forEach((error) => {
      msg.push(`${error}，共 ${mappingErrors[error]} 次`)
    })
    msg = msg.join('\n')
    console.error(msg)
    notifyJandi(msg)
  }
}

parseLogs()
