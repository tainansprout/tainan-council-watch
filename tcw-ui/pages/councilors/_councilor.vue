<template lang="pug">
  .councilor
    .mw8.center.mv5.ph4
      nuxt-link.link.gray.dim(to="/") 回首頁
      h1.mv2 {{councilor.name}}
      .f4.mb4 {{councilor.area}}

      .mb4(v-for="office in perOfficeList" :key="office.name")
        h2.mt0.mb3.f4.b {{office.name}}
        .ba.b--gray.br2.pa3.mb2.lh-copy(v-for="say in office.sayList")
          .black {{say.summary}}
          .f6.gray {{say.say}}
          .flex.justify-between.f6
            .gray {{prettyDate(say)}}
            .gray {{pages(say)}}
</template>
<script>
import dayjs from 'dayjs'

export default {
  name: 'CouncilorPage',
  async asyncData ({ $content, params, redirect }) {
    const councilor = await $content('councilors', params.councilor).fetch()
    // const councilorList = await $content('hello').fetch()
    return { councilor }
  },
  computed: {
    perOfficeList () {
      const officeMap = {}
      this.councilor.sayList.forEach((say) => {
        const target = say.target
        if (!officeMap[target]) {
          officeMap[target] = []
        }
        officeMap[target].push(say)
      })
      Object.values(officeMap).forEach((office) => {
        office.sort((a, b) => {
          return a.date.localeCompare(b.date)
        })
      })
      return Object.keys(officeMap).map((office) => {
        return {
          name: office,
          sayList: officeMap[office]
        }
      })
    }
  },
  methods: {
    prettyDate (say) {
      return dayjs(say.date).format('YYYY-MM-DD')
    },
    pages (say) {
      return `p.${say.src.join(', p.')}`
    }
  }
}
</script>
