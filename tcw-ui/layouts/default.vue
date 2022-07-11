<template lang="pug">
  .tcw.mb5
    tcw-navbar
    main
      nuxt
    tcw-footer
</template>
<script>
export default {
  name: 'TcwDefault'
}
</script>
<style lang="scss" scoped>
main {
  ::v-deep article .nuxt-content {
    line-height: normal;
    h1, h2, h3 {
      margin: 2rem 0 1rem;
      a:first-child {
        display: none;
      }
    }
    h1, h2 {
      font-size: 1.25rem;
    }

    h3 {
      font-size: 1rem;
    }

    p + p {
      margin-top: 1rem;
    }

    h1 {
      margin-bottom: 0.75rem;
    }

    @include not-small-screen {
      h1 {
        margin-bottom: 1.5rem;
      }

      .nuxt-content {
        line-height: 1.75;
      }
    }
  }
}
</style>
