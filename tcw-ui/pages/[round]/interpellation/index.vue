<template lang="pug">
  .pageContainer
    .int
      .int__searchBox.center
        input.w-100.int__query.br-pill.ls3(v-model.trim="query" placeholder="搜尋質詢議題" type="text")
        .int__algolia.mt1.tr
          a.f7.inline-flex.items-center.underline(href="https://www.algolia.com" target="_blank")
            | 搜尋服務使用
            img.ml1(src="~/assets/algolia.svg")
      .int__districtListWrapper.bg-white.db.dn-ns
        b-dropdown.int__districtList.w-100(aria-role="menu")
          template(#trigger)
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
        v-model:category="category"
        :is-static="false"
        @infinite="loadMore"
      )
</template>
<script>
import algoliasearch from 'algoliasearch'
import { debounce } from 'lodash-es'
import { DEFAULT_ROUND, DEFAULT_INTERPELLATION_CATEGORY as DEFAULT_CATEGORY } from '~/libs/defs'
import { dropdownMenuMiixin } from '~/libs/mixins'

const N_PER_ALGOLIA_REQUEST = 30
const SEARCH_SLOWLY = 300
const AGGREGATE_URL_UPDATE_SLOWLY = 50

export default defineNuxtComponent({
  mixins: [dropdownMenuMiixin],
  async setup () {
    const route = useRoute()
    const round = route.params.round || DEFAULT_ROUND
    const { data, error } = await useFetch(`/api/council/${round}/interpellation`)
    if (error.value) {
      await navigateTo(`/${DEFAULT_ROUND}/interpellation`)
    }
    useFriendlyHead(() => ({ title: '搜質詢' }))
    return {
      round,
      districtMap: computed(() => data.value?.districtMap || {}),
      councilorMap: computed(() => data.value?.councilorMap || {}),
      defaultSayList: computed(() => data.value?.defaultSayList || []),
      defaultSayitStats: computed(() => data.value?.defaultSayitStats || { org: [] })
    }
  },
  data () {
    const config = useRuntimeConfig().public
    const algoliaClient = algoliasearch(config.algoliaApp, config.algoliaKey)
    const algoliaIndex = algoliaClient.initIndex(config.algoliaIndex)

    return {
      algoliaResult: [],
      hasNoMoreResult: false,
      algoliaClient,
      algoliaIndex,
      orgFacets: null
    }
  },
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
    category (newCat) {
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
})
</script>
<style lang="scss" scoped>
.int {
  padding: 1rem 0;
  &__districtListWrapper {
    margin: 1.75rem auto 2.25rem;
    position: sticky;
    top: 4.875rem;
    width: calc(100% + 1rem);
    padding: 0.5rem 1rem 0.5rem 0;
    z-index: 1000;
  }
  &__districtList {
    &.dropdown {
      :deep(.dropdown-trigger) {
        width: 100%;
      }
      :deep(.dropdown-content) {
        padding: 0;
        border-radius: 0;
        border: 1px solid $gray-d;
      }
      :deep(.dropdown-item) {
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

    .districtText:hover {
      color: $blue;
      text-decoration-color: $blue;
    }
  }
  &__searchBox {
    padding: 0 0.5rem;
  }
  &__query {
    border: 1px solid #d8d8d8;
    padding: 0.5rem 2rem;
  }
  &__algolia {
    a {
      text-decoration-color: $gray-9;
      color: $gray-9;

      &:hover {
        font-weight: 400;
      }
    }
    img {
      width: 3.5rem;
    }
  }

  @include not-small-screen {
    padding: 4rem 0;

    &__searchBox {
      max-width: 52rem;
      padding: 0 1rem;
    }
    &__districtList {
      margin: 3.5rem auto 2.25rem;
      padding: 0 0.5rem 3.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 0.5rem;
      justify-content: center;
      border-bottom: 1px solid $gray-d;
      :deep(.districtText) {
        letter-spacing: 1px;
      }
    }
  }
  @include large-screen {
    &__districtList {
      width: calc(100% - 2rem);
      padding: 0 0 3.5rem;
      margin-bottom: 6rem;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
