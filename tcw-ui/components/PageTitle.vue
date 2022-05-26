<template lang="pug">
  h1.pTitle
    slot
</template>
<style lang="scss" scoped>
.pTitle {
  font-size: 1.5rem;
  letter-spacing: 2px;

  @include not-small-screen {
    font-size: 1.75rem;
    letter-spacing: 2.33px;
  }
}
</style>
