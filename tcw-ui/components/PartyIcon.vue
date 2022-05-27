<template lang="pug">
  img.partyIcon(:src="meta.avatar" :alt="meta.name")
</template>
<script>
import { partyMixin } from '~/libs/mixins'

export default {
  mixins: [partyMixin]
}
</script>
<style lang="scss" scoped>
.partyIcon {
  height: calc(1em + 0.25rem);
  width: calc(1em + 0.25rem);
  object-fit: contain;
  border-radius: 100%;
}
</style>
