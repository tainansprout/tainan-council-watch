<template lang="pug">
  .int.mw8.ph3.center.pv3.pv4-l
    .mv4.o-50.h5.flex.items-center.justify-center.bb.b--moon-gray.bg-light-gray
      | 各選區質詢，會連同搜尋一起實做，預計
      a.gray(href="https://hackmd.io/@ddio/SJWBXM4Sq/https%3A%2F%2Fhackmd.io%2FJ3xPDhMnT1W5Eg_cKeNTBQ") 5/11 完成
    interpellation-landing(:councilor-map="counsMap" :say-list="sayList" :stats="sayitStats")
</template>
<script>
import { DEFAULT_ROUND } from '~/libs/defs'

export default {
  async asyncData ({ $content, params, redirect }) {
    const round = params.round || DEFAULT_ROUND
    const counsMap = await $content('council', round, 'councilor-map').fetch()
    const allSayit = await $content('council', round, 'sayit').fetch()
    const allSayitStats = await $content('council', round, 'sayit/stats').fetch()

    const sayList = allSayit
      .flatMap((person) => {
        if (!person.sayit) {
          return []
        }
        return person.sayit.map((sayit) => {
          return {
            ...sayit,
            councilorId: person.id
          }
        })
      })
      .sort((a, b) => {
        return b.date.localeCompare(a.date)
      })
      .slice(0, 100)

    const sayitStats = allSayitStats.all

    return { round, counsMap, sayList, sayitStats }
  }
}
</script>
