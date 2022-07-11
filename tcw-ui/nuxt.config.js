/* eslint-disable import/first */
// in case we need env var in this file
require('dotenv').config()

import dayjs from 'dayjs'
import { friendlyHeader } from './libs/crawlerFriendly'

const isProd = process.env.NODE_ENV === 'production'

const defaultHeader = friendlyHeader({
  title: '台南市議會觀測站',
  description: '',
  coverUrl: 'og-default.png'
})()

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '台南市議會觀測站',
    htmlAttrs: {
      lang: 'zh-Hant-TW'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
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
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500&display=swap' }
      // { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/web/pdf_viewer.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'tachyons/css/tachyons.css',
    '@fortawesome/fontawesome-free/css/all.css',
    '~assets/global.scss'
  ],

  styleResources: {
    scss: [
      '~/assets/variables.scss'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-components.client'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'vue-plausible',
    '@nuxtjs/sentry',
    'vue-social-sharing/nuxt'
    // remove it for now as it failed in github action
    // '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: 'https://tcco.tnsprout.org',
    gzip: true
  },

  sentry: {
    dsn: isProd ? process.env.SENTRY_DSN : '',
    disableServerSide: true,
    clientIntegrations: {
      CaptureConsole: { levels: ['error', 'warn'] }
    },

    // always inject sentry methods in all env
    logMockCalls: true,
    disabled: !isProd,
    publishRelease: {
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      // Attach commits to the release (requires that the build triggered within a git repository).
      setCommits: {
        auto: true,
        ignoreMissing: true,
        ignoreEmpty: true
      }
    },
    sourceMapStyle: 'hidden-source-map',

    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
      release: process.env.GITHUB_SHA || 'dev'
    }
  },

  plausible: {
    domain: 'tcco.tnsprout.org'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vue-intersect'
    ]
  },

  env: {
    buildTime: dayjs().unix(),
    algoliaApp: process.env.ALGOLIA_APP_ID,
    algoliaIndex: process.env.ALGOLIA_INDEX_NAME,
    algoliaKey: process.env.ALGOLIA_SEARCH_API_KEY
  },

  server: {
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'localhost'
  },

  generate: {
    concurrency: 10,
    fallback: '404.html'
  }
}
