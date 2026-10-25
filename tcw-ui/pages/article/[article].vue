<template lang="pug">
  article.article.pageContainer
    .article__topMeta.flex.justify-center.justify-between-ns.items-center
      tcw-date.ls1.f6.dn.db-ns(:date="article.createdAt")
      .article__social
        a(
          v-for="social in socialList"
          :key="social.network"
          :href="social.url"
          target="_blank"
          rel="noopener"
          @click.prevent="share(social.url)"
        )
          tcw-icon(:icon="social.icon" size="large")
    h1.f3.ls4 {{article.title}}
    tcw-date.ls1.f6.mb3.db.dn-ns(:date="article.createdAt")
    .nuxt-content.ls2.lh(v-html="article.html")
</template>
<script>
import { SITE_URL } from '~/libs/crawlerFriendly'

export default defineNuxtComponent({
  async setup () {
    const route = useRoute()
    const { data, error } = await useFetch(`/api/article/${route.params.article}`)
    if (error.value) {
      await navigateTo('/article')
    }
    const article = computed(() => data.value || {})
    useFriendlyHead(() => ({
      title: article.value.title,
      description: article.value.summary,
      coverUrl: article.value.coverImage
    }))
    return { article }
  },
  computed: {
    link () {
      return `${SITE_URL}${this.$route.path}`
    },
    socialList () {
      // 原本用 vue-social-sharing（只支援 Vue 2），分享網址照它的格式
      const url = encodeURIComponent(this.link)
      const title = encodeURIComponent(this.article.title || '')
      const desc = encodeURIComponent(this.article.summary || '')
      return [
        { network: 'facebook', icon: 'logo-facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${title}&description=${desc}&quote=&hashtag=` },
        { network: 'line', icon: 'logo-line', url: `http://line.me/R/msg/text/?${title}%0D%0A${url}%0D%0A${desc}` },
        { network: 'twitter', icon: 'logo-twitter', url: `https://twitter.com/intent/tweet?text=${title}&url=${url}&hashtags=` }
      ]
    }
  },
  methods: {
    share (url) {
      // 跟 vue-social-sharing 一樣開小視窗
      const width = 626
      const height = 436
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2
      window.open(url, 'sharer', `width=${width},height=${height},left=${left},top=${top}`)
    }
  }
})
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
