<template lang="pug">
  .landing.mw8.ph3.center
    .landing__entry.mt5
      .landing__header.relative.flex.items-center.justify-center
        .absolute.top-0.left-0.w4.h4.bw2.bl.bt.b--light-yellow
        .absolute.bottom-0.right-0.w4.h4.bw2.bb.br.b--light-yellow
        h1.f2.f1-l.fw5 台南市議會觀測站
      .landing__navLinks.flex.justify-between.mw6.center.mt4.mt5-l
        nuxt-link.f4.f3-l(
          v-for="link in navLinks"
          :key="link.label"
          :to="genNavLink(link)"
          @click.native="handleNavClick"
        )
          | {{link.label}}
    tcw-title(level="h2" id="看選區" ref="看選區") 看選區
    .mt5.mt3-l
      district-landing(:map="consMap" :round="round")
    tcw-title(level="h2" id="找議員" ref="找議員") 找議員
    .mt5.mt3-l
      councilor-landing(:map="consMap" :round="round")
    tcw-title(level="h2" id="讀分析" ref="讀分析") 讀分析
    .mt5.mt3-l
      article-gallery(:categories="articleCategories")
</template>
<script>
import { get } from 'lodash'
import { scrollTo } from '~/libs/utils'
import { NAV_LINKS, DEFAULT_ROUND } from '~/libs/defs'

export default {
  async asyncData ({ $content, params, redirect }) {
    const round = params.round || DEFAULT_ROUND
    const consMap = await $content('council', round, 'district-map').fetch()

    let articleCategories = await $content('setting')
      .where({ type: 'articleCategory' })
      .sortBy('order')
      .fetch()

    let articlePerCategory = await Promise.all(articleCategories.map((category) => {
      return $content('article')
        .where({ category: category.name })
        .only(['coverImage', 'category'])
        .sortBy('createdAt', 'desc')
        .limit(1)
        .fetch()
    }))
    articlePerCategory = articlePerCategory.flatMap(articles => articles)

    articleCategories.forEach((category) => {
      const article = articlePerCategory.find(article => category.name === article.category)
      if (article) {
        category.coverImage = article.coverImage
      }
    })

    articleCategories = articleCategories.filter(category => category.coverImage)

    return { consMap, round, articleCategories }
  },
  computed: {
    navLinks () {
      return NAV_LINKS
    }
  },
  methods: {
    genNavLink (link) {
      if (link.label !== '搜質詢') {
        return `#${link.label}`
      }
      return link.route(this.round)
    },
    handleNavClick (e) {
      const href = get(e, 'target.attributes.href.value', '').split('#')
      if (href.length <= 1) {
        return
      }

      const target = decodeURIComponent(href[1])
      const ref = this.$refs[target]
      if (!ref) {
        return
      }
      scrollTo(ref.$el)
      e.preventDefault()
    }
  }
}
</script>
<style lang="scss" scoped>
.landing {
  &__header {
    height: calc(100vh - 14rem);
    max-height: 40vh;
    @include large-screen {
      max-height: 35vw;
    }
  }
  &__navLinks {
    a {
      color: #49B0D5;
      text-decoration: none;
    }
  }
}
</style>
