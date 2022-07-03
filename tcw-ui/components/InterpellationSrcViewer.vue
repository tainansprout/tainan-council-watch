<template lang="pug">
  .intViewer.dn(:class="{db: isOpened}")
    .intViewer__pageWrapper(ref="container" @click="hide")
      .intViewer__page(ref="page" @click.stop="handlePageClick")
</template>
<script>
const PDFJS_BASE = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305'
const PDF_SRC_BASE = 'https://tainansprout.github.io/tainan-council-data/interpellation/round'
const PAGE_PER_CHUNK = 10

const CHECK_PDF_LIB_SOMETIME = 500

export default {
  props: {
    startPage: {
      type: Number,
      required: true
    },
    councilorRound: {
      type: String,
      default: '3th'
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

      pageChunk: {}
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
    }
  },
  watch: {
    isRenderReady () {
      if (this.isOpenedPending) {
        this.renderPdf(this.startPage, this.highlight)
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
          this.renderPdf(this.startPage, this.highlight)
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
    async renderPdf (pageIndex, highlight) {
      const pdfjsLib = window.pdfjsLib
      const pdfjsViewer = window.pdfjsViewer

      pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}/build/pdf.worker.js`

      const CMAP_URL = `${PDFJS_BASE}/cmaps/`
      const eventBus = new pdfjsViewer.EventBus()
      const pdfLinkService = new pdfjsViewer.PDFLinkService({
        eventBus
      })
      const pdfFindController = new pdfjsViewer.PDFFindController({
        eventBus,
        linkService: pdfLinkService
      })

      // page 10 => 10
      // page  1 =>  1
      const pageOffset = pageIndex % PAGE_PER_CHUNK || PAGE_PER_CHUNK

      const pdfSinglePageViewer = new pdfjsViewer.PDFSinglePageViewer({
        container: this.$refs.container,
        eventBus,
        linkService: pdfLinkService,
        findController: pdfFindController
      })
      pdfLinkService.setViewer(pdfSinglePageViewer)

      eventBus.on('pagesinit', () => {
        // We can use pdfSinglePageViewer now, e.g. let's change default scale.
        // pdfSinglePageViewer.currentScaleValue = "page-width";

        // We can try searching for things.
        if (highlight) {
          // pdf break sentence when get line break, try to avoid that in simple way.
          let highlightHead = highlight.split(/[，。！？]/)[0]
          if (highlightHead.length < 6) {
            highlightHead = highlight.slice(0, 6)
          }
          eventBus.dispatch('find', {
            type: '',
            query: highlightHead,
            phraseSearch: true,
            highlightAll: true
          })
        }
      })

      eventBus.on('updatetextlayermatches', () => {
        if (pdfSinglePageViewer.currentPageNumber !== pageOffset) {
          pdfSinglePageViewer.currentPageNumber = pageOffset
        }
      })

      // Loading document.
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

      // const targetPage = await pdfDocument.getPage(pageIndex % PAGE_PER_CHUNK)
      // pdfSinglePageViewer.setPdfPage(targetPage)
      pdfSinglePageViewer.setDocument(pdfDocument)
      pdfLinkService.setDocument(pdfDocument, null)
    },
    getPageChunkIndex (pageIndex) {
      //  1 -> return 001
      // 10 -> return 001
      // 11 -> return 002
      const chunkIndex = Math.ceil(pageIndex / PAGE_PER_CHUNK)
      return `${chunkIndex}`.padStart(3, '0')
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
  &__pageWrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    // padding: 2rem;
    background: #000a;
  }
}
</style>
