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
          :to="link.route(round)"
        )
          | {{link.label}}
    tcw-title(level="h2") 看選區
    .mt5.mt3-l
      constituency-landing(:map="consMap")
    tcw-title(level="h2") 找議員
    .mt5.mt3-l
      con-con-landing(:map="consMap")
    tcw-title(level="h2") 讀分析
    .pa3.bg-moon-gray.h3.pa4.flex.items-center.justify-center.mt5.mt3-l.w-100 施工中
</template>
<script>
import { NAV_LINKS } from '~/libs/defs'

export default {
  async asyncData ({ $content, params, redirect }) {
    const round = params.round || '第三屆'
    const consMap = await $content(round, 'area-list').fetch()
    // const councilorList = await $content('hello').fetch()
    return { consMap, round }
  },
  computed: {
    navLinks () {
      return NAV_LINKS
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