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
    h2.landing__title.f3.f2-l.fw5
      .relative.bg-white.pr3.dib 看選區
    .mt5.mt3-l
      constituency-landing(:map="consMap")
    h2.landing__title.f3.f2-l.fw5
      .relative.bg-white.pr3.dib 找議員
    h2.landing__title.f3.f2-l.fw5
      .relative.bg-white.pr3.dib 讀分析
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
  &__title {
    position: relative;
    margin: 3rem 0 1rem;
    @include large-screen {
      margin: 10rem 0 2.5rem;
    }
    &:before {
      content: " ";
      height: 0;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      border: 1px solid #7A7C7D;
    }
  }
}
</style>
