<template lang="pug">
  .district.mw8.ph4.center
    .mt4.mt5-l
    district-landing(ref="landing" :map="districtMap" :round="round" :target="target")
      district-summary(v-if="meta" :meta="meta" :round="round" :related-stats="stats")
    .dn.db-l(ref="main" v-if="meta")
      tcw-title {{meta.districtTitle}}
      p {{meta.townList.join('.')}}
      .mt5
        district-summary(
          :meta="meta"
          :round="round"
          :related-stats="stats"
        )
</template>
<script>
import { DEFAULT_ROUND } from '~/libs/defs'
import { scrollTo, parseMarkdown } from '~/libs/utils'

export default {
  async asyncData ({ $content, params, redirect }) {
    const round = params.round || DEFAULT_ROUND
    const districtId = params.district
    const districtMap = await $content('council', round, 'district-map').fetch()
    let meta = districtMap[districtId]
    let cmsContent = {}
    try {
      cmsContent = await $content('council', round, `meta-${meta.districtTitle}`).fetch()
      cmsContent.intro = await parseMarkdown(cmsContent.intro || '')
    } catch {
      // noop
    }

    if (!meta && districtId) {
      redirect(`/${round}`)
      return
    }

    if (meta && cmsContent) {
      meta = {
        ...meta,
        ...cmsContent
      }
    }

    // count sayit group by related org
    let stats = {}
    if (meta) {
      const councilorIds = meta.councilors.map(c => c.id)
      const allSayitStats = await $content('council', round, 'sayit/stats').fetch()
      const sayList = await $content('council', round, 'sayit')
        .where({ id: { $in: councilorIds } })
        .fetch()
      stats = sayList.reduce((stats, sayit) => {
        stats[sayit.id] = sayit.stats
        return stats
      }, {
        total: allSayitStats[districtId]
      })
    }

    return { districtMap, round, meta, stats }
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
}
</script>
<style lang="scss" scoped>
.district {
  h1.tcwTitle {
    margin-bottom: 1rem;
  }
}
</style>
