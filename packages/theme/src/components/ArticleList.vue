<template>
  <div id="article" class="article-wrapper">
    <ModuleTransition
      v-for="(article, index) in articles"
      :key="article.path"
      :delay="index * 0.04"
    >
      <ArticleItem :article="article" />
    </ModuleTransition>
    <!-- 分页 -->
    <Pagation v-model="currentPage" :per-page="articlePerPage" :total="articleList.length" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue, Watch } from 'vue-property-decorator';
import ArticleItem from '@theme/components/ArticleItem.vue';
import { ArticleMixin } from '@theme/util/articleMixin';
import ModuleTransition from '@theme/components/ModuleTransition.vue';
import { PageComputed } from 'vuepress-types';
import { Route } from 'vue-router';
import { deepAssign } from '@mr-hope/vuepress-shared-utils';
import { generatePagination } from '@theme/util/article';

@Component({ components: { ArticleItem, ModuleTransition } })
export default class ArticleList extends Mixins(ArticleMixin) {
  /** 当前页面 */
  private currentPage = 1;

  /** 文章列表 */
  private articleList: PageComputed[] = [];

  /** 博客配置 */
  private get blogConfig() {
    return this.$themeConfig.blog || {};
  }

  /** 文章分页 */
  private get $paginationArticles(): PageComputed[][] {
    return generatePagination(this.$articles);
  }

  /** 每页文章数 */
  private get articlePerPage() {
    return this.blogConfig.perPage || 10;
  }

  /** 当前页面的文章 */
  private get articles() {
    return this.articleList.slice(
      (this.currentPage - 1) * this.articlePerPage,
      this.currentPage * this.articlePerPage
    );
  }

  /** 更新文章列表 */
  private getArticleList() {
    try {
      // eslint-disable-next-line no-underscore-dangle
      return this.$pagination ? this.$pagination._matchedPages : this.$articles;
    } catch (err) {
      return this.$articles;
    }
  }

  private mounted() {
    this.articleList = this.getArticleList();
  }

  /** 在路径发生改变时更新文章列表 */
  @Watch('$route')
  private onRouteUpdate(to: Route, from: Route) {
    if (to.path !== from.path) {
      this.articleList = this.getArticleList();
      // 将页面重置为 1
      this.currentPage = 1;
    }
  }

  @Watch('currentPage')
  private onPageChange() {
    // 滚动到列表顶部
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
.article-wrapper
  margin-top - $navbarHeight - 0.5rem
  padding-top $navbarHeight + 0.5rem
</style>
