/* eslint-disable @typescript-eslint/naming-convention */
import { ArticleMixin, StickyMixin } from "@theme/util/articleMixin";
import { Component, Mixins } from "vue-property-decorator";
import ArticleList from "@theme/components/Blog/ArticleList.vue";
import BlogHero from "@theme/components/Blog/BlogHero.vue";
import BlogInfo from "@BlogInfo";
import CategoryList from "@theme/components/Blog/CategoryList.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import PageFooter from "@theme/components/PageFooter.vue";
import ProjectList from "@theme/components/Blog/ProjectList.vue";
import TagList from "@theme/components/Blog/TagList.vue";
import Timeline from "@theme/components/Blog/Timeline.vue";
import TimelineList from "@theme/components/Blog/TimelineList.vue";
import { i18n, HopeLangI18nConfig } from "@mr-hope/vuepress-shared-utils";

@Component({
  components: {
    ArticleList,
    BlogHero,
    BlogInfo,
    CategoryList,
    MyTransition,
    PageFooter,
    ProjectList,
    TagList,
    Timeline,
    TimelineList,
  },
})
export default class BlogPage extends Mixins(ArticleMixin, StickyMixin) {
  private get articleListText(): string {
    return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
      .articleList;
  }

  private heroHeight(): number {
    return (document.querySelector(".blog-hero") as Element).clientHeight;
  }

  /** 是否显示文章 */
  private get displayArticles(): boolean {
    const { path } = this.$route;

    return !path.includes("/timeline");
  }

  /** 组件名称 */
  private get componentName(): string {
    const pathName = this.$route.path.split("/")[1];

    if (["category", "tag"].includes(pathName)) return `${pathName}List`;
    else if (pathName === "timeline") return pathName;

    return "";
  }
}
