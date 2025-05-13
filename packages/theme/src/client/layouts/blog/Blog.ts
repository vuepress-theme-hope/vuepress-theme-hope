import type { RequiredSlotContent, Slot } from "@vuepress/helper/client";
import type { BlogPluginFrontmatter } from "@vuepress/plugin-blog";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useFrontmatter } from "vuepress/client";

import BlogHome from "@theme-hope/components/blog/BlogHome";
import BlogMainLayout from "@theme-hope/components/blog/BlogMainLayout";
import CategoryPage from "@theme-hope/components/blog/CategoryPage";
import TimelinePage from "@theme-hope/components/blog/TimelinePage";
import TypePage from "@theme-hope/components/blog/TypePage";
import type {
  ArticleCoverSlotData,
  ArticleExcerptSlotData,
  ArticleInfoSlotData,
  ArticleTitleSlotData,
  BloggerInfoSlotData,
  HeroBackgroundSlotData,
  HeroInfoSlotData,
  HeroLogoSlotData,
  SidebarItemsSlotData,
} from "@theme-hope/typings/slots";

export default defineComponent({
  name: "Blog",

  slots: Object as SlotsType<{
    default?: Slot;

    navScreenTop?: Slot;
    navScreenBottom?: Slot;

    sidebarItems?: Slot<SidebarItemsSlotData>;
    sidebarTop?: Slot;
    sidebarBottom?: Slot;

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

    // home only
    heroInfo?: Slot<HeroInfoSlotData>;
    heroLogo?: Slot<HeroLogoSlotData>;
    heroBg?: Slot<HeroBackgroundSlotData>;
    heroBefore?: Slot;
    heroAfter?: Slot;
  }>,

  setup(_props, { slots }) {
    const frontmatter = useFrontmatter<BlogPluginFrontmatter>();

    return (): VNode => {
      const { type, key } = frontmatter.value.blog ?? {};

      return h(
        BlogMainLayout,
        {},
        {
          ...slots,
          default: (): RequiredSlotContent =>
            slots.default?.() ??
            (type === "category"
              ? h(CategoryPage, {}, slots)
              : type === "type"
                ? key === "timeline"
                  ? h(TimelinePage, {}, slots)
                  : h(TypePage, {}, slots)
                : h(BlogHome, {}, slots)),
        },
      );
    };
  },
});
