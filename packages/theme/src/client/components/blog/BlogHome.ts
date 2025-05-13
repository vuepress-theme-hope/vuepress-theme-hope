import type { Slot } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { useFrontmatter } from "vuepress/client";

import MarkdownContent from "@theme-hope/components/base/MarkdownContent";
import ArticleList from "@theme-hope/components/blog/ArticleList";
import BlogHero from "@theme-hope/components/blog/BlogHero";
import InfoPanel from "@theme-hope/components/blog/InfoPanel";
import ProjectPanel from "@theme-hope/components/blog/ProjectPanel";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useArticles } from "@theme-hope/composables/blog/useArticles";
import type {
  ArticleCoverSlotData,
  ArticleExcerptSlotData,
  ArticleInfoSlotData,
  ArticleTitleSlotData,
  BloggerInfoSlotData,
  HeroBackgroundSlotData,
  HeroInfoSlotData,
  HeroLogoSlotData,
} from "@theme-hope/typings/slots";

import type { ThemeBlogHomePageFrontmatter } from "../../../shared/index.js";

import "../../styles/blog/blog-home.scss";

export default defineComponent({
  name: "BlogHome",

  slots: Object as SlotsType<{
    // hero
    heroInfo?: Slot<HeroInfoSlotData>;
    heroLogo?: Slot<HeroLogoSlotData>;
    heroBg?: Slot<HeroBackgroundSlotData>;

    // hero before & after
    heroBefore?: Slot;
    heroAfter?: Slot;

    // article
    articleCover?: Slot<ArticleCoverSlotData>;
    articleTitle?: Slot<ArticleTitleSlotData>;
    articleInfo?: Slot<ArticleInfoSlotData>;
    articleExcerpt?: Slot<ArticleExcerptSlotData>;

    // articles
    articlesBefore?: Slot;
    articlesAfter?: Slot;

    // info
    bloggerInfo?: Slot<BloggerInfoSlotData>;
    infoBefore?: Slot;
    infoAfter?: Slot;

    // content
    content?: Slot;
    contentBefore?: Slot;
    contentAfter?: Slot;
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
