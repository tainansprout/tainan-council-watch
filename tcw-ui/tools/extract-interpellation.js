const fs = require('fs')
const path = require('path')
const got = require('got')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { districtName2Id } = require('./utils')

const NTH = '3rd'
const SHEET_URI = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2_P-mrFZt2bSBuM_U2BuJR1FeRsKp0oxcFL7RcFheCUO1K86Liq9E3vu83FpkjHdrqjy-PWUBtFzc/pub?single=true&output=csv'

const DISTRICT_MAP = JSON.parse(fs.readFileSync(path.join(__dirname, `../content/council/${NTH}/district-map.json`)))
const COUNCILOR_MAP = Object.values(
  JSON.parse(fs.readFileSync(path.join(__dirname, `../content/council/${NTH}/councilor-map.json`)))
)
const number2zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

const mappingErrors = {}

function pushMapError (msg) {
  if (!mappingErrors[msg]) {
    mappingErrors[msg] = 0
  }
  mappingErrors[msg] += 1
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

async function parseLogs () {
  const councilorMap = {}

  async function parseOneLog (sheetId) {
    await new Promise((resolve, reject) => {
      const endpoint = `${SHEET_URI}&gid=${sheetId}`
      got.stream(endpoint)
        .pipe(new AutoDetectDecoderStream())
        .pipe(new CsvReadableStream({ asObject: true }))
        .on('data', (data) => {
          const districtId = getDistrictId(data.選區)
          const councilor = data.議員
          const src = data.議事錄頁碼開頭.replace(/[p.]/g, '').split('、').map(Number.parseInt)
          const date = data.質詢日期

          const key = getCouncilorId(districtId, councilor)
          if (!key) {
            // console.warn(`== Councilor not found in ${sheetId}`)
            return
          }

          if (!councilorMap[key]) {
            councilorMap[key] = []
          }
          const relatedOrgs = data.相關局處
            .replace(/\n/g, '、')
            .split('、')
            .filter(org => org !== '無')
          councilorMap[key].push({
            relatedOrgs,
            summary: data.質詢內容,
            say: data['發言開頭2句話'],
            date,
            src
          })
        })
        .on('end', () => {
          resolve()
        })
    })
  }

  const sheetList = [
    '1909562558', // 定一
    '1969300134', // 定二
    '67860742', // 定三
    '394033064', // 定四
    '618060648' // 定五
  ]

  for (const sheetId of sheetList) {
    await parseOneLog(sheetId)
  }

  Object.keys(councilorMap).forEach((councilorId) => {
    const filename = path.join(
      __dirname,
      `../content/council/${NTH}/sayit/${councilorId}.json`
    )
    fs.writeFileSync(filename, JSON.stringify({
      id: councilorId,
      sayit: councilorMap[councilorId]
    }))
  })

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
