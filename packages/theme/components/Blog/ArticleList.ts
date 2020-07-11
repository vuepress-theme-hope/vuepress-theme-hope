import { Component, Mixins, Watch } from "vue-property-decorator";
import ArticleItem from "@theme/components/Blog/ArticleItem.vue";
import { ArticleMixin } from "@theme/util/articleMixin";
import MyTransition from "@theme/components/MyTransition.vue";
import Pagination from "@mr-hope/vuepress-plugin-components/src/Pagination.vue";
import { PageComputed } from "@mr-hope/vuepress-types";
import { Route } from "vue-router";
import { generatePagination } from "@theme/util/article";
import { BlogOptions } from "@theme/types";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { ArticleItem, MyTransition, Pagination } })
export default class ArticleList extends Mixins(ArticleMixin) {
  /** 当前页面 */
  private currentPage = 1;

  /** 文章列表 */
  private articleList: PageComputed[] = [];

  /** 博客配置 */
  private get blogConfig(): BlogOptions {
    return this.$themeConfig.blog || {};
  }

  /** 文章分页 */
  private get $paginationArticles(): PageComputed[][] {
    return generatePagination(this.$articles);
  }

  /** 每页文章数 */
  private get articlePerPage(): number {
    return this.blogConfig.perPage || 10;
  }

  /** 当前页面的文章 */
  private get articles(): PageComputed[] {
    return this.articleList.slice(
      (this.currentPage - 1) * this.articlePerPage,
      this.currentPage * this.articlePerPage
    );
  }

  /** 更新文章列表 */
  private getArticleList(): PageComputed[] {
    try {
      return this.$pagination
        ? (this.$pagination._matchedPages as PageComputed[])
        : this.$articles;
    } catch (err) {
      return this.$articles;
    }
  }

  private mounted(): void {
    this.articleList = this.getArticleList();
  }

  /** 在路径发生改变时更新文章列表 */
  @Watch("$route")
  private onRouteUpdate(to: Route, from: Route): void {
    if (to.path !== from.path) {
      this.articleList = this.getArticleList();
      // 将页面重置为 1
      this.currentPage = 1;
    }
  }

  @Watch("currentPage")
  private onPageChange(): void {
    // 滚动到列表顶部
    const distance =
      (document.querySelector("#article") as Element).getBoundingClientRect()
        .top + window.scrollY;

    setTimeout(() => {
      window.scrollTo(0, distance);
    }, 100);
  }
}
