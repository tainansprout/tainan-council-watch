<template lang="pug">
  .pageContainer
    .district
      district-landing(ref="landing" :map="districtMap" :round="round" :target="target")
        district-summary(v-if="meta" :meta="meta" :round="round" :related-stats="stats")
      .dn.db-ns(ref="main" v-if="meta")
        tcw-title {{meta.districtTitle}}
        .district__town.f4.f3-l.ls4 {{stringifyTownList(meta.townList)}}
        district-summary(
          :meta="meta"
          :round="round"
          :related-stats="stats"
        )
</template>
<script>
import { DEFAULT_ROUND } from '~/libs/defs'
import { number2zh, scrollTo, stringifyTownList } from '~/libs/utils'

export default defineNuxtComponent({
  async setup () {
    const route = useRoute()
    const round = route.params.round || DEFAULT_ROUND
    const districtId = route.params.district
    const { data, error } = await useFetch(`/api/council/${round}/district`, {
      query: districtId ? { district: districtId } : {}
    })
    if (error.value) {
      await navigateTo(`/${DEFAULT_ROUND}`)
    } else if (districtId && !data.value.meta) {
      await navigateTo(`/${round}`)
    }
    const meta = computed(() => data.value?.meta || null)
    useFriendlyHead(() => {
      if (meta.value) {
        return { title: `${number2zh(meta.value.districtId)}選區 - ${stringifyTownList(meta.value.townList)}` }
      }
      return { title: '看選區' }
    })
    return {
      round,
      meta,
      districtMap: computed(() => data.value?.districtMap || {}),
      stats: computed(() => data.value?.stats || {})
    }
  },
  methods: {
    stringifyTownList
  },
  computed: {
    target () {
      return this.meta ? this.meta.districtTitle : ''
    }
  },
  mounted () {
    if (!this.meta) {
      return
    }
    const targetDistrictId = `#district-${this.meta.districtTitle}`
    const landing = this.$refs.landing.$el
    const main = this.$refs.main
    if (main.offsetTop) {
      // is visible, we are in large screen
      scrollTo(main)
    } else {
      scrollTo(landing.querySelector(targetDistrictId))
    }
  }
})
</script>
<style lang="scss" scoped>
.district {
  margin-top: 1.5rem;
  h1.tcwTitle {
    margin-bottom: 0.75rem;
  }

  &__town {
    margin-bottom: 3rem;
  }

  @include not-small-screen {
    margin-top: 3rem;
  }

  @include large-screen {
    margin-top: 5.25rem;
  }
}
</style>
