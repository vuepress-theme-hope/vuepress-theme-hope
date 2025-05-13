import type { Slot } from "@vuepress/helper/client";
import type { BlogPluginFrontmatter } from "@vuepress/plugin-blog/client";
import { useBlogType } from "@vuepress/plugin-blog/client";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { useFrontmatter, usePage } from "vuepress/client";

import ArticleList from "@theme-hope/components/blog/ArticleList";
import ArticleType from "@theme-hope/components/blog/ArticleType";
import InfoPanel from "@theme-hope/components/blog/InfoPanel";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useArticles } from "@theme-hope/composables/blog/useArticles";
import { useStars } from "@theme-hope/composables/blog/useStars";
import type {
  ArticleCoverSlotData,
  ArticleExcerptSlotData,
  ArticleInfoSlotData,
  ArticleTitleSlotData,
  BloggerInfoSlotData,
} from "@theme-hope/typings/slots";

import type { ArticleInfoData } from "../../../shared/index.js";

export default defineComponent({
  name: "TypePage",

  slots: Object as SlotsType<{
    default?: Slot;

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
  }>,

  setup(_props, { slots }) {
    const blogType = useBlogType<ArticleInfoData>();
    const frontmatter = useFrontmatter<BlogPluginFrontmatter>();
    const page = usePage();
    const articles = useArticles();
    const stars = useStars();

    const items = computed(() => {
      const blogConfig = frontmatter.value.blog;

      if (blogConfig?.type !== "type" || !blogConfig.key)
        return articles.value.items;

      return blogConfig.key === "star"
        ? stars.value.items
        : blogType.value.items;
    });

    return (): VNode =>
      h(
        "div",
        { class: "vp-page vp-blog" },
        h("div", { class: "blog-page-wrapper" }, [
          h(
            "main",
            { id: "main-content", class: "vp-blog-main" },
            slots.default?.() ?? [
              h(DropTransition, () => h(ArticleType)),
              slots.articlesBefore?.(),
              h(DropTransition, { appear: true, delay: 0.08 }, () =>
                h(ArticleList, { key: page.value.path, items: items.value }),
              ),
              slots.articlesAfter?.(),
            ],
          ),
          h(DropTransition, { appear: true, delay: 0.08 }, () =>
            h(InfoPanel, { key: "blog" }, slots),
          ),
        ]),
      );
  },
});
