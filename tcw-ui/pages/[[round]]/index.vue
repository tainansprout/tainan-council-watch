<template lang="pug">
  .landing.pageContainer
    .landing__entry.mt5
      landing-cover(:round="round")
      .landing__navLinks.flex.justify-between.center
        template(v-for="link in navLinks" :key="link.label")
          nuxt-link(v-if="link.label === '搜質詢'" :to="link.route(round)")
            | {{link.label}}
          a(v-else :href="`#${link.label}`" @click="handleNavClick")
            | {{link.label}}
    tcw-title(level="h2" id="看選區" ref="看選區") 看選區
    .landing__section
      district-landing(:map="consMap" :round="round")
    tcw-title(level="h2" id="找議員" ref="找議員") 找議員
    .landing__section.landing__section--tight
      councilor-landing(:map="consMap" :round="round")
    tcw-title(level="h2" id="讀分析" ref="讀分析") 讀分析
    .landing__section
      article-gallery(:categories="articleCategories")
</template>
<script>
import { get } from 'lodash'
import { number2zh, scrollTo } from '~/libs/utils'
import { NAV_LINKS, DEFAULT_ROUND } from '~/libs/defs'

export default defineNuxtComponent({
  async setup () {
    const route = useRoute()
    const round = route.params.round || DEFAULT_ROUND
    const { data, error } = await useFetch(`/api/council/${round}/landing`)
    if (error.value) {
      await navigateTo(`/${DEFAULT_ROUND}`)
    }
    useFriendlyHead(() => ({ title: `${number2zh(round)}屆` }))
    return {
      round,
      consMap: computed(() => data.value?.consMap || {}),
      articleCategories: computed(() => data.value?.articleCategories || [])
    }
  },
  computed: {
    navLinks () {
      return NAV_LINKS
    }
  },
  methods: {
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
})
</script>
<style lang="scss" scoped>
.landing {
  padding-top: 0.5rem;

  &__navLinks {
    width: calc(100vw - 2rem);
    max-width: 18rem;
    margin: 3.5rem auto;

    a {
      letter-spacing: 1.33px;
      color: $blue;
      text-decoration: underline;
      text-decoration-color: $blue;

      &:hover {
        font-weight: 500;
        text-decoration: none;
      }
    }
  }

  &__section {
    margin: 1.5rem 0 3.5rem;
  }

  @include not-small-screen {
    padding-top: 2.25rem;

    &__navLinks {
      max-width: 35rem;
      margin: 2.25rem auto 8.25rem;
      font-size: 1.75rem;
      letter-spacing: 2.33px;
    }

    &__section {
      margin: 6rem 0 9.75rem;

      &--tight {
        margin-top: 3.5rem;
      }
    }
  }
}
</style>
