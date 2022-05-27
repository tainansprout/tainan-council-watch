<template lang="pug">
  .articleList.pageContainer
    page-title 讀分析
    .articleList__desp.ls-1
      p(v-for="paragraph in desp") {{paragraph}}
    .articleList__main.relative.flex-l
      long-menu.articleList__catList.flex-none
        button.categoryList__item(
          @click="showAllArticle"
          :class="{'categoryList__item--active': !activeCategory}"
        )
          | 所有分析
        button.categoryList__item.nowrap(
          v-for="category in categories"
          :key="category.name"
          :class="{'categoryList__item--active': isCategoryActive(category)}"
          @click="switchCategory(category)"
        )
          | {{category.name}}
      .articleList__list.flex-auto
        article-card(
          v-for="article in visibleArticles"
          :key="article.slug"
          :article="article"
        )
</template>
<script>
import { friendlyHeader } from '~/libs/crawlerFriendly'
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
  head: friendlyHeader({
    title () {
      if (this.activeCategory) {
        return this.activeCategory.name
      }
      return '讀分析'
    },
    description () {
      return this.desp.join('')
    }
  }),
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
.articleList {
  .pTitle {
    margin: 1.75rem 0 1.5rem;
  }
  &__desp {
    margin: 1.5rem 0 3.5rem;
  }
  &__catList {
    margin: 3.5rem 0 1.875rem;
  }

  @include large-screen {
    .pTitle {
      margin: 3.5rem 0 2.25rem;
    }
    &__desp {
      margin: 2.25rem 0 7.5rem;
      line-height: 1.5;
    }
    &__catList {
      margin: 0 7rem 0 0;
    }
  }
}

.categoryList {
  &__item {
    flex-shrink: 0;
    font-size: 1.25rem;
    letter-spacing: 1.66px;
    padding: 0 0 1rem 0;
    height: 2.5rem;
    background: none;
    text-align: left;
    border: none;
    border-bottom: 2px solid $gray-9;
    margin-right: 0.75rem;
    box-sizing: border-box;
    cursor: pointer;
    &--active {
      color: $blue;
    }
  }

  @include large-screen {
    &__item {
      font-size: 1.75rem;
      letter-spacing: 2.33px;
      border-width: 1px;
      padding: 0 2rem 1.5rem 0;
      margin: 0;
      height: auto;
      + .categoryList__item {
        margin-top: 2.5rem;
      }
    }
  }
}
</style>
