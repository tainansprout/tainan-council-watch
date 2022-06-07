<template lang="pug">
  .tcwFooter.mw8
    img.tcwFooter__logo(src="~/assets/tnsprout.png" alt="台南新芽")
    .tcwFooter__main
      .flex.flex-column.items-start
        .tcwFooter__subheader.fw4 關於我們
        a.tcwFooter__item(
          v-for="item in about"
          :key="item.label"
          :href="item.url"
          target="_blank"
        ) {{item.label}}
      .flex.flex-column.items-start
        .tcwFooter__subheader.fw4 聯絡我們
        component.tcwFooter__item(
          v-for="item in contact"
          :key="item.label"
          :is="item.url ? 'a' : 'div'"
          :href="item.url || ''"
        ) {{item.label}}
    .tcwFooter__license
      | 除另有註明，網站之內容皆採&nbsp;
      a(href="https://creativecommons.org/licenses/by/4.0/deed.zh_TW" target="_blank") CC-BY 4.0
      | &nbsp;授權條款釋出
</template>
<script>
import misc from '~/content/meta/misc.json'

export default {
  computed: {
    about () {
      return misc['footer-about']
    },
    contact () {
      return misc['footer-contact']
    }
  }
}
</script>
<style lang="scss" scoped>
.tcwFooter {
  border-top: 1px solid $gray-9;
  margin: 6rem auto;
  padding: 2.25rem 1rem 0;
  line-height: 1.33;

  &__logo {
    width: 8.5rem;
  }

  &__main {
    letter-spacing: 1.33px;
    > div {
      margin-top: 1.25rem;
    }
    > div + div {
      margin-top: 2rem;
    }
  }

  &__subheader {
    margin-bottom: 1rem;
  }

  a.tcwFooter__item {
    border-bottom: 1px solid $black;
    padding-bottom: 1px;
    &:hover {
      font-weight: 400;
    }
  }

  &__item + .tcwFooter__item {
    margin-top: 0.5rem;
  }

  &__license {
    margin-top: 2rem;
    letter-spacing: 1.33px;
  }

  @include large-screen {
    margin-top: 12.25rem auto 8.25rem;
    padding: 4rem 4.5rem 0;

    &__main {
      display: flex;
      justify-content: flex-end;
      > div {
        margin: 0;
      }
      > div + div {
        margin: 0;
        margin-left: 3.75rem;
      }
    }

    &__subheader {
      margin-bottom: 1.25rem;
    }

    &__item {
      margin-bottom: 0.75rem;
    }

    &__license {
      margin-top: 6rem;
    }
  }
}
</style>
