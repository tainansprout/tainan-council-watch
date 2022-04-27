<template lang="pug">
  .constituency.mw8.ph3.center
    .mt4.mt5-l
    constituency-landing(ref="landing" :map="consMap" :round="round" :target="meta.areaTitle")
      constituency-summary(:meta="meta" :related-org-stats="orgStats")
    .dn.db-l(ref="main")
      tcw-title {{meta.areaTitle}}
      p {{meta.areaList.join('.')}}
      .mt5
        constituency-summary(:meta="meta" :related-org-stats="orgStats")
</template>
<script>
import { countRelatedOrgs, scrollTo } from '~/libs/utils'
export default {
  async asyncData ({ $content, params, redirect }) {
    const round = params.round || '第三屆'
    const constituency = params.constituency
    const consMap = await $content(round, 'area-list').fetch()
    const meta = consMap[constituency]

    if (!meta) {
      redirect(`/${round}`)
      return
    }

    const councilorIds = meta.councilors.map(c => c.id)

    const sayList = await $content(round, 'sayit')
      .where({ id: { $in: councilorIds } })
      .fetch()
    const orgStats = countRelatedOrgs(...sayList)
    return { consMap, round, meta, orgStats }
  },
  mounted () {
    const targetConsId = `#const-${this.meta.areaTitle}`
    const landing = this.$refs.landing.$el
    const main = this.$refs.main
    if (main.offsetTop) {
      // is visible, we are in large screen
      scrollTo(main)
    } else {
      scrollTo(landing.querySelector(targetConsId))
    }
  }
}
</script>
<style lang="scss" scoped>
.constituency {
  h1.tcwTitle {
    margin-bottom: 1rem;
  }
}
</style>
