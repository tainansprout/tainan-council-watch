import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import md5 from 'md5'
import sharp from 'sharp'
import parseArgs from 'command-line-args'
import * as cheerio from 'cheerio'
import { districtName2Id } from './utils.js'
import roundDefs from './round-defs.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const SITE_BASE = 'https://www.tncc.gov.tw'
const IMG_CACHE_BASE = {
  url: '/img/',
  path: path.join(__dirname, '../static/img')
}
const MAX_IMG_WIDTH = 640
// sharp metadata 的 format 對應副檔名
const ACCEPTED_IMAGE_TYPE = { png: 'png', jpeg: 'jpg', webp: 'webp', gif: 'gif' }

const PARTY_LIST = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../content/meta/partyList.json'))
).partyList

const PARTY_MAP = PARTY_LIST.reduce((accu, party) => {
  accu[party.abbr || party.name] = party
  return accu
}, {})

const councilorsInDistrict = {}

function prettyName (name) {
  return name
    .replace(/\(.*\)/g, '')
    .replace(/([a-z])([^ a-zA-Z])/g, '$1 $2')
}

// TODO: duplicated code in libs/utils, find some way to share this
function normalizeParty (party) {
  if (!party) {
    return undefined
  }
  if (party.name && party.avatar) {
    return party
  }
  let theParty = PARTY_MAP[party]
  if (!theParty) {
    theParty = PARTY_LIST.find((p) => {
      const isInAlias = (p.alias || []).includes(party)
      return p.name === party || isInAlias
    })
  }
  if (!theParty) {
    throw new Error(`Undefined party: ${party}`)
  }
  return theParty
}

async function hostImage (originalUrl, round, maxWidth = MAX_IMG_WIDTH) {
  // download image and return new img url, if the image is host in 3rd party
  // also optimize the image when possible
  originalUrl = originalUrl.trim()
  if (!originalUrl || originalUrl.startsWith(IMG_CACHE_BASE.url)) {
    // in case someone overwrite url to other local path XD
    return originalUrl
  }

  const imgHash = md5(originalUrl)
  const imgDest = path.join(IMG_CACHE_BASE.path, round, imgHash)
  const imgUrl = `${IMG_CACHE_BASE.url}${round}/${imgHash}`

  const imgDir = path.dirname(imgDest)
  const matchedImage = fs.existsSync(imgDir)
    ? fs.readdirSync(imgDir).filter(name => name.startsWith(`${imgHash}.`)).map(name => path.join(imgDir, name))
    : []
  if (matchedImage.length) {
    const ext = path.extname(matchedImage[0])
    return `${imgUrl}${ext}`
  }

  // download image one by one to avoid flooding
  let img = null
  const safeUrl = `${SITE_BASE}/${originalUrl.split('/').map(token => encodeURIComponent(token)).join('/')}`
  try {
    img = await axios.get(safeUrl, { responseType: 'arraybuffer' })
  } catch (err) {
    console.error(`Error fetching ${safeUrl}: ${err}`)
  }
  if (!img || !img.data) {
    console.error(`Failed to download image ${safeUrl}`)
    return originalUrl
  }
  let imgMeta
  try {
    imgMeta = await sharp(img.data).metadata()
  } catch (err) {
    console.error(`Invalid image url: ${safeUrl}, ${err}`)
    return originalUrl
  }
  const ext = ACCEPTED_IMAGE_TYPE[imgMeta.format]
  if (!ext) {
    console.error(`Invalid image url: ${safeUrl}, ${imgMeta.format}`)
    return originalUrl
  }

  let image = sharp(img.data, { animated: imgMeta.format === 'gif' })
  if (imgMeta.width > maxWidth) {
    console.info(`Image ${originalUrl} too large, will resize it to ${maxWidth}px width.`)
    image = image.resize(maxWidth)
  }
  // 原本用 imagemin（jpegtran、pngquant 0.6～0.8），改用 sharp 內建的 mozjpeg 和調色盤 PNG
  if (ext === 'jpg') {
    image = image.jpeg({ mozjpeg: true })
  } else if (ext === 'png') {
    image = image.png({ palette: true, quality: 80 })
  }
  const miniImg = await image.toBuffer()

  console.info(`Host image ${originalUrl} in ${imgHash}.${ext}`)

  fs.writeFileSync(path.join(`${imgDest}.${ext}`), miniImg)
  return `${imgUrl}.${ext}`
}

async function fetchPage (uri) {
  const res = await axios.get(uri, { responseType: 'text' })
  return cheerio.load(res.data)
}

async function dumpDistrictInfo (uri, quota, nth) {
  let $
  try {
    $ = await fetchPage(uri)
  } catch (error) {
    console.error('Fail on get district', error)
    return
  }
  // get district info
  // 第五選區(善化.安定.新市.山上.新化區)
  const header = $('h3').text().split('(')
  const districtTitle = header[0]
  const districtId = districtName2Id(districtTitle)
  const townList = header[1]
    .slice(0, -1)
    .replace(/區/g, '')
    .split('.')
    .map((town) => {
      if (town.length < 2 || town === '中西') {
        return `${town}區`
      }
      return town
    })

  councilorsInDistrict[districtId] = {
    districtTitle,
    townList,
    districtId,
    districtQuota: quota,
    councilors: []
  }

  // councilor list，照順序一張一張抓圖，避免灌爆議會網站
  for (const box of $('.col-lg-3 .image-box').toArray()) {
    const ele = $(box)
    const pageUri = ele.find('a').attr('href')
    const pageLink = `${SITE_BASE}/${pageUri}`
    const id = pageUri.replace(/.*mainid=([a-zA-Z0-9]+)-.*/, '$1')
    // 林宜瑾 (109年2月1日辭職)
    const name = prettyName(ele.find('.title').text())
    const abbr = name.replace(/[a-zA-Z‧． ]/g, '')
    const party = ele.find('p.mb-10').text()

    // url(warehouse/56CC6C3B-1814-482B-92C8-D21AD0106264/153F6768-2BCB-467A-AAFF-A935010DC2F7.jpg)
    const bgImg = ele.find('a div').css('background-image')
    const bgUrl = bgImg.slice('url('.length, -1)

    const localBgUrl = await hostImage(bgUrl, nth)

    councilorsInDistrict[districtId].councilors.push({
      id,
      name,
      abbr,

      party: normalizeParty(party).name,
      bgUrl: localBgUrl,
      pageLink
    })
  }
}

async function startCrawling (nth, orcaId) {
  const pathBase = path.join(__dirname, '../content/council/', `${nth}`)
  if (!fs.existsSync(pathBase)) {
    fs.mkdirSync(pathBase)
  }

  let missingCouncilorList = {}
  const missingPath = path.join(pathBase, 'missing-councilor-list.json')
  if (fs.existsSync(missingPath)) {
    missingCouncilorList = JSON.parse(fs.readFileSync(missingPath))
  }

  const imgDir = path.join(IMG_CACHE_BASE.path, nth)
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir)
  }

  let $
  try {
    $ = await fetchPage(`${SITE_BASE}/subhome.asp?orcaid=${orcaId}`)
  } catch (error) {
    console.error('Fail during init get-councilors', error)
    return
  }
  const districts = $('.main.col-lg-12 .nav-link').toArray().map((ele) => {
    const districtUrl = $(ele).attr('href')
    const quota = $(ele).siblings().text().replace(/[^\d]/g, '')
    return { uri: `${SITE_BASE}/${districtUrl}`, quota }
  })
  // 一次抓一個選區，和原本 crawler 的 maxConnections: 1 一樣
  for (const { uri, quota } of districts) {
    await dumpDistrictInfo(uri, quota, nth)
  }

  // merge missing councilor list
  Object.values(missingCouncilorList).forEach((councilor) => {
    const districtId = councilor.districtId
    councilor.townList = councilorsInDistrict[districtId].townList
    councilorsInDistrict[districtId].councilors.push(councilor)
  })

  // dump file
  fs.writeFileSync(
    path.join(pathBase, 'district-map.json'),
    JSON.stringify(councilorsInDistrict, null, '  ')
  )

  const councilors = Object.values(councilorsInDistrict).reduce((sum, district) => {
    district.councilors.forEach((councilor) => {
      sum[councilor.id] = {
        ...councilor,
        districtId: district.districtId,
        districtTitle: district.districtTitle,
        townList: district.townList
      }
    })
    return sum
  }, {})

  fs.writeFileSync(
    path.join(pathBase, 'councilor-map.json'),
    JSON.stringify(councilors, null, '  ')
  )
}

function main () {
  const argOpts = [
    { name: 'round', alias: 'r', type: String },
    { name: 'orcaId', alias: 'i', type: String }
  ]

  const args = parseArgs(argOpts)
  const nth = args.round

  if (!nth) {
    console.error('round is required, ex: 3rd, 4th')
    return 1
  }

  const roundMeta = roundDefs[nth]

  if (!roundMeta || !roundMeta.councilorPageId) {
    console.error(`Missing councilorPageId in round-defs[${nth}], see 台南市議會官網 / 議員資訊網`)
    return 2
  }
  const orcaId = roundMeta.councilorPageId

  startCrawling(args.round, orcaId)
}

main()
