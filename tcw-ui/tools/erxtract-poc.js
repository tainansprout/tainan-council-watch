const fs = require('fs')
const path = require('path')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')

async function parseLogs () {
  const councilorMap = {}

  async function parseOneLog (filename) {
    await new Promise((resolve, reject) => {
      fs
        .createReadStream(path.join(__dirname, `../../data/${filename}.csv`))
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

  await parseOneLog('質詢-定一')
  await parseOneLog('質詢-定二')

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
