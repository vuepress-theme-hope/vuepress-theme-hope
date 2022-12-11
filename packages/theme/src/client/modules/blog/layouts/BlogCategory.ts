import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent } from "vue";
import { useRoute } from "vue-router";

import ArticleList from "@theme-hope/modules/blog/components/ArticleList.js";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper.js";
import CategoryList from "@theme-hope/modules/blog/components/CategoryList.js";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel.js";
import TagList from "@theme-hope/modules/blog/components/TagList.js";
import DropTransition from "@theme-hope/components/transitions/DropTransition.js";
import {
  useCategoryMap,
  useTagMap,
} from "@theme-hope/modules/blog/composables/index.js";

import type { VNode } from "vue";
import type {
  BlogCategoryFrontmatterOptions,
  BlogPluginFrontmatter,
} from "vuepress-plugin-blog2";

import "../styles/page.scss";

export default defineComponent({
  name: "BlogPage",

  components: {
    CategoryList,
    TagList,
  },

  setup() {
    const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>();
    const route = useRoute();
    const categoryMap = useCategoryMap();
    const tagMap = useTagMap();
    const blogOptions = computed(
      () => (frontmatter.value.blog || {}) as BlogCategoryFrontmatterOptions
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
          { class: "page blog" },
          h("div", { class: "blog-page-wrapper" }, [
            h("main", { class: "blog-main", id: "main-content" }, [
              h(DropTransition, () =>
                componentName.value
                  ? h(resolveComponent(componentName.value))
                  : null
              ),
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
