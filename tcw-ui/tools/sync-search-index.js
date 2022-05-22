const fs = require('fs')
const path = require('path')
const algoliasearch = require('algoliasearch')
const dotenv = require('dotenv')
const dayjs = require('dayjs')

dotenv.config()

const NTH = process.argv[2] || '3rd'
const SAMPLE_RATIO = Number.parseInt(process.argv[3]) || 100

const SAYIT_BASE = path.join(__dirname, `../content/council/${NTH}/sayit`)

const ERROR_STATS = {}

async function main () {
  const agClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_DATA_API_KEY)
  const agIndex = agClient.initIndex(process.env.ALGOLIA_INDEX_NAME)

  agIndex.delete()

  const councilorMeta = JSON.parse(fs.readFileSync(path.join(SAYIT_BASE, '../councilor-map.json')))

  const files = fs.readdirSync(SAYIT_BASE)
  const promises = files.map((file) => {
    const sayit = JSON.parse(fs.readFileSync(path.join(SAYIT_BASE, file)))
    const councilor = councilorMeta[sayit.id]

    const rows = sayit.sayit
      .map((say) => {
        const timestamp = dayjs(say.date).unix()
        if (!timestamp) {
          const round = `${say.type}#${say.round}`
          if (!ERROR_STATS[round]) {
            ERROR_STATS[round] = { count: 0, example: [] }
          }
          ERROR_STATS[round].count += 1
          if (ERROR_STATS[round].example.length < 5) {
            ERROR_STATS[round].example.push(say.summary)
          }
        }
        return {
          ...say,
          timestamp,
          councilor
        }
      })
      .filter((r) => r.timestamp && Math.random() <= SAMPLE_RATIO / 100)

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
  if (Object.keys(ERROR_STATS).length) {
    console.info('Invalid round: \n', ERROR_STATS)
  }
}

main()
