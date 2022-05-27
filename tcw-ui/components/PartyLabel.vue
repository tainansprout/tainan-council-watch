<template lang="pug">
  .partyLabel.flex.items-center
    party-icon.mr2(:party="meta")
    | {{meta.name}}
</template>
<script>
import { partyMixin } from '~/libs/mixins'

export default {
  mixins: [partyMixin]
}
</script>
<style lang="scss" scoped>
.partyLabel {
  letter-spacing: 0.083em;
}
</style>
