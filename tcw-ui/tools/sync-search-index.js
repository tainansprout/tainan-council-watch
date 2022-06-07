const fs = require('fs')
const path = require('path')
const algoliasearch = require('algoliasearch')
const dotenv = require('dotenv')
const md5 = require('md5')
const dayjs = require('dayjs')

dotenv.config()

const NTH = process.argv[2] || '3rd'
const SAMPLE_RATIO = Number.parseInt(process.argv[3]) || 80

const SAYIT_BASE = path.join(__dirname, `../content/council/${NTH}/sayit`)

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

async function main () {
  const agClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_DATA_API_KEY)
  const indexName = process.env.ALGOLIA_INDEX_NAME
  const tempIndexName = `${indexName}-new`
  const agIndex = agClient.initIndex(tempIndexName)

  await agIndex.setSettings({
    attributesForFaceting: [
      'relatedOrgs',
      'councilRound',
      'round',
      'type',
      'councilor.districtId',
      'councilor.districtTitle',
      'councilor.name',
      'councilor.party',
      'src'
    ]
  })

  const councilorMeta = JSON.parse(fs.readFileSync(path.join(SAYIT_BASE, '../councilor-map.json')))

  const files = fs.readdirSync(SAYIT_BASE)
  const promises = files.map((file) => {
    if (file === 'stats.json') {
      return null
    }
    const sayit = JSON.parse(fs.readFileSync(path.join(SAYIT_BASE, file)))
    const councilor = councilorMeta[sayit.id]

    const rows = sayit.sayit
      .map((say) => {
        const id = md5(`${say.say}${say.summary}${councilor.name}${say.date}${say.type}`)

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
          councilorRound: NTH,
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
        console.info(`Sync councilor ${councilor.name}, total ${response.objectIDs.length} records`)
      })
      .catch((err) => {
        console.error(err)
      })
  })

  await Promise.all(promises)
  await agClient.moveIndex(tempIndexName, indexName)
  if (Object.keys(errorStats).length) {
    console.error('Invalid round: \n', JSON.stringify(errorStats, null, '  '))
  }

  setTimeout(async () => {
    const { items } = await agClient.listIndices()
    const targetIndex = items.find(item => item.name === indexName)
    if (!targetIndex) {
      console.error('Index disappear')
    } else if (targetIndex.entries !== total) {
      console.error(`Algolia entries mismatch. Local (${total}) vs Algolia (${targetIndex.entries})`)
    }
  }, 3000)
}

main()
