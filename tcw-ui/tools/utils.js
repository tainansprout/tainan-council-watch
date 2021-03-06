require('dotenv').config()

const Sentry = require('@sentry/node')
const axios = require('axios')
// Importing @sentry/tracing patches the global hub for tracing to work.
require('@sentry/tracing')

const { CaptureConsole: CaptureConsoleIntegration } = require('@sentry/integrations')

function notifyJandi (msg) {
  if (!process.env.JANDI_HOOK) {
    return
  }
  const headers = {
    Accept: 'application/vnd.tosslab.jandi-v2+json',
    'Content-Type': 'application/json'
  }
  const params = {
    body: `**錯誤回報 | 議會觀測站機器人** \n\n${msg}`
  }
  return axios.post(process.env.JANDI_HOOK, params, { headers })
}

function enableSentry () {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      integrations: [
        new CaptureConsoleIntegration({
          levels: ['error', 'warn']
        })
      ]
    })
  }
  return Sentry
}

const DISTRICT_MAP = {
  第一選區: '1st',
  第二選區: '2nd',
  第三選區: '3rd',
  第四選區: '4th',
  第五選區: '5th',
  第六選區: '6th',
  第七選區: '7th',
  第八選區: '8th',
  第九選區: '9th',
  第十選區: '10th',
  第十一選區: '11th',
  第十二選區: '12th',
  第十三選區: '13th'
}

function districtName2Id (districtName) {
  if (districtName in DISTRICT_MAP) {
    return DISTRICT_MAP[districtName]
  }
  throw new Error(`Invalid district: ${districtName}`)
}

module.exports = {
  districtName2Id,
  enableSentry,
  notifyJandi
}
