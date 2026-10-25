// 對 nuxt generate 的靜態輸出跑的端對端測試（部署到 GitHub Pages 的就是這份）。
// 先 npm run generate，再 npm test。資料的預期值直接讀 content/ 底下的 JSON。
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { test, expect } from '@playwright/test'

const CONTENT = join(import.meta.dirname, '../content/council')
const ROUNDS = ['3rd', '4th']
const readJson = path => JSON.parse(readFileSync(join(CONTENT, path), 'utf-8'))
const councilorMap = round => readJson(`${round}/councilor-map.json`)
const districtMap = round => readJson(`${round}/district-map.json`)
const sayitOf = (round, id) => {
  const path = `${round}/sayit/${id}.json`
  return existsSync(join(CONTENT, path)) ? readJson(path) : null
}
// 頁面文字：去掉標籤、還原常見字元實體、空白壓成一個
const pageText = html => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'')
  .replace(/\s+/g, ' ')

// 瀏覽器端：記下 JavaScript 錯誤、站內失敗的請求、打到 /api 的請求（靜態站沒有 /api）
function watch (page) {
  const problems = []
  page.on('pageerror', e => problems.push(`pageerror: ${e.message}`))
  page.on('console', m => m.type() === 'error' && problems.push(`console: ${m.text()}`))
  page.on('request', (req) => {
    const url = new URL(req.url())
    if (url.origin === new URL(page.url() || 'http://localhost').origin && url.pathname.startsWith('/api/')) {
      problems.push(`api request: ${url.pathname}`)
    }
  })
  page.on('response', (res) => {
    const url = new URL(res.url())
    if (url.hostname === 'localhost' && res.status() >= 400) {
      problems.push(`${res.status()}: ${url.pathname}`)
    }
  })
  return problems
}

test.describe('靜態檔', () => {
  test('sitemap 每個網址和它的 _payload.json 都在', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)
    expect(paths.length).toBeGreaterThanOrEqual(170)
    for (const round of ROUNDS) {
      for (const id of Object.keys(councilorMap(round))) {
        expect(paths, `sitemap 少了 ${round} 議員 ${id}`).toContain(`/${round}/councilor/${id}/`)
      }
    }
    const failed = []
    for (const path of paths) {
      const dir = path.endsWith('/') ? path : `${path}/`
      for (const url of [dir, `${dir}_payload.json`]) {
        const res = await request.get(url)
        if (res.status() !== 200) {
          failed.push(`${res.status()} ${url}`)
        }
      }
    }
    expect(failed).toEqual([])
  })

  test('找不到的網址回 404', async ({ request }) => {
    expect((await request.get('/4th/councilor/NOTEXIST/')).status()).toBe(404)
  })
})

test.describe('SEO', () => {
  test('sitemap 每頁：網址結尾有斜線、title 不重複、有 description、canonical 指向自己、JSON-LD 格式正確、圖片有 alt', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
    const titles = new Map()
    const errors = []
    for (const url of urls) {
      const path = new URL(url).pathname
      if (!path.endsWith('/')) {
        errors.push(`sitemap 網址沒有結尾斜線：${path}`)
      }
      const html = await (await request.get(path)).text()
      const head = html.split('</head>')[0]
      const title = head.match(/<title>([^<]*)<\/title>/)?.[1]
      if (!title) {
        errors.push(`${path} 沒有 title`)
      } else if (titles.has(title)) {
        // 首頁和預設屆次首頁內容一樣，canonical 指向同一頁，title 相同沒關係
        if (path !== '/' && titles.get(title) !== '/') {
          errors.push(`${path} 和 ${titles.get(title)} 的 title 一樣：${title}`)
        }
      } else {
        titles.set(title, path)
      }
      if (!/<meta name="description" content="[^"]{20,}"/.test(head)) {
        errors.push(`${path} 沒有 description`)
      }
      const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
      if (path !== '/' && canonical !== url) {
        errors.push(`${path} 的 canonical 是 ${canonical}`)
      }
      for (const m of head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
        try {
          JSON.parse(m[1])
        } catch {
          errors.push(`${path} 的 JSON-LD 不是合法 JSON`)
        }
      }
      // 空的 alt 會輸出成沒有等號的 alt，也算有
      const noAlt = html.match(/<img(?![^>]*\salt[\s=>])[^>]*>/g)
      if (noAlt) {
        errors.push(`${path} 有 ${noAlt.length} 張圖沒有 alt`)
      }
    }
    expect(errors).toEqual([])
  })

  test('首頁是第四屆，canonical 指向 /4th/，議員頁有 Person 結構化資料', async ({ request }) => {
    const home = await (await request.get('/')).text()
    expect(home).toMatch(/<link rel="canonical" href="https:\/\/tcco\.tnsprout\.org\/4th\/"/)
    expect(home).toContain('<title>第四屆')
    const html = await (await request.get('/4th/councilor/053E553A/')).text()
    const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => [].concat(JSON.parse(m[1])))
    const person = ld.find(item => item['@type'] === 'Person')
    expect(person.name).toBe('蔡育輝')
    expect(ld.some(item => item['@type'] === 'BreadcrumbList')).toBe(true)
    expect(ld.some(item => item['@type'] === 'WebSite')).toBe(true)
  })

  test('robots.txt 有 sitemap', async ({ request }) => {
    expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://tcco.tnsprout.org/sitemap.xml')
  })
})

test.describe('頁面內容和資料一致', () => {
  for (const round of ROUNDS) {
    test(`${round} 每位議員頁：名字、質詢總數、最新一筆質詢`, async ({ request }) => {
      const errors = []
      for (const [id, person] of Object.entries(councilorMap(round))) {
        const text = pageText(await (await request.get(`/${round}/councilor/${id}/`)).text())
        if (!text.includes(person.name)) {
          errors.push(`${id} 沒有名字 ${person.name}`)
        }
        if (text.includes('待撰寫')) {
          errors.push(`${id} 公職經歷是「待撰寫」`)
        }
        const sayit = sayitOf(round, id)
        if (!sayit || !sayit.sayit.length) {
          continue
        }
        const total = sayit.stats.org.reduce((sum, org) => sum + org.count, 0)
        if (!text.includes(`所有局處 ${total.toLocaleString()}`)) {
          errors.push(`${id} 所有局處應為 ${total}`)
        }
        const newest = [...sayit.sayit].filter(s => s.relatedOrgs.length).sort((a, b) => b.date.localeCompare(a.date))[0]
        if (newest && !text.includes(newest.summary.replace(/\s+/g, ' ').trim())) {
          errors.push(`${id} 沒有最新質詢「${newest.summary}」`)
        }
      }
      expect(errors).toEqual([])
    })

    test(`${round} 每個選區頁：議員和最多的局處`, async ({ request }) => {
      const stats = readJson(`${round}/sayit/stats.json`)
      const errors = []
      for (const [districtId, district] of Object.entries(districtMap(round))) {
        const text = pageText(await (await request.get(`/${round}/district/${districtId}/`)).text())
        for (const c of district.councilors) {
          if (!text.includes(c.name)) {
            errors.push(`${districtId} 沒有議員 ${c.name}`)
          }
        }
        const top = stats[districtId]?.org[0]
        if (top && !text.includes(`${top.name} ${top.count.toLocaleString()}`)) {
          errors.push(`${districtId} 沒有「${top.name} ${top.count}」`)
        }
      }
      expect(errors).toEqual([])
    })
  }
})

test.describe('瀏覽器', () => {
  const PAGES = ['/', '/4th/', '/4th/district/', '/4th/district/7th/', '/4th/councilor/', '/4th/councilor/053E553A/',
    '/4th/interpellation/', '/3rd/', '/3rd/councilor/63ECF425/', '/3rd/interpellation/', '/article/', '/about/']
  for (const path of PAGES) {
    test(`${path} 沒有錯誤`, async ({ page }) => {
      const problems = watch(page)
      await page.goto(path, { waitUntil: 'networkidle' })
      await expect(page.locator('body')).not.toBeEmpty()
      expect(problems).toEqual([])
    })
  }

  test('站內點連結換頁（不重新載入）都正常', async ({ page }) => {
    const problems = watch(page)
    await page.goto('/4th/', { waitUntil: 'networkidle' })
    await page.evaluate(() => {
      window.__noReload = true
    })
    const steps = [
      ['找議員', /\/4th\/councilor\/?$/],
      ['看選區', /\/4th\/district\/?$/],
      ['搜質詢', /\/4th\/interpellation\/?/]
    ]
    for (const [name, url] of steps) {
      await page.locator('.nav__item:visible', { hasText: name }).first().click()
      await expect(page).toHaveURL(url)
      await page.waitForLoadState('networkidle')
    }
    // 從選區頁點進議員頁
    await page.goto('/4th/district/1st/', { waitUntil: 'networkidle' })
    await page.evaluate(() => {
      window.__noReload = true
    })
    await page.locator('a[href*="/4th/councilor/053E553A"]:visible').first().click()
    await expect(page).toHaveURL(/\/4th\/councilor\/053E553A/)
    await expect(page.getByRole('heading', { name: '蔡育輝' })).toBeVisible()
    expect(await page.evaluate(() => window.__noReload)).toBe(true)
    expect(problems).toEqual([])
  })

  test('議員頁：點局處篩選、捲到底載入更多', async ({ page }) => {
    const sayit = sayitOf('4th', '053E553A')
    const org = sayit.stats.org[0]
    const expected = sayit.sayit.filter(s => s.relatedOrgs.includes(org.name)).sort((a, b) => b.date.localeCompare(a.date))
    const problems = watch(page)
    await page.goto('/4th/councilor/053E553A/', { waitUntil: 'networkidle' })
    await page.locator('.stats__item', { hasText: org.name }).first().click()
    await expect(page).toHaveURL(new RegExp(`catValue=${encodeURIComponent(org.name)}`))
    const cards = page.locator('.intLanding__main .intCard')
    await expect(cards.first().locator('h2')).toHaveText(expected[0].summary)
    const before = await cards.count()
    expect(before).toBeGreaterThan(0)
    if (expected.length > before) {
      await cards.last().scrollIntoViewIfNeeded()
      await page.mouse.wheel(0, 5000)
      await expect.poll(() => cards.count()).toBeGreaterThan(before)
    }
    expect(await cards.count()).toBeLessThanOrEqual(expected.length)
    expect(problems).toEqual([])
  })

  test('選區頁：顯示所有局處', async ({ page }) => {
    const problems = watch(page)
    await page.goto('/4th/district/1st/', { waitUntil: 'networkidle' })
    // 手機版、桌機版各有一份，只看看得到的那份
    const list = page.locator('.districtSum__statsList:visible')
    await expect(list).not.toHaveClass(/districtSum__statsList--all/)
    await list.getByRole('button', { name: '顯示所有局處' }).click()
    await expect(list).toHaveClass(/districtSum__statsList--all/)
    expect(problems).toEqual([])
  })

  test('第四屆質詢卡片打開議事錄原文', async ({ page }) => {
    const problems = watch(page)
    // 本機有 tainan-council-data 時用本機的切片，還沒 push 也能測；沒有就連線上
    const localPdf = join(import.meta.dirname, '../../../tainan-council-data/interpellation/round')
    await page.route('https://tainansprout.github.io/tainan-council-data/interpellation/round/4th/**', (route) => {
      const file = join(localPdf, new URL(route.request().url()).pathname.split('/interpellation/round/')[1])
      return existsSync(file)
        ? route.fulfill({ body: readFileSync(file), contentType: 'application/pdf' })
        : route.continue()
    })
    await page.goto('/4th/councilor/053E553A/', { waitUntil: 'networkidle' })
    const card = page.locator('.intCard').first()
    await expect(card.locator('.intCard__round')).toContainText('第四屆')
    await card.click()
    await expect(page.locator('.pdfViewer canvas, .pdfViewer .page').first()).toBeVisible({ timeout: 60000 })
    expect(problems).toEqual([])
  })

  test('第三屆質詢卡片打開議事錄原文', async ({ page }) => {
    const problems = watch(page)
    await page.goto('/3rd/councilor/63ECF425/', { waitUntil: 'networkidle' })
    await page.locator('.intCard').first().click()
    await expect(page.locator('.intCard__round').first()).toContainText('第三屆')
    await expect(page.locator('.pdfViewer canvas, .pdfViewer .page').first()).toBeVisible({ timeout: 60000 })
    expect(problems).toEqual([])
  })

  test('頁尾切換屆次', async ({ page }) => {
    const problems = watch(page)
    await page.goto('/4th/', { waitUntil: 'networkidle' })
    await page.locator('.tcwFooter__item[href="/3rd"], .tcwFooter__item[href="/3rd/"]').first().click()
    await expect(page).toHaveURL(/\/3rd\/?$/)
    expect(problems).toEqual([])
  })
})

test('content/ 底下每份 sayit 都對得到議員', () => {
  for (const round of ROUNDS) {
    const map = councilorMap(round)
    const files = readdirSync(join(CONTENT, round, 'sayit')).filter(f => f !== 'stats.json')
    for (const file of files) {
      expect(map, `${round}/sayit/${file}`).toHaveProperty(file.replace('.json', ''))
    }
  }
})
