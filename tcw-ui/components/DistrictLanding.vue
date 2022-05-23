<template lang="pug">
  .districtLanding
    .districtLanding__list
      template(v-for="district in districtList")
        nuxt-link.district.f6.db.pa3.pa0-l.mt3.mt0-l.mb3-l(:to="districtLink(district)" :id="districtId(district)")
          .dn.dib-l.mr1
            i.fa-solid.fa-square
          .district__name.db.di-l.mr2(
            :class="{'district__name--active': isDistrictActive(district)}"
            @mouseover="mouseoverDistrict(district)"
            @mouseleave="mouseleaveDistrict"
          )
            .di.f5.f6-l {{district}}
            .f7.di.dn-l.ml3 {{districtMeta(district).districtQuota}} 席
          .db.di-l.mt3.mt0-l
            span.district__town.mr1-l(
              v-for="town in districtMeta(district).townList"
              :key="town"
              :class="{'district__town--active': isTownActive(town)}"
              @mouseover="mouseoverTown(town)"
              @mouseleave="mouseleaveTown"
            ) {{town}}
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
  border: 1px solid #D8D8D8;
  border-top: 4px solid #FBF1A9;
  color: #00000F;
  text-decoration: none;

  @include large-screen {
    border: none;

    &__name {
      text-decoration: underline;
    }

    &__town {
      text-decoration: underline;
    }
  }

  &__name {
    &--active,
    &:hover {
      color: #49b0d5;
      text-decoration-color: #49b0d5;
    }
  }

  &__town {
    &:not(:last-child):after {
      content: ".";
      @include large-screen {
        display: none;
      }
    }
    &--active,
    &:hover {
      color: #49b0d5;
      text-decoration-color: #49b0d5;
    }
  }
}
</style>
