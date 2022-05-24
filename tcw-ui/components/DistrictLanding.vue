<template lang="pug">
  .districtLanding
    .districtLanding__list
      template(v-for="district in districtList")
        nuxt-link.district.db.dn-ns.pa3.mt3(:to="districtLink(district)" :id="districtId(district)")
          district-text(
            :district="districtMeta(district)"
            :active-area.sync="focusedArea"
            :is-single-element="true"
            :is-quota-visible="true"
          )
        nuxt-link.district.dn.db-ns.mb3(:to="districtLink(district)" :id="districtId(district)")
          district-text(
            :district="districtMeta(district)"
            :active-area.sync="focusedArea"
          )
        .db.dn-l(v-if="target && target === district")
          slot
    .districtLanding__map.dn.db-l
      district-map(:focus="focusedArea" @hover-town="mouseoverTown" @out-town="mouseleaveTown")
</template>
<script>
import { debounce } from 'lodash'
import { DISTRICT_LIST, districtName2Id } from '~/libs/defs'

const A_LITTLE = 100
const A_LITTLE_MORE = 200

export default {
  props: {
    map: {
      type: Object,
      required: true
    },
    round: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      focusedArea: null,
      isFocusedAreaDirty: false
    }
  },
  computed: {
    districtList () {
      return DISTRICT_LIST
    }
  },
  methods: {
    mouseoverTown (town) {
      if (!town.endsWith('區')) {
        town = `${town}區`
      }
      this.setFocusedArea('town', town)
    },
    mouseleaveTown () {
      this.resetFocusedArea()
    },
    mouseoverDistrict: debounce(function (name) {
      this.setFocusedArea('district', districtName2Id(name))
    }, A_LITTLE),
    mouseleaveDistrict () {
      this.resetFocusedArea()
    },
    setFocusedArea (type, id) {
      this.isFocusedAreaDirty = false
      this.focusedArea = { type, id }
    },
    resetFocusedArea () {
      this.isFocusedAreaDirty = true
      setTimeout(() => {
        if (this.isFocusedAreaDirty && this.focusedArea) {
          this.focusedArea = null
        }
      }, A_LITTLE_MORE)
    },
    isDistrictActive (district) {
      return this.focusedArea && this.focusedArea.type === 'district' && this.focusedArea.id.includes(district)
    },
    isTownActive (town) {
      return this.focusedArea && this.focusedArea.type === 'town' && this.focusedArea.id.includes(town)
    },
    districtLink (district) {
      return {
        name: 'round-district-district',
        params: {
          round: this.round,
          district: districtName2Id(district)
        }
      }
    },
    districtId (district) {
      return `district-${district}`
    },
    districtMeta (name) {
      return this.map[districtName2Id(name)]
    }
  }
}
</script>
<style lang="scss" scoped>
.districtLanding {
  @include large-screen {
    display: grid;
    grid-template-columns: 20rem 1fr;
  }
}
.district {
  border: 1px solid $gray;
  border-top: 6px solid $yellow;

  @include not-small-screen {
    border: none;
  }
}
</style>
