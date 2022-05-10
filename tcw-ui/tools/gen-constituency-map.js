const fs = require('fs')
const path = require('path')
const turf = require('@turf/turf')

const NTH = process.argv[2] || '第三屆'
const MAP_NAME = process.argv[3] || 'town-2010'

function getTownPolygonMap () {
  const townGeojson = JSON.parse(
    fs.readFileSync(path.join(__dirname, `../content/map/${MAP_NAME}.json`))
  )
  return townGeojson.features.reduce((map, feature) => {
    if (feature.geometry.type !== 'Polygon') {
      // we only care about 鄉鎮市區
      return map
    }
    map[feature.properties.town] = turf.polygon(feature.geometry.coordinates)
    return map
  }, {})
}

function genConstituencyMap () {
  const areaList = JSON.parse(
    fs.readFileSync(path.join(__dirname, `../content/${NTH}/area-list.json`))
  )

  const townMap = getTownPolygonMap()
  const featureList = Object.values(areaList).reduce((featureList, area) => {
    const feature = area.areaList.reduce((feature, areaName) => {
      if (!areaName.endsWith('區')) {
        areaName = `${areaName}區`
      }
      if (areaName.includes('原住民')) {
        // entire Tainan
        return feature
      }
      const townPolygon = townMap[areaName]
      if (!townPolygon) {
        throw new Error(`${areaName} polygon not existed`)
      }
      return turf.union(feature, townPolygon, {
        properties: {
          name: area.areaTitle
        }
      })
    }, turf.polygon([]))
    featureList.push(feature)
    return featureList
  }, [])

  fs.writeFileSync(
    path.join(__dirname, `../content/map/${MAP_NAME}-const.json`),
    JSON.stringify({
      type: 'FeatureCollection',
      features: featureList
    }, null, '  ')
  )
}

genConstituencyMap()
