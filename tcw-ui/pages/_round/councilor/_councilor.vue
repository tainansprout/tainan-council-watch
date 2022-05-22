<template lang="pug">
  .councilor.mw8.ph3.center.pv3.pv4-l
    con-con-landing(v-if="districtMap" :map="districtMap" :round="round" :minified="!!councilor")
    template(v-if="councilor")
      .councilor__head.bt.b--moon-gray.mt4.pt3.pt4-l(ref="head")
        h1.fw5.f3.f2-l.flex.flex-column.flex-row-l
          span.mr4-l.pr3-l {{councilor.districtTitle}}
          span.mt3.mt0-l {{councilor.townList.join('.')}}
      .councilor__person.bt-l.bb.b--moon-gray.mt4.pb4.pb0-l(:class="{'councilor__person--misc': miscColumn}")
        .councilor__basic.br-l.b--moon-gray
          .aspect-ratio.aspect-ratio--1x1
            .aspect-ratio--object.br-100.overflow-hidden
              img(:src="councilor.bgUrl" :alt="councilor.name")
          div
            .f5.f4-l {{councilor.name}}
            .f5.f4-l.mt3.mt4-l {{councilor.party}}
        .councilor__personMeta.mt4.mt0-l
          h2.mt0-l.f3 公職經歷
          p(v-for="line in jobHistory" :key="line") {{line}}
        .councilor__personMeta.mt4.mt0-l.bl-l.b--moon-gray(v-if="miscColumn")
          h2.mt0-l.f3 {{miscColumn.title}}
          p {{miscColumn.content}}
      .councilor__sayit.mt4.mt5-l
        interpellation-landing(
          :councilor-map="counsMap"
          :say-list="sayList"
          :stats="sayitStats"
          :category="{type: 'org', value: 'all'}"
        )
</template>
<script>
import { get } from 'lodash'
import { DEFAULT_ROUND } from '~/libs/defs'
import { scrollTo } from '~/libs/utils'

export default {
  async asyncData ({ $content, params, redirect }) {
    const round = params.round || DEFAULT_ROUND
    const districtMap = await $content('council', round, 'district-map').fetch()
    const counsMap = await $content('council', round, 'councilor-map').fetch()
    const councilorId = params.councilor
    let councilor = counsMap[councilorId]
    let sayit

    try {
      sayit = await $content('council', round, 'sayit', councilorId).fetch()
    } catch {
      // noop
    }

    try {
      const cmsContent = await $content('council', round, `meta-${councilor.districtTitle}`).fetch()
      councilor = {
        ...councilor,
        ...cmsContent[`councilor-${councilorId}`]
      }
    } catch {
      // noop
    }

    return { districtMap, round, councilor, counsMap, sayit }
  },
  computed: {
    sayitStats () {
      return get(this, 'sayit.stats', [])
    },
    sayList () {
      const sayit = get(this, 'sayit.sayit', [])
      return sayit.map((it) => {
        return {
          ...it,
          councilorId: this.sayit.id,
          councilRound: this.round
        }
      })
    },
    jobHistory () {
      const history = this.councilor['job-history'] || '待撰寫'
      return history.split('\n')
    },
    miscColumn () {
      const title = this.councilor['misc-title']
      const content = this.councilor['misc-content']
      if (title && content) {
        return {
          title,
          content
        }
      }
      return undefined
    }
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

      &--misc {
        grid-template-columns: 25rem 4fr 3fr;
      }
    }
    &__basic {
      grid-template-columns: 9.25rem 1fr;
      padding: 1.5rem 2.25rem;
    }
    &__personMeta {
      padding: 1.5rem 2.25rem;
    }
  }
}
</style>
