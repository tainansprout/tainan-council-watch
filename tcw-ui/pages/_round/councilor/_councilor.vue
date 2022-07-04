<template lang="pug">
  .pageContainer
    .councilor
      councilor-landing(v-if="districtMap" :map="districtMap" :round="round" :minified="!!councilor")
      template(v-if="councilor")
        .councilor__head.bt.b--gray-d(ref="head")
          h1.fw5.flex.flex-column.flex-row-ns
            span {{councilor.districtTitle}}
            span {{townLabel}}
        .councilor__person.bb.bt-ns.b--gray-d.b--gray-9-ns(:class="{'councilor__person--misc': miscColumn}")
          .councilor__basic.br-ns.b--gray-9
            .aspect-ratio.aspect-ratio--1x1
              .aspect-ratio--object.br-100.overflow-hidden
                img(:src="councilor.bgUrl" :alt="councilor.name")
            div
              .f5.f4-ns.fw5.ls3 {{councilor.name}}
              .f5.pt2-ns.mt3
                party-label(:party="councilor.party")
          .councilor__personMeta
            h2.f3 公職經歷
            p.ls2(v-for="line in jobHistory" :key="line") {{line}}
          .councilor__personMeta(v-if="miscColumn")
            h2.f3 {{miscColumn.title}}
            p.ls2(v-for="(line, index) in miscColumn.content" :key="index") {{line}}
        .councilor__sayit
          interpellation-landing(
            :councilor-map="counsMap"
            :say-list="sayList"
            :stats="sayitStats"
            :category.sync="interpellationCategory"
          )
</template>
<script>
import { get } from 'lodash'
import { DEFAULT_ROUND, DEFAULT_INTERPELLATION_CATEGORY } from '~/libs/defs'
import { scrollTo, stringifyTownList } from '~/libs/utils'
import { friendlyHeader } from '~/libs/crawlerFriendly'

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
  head: friendlyHeader({
    title () {
      if (this.councilor) {
        return `${this.councilor.name}議員`
      }
      return '找議員'
    },
    description () {
      if (!this.councilor) {
        return ''
      }
      return [
        this.councilor.districtTitle,
        stringifyTownList(this.councilor.townList),
        this.councilor.party
      ].join('．')
    }
  }),
  computed: {
    interpellationCategory: {
      get () {
        const type = this.$route.query.catType
        const value = this.$route.query.catValue

        if (!type || !value || !this.sayitStats[type]) {
          return { ...DEFAULT_INTERPELLATION_CATEGORY }
        }

        if (this.sayitStats[type].find(stat => stat.name === value)) {
          return { type, value }
        }
        return { ...DEFAULT_INTERPELLATION_CATEGORY }
      },
      set (category) {
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
          query: {
            catType: category.type,
            catValue: category.value
          }
        })
      }
    },
    townLabel () {
      if (!this.councilor) {
        return ''
      }
      const list = this.councilor.townList
      const lastTown = list[list.length - 1]
      if (!lastTown.endsWith('區')) {
        list[list.length - 1] = `${lastTown}區`
      }
      return list.join('.')
    },
    sayitStats () {
      return get(this, 'sayit.stats', { org: [] })
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
          content: content.split('\n')
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
  padding: 1.75rem 0;

  &__head {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
  }

  h1 {
    font-size: 1.5rem;
    letter-spacing: 2px;
    line-height: normal;

    span:first-child {
      margin-bottom: 0.25rem;
    }
  }

  &__person {
    margin: 1.5rem 0 2.25rem;
    padding-bottom: 1.75rem;
  }

  &__basic {
    display: grid;
    grid-template-columns: 6rem 1fr;
    column-gap: 2.25rem;
    align-items: center;
    line-height: normal;
  }

  &__personMeta {
    margin-top: 1.25rem;
    line-height: normal;
    h2 {
      margin: 0 0 0.5rem;
    }
    p + p {
      margin-top: 0.25rem;
    }
  }
  @include not-small-screen {
    padding: 3.5rem 0;

    &__head {
      margin-top: 3.5rem;
      padding-top: 3.5rem;
    }

    h1 {
      font-size: 1.75rem;
      letter-spacing: 2.33px;

      span:first-child {
        margin: 0 3rem 0 0;
      }
    }

    &__person {
      margin: 3.5rem 1rem 8.5rem;
      padding: 0;
      display: grid;
      grid-template-columns: 22rem 1fr;
    }
    &__basic {
      grid-template-columns: 8.5rem 1fr;
      column-gap: 1.75rem;
      padding: 1.5rem 1rem 1.5rem 0;
    }
    &__personMeta {
      margin-top: 0;
      padding: 1.5rem 2.25rem;
    }
    &__person--misc {
      grid-template-columns: 19.5rem 1fr 1fr;

      .councilor__personMeta {
        padding: 1.5rem 1.75rem;
      }
    }
  }
}
</style>
