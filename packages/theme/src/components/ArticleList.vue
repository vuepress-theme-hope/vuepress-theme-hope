<template>
  <div class="article-wrapper">
    <ArticleItem v-for="article in articleList" :key="article.path" :article="article" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ArticleItem from '@theme/components/ArticleItem.vue';
import { PageComputed } from 'vuepress-types';

@Component({ components: { ArticleItem } })
export default class ArticleList extends Vue {
  @Prop({ type: Array, default: () => [] })
  private readonly articles!: PageComputed[];

  private get articleList() {
    return this.articles.length === 0
      ? this.$pagination
        ? this.$pagination.pages
        : []
      : this.articles;
  }
}
</script>
