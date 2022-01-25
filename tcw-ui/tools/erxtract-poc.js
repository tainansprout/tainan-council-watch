const fs = require('fs')
const path = require('path')
const got = require('got')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')

const SHEET_URI = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2_P-mrFZt2bSBuM_U2BuJR1FeRsKp0oxcFL7RcFheCUO1K86Liq9E3vu83FpkjHdrqjy-PWUBtFzc/pub?single=true&output=csv'

async function parseLogs () {
  const councilorMap = {}

  async function parseOneLog (sheetId) {
    await new Promise((resolve, reject) => {
      const endpoint = `${SHEET_URI}&gid=${sheetId}`
      got.stream(endpoint)
        .pipe(new AutoDetectDecoderStream())
        .pipe(new CsvReadableStream({ asObject: true }))
        .on('data', (data) => {
          const area = data.選區
          const councilor = data.議員
          const src = data.議事錄頁碼開頭.replace(/[p.]/g, '').split('、').map(Number.parseInt)
          const date = data.質詢日期

          const key = `${area}-${councilor}`

          if (!councilorMap[key]) {
            councilorMap[key] = {
              name: councilor,
              area,
              sayList: []
            }
          }
          councilorMap[key].sayList.push({
            target: data.相關局處,
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
    '394033064' // 定四
  ]

  for (const sheetId of sheetList) {
    await parseOneLog(sheetId)
  }

  const councilorList = Object.values(councilorMap).map((councilor) => {
    return {
      name: councilor.name,
      area: councilor.area
    }
  })

  fs.writeFileSync(path.join(__dirname, '../content/councilor-list.json'), JSON.stringify({ data: councilorList }))
  Object.values(councilorMap).forEach((councilor) => {
    const filename = path.join(
      __dirname,
      `../content/councilors/${councilor.name}.json`
    )
    fs.writeFileSync(filename, JSON.stringify(councilor))
  })
}

parseLogs()
