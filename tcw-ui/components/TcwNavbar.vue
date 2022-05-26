<template lang="pug">
  .nav(:class="{'nav--opened': menuOpened}")
    .nav__top.flex.justify-between.items-center
      nuxt-link.black.fw6(:to="`/${round}`") 議會觀測站
      button.plainButton.f4.db.dn-l(@click="toggleMenu")
        .pa1
          tcw-icon(:icon="menuOpened ? 'cancel' : 'menu'")
    .nav__bottom.dn
      nuxt-link.black.fw6(:to="`/${round}`") 議會觀測站
      .flex.items-center.flex-none
        nuxt-link.nav__item.ls4(
          v-for="link in navLinks"
          :key="link.label"
          :to="link.route(round)"
        )
          | {{link.label}}
      .nav__search.flex.items-center.justify-center(
        :class="{'nav__search--active': searchOpened}"
      )
        input.flex-auto(
          ref="desktopSearch"
          type="text"
          v-model.trim="query"
          placeholder="搜尋質詢議題"
          v-show="searchOpened"
          @blur="closeSearch"
        )
        button.plainButton.pointer.flex-none(@click="triggerSearch")
          tcw-icon(:icon="searchOpened ? 'search-gray' : 'search-black'")
    .navMenu(v-show="menuOpened")
      .nav__search.flex.items-center(
        :class="{'nav__search--active': searchOpened}"
      )
        input.flex-auto(
          type="text"
          v-model.trim="query"
          placeholder="搜尋質詢議題"
          v-show="searchOpened"
          ref="mobileSearch"
          @blur="closeSearch"
        )
        button.plainButton(:class="{'flex-auto': !searchOpened, 'flex-none': searchOpened}" @click="triggerSearch")
          span(v-show="!searchOpened") 搜尋
          tcw-icon(v-show="searchOpened" icon="search-gray")
      nuxt-link.nav__item.ls2.db(
        v-for="link in navLinks"
        :key="link.label"
        :to="link.route(round)"
      )
        | {{link.label}}
</template>
<script>
import { NAV_LINKS, DEFAULT_ROUND } from '~/libs/defs'

export default {
  data () {
    return {
      menuOpened: false,
      searchOpened: false,
      query: ''
    }
  },
  computed: {
    navLinks () {
      return NAV_LINKS
    },
    round () {
      return this.$route.params.round || DEFAULT_ROUND
    }
  },
  watch: {
    $route () {
      this.menuOpened = false
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpened = !this.menuOpened

      if (!this.menuOpened) {
        this.closeSearch()
      }
    },
    triggerSearch () {
      if (!this.searchOpened) {
        this.searchOpened = true
        this.$nextTick(() => {
          [
            this.$refs.desktopSearch,
            this.$refs.mobileSearch
          ]
            .some((dom) => {
              if (dom.offsetHeight) {
                dom.focus()
                return true
              }
              return false
            })
        })
      } else {
        // TODO: 議員、選區 search
        // TODO: do search
        this.closeSearch()
      }
    },
    closeSearch () {
      this.query = ''
      this.searchOpened = false
    }
  }
}
</script>
<style lang="scss" scoped>
.nav {
  padding-top: 0.5rem;
  position: sticky;
  top: -0.5rem;
  z-index: 999;
  background: $white;

  &--opened {
    min-height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__top {
    padding: 1rem;
  }

  &__item {
    color: #40404a;
    margin: 1.5rem 0;
  }

  &__search {
    padding-bottom: 0.125rem;
    &--active {
      border-bottom: 1px solid $gray-d;
      padding-right: 0.75rem;
    }
    button {
      color: #40404a;
    }
    input {
      border: none;
      font-size: 0.875rem;
      &:focus {
        border: none;
        box-shadow: none;
        outline: none;
      }
    }
  }

  &__linkList {
    a {
      color: #40404A;
      text-decoration: none;

      & + a {
        margin-top: 1.25rem;
      }
    }
    &--desktop {
      a {
        color: #282828;
        & + a {
          margin-left: 3.75rem;
        }
      }
    }
  }
  &__toggle {
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  @include large-screen {
    width: calc(100% - 7rem);
    min-width: 64rem;
    margin: 0 auto;
    border-bottom: 1px solid $gray-a;

    &__top {
      padding: 1.75rem 0 2.375rem 4rem;
      border-bottom: 1px solid $gray-a;
    }

    &__bottom {
      max-width: 64rem;
      width: calc(100% - 8rem);
      height: 4rem;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 18rem auto 18rem;
      column-gap: 2rem;
      align-items: center;
      justify-content: space-between;
    }

    &__item {
      color: #282828;
      margin: 0;
      + .nav__item {
        margin-left: 3.5rem;
      }
    }
  }
}
.navMenu {
  padding: 2.5rem 1.5rem;
}
</style>
