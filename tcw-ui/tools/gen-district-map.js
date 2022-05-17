const fs = require('fs')
const path = require('path')
const turf = require('@turf/turf')
const { feature } = require('topojson-client')
const { topology } = require('topojson-server')

const NTH = process.argv[2] || '3rd'
const MAP_NAME = process.argv[3] || 'town-2010.topo'

function getTownPolygonMap () {
  const townTopoJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, `../content/map/${MAP_NAME}.json`))
  )
  const allFeatures = feature(townTopoJson, townTopoJson.objects.towns)
    .features
    .filter(town => town.properties.COUNTYNAME === '台南市')

  const townMap = allFeatures
    .reduce((map, feature) => {
      if (feature.geometry.type !== 'Polygon') {
        // we only care about 鄉鎮市區
        return map
      }
      map[feature.properties.TOWNNAME] = turf.polygon(feature.geometry.coordinates)
      return map
    }, {})

  return {
    all: allFeatures,
    map: townMap
  }
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
      const townPolygon = townMap.map[townName]
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

  const topoObjects = {
    towns: {
      type: 'FeatureCollection',
      features: townMap.all
    },
    districts: {
      type: 'FeatureCollection',
      features: featureList
    }
  }

  const topo = topology(topoObjects)

  fs.writeFileSync(
    path.join(__dirname, `../content/map/${MAP_NAME}-districts.json`),
    JSON.stringify(topo, null, '  ')
  )
}

genDistrictMap()
