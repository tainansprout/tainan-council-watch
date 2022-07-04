<template lang="pug">
  .sip(ref="container")
    .sip__viewer.pdfViewer
</template>
<script>
const DEFAULT_SCALE = 1

export default {
  props: {
    document: {
      type: Object,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    highlight: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.renderPdf()
  },
  methods: {
    renderPdf () {
      const pdfjsViewer = window.pdfjsViewer

      const eventBus = new pdfjsViewer.EventBus()

      const viewerConfig = {
        container: this.$refs.container,
        eventBus
      }

      viewerConfig.linkService = new pdfjsViewer.PDFLinkService({
        eventBus
      })

      if (this.highlight) {
        viewerConfig.findController = new pdfjsViewer.PDFFindController({
          eventBus,
          linkService: viewerConfig.linkService
        })
      }

      const pdfSinglePageViewer = new pdfjsViewer.PDFSinglePageViewer(viewerConfig)
      viewerConfig.linkService.setViewer(pdfSinglePageViewer)

      eventBus.on('pagesinit', () => {
        // We can use pdfSinglePageViewer now, e.g. let's change default scale.
        // pdfSinglePageViewer.currentScaleValue = 'auto'
        pdfSinglePageViewer.currentScaleValue = DEFAULT_SCALE

        if (this.highlight) {
          // TODO: handle search not found
          // console.warn('search', this.highlight)
          eventBus.dispatch('find', {
            type: '',
            query: this.highlight,
            phraseSearch: true,
            highlightAll: true
          })
        } else {
          pdfSinglePageViewer.currentPageNumber = this.page
        }
      })

      eventBus.on('updatetextlayermatches', () => {
        if (pdfSinglePageViewer.currentPageNumber !== this.page) {
          pdfSinglePageViewer.currentPageNumber = this.page
        }
      })

      pdfSinglePageViewer.setDocument(this.document)
      viewerConfig.linkService.setDocument(this.document, null)
    }
  }
}
</script>
<style lang="scss" scoped>
.sip {
  position: absolute;
  width: 100vw;
  max-width: 62rem;
  transform: translateX(-50%);
  left: 50%;
  top: 2rem;
  padding-bottom: 2rem;

  ::v-deep {
    .pdfViewer .page {
      box-sizing: content-box;
    }
  }
}
</style>
