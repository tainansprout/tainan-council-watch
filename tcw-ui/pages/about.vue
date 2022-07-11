<template lang="pug">
  article.about.pageContainer
    h1.f3.ls4.mt5 {{article.title}}
    nuxt-content.ls2.lh(:document="article")
</template>
<script>
import { friendlyHeader } from '~/libs/crawlerFriendly'
export default {
  async asyncData ({ $content, params, redirect }) {
    const article = await $content('meta/about').fetch()
    return { article }
  },
  head: friendlyHeader({
    title () { return this.article.title }
  })
}
</script>
<style lang="scss" scoped>
.about {
}
</style>
