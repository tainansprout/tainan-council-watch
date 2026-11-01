// 照 GitHub Pages 的規則提供 .output/public：資料夾回 index.html、沒有斜線的資料夾 301 補斜線、找不到回 404.html
// 用法：node tests/serve-static.mjs [port]
import { createServer } from 'node:http'
import { createReadStream, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const ROOT = join(import.meta.dirname, '../.output/public')
const PORT = Number(process.argv[2] || 4173)
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain'
}

function fileOf (path) {
  try {
    return statSync(path).isFile() ? path : null
  } catch {
    return null
  }
}

function send (res, status, path) {
  res.writeHead(status, { 'Content-Type': TYPES[extname(path)] || 'application/octet-stream' })
  createReadStream(path).pipe(res)
}

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const pathname = normalize(decodeURIComponent(url.pathname))
  if (pathname.includes('..')) {
    res.writeHead(400).end()
    return
  }
  const path = join(ROOT, pathname)
  const file = fileOf(path)
  if (file) {
    return send(res, 200, file)
  }
  if (fileOf(join(path, 'index.html'))) {
    if (!pathname.endsWith('/')) {
      res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end()
      return
    }
    return send(res, 200, join(path, 'index.html'))
  }
  send(res, 404, join(ROOT, '404.html'))
}).listen(PORT, () => console.info(`serving ${ROOT} on http://localhost:${PORT}`))
