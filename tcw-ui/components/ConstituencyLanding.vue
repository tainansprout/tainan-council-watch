<template lang="pug">
  .consLanding
    .consLanding__list
      nuxt-link.cons.f6.db.pa3.pa0-l.mt3.mt0-l(
        v-for="cons in consList"
        :key="cons"
        :to="consLink(cons)"
      )
        .dn.dib-l.mr1
          i.fa-solid.fa-square
        .db.di-l.mr2
          .di.f5.f6-l {{cons}}
          .f7.di.dn-l.ml3 {{map[cons].areaQuota}} 席
        .db.di-l.mt3.mt0-l
          span.cons__area.mr1-l(v-for="area in map[cons].areaList" :key="area") {{area}}

</template>
<script>
import { CONSTITUENCY_LIST } from '~/libs/defs'
export default {
  props: {
    map: {
      type: Object,
      required: true
    },
    round: {
      type: String,
      required: true
    }
  },
  computed: {
    consList () {
      return CONSTITUENCY_LIST
    }
  },
  methods: {
    consLink (cons) {
      return {
        name: 'round-選區-constituency',
        params: {
          round: this.round,
          constituency: cons
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.consLanding {
  &__list {
    @include large-screen {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 2rem;
      row-gap: 0.5rem;
    }
  }
}
.cons {
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
