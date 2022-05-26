<template lang="pug">
  .dmap.relative
    .dmap__map.absolute.h-100.w-100(ref="map")
</template>
<script>
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { DEFAULT_ROUND, districtName2Id } from '~/libs/defs'
import townMap from '~/content/map/town-2010.topo-districts.json'
import districtMap from '~/content/council/3rd/district-map.json'

const TOWN2DISTRICT = Object.values(districtMap).reduce((map, district) => {
  district.townList.forEach((town) => {
    town = town.endsWith('區') ? town : `${town}區`
    map[town] = district.districtId
  })
  return map
}, {})

const MAP_SIZE = 800

const TOOLTIP_WIDTH = 100
const TOOLTIP_HEIGHT = 73
const TOOLTIP_CONFIG = {
  LINE_START: {
    第十二選區: [630, 750],
    第十三選區: [730, 650]
  },
  LINE_OFFSET: {
    default: [0, -40],
    第八選區: [-110, 15],
    第九選區: [-50, 45],
    第十選區: [20, 80]
  },
  BOARD_OFFSET: {
    default: {
      x: TOOLTIP_WIDTH * -1 / 2,
      y: TOOLTIP_HEIGHT * -1 + 1
    },
    第八選區: {
      x: TOOLTIP_WIDTH * -1 + 1,
      y: TOOLTIP_HEIGHT * -1 / 2
    },
    第九選區: {
      x: TOOLTIP_WIDTH * -1 + 2,
      y: TOOLTIP_HEIGHT * -1 / 2
    },
    第十選區: {
      x: TOOLTIP_WIDTH * -1 / 2,
      y: -1
    }
  }
}

export default {
  props: {
    focus: {
      default: null,
      validator (val) {
        return !val || (['town', 'district'].includes(val.type) && val.id)
      }
    },
    map: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      mapD3: null
    }
  },
  watch: {
    focus () {
      this.handleFocus()
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    handleFocus () {
      if (!this.mapD3) {
        return
      }
      this.mapD3.selectAll('g path.active').classed('active', false)
      if (this.focus) {
        const selector = `${this.focus.type}-${this.focus.id}`
        this.mapD3.select(`g path.${selector}`).classed('active', true)
      }
    },
    handleHoverBoard (e, d) {
      this.$emit('hover-district', d.name)
    },
    handleOutBoard (e, d) {
      this.$emit('out-district', d.name)
    },
    handleHoverPath (e, d) {
      this.$emit('hover-town', d.properties.TOWNNAME)
    },
    handleOutPath (e, d) {
      this.$emit('out-town', d.properties.TOWNNAME)
    },
    gotoDistrictFromBoard (e, d) {
      const districtName = d.name
      const districtId = districtName2Id(districtName)
      this.$router.push({
        name: 'round-district-district',
        params: {
          round: DEFAULT_ROUND,
          ...this.$route.params,
          district: districtId
        }
      })
    },
    gotoDistrict (e, d) {
      const town = d.properties.TOWNNAME
      const districtId = TOWN2DISTRICT[town]
      this.$router.push({
        name: 'round-district-district',
        params: {
          round: DEFAULT_ROUND,
          ...this.$route.params,
          district: districtId
        }
      })
    },
    initMap () {
      const mapEle = this.$refs.map
      const towns = feature(townMap, townMap.objects.towns).features

      const projection = d3.geoMercator()
        .fitSize([MAP_SIZE, MAP_SIZE], {
          type: 'FeatureCollection',
          features: towns
        })

      const geoGenerator = d3.geoPath(projection)

      // create map
      const svgEle = d3.select(mapEle)
        .append('svg')
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', `0 0 ${MAP_SIZE} ${MAP_SIZE}`)
        .attr('xmlns:xhtml', 'http://www.w3.org/1999/xhtml')
        .classed('svg-content', true)

      this.mapD3 = svgEle

      // draw town
      const townSvg = svgEle
        .append('g')
        .attr('class', 'town')

      townSvg.selectAll('path')
        .data(towns)
        .enter()
        .append('path')
        .attr('d', geoGenerator)
        .attr('class', d => `town-${d.properties.TOWNNAME}`)
        .on('mouseover', this.handleHoverPath)
        .on('mouseout', this.handleOutPath)
        .on('click', this.gotoDistrict)

      // draw district
      const districts = feature(townMap, townMap.objects.districts).features
      const districtSvg = svgEle
        .append('g')
        .attr('class', 'district')

      districtSvg.selectAll('path')
        .data(districts)
        .enter()
        .append('path')
        .attr('d', geoGenerator)
        .attr('class', d => `district-${districtName2Id(d.properties.name)}`)

      // draw district tooltip
      const allDistricts = [
        ...districts,
        { properties: { name: '第十二選區' } },
        { properties: { name: '第十三選區' } }
      ]
      const tooltipLines = allDistricts.map((d) => {
        const name = d.properties.name
        const endPoint = d.type ? geoGenerator.centroid(d) : TOOLTIP_CONFIG.LINE_START[name]
        const lineDiff = TOOLTIP_CONFIG.LINE_OFFSET[name] || TOOLTIP_CONFIG.LINE_OFFSET.default
        const boardOffset = TOOLTIP_CONFIG.BOARD_OFFSET[name] || TOOLTIP_CONFIG.BOARD_OFFSET.default
        const quota = this.map[districtName2Id(name)].districtQuota
        return {
          name,
          quota,
          line: {
            start: [endPoint[0] + lineDiff[0], endPoint[1] + lineDiff[1]],
            end: endPoint
          },
          boardOffset
        }
      })

      const line = d3.line()
      const tooltipSvg = svgEle
        .append('g')
        .attr('class', 'tooltip')

      tooltipSvg.selectAll('path')
        .data(tooltipLines)
        .enter()
        .append('path')
        .attr('d', d => line([d.line.start, d.line.end]))

      const board = tooltipSvg.selectAll('foreignObject')
        .data(tooltipLines)
        .enter()
        .append('foreignObject')
        .attr('x', d => d.line.start[0] + d.boardOffset.x)
        .attr('y', d => d.line.start[1] + d.boardOffset.y)
        .attr('width', TOOLTIP_WIDTH)
        .attr('height', TOOLTIP_HEIGHT)

      board.append('xhtml:div')
        .attr('class', 'board')
        .html(d => `<div class="board__title">${d.name}</div><div class="board__quota">${d.quota}</div>`)
        .on('mouseover', this.handleHoverBoard)
        .on('mouseout', this.handleOutBoard)
        .on('click', this.gotoDistrictFromBoard)
    }
  }
}
</script>
<style lang="scss" scoped>
.dmap {
  &__map {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    vertical-align: top;
    overflow: hidden;

    ::v-deep {
      .svg-content {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
      }
      g.town {
        path {
          fill: white;
          stroke: #cacac9;
        }
      }

      g.district {
        path {
          fill: transparent;
          stroke: #8a8c8c;
          stroke-width: 1.2px;
          pointer-events: none;
        }
      }

      g path.active {
        fill: #caebc1c0;
      }

      g.tooltip {
        path {
          fill: transparent;
          stroke: #78cc61;
          stroke-width: 3px;
        }
      }

      .board {
        margin: 1px;
        border: solid 1px $gray-d;
        border-top: 6px solid $yellow;
        height: calc(100% - 2px);
        background: $white;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: center;
        text-align: center;

        &__title {
          font-weight: 300;
          font-size: 0.875rem;
          pointer-events: none;
        }
        &__quota {
          font-weight: 500;
          pointer-events: none;
        }
      }
    }
  }
}
</style>
