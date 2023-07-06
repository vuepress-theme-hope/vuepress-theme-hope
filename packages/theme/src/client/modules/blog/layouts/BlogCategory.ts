import { usePageData, usePageFrontmatter } from "@vuepress/client";
import type { VNode } from "vue";
import { computed, defineComponent, h, resolveComponent } from "vue";
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

  components: {
    CategoryList,
    TagList,
  },

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>();
    const categoryMap = useCategoryMap();
    const tagMap = useTagMap();
    const blogOptions = computed(
      () => (frontmatter.value.blog || {}) as BlogCategoryFrontmatterOptions,
    );

    const componentName = computed(() => {
      const { key = "" } = blogOptions.value;

      return key === "category"
        ? "CategoryList"
        : key === "tag"
        ? "TagList"
        : null;
    });

    const items = computed(() => {
      const { name = "", key = "" } = blogOptions.value;

      return key === "category"
        ? name
          ? categoryMap.value.map[name].items
          : []
        : key === "tag"
        ? name
          ? tagMap.value.map[name].items
          : []
        : [];
    });

    return (): VNode =>
      h(BlogWrapper, () =>
        h(
          "div",
          { class: "vp-page vp-blog" },
          h("div", { class: "blog-page-wrapper" }, [
            h("main", { id: "main-content", class: "vp-blog-main" }, [
              h(DropTransition, () =>
                componentName.value
                  ? h(resolveComponent(componentName.value))
                  : null,
              ),
              blogOptions.value.name
                ? h(DropTransition, { appear: true, delay: 0.24 }, () =>
                    h(ArticleList, {
                      key: page.value.path,
                      items: items.value,
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
  },
});
