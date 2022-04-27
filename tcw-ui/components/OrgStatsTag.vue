<template lang="pug">
  .orgTag.flex.items-center.justify-between
    .orgTag__label {{stats.name}} {{stats.count}}
    i.fa-solid.fa-info-circle
</template>
<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.orgTag {
  border: 1px solid #D8D8D8;
  border-top: 3px solid #49B0D5;
  height: 3.5rem;
  padding: 0 1.25rem;
}
</style>
