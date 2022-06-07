<template lang="pug">
  .nav(:class="{'nav--opened': menuOpened, 'nav--desktopSticky': isDesktopSticky}")
    vue-intersect(@enter="leaveMobileSticky" @leave="enterMobileSticky")
      .nav__stickyZone.pb2
    vue-intersect(@enter="leaveDesktopSticky" @leave="enterDesktopSticky")
      .nav__top.flex.justify-between.items-center(
        :class="{'nav__top--sticky': isMobileSticky}"
      )
        nuxt-link.nav__home(:to="`/${round}`")
          img(src="~/assets/site-logo.svg")
          | 台南市議會觀測站
        button.plainButton.f4.db.dn-l(@click="toggleMenu")
          .pa1
            tcw-icon(:icon="menuOpened ? 'cancel' : 'menu'")
    .nav__bottom.dn
      nuxt-link.nav__home(:to="`/${round}`")
        img(src="~/assets/site-logo.svg")
        | 台南市議會觀測站
      .flex.items-center.justify-between
        nuxt-link.nav__item.ls4.flex-none(
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
          @keyup.enter="triggerSearch"
        )
        button.nav__searchCta.plainButton.pointer.flex-none(@click="triggerSearch")
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
          @keyup.enter="triggerSearch"
        )
        button.nav__searchCta.plainButton(
          :class="{'flex-auto': !searchOpened, 'flex-none': searchOpened}"
          @click="triggerSearch"
        )
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
import VueIntersect from 'vue-intersect'
import { NAV_LINKS, DEFAULT_ROUND } from '~/libs/defs'

const WAIT_UI_REFRESH = 50

export default {
  components: {
    VueIntersect
  },
  data () {
    return {
      menuOpened: false,
      searchOpened: false,
      query: '',

      isMobileSticky: false,
      isDesktopSticky: false
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
        setTimeout(() => {
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
        }, WAIT_UI_REFRESH)
      } else {
        // TODO: 議員、選區 search
        if (this.query) {
          this.$router.push({
            name: 'round-interpellation',
            params: {
              round: this.$route.params.round || DEFAULT_ROUND
            },
            query: {
              query: this.query
            }
          })
        }
        this.closeSearch()
      }
    },
    closeSearch (e) {
      if (e && e.relatedTarget && e.relatedTarget.classList.contains('nav__searchCta')) {
        this.triggerSearch()
      } else {
        this.query = ''
        this.searchOpened = false
      }
    },
    enterMobileSticky () {
      this.isMobileSticky = true
    },
    leaveMobileSticky () {
      this.isMobileSticky = false
    },
    enterDesktopSticky () {
      this.isDesktopSticky = true
    },
    leaveDesktopSticky () {
      this.isDesktopSticky = false
    }
  }
}
</script>
<style lang="scss" scoped>
.nav {
  position: sticky;
  top: calc( -0.5rem - 1px );
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
    border: 0px solid $gray-a;

    &--sticky {
      border-bottom-width: 1px;
    }
  }

  &__home {
    font-size: 0.75rem;
    color: #282828;
    display: flex;
    align-items: center;
    font-weight: 500;
    letter-spacing: 1.67px;
    img {
      width: 3.25rem;
      margin-right: 0.5rem;
    }
  }

  &__item {
    color: #40404a;
    margin: 1.5rem 0;
    &.nuxt-link-active {
      color: $black;
    }
    &:hover {
      color: $yellow-7;
    }
  }

  &__search {
    padding: 0.125rem 0;
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
    top: -9.125rem;

    &--desktopSticky {
      .nav__bottom {
        height: 5rem;
        .nav__home {
          opacity: 1;
        }
      }
    }

    &__home {
      font-size: 1rem;
      img {
        width: 4.5rem;
        margin-right: 0.625rem;
      }
    }

    &__top {
      padding: 1.75rem 0 2.25rem 4rem;
      border-bottom-width: 1px;
    }

    &__bottom {
      max-width: 64rem;
      // make sure left logo won't exceed top logo
      width: calc(100% - 8rem);
      height: 4rem;
      margin: 0 auto;
      display: grid;
      // 33 = 8 (padding) + 25 (middle item)
      grid-template-columns: calc(50% - 33rem / 2) 25rem calc(50% - 33rem / 2);
      column-gap: 2rem;
      align-items: center;
      justify-content: space-between;

      .nav__home {
        opacity: 0;

        img {
          width: 3rem;
          margin-right: 0.5rem;
        }
      }
    }

    &__item {
      color: #282828;
      margin: 0;
    }
  }
}
.navMenu {
  padding: 2.5rem 1.5rem;
}
</style>
