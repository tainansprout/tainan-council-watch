<template lang="pug">
  article.article.pageContainer
    .article__topMeta.flex.justify-center.justify-between-ns.items-center
      tcw-date.ls1.f6.dn.db-ns(:date="article.createdAt")
      .article__social
        share-network(
          v-for="social in socialList"
          :key="social.network"
          :network="social.network"
          :title="article.title"
          :description="article.summary"
          :url="link"
        )
          tcw-icon(:icon="social.icon" size="large")
    h1.f3.ls4 {{article.title}}
    tcw-date.ls1.f6.mb3.db.dn-ns(:date="article.createdAt")
    nuxt-content.ls2.lh(:document="article")
</template>
<script>
import { friendlyHeader, SITE_URL } from '~/libs/crawlerFriendly'
export default {
  async asyncData ({ $content, params, redirect }) {
    let article
    try {
      article = await $content('article', params.article).fetch()
    } catch {
      redirect('/article')
    }
    return { article }
  },
  head: friendlyHeader({
    title () { return this.article.title },
    description () { return this.article.summary },
    coverUrl () { return this.article.coverImage }
  }),
  computed: {
    socialList () {
      return [
        { network: 'facebook', icon: 'logo-facebook' },
        { network: 'line', icon: 'logo-line' },
        { network: 'twitter', icon: 'logo-twitter' }
      ]
    },
    link () {
      const path = this.$route.path
      return `${SITE_URL}${path}`
    }
  }
}
</script>
<style lang="scss" scoped>
.article {
  &__topMeta {
    margin: 2rem;
  }

  &__social {
    > a:not(:last-child) {
      margin-right: 1rem;
    }
  }

  @include not-small-screen {
    &__topMeta {
      margin: 4rem 0 1.5rem;
    }
  }
}
</style>
