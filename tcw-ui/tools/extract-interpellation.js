const fs = require('fs')
const path = require('path')
const got = require('got')
const dayjs = require('dayjs')
const _ = require('lodash')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { districtName2Id } = require('./utils')

const NTH = '3rd'
const SHEET_URI = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2_P-mrFZt2bSBuM_U2BuJR1FeRsKp0oxcFL7RcFheCUO1K86Liq9E3vu83FpkjHdrqjy-PWUBtFzc/pub?single=true&output=csv'

const DISTRICT_MAP = JSON.parse(
  fs.readFileSync(path.join(__dirname, `../content/council/${NTH}/district-map.json`))
)
const COUNCILOR_MAP = Object.values(
  JSON.parse(fs.readFileSync(path.join(__dirname, `../content/council/${NTH}/councilor-map.json`)))
)
const number2zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

const sayitMap = {}
const mappingErrors = {}

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

function getCouncilorId (districtId, councilorName) {
  const district = DISTRICT_MAP[districtId]
  councilorName = councilorName.replace(/[a-zA-Z‧・·．˙、議員\n ]/g, '')
  let councilor = null

  if (district) {
    councilor = district.councilors.find(councilor => councilor.abbr === councilorName)
  }

  if (!councilor) {
    pushMapError(`Councilor ${councilorName} in ${districtId} not existed`)

    // lookup councilor name directly
    councilor = COUNCILOR_MAP.find(councilor => councilor.abbr === councilorName)
  }

  if (councilor) {
    return councilor.id
  } else {
    pushMapError(`Councilor ${councilorName} not existed in any district`)
    return ''
  }
}

function parseOneLog (sheetMeta) {
  return new Promise((resolve, reject) => {
    const endpoint = `${SHEET_URI}&gid=${sheetMeta.sheetId}`
    got.stream(endpoint)
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const districtId = getDistrictId(data.選區)
        const councilor = data.議員
        const src = data.議事錄頁碼開頭.replace(/[p.]/g, '').split('、').map(Number.parseInt)
        const date = dayjs(data.質詢日期).format('YYYY-MM-DD')

        const key = getCouncilorId(districtId, councilor)
        if (!key) {
          // console.warn(`== Councilor not found in ${sheetMeta.sheetId}`)
          return
        }

        if (!sayitMap[key]) {
          sayitMap[key] = []
        }
        const relatedOrgs = data.相關局處
          .replace(/\n/g, '、')
          .split('、')
          .filter(org => org !== '無')
        sayitMap[key].push({
          relatedOrgs,
          summary: data.質詢內容,
          say: data['發言開頭2句話'],
          date,
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
    { sheetId: '1969300134', type: '定期會', round: 2 },
    { sheetId: '67860742', type: '定期會', round: 3 },
    { sheetId: '394033064', type: '定期會', round: 4 },
    { sheetId: '618060648', type: '定期會', round: 5 }
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
    console.warn(`==== Mapping error summary x ${errors.length} ====`)
    errors.forEach((error) => {
      console.warn(`[${mappingErrors[error]} times] ${error}`)
      console.warn('------------------')
    })
  }
}

parseLogs()
