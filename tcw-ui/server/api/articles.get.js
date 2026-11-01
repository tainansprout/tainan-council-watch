// 讀分析列表
export default defineEventHandler(() => {
  const misc = readJson('meta/misc.json')
  return {
    desp: misc['article-desp'].split('\n'),
    articles: articles().map(({ createdAt, title, slug, category, summary }) => ({ createdAt, title, slug, category, summary })),
    categories: articleCategories()
  }
})
