<template lang="pug">
  .int.mw8.ph3.center.pv3.pv4-l
    .mv4.mw5.center
      input.int__query.br-pill(v-model.trim="query" placeholder="搜尋質詢議題")
    .mv4.o-50.h4.flex.items-center.justify-center.bb.b--moon-gray.bg-light-gray
      | 各選區質詢，05/25 登場～
      .pv2 {{category}}
    interpellation-landing(
      ref="main"
      :councilor-map="counsMap"
      :say-list="sayList"
      :stats="sayitStats"
      :category.sync="category"
      :is-static="false"
      @infinite="loadMore"
    )
</template>
<script>
import algoliasearch from 'algoliasearch'
import { debounce } from 'lodash'
import { DEFAULT_ROUND } from '~/libs/defs'

const N_PER_CAT = 4
const N_PER_ALGOLIA_REQUEST = 30
const SEARCH_SLOWLY = 300

const DEFAULT_CATEGORY = { type: 'org', value: 'all' }

export default {
  async asyncData ({ $content, params, redirect }) {
    const round = params.round || DEFAULT_ROUND
    const counsMap = await $content('council', round, 'councilor-map').fetch()
    const allSayit = await $content('council', round, 'sayit').fetch()
    const allSayitStats = await $content('council', round, 'sayit/stats').fetch()

    const nSayitPerCat = { org: {} }

    const sayList = allSayit
      .flatMap((person) => {
        if (!person.sayit) {
          return []
        }
        return person.sayit
          .filter(sayit => !sayit.date.startsWith('Invalid'))
          .map((sayit) => {
            return {
              ...sayit,
              councilorId: person.id,
              councilorRound: round
            }
          })
      })
      .sort((a, b) => {
        return b.date.localeCompare(a.date)
      })
      .filter((sayit) => {
        let shouldExisted = false
        sayit.relatedOrgs.forEach((org) => {
          if (!nSayitPerCat.org[org]) {
            nSayitPerCat.org[org] = 0
          }
          if (nSayitPerCat.org[org] < N_PER_CAT) {
            nSayitPerCat.org[org] += 1
            shouldExisted = true
          }
        })
        return shouldExisted
      })

    const sayitStats = allSayitStats.all

    return { round, counsMap, defaultSayList: sayList, sayitStats }
  },
  data () {
    const algoliaClient = algoliasearch(
      process.env.algoliaApp,
      process.env.algoliaKey
    )
    const algoliaIndex = algoliaClient.initIndex(process.env.algoliaIndex)

    return {
      query: '',
      algoliaResult: [],
      algoliaClient,
      algoliaIndex,

      category: { ...DEFAULT_CATEGORY }
    }
  },
  computed: {
    sayList () {
      console.warn('update saylist', this.category)
      if (this.category && this.category.value === 'all') {
        return this.defaultSayList
      }
      return this.algoliaResult
    }
  },
  watch: {
    category () {
      this.searchInterpellation(true)
    },
    query () {
      this.startNewSearch()
    }
  },
  methods: {
    startNewSearch: debounce(function () {
      console.warn('search!', this.query)
      if (this.query) {
        this.category = null
        this.searchInterpellation(true)
      } else {
        this.category = { ...DEFAULT_CATEGORY }
        console.warn('start new!', this.category)
      }
    }, SEARCH_SLOWLY),
    /**
     * @return reach to end of result or not
     */
    async searchInterpellation (shouldReset = false) {
      console.warn('s int', shouldReset)
      let result = this.algoliaResult
      if (shouldReset) {
        result = []
      }

      const params = {
        hitsPerPage: N_PER_ALGOLIA_REQUEST,
        page: Math.floor(result.length / N_PER_ALGOLIA_REQUEST)
      }
      if (this.category && this.category.type === 'org') {
        params.facetFilters = [`relatedOrgs:${this.category.value}`]
      }
      const { hits, nbPages } = await this.algoliaIndex.search(this.query, params)

      hits.forEach((hit) => {
        result.push({
          ...hit,
          councilorId: hit.councilor.id,
          councilorRound: this.round
        })
      })
      this.algoliaResult = result

      if (shouldReset) {
        if (this.$refs.main) {
          this.$refs.main.resetInfiniteLoading()
        }
      }

      return (params.page + 1) >= nbPages
    },
    async loadMore ($state) {
      const isEnd = await this.searchInterpellation()
      if (isEnd) {
        $state.complete()
      } else {
        $state.loaded()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.int {
  &__query {
    border: 1px solid #d8d8d8;
    padding: 0.5rem 2rem;
  }
}
</style>
