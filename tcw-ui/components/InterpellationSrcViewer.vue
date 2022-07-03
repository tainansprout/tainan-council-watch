<template lang="pug">
  .intViewer
    .intViewer__pageWrappera(ref="container")
      .intViewer__page(ref="page")
</template>
<script>
const PDFJS_BASE = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305'
const PDF_SRC_BASE = 'https://tainansprout.github.io/tainan-council-data/interpellation/round'
const PAGE_PER_CHUNK = 10

let isLibLoaded = false

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
      isLibLoaded,
      isPageMounted: false,

      pageChunk: {}
    }
  },
  head () {
    const once = { skip: this.isLibLoaded, once: true }
    return {
      link: [{ hid: 'pdf-css', ...once, rel: 'stylesheet', href: `${PDFJS_BASE}/web/pdf_viewer.css` }],
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
      console.warn('Ready?!', window, window.pdfjsLib, window.pdfjsViewer)
      // this.renderPdf(this.startPage, this.highlight)
    }
  },
  mounted () {
    this.isPageMounted = true
  },
  methods: {
    initPdfLibSetting () {
      isLibLoaded = true
      this.isLibLoaded = true
    },
    renderPdf (pageIndex, highlight) {
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
          console.warn('highlight!', highlight)
          eventBus.dispatch('find', {
            type: '',
            query: highlight,
            phraseSearch: true,
            highlightAll: true
          })
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

      this.pageChunk[chunkIndex].promise.then(function (pdfDocument) {
        // Document loaded, specifying document for the viewer and
        // the (optional) linkService.
        pdfSinglePageViewer.setDocument(pdfDocument)
        console.warn('done~~', pdfSinglePageViewer, pdfSinglePageViewer.setPage)
        pdfLinkService.setDocument(pdfDocument, null)
      })
    },
    getPageChunkIndex (pageIndex) {
      const chunkIndex = Math.ceil(pageIndex / PAGE_PER_CHUNK)
      // return 004
      return `${chunkIndex}`.padStart(3, '0')
    }
  }
}
</script>
<style lang="scss" scoped>
.intViewer {
  &__pageWrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background: #000a;
  }
}
</style>
