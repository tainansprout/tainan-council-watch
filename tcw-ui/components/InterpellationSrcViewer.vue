<template lang="pug">
  .intViewer(:class="{db: isOpened, dn: !isOpened}" @click="hide")
    .intViewer__container(v-if="mainPage && isOpened")
      .intViewer__close.flex.justify-end
        button.plainButton.f4.cursor(@click="hide")
          i.fas.fa-times-circle
      client-only
        infinite-loading(v-if="mainPage" @infinite="loadMore(false, $event)" :distance="0" direction="top")
          div(slot="no-more")
          div(slot="no-results")
      .h3
      single-interpellation-pdf(
        v-for="page in headPages"
        :key="page.id"
        v-bind="page.pdf"
        @loaded="markLoadingDone(false)"
        @click.native.stop="handlePageClick"
      )
      single-interpellation-pdf(
        v-bind="mainPage"
        :no-scroll="false"
        @click.native.stop="handlePageClick"
      )
      single-interpellation-pdf(
        v-for="page in tailPages"
        :key="page.id"
        v-bind="page.pdf"
        @loaded="markLoadingDone(true)"
        @click.native.stop="handlePageClick"
      )
      .h3
      client-only
        infinite-loading(v-if="mainPage" @infinite="loadMore(true, $event)" :distance="0")
          div(slot="no-more")
          div(slot="no-results")
      .h3
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'

const PDFJS_BASE = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305'
const PDF_SRC_BASE = 'https://tainansprout.github.io/tainan-council-data/interpellation/round'
const PAGE_PER_CHUNK = 10
const RENDER_SLOWLY = 300

const CHECK_PDF_LIB_SOMETIME = 100
const MIN_SEARCH_LEN = 12

export default {
  components: {
    InfiniteLoading
  },
  props: {
    startPage: {
      type: Number,
      required: true
    },
    councilorRound: {
      type: String,
      default: '3rd'
    },
    meetingRound: {
      type: Number,
      default: 1
    },
    meetingType: {
      type: String,
      default: 'regular'
    },
    highlight: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLibLoaded: false,
      isPageMounted: false,
      isOpenedPending: false,
      isOpened: false,
      pdfLibTimer: null,

      pageChunk: {},

      mainPage: null,

      headPages: [],
      headLoadingState: null,

      tailPages: [],
      tailLoadingState: null
    }
  },
  head () {
    const once = { skip: this.isLibLoaded, once: true }
    return {
      link: [{ rel: 'stylesheet', href: `${PDFJS_BASE}/web/pdf_viewer.css` }],
      script: [
        { hid: 'pdf-js', ...once, src: `${PDFJS_BASE}/build/pdf.js` },
        { hid: 'pdf-viewer-js', ...once, src: `${PDFJS_BASE}/web/pdf_viewer.js`, callback: this.initPdfLibSetting }
      ]
    }
  },
  computed: {
    isRenderReady () {
      return this.isPageMounted && this.isLibLoaded
    },
    pdfLinkBase () {
      const meetingRoundStr = `${this.meetingRound}`.padStart(2, '0')
      return `${PDF_SRC_BASE}/${this.councilorRound}/${this.meetingType}/${meetingRoundStr}`
    },
    highlightHead () {
      let head = this.highlight.split(/[，。！？]/)[0]
      if (head.length < MIN_SEARCH_LEN) {
        head = this.highlight.slice(0, MIN_SEARCH_LEN)
      }
      return head
    }
  },
  watch: {
    isRenderReady () {
      if (this.isOpenedPending) {
        this.renderMainPage()
        this.isOpenedPending = false
      }
    }
  },
  mounted () {
    this.isLibLoaded = this.checkPdfLibReadiness()
    this.isPageMounted = true
  },
  beforeDestroy () {
    clearTimeout(this.pdfLibTimer)
  },
  methods: {
    initPdfLibSetting () {
      this.isLibLoaded = true
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}/build/pdf.worker.js`
    },
    handlePageClick (e) {
      // hide when not clicking pdf
      if (!e.target.closest('.textLayer')) {
        this.hide()
      }
    },
    show () {
      this.isOpened = true
      if (!this.isRenderReady) {
        this.isOpenedPending = true
        // vue-meta onload trigger only once, we need to do it ourselves
        this.keepCheckingPdfLibRediness()
      } else {
        this.$nextTick(() => {
          this.renderMainPage()
        })
      }
    },
    hide () {
      this.isOpened = false
      this.isOpenedPending = false
    },
    checkPdfLibReadiness () {
      return !!window && !!window.pdfjsLib && !!window.pdfjsViewer
    },
    keepCheckingPdfLibRediness () {
      this.pdfLibTimer = setTimeout(() => {
        this.isLibLoaded = this.checkPdfLibReadiness()
        if (!this.isLibLoaded) {
          this.keepCheckingPdfLibRediness()
        }
      }, CHECK_PDF_LIB_SOMETIME)
    },
    async preparePdf (pageIndex) {
      const pdfjsLib = window.pdfjsLib
      const CMAP_URL = `${PDFJS_BASE}/cmaps/`

      const pageOffset = pageIndex % PAGE_PER_CHUNK || PAGE_PER_CHUNK
      const chunkIndex = this.getPageChunkIndex(pageIndex)

      if (!this.pageChunk[chunkIndex]) {
        this.pageChunk[chunkIndex] = pdfjsLib.getDocument({
          url: `${this.pdfLinkBase}/${chunkIndex}.pdf`,
          cMapUrl: CMAP_URL,
          cMapPacked: true,
          enableXfa: true
        })
      }

      const pdfDocument = await this.pageChunk[chunkIndex].promise

      return {
        document: pdfDocument,
        page: pageOffset
      }
    },
    async renderMainPage () {
      const pdf = await this.preparePdf(this.startPage)
      let highlightHead = this.highlight.split(/[，。！？]/)[0]
      if (highlightHead.length < MIN_SEARCH_LEN) {
        highlightHead = this.highlight.slice(0, MIN_SEARCH_LEN)
      }
      pdf.highlight = highlightHead
      this.mainPage = pdf
    },
    getPageChunkIndex (pageIndex) {
      //  1 -> return 001
      // 10 -> return 001
      // 11 -> return 002
      const chunkIndex = Math.ceil(pageIndex / PAGE_PER_CHUNK)
      return `${chunkIndex}`.padStart(3, '0')
    },
    markLoadingDone (isTail) {
      if (isTail && this.tailLoadingState) {
        // TODO: handle end of pdf properly
        this.tailLoadingState.loaded()
        this.tailLoadingState = null
      } else if (!isTail && this.headLoadingState) {
        this.headLoadingState.loaded()
        this.headLoadingState = null
      }
    },
    async loadMore (isTail, $state) {
      let nextPage = this.startPage
      if (isTail) {
        nextPage += this.tailPages.length + 1
      } else {
        nextPage = nextPage - this.headPages.length - 1
      }
      const pdf = await this.preparePdf(nextPage)
      const page = {
        id: nextPage,
        pdf
      }
      setTimeout(() => {
        if (isTail) {
          this.tailPages.push(page)
          this.tailLoadingState = $state
        } else {
          this.headPages.unshift(page)
          this.headLoadingState = $state
        }
      }, RENDER_SLOWLY)
    }
  }
}
</script>
<style lang="scss" scoped>
.intViewer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  padding: 2rem 0;
  overflow: auto;
  background: #000a;

  @include large-screen {
    padding: 2rem;
  }

  &__container {
    position: absolute;
    width: 100vw;
    max-width: 62rem;
    transform: translateX(-50%);
    left: 50%;
    top: 2rem;
    padding-bottom: 2rem;
  }

  &__close {
    position: sticky;
    top: 0rem;
    z-index: 1;
    padding: 0 1rem;
    button {
      color: #999;
      padding: 1rem;
    }
  }

  .sip + .sip {
    margin-top: 2rem;
  }
}
</style>
