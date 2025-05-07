import type { HeaderItem } from "@vuepress/helper/client";
import type { BlogPluginFrontmatter } from "@vuepress/plugin-blog";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useFrontmatter } from "vuepress/client";

import type {
  ArticleCoverData,
  ArticleExcerptData,
  ArticleTitleData,
} from "@theme-hope/components/blog/ArticleItem";
import BlogHome from "@theme-hope/components/blog/BlogHome";
import BlogMainLayout from "@theme-hope/components/blog/BlogMainLayout";
import CategoryPage from "@theme-hope/components/blog/CategoryPage";
import TimelinePage from "@theme-hope/components/blog/TimelinePage";
import TypePage from "@theme-hope/components/blog/TypePage";
import type {
  HeroBackgroundData,
  HeroImageData,
  HeroInfoData,
} from "@theme-hope/components/home/HeroInfo";
import type { PageInfoProps } from "@theme-hope/components/info/PageInfo";
import type { SidebarItem } from "@theme-hope/utils/sidebar/typings";

export default defineComponent({
  name: "Blog",

  slots: Object as SlotsType<{
    default?: () => VNode | VNode[] | null;

    navScreenTop?: () => VNode | VNode[] | null;
    navScreenBottom?: () => VNode | VNode[] | null;

    sidebarItems?: (sidebarItems: SidebarItem[]) => VNode | VNode[] | null;
    sidebarTop?: () => VNode | VNode[] | null;
    sidebarBottom?: () => VNode | VNode[] | null;

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

    // toc
    toc?: (headers: HeaderItem[]) => VNode[] | VNode | null;
    tocBefore?: () => VNode[] | VNode | null;
    tocAfter?: () => VNode[] | VNode | null;

    // home only
    heroInfo?: (props: HeroInfoData) => VNode[] | VNode | null;
    heroLogo?: (props: HeroImageData) => VNode[] | VNode | null;
    heroBg?: (props: HeroBackgroundData) => VNode[] | VNode | null;
    heroBefore?: () => VNode[] | VNode | null;
    heroAfter?: () => VNode[] | VNode | null;
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
