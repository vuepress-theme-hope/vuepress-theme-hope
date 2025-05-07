import type { Slot, SlotContent } from "@vuepress/helper/client";
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
  HeroImageSlotData,
  HeroInfoSlotData,
  SidebarItemsSlotData,
} from "@theme-hope/typings/slots";

export default defineComponent({
  name: "Blog",

  slots: Object as SlotsType<{
    default?: Slot;

    navScreenTop?: Slot;
    navScreenBottom?: Slot;

    sidebarItems?: (sidebarItems: SidebarItemsSlotData) => SlotContent;
    sidebarTop?: Slot;
    sidebarBottom?: Slot;

    // article
    articleCover?: (props: ArticleCoverSlotData) => SlotContent;
    articleTitle?: (props: ArticleTitleSlotData) => SlotContent;
    articleInfo?: (props: ArticleInfoSlotData) => SlotContent;
    articleExcerpt?: (props: ArticleExcerptSlotData) => SlotContent;

    // articles
    articlesBefore?: Slot;
    articlesAfter?: Slot;

    // info
    bloggerInfo?: (bloggerInfo: BloggerInfoSlotData) => SlotContent;
    infoBefore?: Slot;
    infoAfter?: Slot;

    // content
    content?: Slot;
    contentBefore?: Slot;
    contentAfter?: Slot;

    // home only
    heroInfo?: (props: HeroInfoSlotData) => SlotContent;
    heroLogo?: (props: HeroImageSlotData) => SlotContent;
    heroBg?: (props: HeroBackgroundSlotData) => SlotContent;
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
          default:
            slots.default ??
            ((): VNode =>
              type === "category"
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
