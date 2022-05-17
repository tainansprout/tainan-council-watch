const fs = require('fs')
const path = require('path')
const turf = require('@turf/turf')

const NTH = process.argv[2] || '3rd'
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
    map[feature.properties.TOWNNAME] = turf.polygon(feature.geometry.coordinates)
    return map
  }, {})
}

function genDistrictMap () {
  const districtMap = JSON.parse(
    fs.readFileSync(path.join(__dirname, `../content/council/${NTH}/district-map.json`))
  )

  const townMap = getTownPolygonMap()
  const featureList = Object.values(districtMap).reduce((featureList, district) => {
    const feature = district.townList.reduce((feature, townName) => {
      if (!townName.endsWith('區')) {
        townName = `${townName}區`
      }
      if (townName.includes('原住民')) {
        // entire Tainan
        return feature
      }
      const townPolygon = townMap[townName]
      if (!townPolygon) {
        throw new Error(`${townName} polygon not existed`)
      }
      return turf.union(feature, townPolygon, {
        properties: {
          name: district.districtTitle
        }
      })
    }, turf.polygon([]))
    if (feature.properties.name) {
      featureList.push(feature)
    }
    return featureList
  }, [])

  fs.writeFileSync(
    path.join(__dirname, `../content/map/${MAP_NAME}-district.json`),
    JSON.stringify({
      type: 'FeatureCollection',
      features: featureList
    }, null, '  ')
  )
}

genDistrictMap()
