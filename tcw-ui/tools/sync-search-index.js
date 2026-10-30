const fs = require('fs')
const path = require('path')
const algoliasearch = require('algoliasearch')
const dotenv = require('dotenv')
const md5 = require('md5')
const dayjs = require('dayjs')
const departmentMeta = require('../content/meta/departmentBrief.json')
const synonym = require('../content/meta/synonym.json')
const { enableSentry, notifyJandi } = require('./utils')
const roundDefs = require('./round-defs')

dotenv.config()

enableSentry()

// 所有屆次都寫進同一個索引，前端用 councilorRound 篩選屆次；只寫一屆會把其他屆從索引裡蓋掉
const ROUNDS = Object.keys(roundDefs)
const SAMPLE_RATIO = Number.parseInt(process.argv[2]) || 100

const errorStats = {}

let total = 0

const sayitIds = {}

function appendError (say, reason) {
  const round = `${say.type}#${say.round}`
  if (!errorStats[round]) {
    errorStats[round] = {}
  }
  if (!errorStats[round][reason]) {
    errorStats[round][reason] = { count: 0, example: [] }
  }
  const cursor = errorStats[round][reason]
  cursor.count += 1
  if (cursor.example.length < 3) {
    cursor.example.push(say.summary)
  }
}

function genSynonymList () {
  const depList = departmentMeta.departmentBrief
    .filter(dep => dep.synonym && dep.synonym.length)
    .map((dep) => {
      return {
        objectID: `department-${dep.abbr}`,
        type: 'synonym',
        synonyms: [dep.abbr, ...dep.synonym]
      }
    })

  const generalList = synonym.synonym
    .filter(syn => syn.tokens && syn.tokens.length > 1)
    .map((syn) => {
      return {
        objectID: `general-${syn.name}`,
        type: 'synonym',
        synonyms: syn.tokens
      }
    })

  return [...depList, ...generalList]
}

async function main () {
  const agClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_DATA_API_KEY)
  const indexName = process.env.ALGOLIA_INDEX_NAME
  const tempIndexName = `${indexName}-new`
  const agIndex = agClient.initIndex(tempIndexName)
  // 上次中斷留下的暫存索引可能有舊資料，先清空
  await agIndex.clearObjects().wait()
  await agIndex.saveSynonyms(genSynonymList(), { replaceExistingSynonyms: true }).wait()
  await agIndex.setSettings({
    ranking: [
      'desc(timestamp)',
      'typo',
      'words',
      'filters',
      'proximity',
      'attribute',
      'exact',
      'custom'
    ],
    attributesForFaceting: [
      'relatedOrgs',
      'councilorRound',
      'round',
      'type',
      'councilor.districtId',
      'councilor.districtTitle',
      'councilor.name',
      'councilor.party',
      'src'
    ]
  }).wait()

  const promises = ROUNDS.flatMap(nth => syncRound(agIndex, nth))
  // 有一位議員上傳失敗就整個停下來，不要把缺資料的暫存索引換成正式索引
  await Promise.all(promises)
  await agClient.moveIndex(tempIndexName, indexName).wait()
  if (Object.keys(errorStats).length) {
    const msg = `Algolia 搜尋同步錯誤: \n ${JSON.stringify(errorStats, null, '  ')}`
    console.error(msg)
    notifyJandi(msg)
  }

  const { items } = await agClient.listIndices()
  const targetIndex = items.find(item => item.name === indexName)
  if (!targetIndex) {
    console.error('Algolia index not found')
  } else if (targetIndex.entries !== total) {
    console.error(`Algolia entries mismatch. Local (${total}) vs Algolia (${targetIndex.entries})`)
  }
}

function syncRound (agIndex, nth) {
  const sayitBase = path.join(__dirname, `../content/council/${nth}/sayit`)
  const councilorMeta = JSON.parse(fs.readFileSync(path.join(sayitBase, '../councilor-map.json')))

  return fs.readdirSync(sayitBase).filter(file => file !== 'stats.json').map((file) => {
    const sayit = JSON.parse(fs.readFileSync(path.join(sayitBase, file)))
    const councilor = councilorMeta[sayit.id]

    const rows = sayit.sayit
      .map((say) => {
        const id = md5(`${nth}${say.say}${say.summary}${councilor.name}${say.date}${say.type}`)

        if (sayitIds[id]) {
          appendError(say, '質詢重複')
        } else {
          sayitIds[id] = say
        }

        const timestamp = dayjs(say.date).unix()
        if (!timestamp) {
          appendError(say, '無質詢日期')
        }
        return {
          ...say,
          objectID: id,
          councilorRound: nth,
          timestamp,
          councilor
        }
      })
      .filter(r => r.timestamp && Math.random() <= SAMPLE_RATIO / 100)

    total += rows.length

    return agIndex
      .saveObjects(rows, { autoGenerateObjectIDIfNotExist: true })
      .wait()
      .then((response) => {
        console.info(`Sync ${nth} councilor ${councilor.name}, total ${response.objectIDs.length} records`)
      })
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
