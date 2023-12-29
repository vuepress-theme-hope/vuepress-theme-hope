import { usePageData, usePageFrontmatter } from "@vuepress/client";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import type {
  BlogCategoryFrontmatterOptions,
  BlogPluginFrontmatter,
} from "vuepress-plugin-blog2";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import ArticleList from "@theme-hope/modules/blog/components/ArticleList";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import CategoryList from "@theme-hope/modules/blog/components/CategoryList";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel";
import TagList from "@theme-hope/modules/blog/components/TagList";
import {
  useCategoryMap,
  useTagMap,
} from "@theme-hope/modules/blog/composables/index";

import "../styles/page.scss";

export default defineComponent({
  name: "BlogPage",

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>();
    const categoryMap = useCategoryMap();
    const tagMap = useTagMap();

    return (): VNode => {
      const { key = "", name = "" } =
        <BlogCategoryFrontmatterOptions>frontmatter.value.blog || {};

      const items = name
        ? key === "category"
          ? categoryMap.value.map[name].items
          : key === "tag"
            ? tagMap.value.map[name].items
            : []
        : [];

      return h(BlogWrapper, () =>
        h(
          "div",
          { class: "vp-page vp-blog" },
          h("div", { class: "blog-page-wrapper" }, [
            h("main", { id: "main-content", class: "vp-blog-main" }, [
              h(DropTransition, () =>
                key === "category"
                  ? h(CategoryList)
                  : key === "tag"
                    ? h(TagList)
                    : null,
              ),
              name
                ? h(DropTransition, { appear: true, delay: 0.24 }, () =>
                    h(ArticleList, {
                      key: page.value.path,
                      items,
                    }),
                  )
                : null,
            ]),
            h(DropTransition, { delay: 0.16 }, () =>
              h(InfoPanel, { key: "blog" }),
            ),
          ]),
        ),
      );
    };
  },
});
