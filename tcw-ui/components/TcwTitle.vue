<template lang="pug">
  component.tcwTitle.f3.f2-l.fw5(:is="level")
      .relative.bg-white.pr3.dib
        slot
</template>
<script>
export default {
  props: {
    level: {
      type: String,
      default: 'h1'
    }
  }
}
</script>
<style lang="scss" scoped>
.tcwTitle {
  position: relative;
  margin: 3rem 0 1rem;
  @include large-screen {
    margin: 10rem 0 2.5rem;
  }
  &:before {
    content: " ";
    height: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    border: 1px solid #7A7C7D;
  }
}
</style>
