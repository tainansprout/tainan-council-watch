const fs = require('fs')
const path = require('path')
const NodeCrawler = require('crawler')
const { districtName2Id } = require('./utils')

const SITE_BASE = 'https://www.tncc.gov.tw'

const NTH = process.argv[2] || '3rd'
const PATH_BASE = path.join(__dirname, '../content/council/', `${NTH}`)

const MISSING_COUNCILOR_LIST = JSON.parse(fs.readFileSync(path.join(PATH_BASE, 'missing-councilor-list.json')))

const councilorsInDistrict = {}

function prettyName (name) {
  return name
    .replace(/\(.*\)/g, '')
    .replace(/([a-z])([^ a-zA-Z])/g, '$1 $2')
}

function dumpDistrictInfo (quota) {
  return (error, res, done) => {
    if (error) {
      console.error('Fail on get district', error)
      done()
      return
    }
    const $ = res.$
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

    // councilor list
    $('.col-lg-3 .image-box').each(function () {
      const ele = $(this)
      const pageUri = ele.find('a').attr('href')
      const pageLink = `${SITE_BASE}/${pageUri}`
      const id = pageUri.replace(/.*mainid=([a-zA-Z0-9]+)-.*/, '$1')
      // 林宜瑾 (109年2月1日辭職)
      const name = prettyName(ele.find('.title').text())
      const abbr = name.replace(/[a-zA-Z‧． ]/g, '')
      const party = ele.find('p.mb-10').text()

      // url(warehouse/56CC6C3B-1814-482B-92C8-D21AD0106264/153F6768-2BCB-467A-AAFF-A935010DC2F7.jpg)
      const bgImg = ele.find('a div').css('background-image')
      const bgUrl = `${SITE_BASE}/${bgImg.slice('url('.length, -1)}`

      councilorsInDistrict[districtId].councilors.push({
        id,
        name,
        abbr,
        party,
        bgUrl,
        pageLink
      })
    })
    done()
  }
}

const crawler = new NodeCrawler({
  maxConnections: 1
})

crawler.on('drain', () => {
  // merge missing councilor list
  Object.values(MISSING_COUNCILOR_LIST).forEach((councilor) => {
    const districtId = councilor.districtId
    councilor.townList = councilorsInDistrict[districtId].townList
    councilorsInDistrict[districtId].councilors.push(councilor)
  })

  // dump file
  fs.writeFileSync(
    path.join(PATH_BASE, 'district-map.json'),
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
    path.join(PATH_BASE, 'councilor-map.json'),
    JSON.stringify(councilors, null, '  ')
  )
})

crawler.queue({
  uri: `${SITE_BASE}/subhome.asp?orcaid=09243431-6616-4608-989D-6A156949F929`,
  callback (error, res, done) {
    if (error) {
      console.error('Fail during init get-councilors', error)
      done()
      return
    }
    const $ = res.$
    $('.main.col-lg-12 .nav-link').each(function () {
      const districtUrl = $(this).attr('href')
      const quota = $(this).siblings().text().replace(/[^\d]/g, '')
      crawler.queue({
        uri: `${SITE_BASE}/${districtUrl}`,
        callback: dumpDistrictInfo(quota)
      })
    })
    done()
  }
})
