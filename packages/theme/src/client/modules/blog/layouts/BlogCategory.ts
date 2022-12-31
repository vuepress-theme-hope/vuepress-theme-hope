import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent } from "vue";
import { useRoute } from "vue-router";

import ArticleList from "@theme-hope/modules/blog/components/ArticleList";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import CategoryList from "@theme-hope/modules/blog/components/CategoryList";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel";
import TagList from "@theme-hope/modules/blog/components/TagList";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import {
  useCategoryMap,
  useTagMap,
} from "@theme-hope/modules/blog/composables/index";

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
              blogOptions.value.name
                ? h(DropTransition, { appear: true, delay: 0.24 }, () =>
                    h(ArticleList, { key: route.path, items: items.value })
                  )
                : null,
            ]),
            h(DropTransition, { delay: 0.16 }, () => h(InfoPanel)),
          ])
        )
      );
  },
});
