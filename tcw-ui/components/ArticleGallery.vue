<template lang="pug">
  .articleGallery
    nuxt-link.articleGallery__category.bg-center.cover.relative.br1(
      v-for="category in categories"
      :key="category.slug"
      :to="categoryLink(category)"
      :style="categoryStyle(category)"
    )
      h3.articleGallery__title.flex.items-center.justify-center.f3.ls4.absolute.bottom-0
        | {{category.name}}

</template>
<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
      validator (val) {
        return Array.isArray(val) && val.every(item => item.slug && item.name && item.coverImage)
      }
    }
  },
  methods: {
    categoryLink (category) {
      return {
        name: 'article-category-category',
        params: {
          category: category.slug
        }
      }
    },
    categoryStyle (category) {
      return {
        backgroundImage: `url(${category.coverImage})`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.articleGallery {
  &__category {
    display: block;
    padding: 0 1.25rem 100%;
    + .articleGallery__category {
      margin-top: 1rem;
    }
  }

  &__title {
    height: 54%;
    margin-bottom: 2.25rem;
    background: #ffffffe6;
    left: 1.25rem;
    right: 1.25rem;
  }

  @include not-small-screen {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1rem;

    &__category {
      border: 2px solid transparent;

      + .articleGallery__category {
        margin-top: 0;
      }

      &:hover {
        border-color: $gray-d;
      }
    }
  }
}
</style>
