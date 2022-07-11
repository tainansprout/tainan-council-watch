<template lang="pug">
  .error.pageContainer
    h1.tc.mt5 嗯～議會觀測站出了點問題 (´△｀)♪
    .mw6.center.tc.ph3.mv4
      p.mb3 或許是網站正好上傳了一批新資料，或是這個網頁已經不存在了。
      p 總之，先更新網頁看看吧？
    .flex.justify-center
      b-button(size="is-large" type="is-black" @click="reload") 更新議會觀測站！
</template>
<script>
import { friendlyHeader, SITE_URL } from '~/libs/crawlerFriendly'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  head: friendlyHeader({
    title: '出了一點點問題'
  }),
  mounted () {
    console.error('error', this.error.statusCode, this.error)
  },
  methods: {
    reload () {
      window.location.href = SITE_URL
    }
  }
}
</script>
<style lang="scss" scoped>
.error {}
</style>
