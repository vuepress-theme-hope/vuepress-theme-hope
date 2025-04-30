import type { BlogPluginFrontmatter } from "@vuepress/plugin-blog";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { useFrontmatter, usePage } from "vuepress/client";

import { DropTransition } from "@theme-hope/components/transitions/index";
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
  name: "BlogCategory",

  setup() {
    const page = usePage();
    const frontmatter = useFrontmatter<BlogPluginFrontmatter>();
    const categoryMap = useCategoryMap();
    const tagMap = useTagMap();

    const blogConfig = computed(() => frontmatter.value.blog);

    const items = computed(() => {
      if (blogConfig.value?.type !== "category") return null;

      const { name, key } = blogConfig.value;

      if (!name) return null;

      return key === "category"
        ? categoryMap.value.map[name].items
        : key === "tag"
          ? tagMap.value.map[name].items
          : null;
    });

    return (): VNode => {
      return h(BlogWrapper, () =>
        h(
          "div",
          { class: "vp-page vp-blog" },
          h("div", { class: "blog-page-wrapper" }, [
            h("main", { id: "main-content", class: "vp-blog-main" }, [
              h(DropTransition, () =>
                blogConfig.value?.key === "category"
                  ? h(CategoryList)
                  : blogConfig.value?.key === "tag"
                    ? h(TagList)
                    : null,
              ),
              items.value
                ? h(DropTransition, { appear: true, delay: 0.24 }, () =>
                    h(ArticleList, {
                      key: page.value.path,
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      items: items.value!,
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
