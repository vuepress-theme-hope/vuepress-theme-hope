import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent } from "vue";
import { useRoute } from "vue-router";

import ArticleList from "@theme-hope/modules/blog/components/ArticleList.js";
import ArticleType from "@theme-hope/modules/blog/components/ArticleType.js";
import CategoryList from "@theme-hope/modules/blog/components/CategoryList.js";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel.js";
import TagList from "@theme-hope/modules/blog/components/TagList.js";
import TimelineItems from "@theme-hope/modules/blog/components/TimelineItems.js";
import DropTransition from "@theme-hope/components/transitions/DropTransition.js";
import {
  useArticles,
  useCategoryMap,
  useEncryptedArticles,
  useSlides,
  useTagMap,
  useStars,
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
    ArticleType,
    CategoryList,
    TagList,
  },

  setup() {
    const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>();
    const route = useRoute();
    const articles = useArticles();
    const categoryMap = useCategoryMap();
    const encryptedArticles = useEncryptedArticles();
    const slides = useSlides();
    const stars = useStars();
    const tagMap = useTagMap();

    const componentName = computed(() => {
      const { key } = frontmatter.value.blog || {};

      return key === "category"
        ? "CategoryList"
        : key === "tag"
        ? "TagList"
        : key === "timeline"
        ? ""
        : "ArticleType";
    });

    const items = computed(() => {
      const { name = "", key = "" } =
        <BlogCategoryFrontmatterOptions>frontmatter.value.blog || {};

      return key === "encrypted"
        ? encryptedArticles.value.items
        : key === "star"
        ? stars.value.items
        : key === "slide"
        ? slides.value.items
        : key === "timeline"
        ? []
        : key === "category"
        ? name
          ? categoryMap.value.map[name].items
          : []
        : key === "tag"
        ? name
          ? tagMap.value.map[name].items
          : []
        : articles.value.items;
    });

    return (): VNode =>
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
              frontmatter.value.blog?.key === "timeline"
                ? h(TimelineItems)
                : h(ArticleList, { key: route.path, items: items.value })
            ),
          ]),
          h(DropTransition, { delay: 0.16 }, () => h(InfoPanel)),
        ])
      );
  },
});
