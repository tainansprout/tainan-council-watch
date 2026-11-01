<script>
// 取代 vue-intersect（只支援 Vue 2）：子元素進入畫面發出 enter，離開發出 leave
export default {
  emits: ['enter', 'leave'],
  mounted () {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.$emit(entry.isIntersecting ? 'enter' : 'leave', entry)
      })
    }, { threshold: [0, 0.2] })
    this.observer.observe(this.$el)
  },
  beforeUnmount () {
    this.observer.disconnect()
  },
  render () {
    return this.$slots.default()[0]
  }
}
</script>
