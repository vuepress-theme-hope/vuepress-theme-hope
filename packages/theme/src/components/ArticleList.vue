<template>
  <div id="article" class="article-wrapper">
    <ModuleTransition
      v-for="(article, index) in articles"
      :key="article.path"
      :delay="String(index * 0.04)"
    >
      <ArticleItem :article="article" />
    </ModuleTransition>
    <!-- 分页 -->
    <Pagation v-model="currentPage" :total="articles.length" />
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Vue, Watch } from 'vue-property-decorator';
import ArticleItem from '@theme/components/ArticleItem.vue';
import ArticleMixin from '@theme/util/articleMixin';
import ModuleTransition from '@theme/components/ModuleTransition.vue';
import { PageComputed } from 'vuepress-types';

@Component({ components: { ArticleItem, ModuleTransition } })
export default class ArticleList extends Mixins(ArticleMixin) {
  /** 当前页面 */
  private currentPage = 1;

  /** 文章列表 */
  private articles: PageComputed[] = [];

  /** 更新文章列表 */
  private getArticleList() {
    try {
      return this.$pagination ? this.$pagination.pages : this.$articles;
    } catch (err) {
      return this.$articles;
    }
  }

  private mounted() {
    this.articles = this.getArticleList();
  }

  /** 在路径发生改变时更新文章列表 */
  @Watch('$route')
  private onRouteUpdate() {
    this.articles = this.getArticleList();
  }

  /** 在页面变化的时候滚动到列表顶部 */
  @Watch('currentPage')
  private onPageChange() {
    const distance =
      (document.querySelector('#article') as Element).getBoundingClientRect()
        .top + window.scrollY;

    setTimeout(() => {
      window.scrollTo(0, distance);
    }, 100);
  }
}
</script>
<style lang="stylus">
#article
  margin-top - $navbarHeight - 0.5rem
  padding-top $navbarHeight + 0.5rem
</style>
