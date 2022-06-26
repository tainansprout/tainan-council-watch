import 'intersection-observer'
import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
  if (process.env.gaId) {
    Vue.use(VueGtag, {
      config: { id: process.env.gaId }
    })
  }
}
