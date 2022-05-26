<template lang="pug">
  .articleList.mw8.center
    page-title 讀分析
    .articleList__desp
      p(v-for="paragraph in desp") {{paragraph}}
    .articleList__main
      .categoryList
        button.categoryList__item(
          v-for="category in categories"
          :key="category.name"
          @click="switchCategory(category)"
        )
          | {{category.name}}
        button.categoryList__item(
          @click="showAllArticle"
        )
          | 所有分析
      .articleList__list
        .pv2.bb(v-for="article in visibleArticles" :key="article.slug") {{article.title}} / {{article.slug}}
</template>
<script>
export default {
  async asyncData ({ $content, params, redirect }) {
    const misc = await $content('meta/misc').fetch()

    const articles = await $content('article')
      .only(['createdAt', 'title', 'slug', 'category', 'summary'])
      .sortBy('createdAt', 'desc')
      .fetch()

    const categories = await $content('setting')
      .where({ type: 'articleCategory' })
      .fetch()

    categories.sort((a, b) => a.order - b.order)

    return {
      desp: misc['article-desp'].split('\n'),
      articles,
      categories
    }
  },
  computed: {
    visibleArticles () {
      if (this.activeCategory) {
        return this.articles.filter(article => article.category === this.activeCategory.name)
      }
      return this.articles
    },
    activeCategory () {
      const slug = this.$route.params.category
      return this.categories.find(cat => cat.slug === slug)
    }
  },
  methods: {
    isCategoryActive (category) {
      if (!this.activeCategory) {
        return false
      }
      return category.name === this.activeCategory.name
    },
    switchCategory (category) {
      this.$router.push({
        name: 'article-category-category',
        params: {
          category: category.slug
        }
      })
    },
    showAllArticle () {
      this.$router.push({ name: 'article' })
    }
  }
}
</script>
<style lang="scss" scoped>
.articleList {}
</style>
