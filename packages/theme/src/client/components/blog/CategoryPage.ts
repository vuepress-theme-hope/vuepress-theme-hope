import type { BlogPluginFrontmatter } from "@vuepress/plugin-blog";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { useFrontmatter, usePage } from "vuepress/client";

import type {
  ArticleCoverData,
  ArticleExcerptData,
  ArticleTitleData,
} from "@theme-hope/components/blog/ArticleItem";
import ArticleList from "@theme-hope/components/blog/ArticleList";
import CategoryList from "@theme-hope/components/blog/CategoryList";
import InfoPanel from "@theme-hope/components/blog/InfoPanel";
import TagList from "@theme-hope/components/blog/TagList";
import type { PageInfoProps } from "@theme-hope/components/info/PageInfo";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useCategoryMap } from "@theme-hope/composables/blog/useCategoryMap";
import { useTagMap } from "@theme-hope/composables/blog/useTagMap";

export default defineComponent({
  name: "CategoryPage",

  slots: Object as SlotsType<{
    default?: () => VNode[] | VNode | null;

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
  }>,

  setup(_props, { slots }) {
    const page = usePage();
    const frontmatter = useFrontmatter<BlogPluginFrontmatter>();
    const categoryMap = useCategoryMap();
    const tagMap = useTagMap();

    const blogData = computed(() => {
      const blogConfig = frontmatter.value.blog;

      if (blogConfig?.type !== "category") return null;

      const { name, key } = blogConfig;

      if (!name) return null;

      return key === "category"
        ? { component: CategoryList, items: categoryMap.value.map[name].items }
        : key === "tag"
          ? { component: TagList, item: tagMap.value.map[name].items }
          : null;
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
              h(DropTransition, { appear: true }, () =>
                blogData.value ? h(blogData.value.component) : null,
              ),
              slots.articlesBefore?.(),
              blogData.value?.items
                ? h(DropTransition, { appear: true, delay: 0.08 }, () =>
                    h(
                      ArticleList,
                      {
                        key: page.value.path,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        items: blogData.value!.items!,
                      },
                      slots,
                    ),
                  )
                : null,
              slots.articlesAfter?.(),
            ],
          ),
          h(DropTransition, { delay: 0.16 }, () =>
            h(InfoPanel, { key: "blog" }, slots),
          ),
        ]),
      );
  },
});
