<template lang="pug">
  .pageContainer
    .int
      .int__searchBox.center
        input.w-100.int__query.br-pill(v-model.trim="query" placeholder="搜尋質詢議題" type="text")
      .db.dn-ns
        b-dropdown.int__districtList.w-100(aria-role="menu")
          template(slot="trigger")
            button.int__districtTrigger.w-100.flex.justify-between.items-center
              span(v-if="activeDistrict.id === 'all'") 查看全部選區
              district-text(v-else :district="district")
              tcw-icon(icon="chevron-down-gray")
          b-dropdown-item(
            v-for="district in districtList"
            :key="district.districtId"
            :value="district"
            aria-role="menuitem"
            @click="toggleDistrict(district)"
          )
            district-text(:district="district" :active-area="activeDistrict")
      .int__districtList.dn.db-ns
        button.int__district.tl.pa0.pointer(
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
import { DEFAULT_ROUND, DEFAULT_INTERPELLATION_CATEGORY as DEFAULT_CATEGORY } from '~/libs/defs'
import { friendlyHeader } from '~/libs/crawlerFriendly'

const N_PER_CAT = 4
const N_PER_ALGOLIA_REQUEST = 30
const SEARCH_SLOWLY = 300
const AGGREGATE_URL_UPDATE_SLOWLY = 50

export default {
  async asyncData ({ $content, params }) {
    const round = params.round || DEFAULT_ROUND
    const districtMap = await $content('council', round, 'district-map').fetch()
    const councilorMap = await $content('council', round, 'councilor-map').fetch()
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

    return {
      round,
      districtMap,
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
      algoliaResult: [],
      hasNoMoreResult: false,
      algoliaClient,
      algoliaIndex,
      orgFacets: null
    }
  },
  head: friendlyHeader({
    title: '搜質詢'
  }),
  computed: {
    query: {
      get () {
        const query = this.$route.query.query || ''
        return query.trim()
      },
      set (value) {
        this.resetQuery(value)
      }
    },
    district () {
      const districtId = this.$route.query.district || ''
      return this.districtMap[districtId] || null
    },
    category: {
      get () {
        const { catType, catValue } = this.$route.query
        if (catType === 'null') {
          return null
        }
        if (catType === 'org' && this.defaultSayitStats.org.find(stat => stat.name === catValue)) {
          return {
            type: catType,
            value: catValue
          }
        }

        return { ...DEFAULT_CATEGORY }
      },
      set (category) {
        this.updateSearchQuery({ category })
      }
    },
    districtList () {
      // content module inject some other stuff into it XD
      const ret = Object
        .values(this.districtMap)
        .filter(district => district.districtId)

      ret.push({
        districtId: 'all',
        districtTitle: '所有選區',
        townList: []
      })

      return ret
    },
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
        return {
          type: 'district',
          id: 'all'
        }
      }
      return {
        type: 'district',
        id: this.district.districtId
      }
    }
  },
  watch: {
    category (newCat, oldCat) {
      if (newCat) {
        // if category is not set, facet will be updated during search
        this.updateSayitStats()
      }
      this.resetSearch()
    },
    query () {
      if (!this.normalizeSearchInNeeded()) {
        this.resetSearch()
      }
    },
    district () {
      if (!this.normalizeSearchInNeeded()) {
        this.resetSearch()
      }
    }
  },
  mounted () {
    this.normalizeSearchInNeeded()
  },
  methods: {
    normalizeSearchInNeeded () {
      if (this.query || this.district) {
        if (this.category && this.category.value === 'all') {
          this.updateSearchQuery({ category: null })
          return true
        }
      }
      return false
    },
    updateSearchQuery ({ query, category, district }) {
      const newParams = { ...this.$route.query }

      if (query !== undefined) {
        if (query) {
          newParams.query = query
        } else {
          delete newParams.query
        }
      }

      if (category !== undefined) {
        if (!category) {
          newParams.catType = 'null'
        } else {
          newParams.catType = category.type
          newParams.catValue = category.value
        }
      }

      if (district !== undefined) {
        if (!district) {
          delete newParams.district
        } else {
          newParams.district = district.districtId
        }
      }

      if (newParams.district || newParams.query) {
        if (newParams.catValue === 'all') {
          // disable per-category view
          newParams.catType = 'null'
          delete newParams.catValue
        }
      } else if (newParams.catType === 'null') {
        // make sure category is reset when no other search criteria
        delete newParams.catType
      }

      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: newParams
      })
    },
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
      const params = {}
      if (district.districtId === 'all') {
        params.district = null
      } else if (!this.district || this.district.districtId !== district.districtId) {
        params.district = district
      } else {
        params.district = null
      }
      this.updateSearchQuery(params)
    },
    resetQuery: debounce(function (query) {
      this.updateSearchQuery({ query })
    }, SEARCH_SLOWLY),
    resetSearch: debounce(function () {
      this.algoliaResult = []
      this.hasNoMoreResult = false
      if (this.$refs.main) {
        this.$refs.main.resetInfiniteLoading()
      }
    }, AGGREGATE_URL_UPDATE_SLOWLY),
    /**
     * @return reach to end of result or not
     */
    async searchInterpellation () {
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
  padding: 1rem 0;
  &__districtList {
    margin: 1.75rem auto 2.25rem;

    &.dropdown ::v-deep {
      .background {
        z-index: 1000;
      }
      .dropdown-trigger {
        width: 100%;
      }
      .dropdown-menu {
        z-index: 1000 !important;
      }
      .dropdown-content {
        padding: 0;
        border-radius: 0;
        border: 1px solid $gray-d;
      }
      .dropdown-item {
        padding: 1rem;
        &.is-active {
          background: none;
        }
        + .dropdown-item {
          border-top: 1px solid $gray-d;
        }
        .districtText__name {
          .f5 {
            font-size: 0.875rem;
          }
          + div {
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
  &__districtTrigger {
    padding: 0.75rem;
    background: none;
    border: 1px solid $yellow-8;
    text-align: left;
  }
  &__district {
    border: none;
    background: none;
  }
  &__searchBox {
    padding: 0 0.5rem;
  }
  &__query {
    border: 1px solid #d8d8d8;
    padding: 0.5rem 2rem;
  }

  @include not-small-screen {
    padding: 4rem 0;

    &__searchBox {
      max-width: 52rem;
      padding: 0 1rem;
    }
    &__districtList {
      margin-top: 3.5rem;
      padding: 0 0.5rem 3.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      row-gap: 0.5rem;
      justify-content: center;
      border-bottom: 1px solid $gray-d;
      ::v-deep {
        .districtText__name .ls1 {
          letter-spacing: 1px;
        }
      }
    }
  }
  @include large-screen {
    &__districtList {
      width: calc(100% - 2rem);
      margin-bottom: 6rem;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
