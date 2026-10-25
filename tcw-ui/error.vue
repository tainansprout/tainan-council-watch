<template lang="pug">
NuxtLayout
  .error.pageContainer
    h1.tc.mt5 嗯～議會觀測站出了點問題 (´△｀)♪
    .mw6.center.tc.ph3.mv4
      p.mb3 或許是網站正好上傳了一批新資料，或是這個網頁已經不存在了。
      p 總之，先更新網頁看看吧？
    .flex.justify-center
      b-button(size="is-large" type="is-black" @click="reload") 更新議會觀測站！
</template>
<script setup>
import { SITE_URL } from '~/libs/crawlerFriendly'

const props = defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})

useFriendlyHead(() => ({ title: '出了一點點問題' }))

onMounted(() => {
  console.error('error', props.error.statusCode, props.error)
})

function reload () {
  window.location.href = SITE_URL
}
</script>
<style lang="scss" scoped>
.error {}
</style>
