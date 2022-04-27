const fs = require('fs')
const path = require('path')
const NodeCrawler = require('crawler')

const SITE_BASE = 'https://www.tncc.gov.tw'

const NTH = process.argv[2] || '第三屆'
const PATH_BASE = path.join(__dirname, '../content/', `${NTH}`)

const councilorsInArea = {}

function prettyName (name) {
  return name
    .replace(/\(.*\)/g, '')
    .replace(/([a-z])([^ a-zA-Z])/g, '$1 $2')
}

function dumpAreaInfo (quota) {
  return (error, res, done) => {
    if (error) {
      console.error('Fail on get area', error)
      done()
      return
    }
    const $ = res.$
    // get area info
    // 第五選區(善化.安定.新市.山上.新化區)
    const header = $('h3').text().split('(')
    const areaTitle = header[0]
    const areaList = header[1]
      .slice(0, -1)
      .replace(/區/g, '')
      .split('.')
      .map((area) => {
        if (area.length < 2 || area === '中西') {
          return `${area}區`
        }
        return area
      })

    councilorsInArea[areaTitle] = {
      areaTitle,
      areaList,
      areaQuota: quota,
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

      councilorsInArea[areaTitle].councilors.push({
        id: `${name}-${id}`,
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
  fs.writeFileSync(
    path.join(PATH_BASE, 'area-list.json'),
    JSON.stringify(councilorsInArea)
  )

  const councilors = Object.values(councilorsInArea).flatMap((area) => {
    return area.councilors.map((councilor) => {
      return {
        ...councilor,
        areaTitle: area.areaTitle,
        areaList: area.areaList
      }
    })
  })

  fs.writeFileSync(
    path.join(PATH_BASE, 'councilor-list.json'),
    JSON.stringify(councilors)
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
      const areaUrl = $(this).attr('href')
      const quota = $(this).siblings().text().replace(/[^\d]/g, '')
      crawler.queue({
        uri: `${SITE_BASE}/${areaUrl}`,
        callback: dumpAreaInfo(quota)
      })
    })
    done()
  }
})
