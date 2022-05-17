<template lang="pug">
  .dmap.relative
    .dmap__map.absolute.h-100.w-100(ref="map")
</template>
<script>
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { districtName2Id } from '~/libs/defs'
import townMap from '~/content/map/town-2010.topo-districts.json'

export default {
  props: {
    focus: {
      default: null,
      validator (val) {
        return !val || (['town', 'district'].includes(val.type) && val.id)
      }
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
    handleHoverPath (e, d) {
      this.$emit('hover-town', d.properties.TOWNNAME)
    },
    handleOutPath (e, d) {
      this.$emit('out-town', d.properties.TOWNNAME)
    },
    initMap () {
      const mapEle = this.$refs.map
      const towns = feature(townMap, townMap.objects.towns).features
      const projection = d3.geoMercator()
        .fitSize([mapEle.clientWidth, mapEle.clientHeight], {
          type: 'FeatureCollection',
          features: towns
        })

      const geoGenerator = d3.geoPath(projection)

      // create map
      const svgEle = d3.select(mapEle)
        .append('svg')
        .attr('width', mapEle.clientWidth)
        .attr('height', mapEle.clientHeight)

      this.mapD3 = svgEle

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
    }
  }
}
</script>
<style lang="scss" scoped>
.dmap {
  padding-bottom: 56%;
  &__map {
    ::v-deep {
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
    }
  }
}
</style>
