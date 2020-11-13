import { Component, Vue, Watch } from "vue-property-decorator";
import ArticleItem from "@theme/components/Blog/ArticleItem.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import Pagination from "@mr-hope/vuepress-plugin-components/src/Pagination.vue";
import { PageComputed } from "@mr-hope/vuepress-types";
import { Route } from "vue-router";
import {
  filterArticle,
  generatePagination,
  sortArticle,
} from "@theme/util/article";
import { BlogOptions } from "@theme/types";
import { getPathMatchedKeys } from "@theme/util/encrypt";

@Component({ components: { ArticleItem, MyTransition, Pagination } })
export default class ArticleList extends Vue {
  private currentPage = 1;

  private articleList: PageComputed[] = [];

  private get blogConfig(): BlogOptions {
    return this.$themeConfig.blog || {};
  }

  private get articlePerPage(): number {
    return this.blogConfig.perPage || 10;
  }

  private get filter(): ((page: PageComputed) => boolean) | undefined {
    const { path } = this.$route;

    return path.includes("/article")
      ? (page: PageComputed): boolean => page.frontmatter.layout !== "Slide"
      : path.includes("/encrypt")
      ? (page: PageComputed): boolean =>
          getPathMatchedKeys(this.$themeConfig.encrypt, page.path).length !==
            0 || Boolean(page.frontmatter.password)
      : path.includes("/slide")
      ? (page: PageComputed): boolean => page.frontmatter.layout === "Slide"
      : undefined;
  }

  private get $articles(): PageComputed[] {
    // filter then sort
    return sortArticle(filterArticle(this.$site.pages, this.filter));
  }

  /** Articles in this page */
  private get articles(): PageComputed[] {
    return this.articleList.slice(
      (this.currentPage - 1) * this.articlePerPage,
      this.currentPage * this.articlePerPage
    );
  }

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

  // update article list when route is changed
  @Watch("$route")
  private onRouteUpdate(to: Route, from: Route): void {
    if (to.path !== from.path) {
      this.articleList = this.getArticleList();
      // reset page to 1
      this.currentPage = 1;
    }
  }

  @Watch("currentPage")
  private onPageChange(): void {
    // list top border distance
    const distance =
      (document.querySelector("#article") as Element).getBoundingClientRect()
        .top + window.scrollY;

    setTimeout(() => {
      window.scrollTo(0, distance);
    }, 100);
  }
}
