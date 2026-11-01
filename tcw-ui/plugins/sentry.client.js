import * as Sentry from '@sentry/vue'
import { SITE_URL } from '~/libs/crawlerFriendly'

// 原本用 @nuxtjs/sentry：只在正式環境、有 SENTRY_DSN 時啟用，console 的 error、warn 也送出
// 只在正式網域啟用：Sentry 專案限定了允許的網域，部署前在 localhost 跑 e2e 測試時送出去會被擋（403），測試就失敗
export default defineNuxtPlugin((nuxtApp) => {
  const { sentryDsn, release } = useRuntimeConfig().public
  if (import.meta.dev || !sentryDsn || window.location.hostname !== new URL(SITE_URL).hostname) {
    return
  }
  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: sentryDsn,
    release,
    integrations: [Sentry.captureConsoleIntegration({ levels: ['error', 'warn'] })]
  })
})
