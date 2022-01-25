<template lang="pug">
  .index.mw8.center.mv5.ph4
    .mb4(v-for="area in perAreaList" :key="area.area")
      h3.f4.b.mb3.mt0 {{area.area}}
      .flex
        nuxt-link.pv2.bt.bb.mr3.dim.gray.b--gray.link(
          v-for="name in area.councilors"
          :key="name"
          :to="`/councilors/${name}`"
        )
          | {{name}}
    .mv4.gray.bt.b--gray.pt3
      | 最後更新時間：{{buildTime}}
</template>
<script>
import dayjs from 'dayjs'

export default {
  name: 'IndexPage',
  async asyncData ({ $content, params, redirect }) {
    const councilorList = await $content('councilor-list').fetch()
    // const councilorList = await $content('hello').fetch()
    return { councilorList }
  },
  computed: {
    perAreaList () {
      const areas = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三']
      return areas.map((n) => {
        const area = `第${n}選區`
        const councilors = this.councilorList.data.filter(meta => meta.area === area)
        return {
          area,
          councilors: councilors.map(c => c.name)
        }
      })
    },
    buildTime () {
      return dayjs.unix(process.env.buildTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
