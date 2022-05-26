<template lang="pug">
  nuxt-link.articleCard(:to="{name: 'article-article', params: { article: article.slug }}")
    h2.truncate.ws-normal-ns.f5.f3-ns.fw5.ls1.mv0 {{article.title}}{{article.title}}{{article.title}}{{article.title}}
    p.ls1 {{article.summary}}
    .flex.justify-between
      tcw-date.f6(:date="article.createdAt")
      .db.dn-ns.mr2.pr1
        tcw-icon(icon="chevron-right-gray" size="small")
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.articleCard {
  display: block;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid $gray-9;
  h2 {
    color: $black-1;
  }

  p {
    margin: 0.75rem 0;
  }

  &:hover {
    h2 {
      color: $blue;
      text-decoration: underline;
      text-decoration-color: $blue;
    }
  }

  @include not-small-screen {
    margin-bottom: 3.5rem;
    padding-bottom: 3.5rem;

    p {
      margin: 1.5rem 0;
      line-height: 1.75;
    }
  }
}
</style>
