<template lang="pug">
  .sip.pdfViewer(ref="page")
</template>
<script>
const DEFAULT_SCALE = 0.95

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
    },
    noScroll: {
      type: Boolean,
      default: true
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
        container: this.$refs.page.parentElement,
        viewer: this.$refs.page,
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
        pdfSinglePageViewer._setScale(DEFAULT_SCALE, this.noScroll)

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
          const scrollEle = pdfSinglePageViewer.container.parentElement
          const top = scrollEle.scrollTop
          pdfSinglePageViewer.currentPageNumber = this.page
          pdfSinglePageViewer.container.parentElement.scrollTo({ top })
        }
        this.$emit('loaded')
      })

      eventBus.on('updatetextlayermatches', () => {
        if (pdfSinglePageViewer.currentPageNumber !== this.page) {
          pdfSinglePageViewer._setCurrentPageNumber(this.page, !this.noScroll)
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
  ::v-deep {
    .pdfViewer .page {
      box-sizing: content-box;
    }
  }
}
</style>
