<template lang="pug">
  .intLanding
    .intLanding__stats.stats
      .flex.items-center.dn-l.pb1.mb3
        button.plainButton.stats__switch.f4.ls3 質詢相關局處
      h2.f4.f3-l.pb3.dn.db-l 質詢相關局處
      button.stats__item.stats__item--sticky.flex-none.flex-l.justify-between.f5.f4-l.w-100-l.pointer.ls2.dn.db-l(
        :class="{'stats__item--active': isAllSelected('org')}"
        @click="chooseAllCategory('org')"
      )
        span.mr2.mr0-l 所有局處
        span {{totalOrgCount.toLocaleString()}}
      long-menu(height="2.25rem")
        button.stats__item.flex-none.flex-l.justify-between.f5.f4-l.w-100-l.pointer.ls2(
          v-for="org in stats.org"
          :key="org.name"
          :class="{'stats__item--active': isCatActive('org', org.name)}"
          @click="toggleCategory('org', org.name)"
        )
          span.mr2.mr0-l {{org.name}}
          span {{org.count.toLocaleString()}}
    .intLanding__main(ref="main")
      template(v-if="isShowingAllCategory")
        interpellation-category.mb6(
          v-for="cat in perCategorySayList"
          :key="cat.name"
          :name="cat.name"
          :councilor-map="councilorMap"
          :say-list="cat.sayList"
          :has-more="cat.hasMore"
          @more="toggleCategory('org', cat.name)"
        )
      template(v-else)
        interpellation-card(
          v-for="(sayit, index) in visibleSayList"
          :key="sayit.objectID || index"
          :councilor-map="councilorMap" :sayit="sayit"
        )
        client-only
          infinite-loading(@infinite="loadMoreSayList" :identifier="infiniteId")
            .f6.gray(slot="no-more") 已顯示所有搜尋結果
            .f6.gray(slot="no-results")
              span(v-if="isShowingAllCategory")
                | 找不到任何結果，或許換個關鍵字試試？
              .pointer(v-else @click="filterCategory('org', 'all')")
                | 找不到任何結果，或許看看
                .di.underline 所有局處？
</template>
<script>
/**
 * emit:
 *   - update:category (newCategory)
 *   - infinite ($state) - same usage as vue-infinite-loading
 */
import { debounce } from 'lodash'
import InfiniteLoading from 'vue-infinite-loading'
import { NAV_HEIGHT } from '~/libs/defs'
import { scrollTo } from '~/libs/utils'

const SCROLL_PADDING = 120
const N_ITEM_PER_PAGE = 10
const N_SAYIT_PER_CAT = 3
const RESET_LATTER = 200

export default {
  components: {
    InfiniteLoading
  },
  props: {
    councilorMap: {
      type: Object,
      required: true
    },
    sayList: {
      type: Array,
      required: true,
      validator (list) {
        return list.every(sayit => sayit.councilorId && sayit.summary)
      }
    },
    stats: {
      type: Object,
      required: true,
      validator (stats) {
        return stats.org
      }
    },
    // support :category.sync
    category: {
      default: undefined,
      validator (val) {
        if (!val) {
          return true
        }
        return ['org'].includes(val.type) && val.value
      }
    },
    /**
     * whether :say-list require search backend
     *
     * when false && all :say-list is shown, @infinite will be emitted
     */
    isStatic: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      cursor: N_ITEM_PER_PAGE,
      targetCategory: this.category,
      infiniteId: 0
    }
  },
  computed: {
    totalOrgCount () {
      return this.stats.org.reduce((sum, org) => {
        return sum + org.count
      }, 0)
    },
    targetSayList () {
      if (this.isStatic && this.targetCategory) {
        if (this.targetCategory.type === 'org') {
          return this.sayList
            .filter(sayit => sayit.relatedOrgs.includes(this.targetCategory.value))
        }
      }
      return this.sayList
    },
    visibleSayList () {
      return this.targetSayList.slice(0, this.cursor)
    },
    isShowingAllCategory () {
      return this.targetCategory && this.targetCategory.value === 'all'
    },
    perCategorySayList () {
      if (!this.isShowingAllCategory) {
        return []
      }
      if (this.targetCategory.type !== 'org') {
        // TODO: implement topic when data ready
        return []
      }
      const sayListPerOrg = this.sayList.reduce((accu, sayit) => {
        sayit.relatedOrgs.forEach((org) => {
          if (!accu[org]) {
            accu[org] = []
          }
          if (accu[org].length <= N_SAYIT_PER_CAT) {
            accu[org].push(sayit)
          }
        })
        return accu
      }, {})
      return this.stats.org
        .filter(org => sayListPerOrg[org.name])
        .map((org) => {
          return {
            ...org,
            sayList: sayListPerOrg[org.name].slice(0, N_SAYIT_PER_CAT),
            hasMore: sayListPerOrg[org.name].length > N_SAYIT_PER_CAT
          }
        })
    }
  },
  watch: {
    infiniteId () {
      this.$nextTick(() => {
        this.scrollToMain()
      })
    },
    category (newVal) {
      // sync targetCategory if they are different
      if (!newVal && !this.targetCategory) {
        return
      }
      let requireReset = false
      if (!newVal) {
        this.targetCategory = undefined
        requireReset = true
      } else if (!this.targetCategory) {
        this.targetCategory = { ...newVal }
        requireReset = true
      } else if (newVal.type !== this.targetCategory.type || newVal.value !== this.targetCategory.value) {
        this.targetCategory = { ...newVal }
        requireReset = true
      }

      if (requireReset) {
        this.resetInfiniteLoading()
      }
    }
  },
  methods: {
    resetInfiniteLoading: debounce(function () {
      this.cursor = N_ITEM_PER_PAGE
      this.infiniteId += 1
    }, RESET_LATTER),
    isAllSelected (type) {
      return !this.targetCategory || (
        this.targetCategory.type === type &&
        this.targetCategory.value === 'all'
      )
    },
    chooseAllCategory (type) {
      this.filterCategory(type, 'all')
    },
    isCatActive (type, value) {
      return this.targetCategory &&
        this.targetCategory.type === type &&
        this.targetCategory.value === value
    },
    toggleCategory (type, value) {
      const cat = this.targetCategory
      if (cat && cat.type === type && cat.value === value) {
        this.filterCategory(type, 'all')
      } else {
        this.filterCategory(type, value)
      }
    },
    filterCategory (type, value) {
      this.targetCategory = { type, value }
      this.resetInfiniteLoading()
      this.$emit('update:category', this.targetCategory)
    },
    loadMoreSayList ($state) {
      if (this.visibleSayList.length < this.targetSayList.length) {
        this.cursor += N_ITEM_PER_PAGE
        this.$nextTick(() => {
          $state.loaded()
        })
        return
      }
      if (this.isStatic) {
        $state.complete()
        return
      }
      this.$emit('infinite', $state)
    },
    scrollToMain () {
      const main = this.$refs.main
      if (!main) {
        return
      }
      const bbox = main.getBoundingClientRect()
      const isBelowViewport = bbox.y + SCROLL_PADDING > window.innerHeight
      if (bbox.y < NAV_HEIGHT || isBelowViewport) {
        // out of viewport, scroll to top
        scrollTo(main)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.intLanding {
  &__main {
    margin-top: 2.25rem;
  }
  @include large-screen {
    display: grid;
    grid-template-columns: 14rem 1fr;
    column-gap: 5rem;
    align-items: start;

    &__main {
      margin-top: 0;
    }

    &__stats {
      position: sticky;
      top: 6rem;
      max-height: calc(100vh - 10rem);
      overflow-y: scroll;
    }
  }
}

.stats {
  h2 {
    background: $white;
  }
  &__switch {
    padding: 0 0.625rem 0.75rem;
    border-bottom: 2px solid $gray-9;

    + .stats__switch {
      margin-left: 2rem;
    }
  }
  &__item {
    background: none;
    border: 1px solid $gray-a;
    padding: 0.5rem 0.75rem;
    margin: 0 0.5rem 0.75rem 0;
    line-height: 1.125;
    text-align: left;
    background: $white;

    &--active {
      color: #49b0d5;
    }
  }
  @include large-screen {
    h2 {
      position: sticky;
      z-index: 1;
      top: 0;
    }
    .longMenu {
      position: sticky;
      top: 0;
    }
    &__item {
      border-width: 0 0 1px 0;
      margin: 0 0 0.25rem 0;
      padding: 1rem 0.75rem 1rem 0;

      &--sticky {
        position: sticky;
        top: 3.25rem;
        z-index: 1;
      }
    }
  }
}
</style>
