// 首頁：選區地圖，以及每個文章分類最新一篇的封面
export default defineEventHandler((event) => {
  const { round } = getRouterParams(event)
  const consMap = readCouncil(round, 'district-map')
  const allArticles = articles()
  const categories = articleCategories()
    .map((category) => {
      const article = allArticles.find(article => article.category === category.slug)
      return { ...category, coverImage: article && article.coverImage }
    })
    .filter(category => category.coverImage)
  return { consMap, articleCategories: categories }
})
