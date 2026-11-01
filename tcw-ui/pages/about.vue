<template lang="pug">
  article.about.pageContainer
    h1.f3.ls4.mt5 {{article.title}}
    .nuxt-content.ls2.lh(v-html="article.html")
</template>
<script setup>
const { data: article } = await useFetch('/api/about')
useFriendlyHead(() => ({ title: article.value?.title }))
</script>
<style lang="scss" scoped>
.about {
}
</style>
