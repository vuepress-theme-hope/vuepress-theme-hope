import type { BlogPluginFrontmatter } from "@vuepress/plugin-blog/client";
import { useBlogType } from "@vuepress/plugin-blog/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { usePageData, usePageFrontmatter } from "vuepress/client";

import { DropTransition } from "@theme-hope/components/transitions/index";
import ArticleList from "@theme-hope/modules/blog/components/ArticleList";
import ArticleType from "@theme-hope/modules/blog/components/ArticleType";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel";
import {
  useArticles,
  useStars,
} from "@theme-hope/modules/blog/composables/index";

import type { ArticleInfoData } from "../../../../shared/index.js";

import "../styles/page.scss";

export default defineComponent({
  name: "BlogType",

  setup() {
    const blogType = useBlogType<ArticleInfoData>();
    const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>();
    const page = usePageData();
    const articles = useArticles();
    const stars = useStars();

    const items = computed(() => {
      const blogOptions = frontmatter.value.blog;

      if (blogOptions?.type !== "type" || !blogOptions.key)
        return articles.value.items;

      return blogOptions.key === "star"
        ? stars.value.items
        : blogType.value.items;
    });

    return (): VNode =>
      h(BlogWrapper, () =>
        h(
          "div",
          { class: "vp-page vp-blog" },
          h("div", { class: "blog-page-wrapper" }, [
            h("main", { id: "main-content", class: "vp-blog-main" }, [
              h(DropTransition, () => h(ArticleType)),
              h(DropTransition, { appear: true, delay: 0.24 }, () =>
                h(ArticleList, { key: page.value.path, items: items.value }),
              ),
            ]),
            h(DropTransition, { delay: 0.16 }, () =>
              h(InfoPanel, { key: "blog" }),
            ),
          ]),
        ),
      );
  },
});
