<template lang="pug">
  .navWrapper.mt3.ph3.ph4-l.bg-white(:class="{'navWrapper--opened': menuOpened}")
    .pv3.bb-l.b--moon-gray
      .nav.mw8.center.flex.items-center.justify-between
        nuxt-link.black.fw6(:to="`/${round}`") 台南新芽
        .nav__linkList.nav__linkList--desktop.dn.db-l
          nuxt-link(
            v-for="link in navLinks"
            :key="link.label"
            :to="link.route(round)"
          )
            | {{link.label}}
        .dn.db-l
          i.fa-solid.fa-magnifying-glass
        button.nav__toggle.db.dn-l.button-reset(@click="toggleMenu")
          i.fa-solid.fa-xmark(v-show="menuOpened")
          i.fa-solid.fa-bars(v-show="!menuOpened")
      .navMenu(v-show="menuOpened")
        .nav__linkList.nav__linkList--mobile.mt4
          nuxt-link.db(
            v-for="link in navLinks"
            :key="link.label"
            :to="link.route(round)"
          )
            | {{link.label}}
</template>
<script>
import { NAV_LINKS } from '~/libs/defs'

export default {
  data () {
    return {
      menuOpened: false
    }
  },
  computed: {
    navLinks () {
      return NAV_LINKS
    },
    round () {
      return this.$route.params.round || '第三屆'
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpened = !this.menuOpened
    }
  }
}
</script>
<style lang="scss" scoped>
.navWrapper {
  &--opened {
    min-height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.nav {
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
}
</style>
