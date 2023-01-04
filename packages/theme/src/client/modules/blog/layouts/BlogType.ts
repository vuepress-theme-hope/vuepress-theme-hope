import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { useBlogType } from "vuepress-plugin-blog2/client";
import { useRoute } from "vue-router";

import ArticleList from "@theme-hope/modules/blog/components/ArticleList";
import ArticleType from "@theme-hope/modules/blog/components/ArticleType";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import {
  useArticles,
  useStars,
} from "@theme-hope/modules/blog/composables/index";

import type { VNode } from "vue";
import type {
  BlogPluginFrontmatter,
  BlogTypeFrontmatterOptions,
} from "vuepress-plugin-blog2";
import type { ArticleInfo } from "../../../../shared/index.js";

import "../styles/page.scss";

export default defineComponent({
  name: "BlogPage",

  setup() {
    const blogType = useBlogType<ArticleInfo>();
    const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>();
    const route = useRoute();
    const articles = useArticles();
    const stars = useStars();

    const items = computed(() => {
      const { key = "", type } =
        <BlogTypeFrontmatterOptions>frontmatter.value.blog || {};

      return key === "star"
        ? stars.value.items
        : type === "type" && key
        ? blogType.value.items
        : articles.value.items;
    });

    return (): VNode =>
      h(BlogWrapper, () =>
        h(
          "div",
          { class: "page blog" },
          h("div", { class: "blog-page-wrapper" }, [
            h("main", { class: "blog-main", id: "main-content" }, [
              h(DropTransition, () => h(ArticleType)),
              h(DropTransition, { appear: true, delay: 0.24 }, () =>
                h(ArticleList, { key: route.path, items: items.value })
              ),
            ]),
            h(DropTransition, { delay: 0.16 }, () => h(InfoPanel)),
          ])
        )
      );
  },
});
