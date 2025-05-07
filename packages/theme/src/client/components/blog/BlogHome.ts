import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { useFrontmatter } from "vuepress/client";

import MarkdownContent from "@theme-hope/components/base/MarkdownContent";
import type {
  ArticleCoverData,
  ArticleExcerptData,
  ArticleTitleData,
} from "@theme-hope/components/blog/ArticleItem";
import ArticleList from "@theme-hope/components/blog/ArticleList";
import BlogHero from "@theme-hope/components/blog/BlogHero";
import InfoPanel from "@theme-hope/components/blog/InfoPanel";
import ProjectPanel from "@theme-hope/components/blog/ProjectPanel";
import type {
  HeroBackgroundData,
  HeroImageData,
  HeroInfoData,
} from "@theme-hope/components/home/HeroInfo";
import type { PageInfoProps } from "@theme-hope/components/info/PageInfo";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useArticles } from "@theme-hope/composables/blog/useArticles";

import type { ThemeBlogHomePageFrontmatter } from "../../../shared/index.js";

import "../../styles/blog/blog-home.scss";

export default defineComponent({
  name: "BlogHome",

  slots: Object as SlotsType<{
    // hero
    heroInfo?: (props: HeroInfoData) => VNode[] | VNode | null;
    heroLogo?: (props: HeroImageData) => VNode[] | VNode | null;
    heroBg?: (props: HeroBackgroundData) => VNode[] | VNode | null;

    // hero before & after
    heroBefore?: () => VNode[] | VNode | null;
    heroAfter?: () => VNode[] | VNode | null;

    // article
    articleCover?: (props: ArticleCoverData) => VNode[] | VNode | null;
    articleTitle?: (props: ArticleTitleData) => VNode[] | VNode | null;
    articleInfo?: (props: PageInfoProps) => VNode[] | VNode | null;
    articleExcerpt?: (props: ArticleExcerptData) => VNode[] | VNode | null;

    // articles
    articlesBefore?: () => VNode[] | VNode | null;
    articlesAfter?: () => VNode[] | VNode | null;

    // info
    infoBefore?: () => VNode[] | VNode | null;
    infoAfter?: () => VNode[] | VNode | null;

    // content
    content?: () => VNode[] | VNode | null;
    contentBefore?: () => VNode[] | VNode | null;
    contentAfter?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const articles = useArticles();
    const frontmatter = useFrontmatter<ThemeBlogHomePageFrontmatter>();

    const projects = computed(() => frontmatter.value.projects ?? []);

    return (): VNode =>
      h("div", { class: "vp-page vp-blog-home" }, [
        slots.heroBefore?.(),
        h(BlogHero, {}, slots),
        slots.heroAfter?.(),
        h("div", { class: "blog-page-wrapper" }, [
          h("main", { id: "main-content", class: "vp-blog-main" }, [
            slots.articlesBefore?.() ??
              (projects.value.length
                ? h(DropTransition, { appear: true, delay: 0.16 }, () =>
                    h(ProjectPanel, { items: projects.value }),
                  )
                : null),
            h(DropTransition, { appear: true, delay: 0.24 }, () =>
              h(ArticleList, { items: articles.value.items }, slots),
            ),
            slots.articlesAfter?.(),
          ]),
          h(DropTransition, { appear: true, delay: 0.16 }, () =>
            h(InfoPanel, { key: "blog" }, slots),
          ),
        ]),
        slots.content?.() ??
          h(DropTransition, { appear: true, delay: 0.28 }, () =>
            h(MarkdownContent, {}, slots),
          ),
      ]);
  },
});
