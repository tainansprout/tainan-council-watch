<template lang="pug">
  .districtLanding
    .districtLanding__list
      template(v-for="district in districtList")
        nuxt-link.district.f6.db.pa3.pa0-l.mt3.mt0-l(:to="districtLink(district)" :id="districtId(district)")
          .dn.dib-l.mr1
            i.fa-solid.fa-square
          .db.di-l.mr2
            .di.f5.f6-l {{district}}
            .f7.di.dn-l.ml3 {{districtMeta(district).districtQuota}} 席
          .db.di-l.mt3.mt0-l
            span.district__area.mr1-l(v-for="town in districtMeta(district).townList" :key="town") {{town}}
        .db.dn-l(v-if="target && target === district")
          slot
    .districtLanding__map.mt5
      district-map
</template>
<script>
import { DISTRICT_LIST, districtName2Id } from '~/libs/defs'
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
  computed: {
    districtList () {
      return DISTRICT_LIST
    }
  },
  methods: {
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
  &__list {
    @include large-screen {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 2rem;
      row-gap: 0.5rem;
    }
  }
}
.district {
  border: 1px solid #D8D8D8;
  border-top: 4px solid #FBF1A9;
  color: #00000F;
  text-decoration: none;

  @include large-screen {
    border: none;
    text-decoration: underline;
  }

  &__area {
    &:not(:last-child):after {
      content: ".";
      @include large-screen {
        display: none;
      }
    }
  }
}
</style>
