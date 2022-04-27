<template lang="pug">
  .councilor.mw8.ph3.center.pv3.pv4-l
    con-con-landing(:map="consMap" :round="round" :minified="!!councilor")
    template(v-if="councilor")
      .councilor__head.bt.b--moon-gray.mt4.pt3.pt4-l(ref="head")
        h1.fw5.f3.f2-l.flex.flex-column.flex-row-l
          span.mr4-l.pr3-l {{councilor.areaTitle}}
          span.mt3.mt0-l {{councilor.areaList.join('.')}}
      .councilor__person.bt-l.bb.b--moon-gray.mt4.pb4.pb0-l
        .councilor__basic.br-l.b--moon-gray
          .aspect-ratio.aspect-ratio--1x1
            .aspect-ratio--object.br-100.overflow-hidden
              img(:src="councilor.bgUrl" :alt="councilor.name")
          div
            .f5.f4-l {{councilor.name}}
            .f5.f4-l.mt3.mt4-l {{councilor.party}}
        .councilor__experience.mt4.mt0-l
          h2.mt0-l.f3 公職經歷
          a.black(href="https://hackmd.io/@ddio/SJWBXM4Sq/https%3A%2F%2Fhackmd.io%2FJ3xPDhMnT1W5Eg_cKeNTBQ") 待製作， 05/11 登場
</template>
<script>
import { scrollTo } from '~/libs/utils'
export default {
  async asyncData ({ $content, params, redirect }) {
    const round = params.round || '第三屆'
    const consMap = await $content(round, 'area-list').fetch()
    const counsMap = await $content(round, 'councilor-list').fetch()
    const councilorId = params.councilor
    const councilor = counsMap[councilorId]

    return { consMap, round, councilor }
  },
  computed: {

  },
  mounted () {
    if (this.councilor) {
      scrollTo(this.$refs.head)
    }
  }
}
</script>
<style lang="scss" scoped>
.councilor {
  &__basic {
    display: grid;
    grid-template-columns: 33vw 1fr;
    column-gap: 2rem;
    align-items: center;
  }
  @include large-screen {
    &__person {
      display: grid;
      grid-template-columns: 25rem 1fr;
    }
    &__basic {
      grid-template-columns: 9.25rem 1fr;
      padding: 1.5rem 2.25rem;
    }
    &__experience {
      padding: 1.5rem 2.25rem;
    }
  }
}
</style>
