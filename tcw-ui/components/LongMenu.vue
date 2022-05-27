<template lang="pug">
  .longMenu(ref="menu")
    .longMenu__container
      slot
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      default: '2.5rem'
    }
  },
  mounted () {
    this.$refs.menu.style.setProperty('--menu-height', this.height)
  }
}
</script>
<style lang="scss" scoped>
.longMenu {
  --menu-height: 2.5rem;
  overflow: hidden;
  position: relative;
  width: calc(100% + 1rem);
  // for better SSR result
  height: var(--menu-height);

  &__container {
    display: flex;
    width: 100%;
    padding-bottom: 17px;
    box-sizing: content-box;
    overflow-x: scroll;
  }

  @include large-screen {
    width: auto;
    height: auto;

    &__container {
      flex-direction: column;
      width: auto;
      padding-bottom: 0;
    }
  }
}
</style>
