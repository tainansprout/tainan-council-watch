<template lang="pug">
NuxtLayout
  NuxtPage
</template>
<script setup>
import { websiteLd } from '~/libs/structuredData'

useHead({
  script: [{ key: 'ld-website', type: 'application/ld+json', innerHTML: JSON.stringify(websiteLd()) }]
})
</script>
