import * as Sentry from '@sentry/vue'

// 原本用 @nuxtjs/sentry：只在正式環境、有 SENTRY_DSN 時啟用，console 的 error、warn 也送出
export default defineNuxtPlugin((nuxtApp) => {
  const { sentryDsn, release } = useRuntimeConfig().public
  if (import.meta.dev || !sentryDsn) {
    return
  }
  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: sentryDsn,
    release,
    integrations: [Sentry.captureConsoleIntegration({ levels: ['error', 'warn'] })]
  })
})
