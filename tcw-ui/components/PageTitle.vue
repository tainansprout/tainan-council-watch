<template lang="pug">
  h1.ptitle
    slot
</template>
<style lang="scss" scoped>
.ptitle {
  font-size: 1.5rem;
  letter-spacing: 2px;

  @include not-small-screen {
    font-size: 1.75rem;
    letter-spacing: 2.33px;
  }
}
</style>
