"""網站冒煙測試：用無頭瀏覽器開幾個主要頁面，截圖並列出 JavaScript 錯誤。

用法（先 npm run dev，需要 pip install playwright）：
    python3 tools/smoke_test.py http://localhost:3000 [chromium 執行檔路徑]
截圖存在目前目錄的 shot_*.png。另外開 /admin/index.html 確認 CMS 載得起來。
"""
import sys
from playwright.sync_api import sync_playwright
B = sys.argv[1]
with sync_playwright() as p:
    br = p.chromium.launch(**({'executable_path': sys.argv[2]} if len(sys.argv) > 2 else {}))
    pg = br.new_page(viewport={'width': 1280, 'height': 900})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
    for u in ['/4th', '/4th/district/1st', '/4th/councilor/053E553A', '/4th/interpellation', '/3rd/councilor/63ECF425']:
        errs.clear()
        pg.goto(B + u, wait_until='networkidle', timeout=120000)
        name = u.strip('/').replace('/', '_')
        pg.screenshot(path=f'shot_{name}.png')
        print(u, 'title:', pg.title(), '| errors:', errs[:3])
    errs.clear()
    pg.goto(B + '/admin/index.html', wait_until='networkidle', timeout=120000)
    print('/admin CMS:', pg.evaluate('typeof window.CMS'), '| errors:', errs[:3])
    br.close()
