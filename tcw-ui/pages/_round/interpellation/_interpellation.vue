<template lang="pug">
  .int.mw8.ph3.center.pv3.pv4-l
    .mv4
      input.w-100.int__query.br-pill(v-model.trim="query" placeholder="搜尋質詢議題" type="text")
    .int__districtList.mv4.center.pb4.bb.b--gray
      button.int__district.tl.pa0(
        v-for="district in districtList"
        :key="district.districtId"
        @click="toggleDistrict(district)"
      )
        district-text(:district="district" :active-area="activeDistrict")
    interpellation-landing(
      ref="main"
      :councilor-map="councilorMap"
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
  async asyncData ({ $content, params }) {
    const round = params.round || DEFAULT_ROUND
    const districtMap = await $content('council', round, 'district-map').fetch()
    const councilorMap = await $content('council', round, 'councilor-map').fetch()
    const allSayit = await $content('council', round, 'sayit').fetch()
    const allSayitStats = await $content('council', round, 'sayit/stats').fetch()

    const districtList = Object
      .values(districtMap)
      .filter(row => row.districtId)
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

    return {
      round,
      districtList,
      councilorMap,
      defaultSayList: sayList,
      defaultSayitStats: sayitStats
    }
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
      hasNoMoreResult: false,
      algoliaClient,
      algoliaIndex,
      orgFacets: null,

      category: { ...DEFAULT_CATEGORY },
      district: null
    }
  },
  computed: {
    isDefaultView () {
      return this.category && this.category.value === 'all' && !this.district
    },
    sayList () {
      if (this.isDefaultView) {
        return this.defaultSayList
      }
      return this.algoliaResult
    },
    sayitStats () {
      if (this.isDefaultView || !this.orgFacets) {
        return this.defaultSayitStats
      }
      const orgStats = Object.keys(this.orgFacets)
        .map(org => ({ name: org, count: this.orgFacets[org] }))
        .sort((a, b) => b.count - a.count)

      return {
        org: orgStats
      }
    },
    activeDistrict () {
      if (!this.district) {
        return null
      }
      return {
        type: 'district',
        id: this.district.districtId
      }
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
    async updateSayitStats () {
      const params = {
        hitsPerPage: 0,
        facets: ['relatedOrgs']
      }
      if (this.district) {
        params.facetFilters = [`councilor.districtId:${this.district.districtId}`]
      }
      const { facets } = await this.algoliaIndex.search(this.query, params)
      this.orgFacets = facets.relatedOrgs
    },
    toggleDistrict (district) {
      if (!this.district || this.district.districtId !== district.districtId) {
        this.district = district
      } else {
        this.district = null
      }
      if (this.district && this.category && this.category.value === 'all') {
        this.category = null
      }
      if (this.category) {
        // if category is not set, facet will be updated during search
        this.updateSayitStats()
      }
      this.searchInterpellation(true)
    },
    startNewSearch: debounce(function () {
      if (this.query) {
        this.category = null
        this.searchInterpellation(true)
      } else {
        this.category = { ...DEFAULT_CATEGORY }
        this.district = null
      }
    }, SEARCH_SLOWLY),
    resetResult () {
      this.algoliaResult = []
      this.hasNoMoreResult = false
      if (this.$refs.main) {
        this.$refs.main.resetInfiniteLoading()
      }
    },
    /**
     * @return reach to end of result or not
     */
    async searchInterpellation (shouldReset = false) {
      if (shouldReset) {
        this.resetResult()
        // let infinite loading trigger the real search
        return
      }

      const params = {
        hitsPerPage: N_PER_ALGOLIA_REQUEST,
        page: Math.floor(this.algoliaResult.length / N_PER_ALGOLIA_REQUEST),

        facets: ['relatedOrgs'],
        facetFilters: []
      }
      if (this.category && this.category.type === 'org') {
        params.facetFilters.push(`relatedOrgs:${this.category.value}`)
      }
      if (this.district) {
        params.facetFilters.push(`councilor.districtId:${this.district.districtId}`)
      }
      const { hits, nbPages, facets } = await this.algoliaIndex.search(this.query, params)

      if (!this.category || this.category.type !== 'org') {
        this.orgFacets = facets.relatedOrgs
      }

      hits.forEach((hit) => {
        this.algoliaResult.push({
          ...hit,
          councilorId: hit.councilor.id,
          councilorRound: this.round
        })
      })

      this.hasNoMoreResult = (params.page + 1) >= nbPages
      return hits.length
    },
    async loadMore ($state) {
      if (this.hasNoMoreResult) {
        $state.complete()
        return
      }
      const nNewResult = await this.searchInterpellation()
      if (nNewResult) {
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.int {
  &__districtList {
    display: none;
    @include not-small-screen {
      width: 40rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      row-gap: 0.75rem;
      justify-content: center;
    }
    @include large-screen {
      width: 60rem;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  &__district {
    border: none;
    background: none;
  }
  &__query {
    border: 1px solid #d8d8d8;
    padding: 0.5rem 2rem;
  }
}
</style>
