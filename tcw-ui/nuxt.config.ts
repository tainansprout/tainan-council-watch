import { friendlyHeader } from './libs/crawlerFriendly'

const PDFJS_BASE = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305'
const GA_ID = 'G-XPXZLJKLJ9'

const defaultHeader = friendlyHeader({
  title: '台南市議會觀測站',
  description: '',
  coverUrl: 'og-default.png'
})

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/plausible',
    '@nuxtjs/sitemap'
  ],
  devtools: { enabled: false },

  app: {
    head: {
      title: '台南市議會觀測站',
      htmlAttrs: {
        lang: 'zh-Hant-TW'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ffffff' },
        ...defaultHeader.meta
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500&display=swap' },
        { rel: 'stylesheet', href: `${PDFJS_BASE}/web/pdf_viewer.css` }
      ],
      script: [
        // Google Analytics（原本寫在 app.html）
        { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true },
        { innerHTML: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}');` },
        // #186, load in global scope to avoid pdf.js init error
        { key: 'pdf-js', src: `${PDFJS_BASE}/build/pdf.js` },
        { key: 'pdf-viewer-js', src: `${PDFJS_BASE}/web/pdf_viewer.js` }
      ]
    }
  },

  css: [
    'buefy/dist/css/buefy.css',
    'tachyons/css/tachyons.css',
    '@fortawesome/fontawesome-free/css/all.css',
    '~/assets/global.scss'
  ],

  // 樣式用的是 Nuxt 2 的 class 名稱
  router: {
    options: {
      linkActiveClass: 'nuxt-link-active',
      linkExactActiveClass: 'nuxt-link-exact-active'
    }
  },

  site: {
    url: 'https://tcco.tnsprout.org'
  },

  runtimeConfig: {
    public: {
      algoliaApp: process.env.ALGOLIA_APP_ID || '',
      algoliaIndex: process.env.ALGOLIA_INDEX_NAME || '',
      algoliaKey: process.env.ALGOLIA_SEARCH_API_KEY || '',
      sentryDsn: process.env.SENTRY_DSN || '',
      release: process.env.GITHUB_SHA || 'dev'
    }
  },
  // 沿用原本的目錄結構（pages/、components/ 在 tcw-ui/ 底下），靜態檔仍放 static/，Decap CMS 設定不用改
  dir: {
    public: 'static'
  },
  srcDir: '.',

  // buefy 不打包進 server 端時，預先產生的 HTML 裡元件沒有展開（留下 <b-tooltip> 原樣）
  build: {
    transpile: ['buefy']
  },

  devServer: {
    port: Number(process.env.SERVER_PORT) || 3000,
    host: process.env.SERVER_HOST || 'localhost'
  },
  compatibilityDate: '2026-10-01',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/3rd', '/4th', '/about', '/article']
    }
  },

  vite: {
    css: {
      // tachyons 裡有舊 IE 的 *zoom 寫法，lightningcss 壓縮時直接略過
      lightningcss: {
        errorRecovery: true
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/variables.scss" as *;\n'
        }
      }
    }
  },

  // 照原本 @nuxtjs/eslint-config（standard）的寫法：不加分號、單引號、函式名稱後面空一格
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  plausible: {
    domain: 'tcco.tnsprout.org'
  }
})
