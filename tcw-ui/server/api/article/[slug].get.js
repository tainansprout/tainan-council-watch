export default defineEventHandler((event) => {
  const { slug } = getRouterParams(event)
  const article = articles().find(article => article.slug.toLowerCase() === decodeURIComponent(slug).toLowerCase())
  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }
  return article
})
