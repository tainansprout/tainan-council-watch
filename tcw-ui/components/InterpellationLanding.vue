<template lang="pug">
  .intLanding
    .intLanding__stats.stats
      h2.f4.f3-l.mb3 質詢局處
      button.stats__item.ba.b--moon-gray.flex-l.justify-between.f5.f4-l.w-100-l.pa2.pv3-l.ph0-l.mr2.mb2.ma0-l.pointer(
        v-for="org in stats.org"
        :key="org.name"
        @click="filter('org', org.name)"
      )
        span.mr2.mr0-l {{org.name}}
        span {{org.count}}
    .intLanding__main.mt3(ref="main")
      interpellation-card(
        v-for="(sayit, index) in visibleSayList"
        :key="index"
        :councilor-map="councilorMap" :sayit="sayit")
      client-only
        infinite-loading(@infinite="loadMoreSayList" :identifier="infiniteId")
          .f6.gray(slot="no-more") 已顯示所有搜尋結果
          .f6.gray(slot="no-results") 找不到任何結果，或許換個關鍵字試試？
</template>
<script>
/**
 * emit:
 *   - update:category (newCategory)
 *   - infinite ($state) - same usage as vue-infinite-loading
 */
import InfiniteLoading from 'vue-infinite-loading'
import { scrollTo } from '~/libs/utils'

const N_ITEM_PER_PAGE = 10

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
    resetInfiniteLoading () {
      this.cursor = 0
      this.infiniteId += 1
    },
    filter (type, value) {
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
      scrollTo(this.$refs.main)
    }
  }
}
</script>
<style lang="scss" scoped>
.intLanding {
  @include large-screen {
    display: grid;
    grid-template-columns: 14rem 1fr;
    column-gap: 5rem;
    align-items: start;

    &__stats {
      position: sticky;
      top: 4rem;
    }
  }
}

.stats {
  &__item {
    background: none;

    @include large-screen {
      border-width: 0 0 1px 0;
    }
  }
}
</style>
