import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent } from "vue";
import { useRoute } from "vue-router";

import ArticleList from "@theme-hope/module/blog/components/ArticleList";
import ArticleType from "@theme-hope/module/blog/components/ArticleType";
import CategoryList from "@theme-hope/module/blog/components/CategoryList";
import TagList from "@theme-hope/module/blog/components/TagList";
import TimelineItems from "@theme-hope/module/blog/components/TimelineItems";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import {
  useArticles,
  useCategoryMap,
  useEncryptedArticles,
  useSlides,
  useTagMap,
  useStars,
} from "@theme-hope/module/blog/composables";

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
        (frontmatter.value.blog as BlogCategoryFrontmatterOptions) || {};

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
      h("main", { class: "blog-page" }, [
        h(DropTransition, () =>
          componentName.value ? h(resolveComponent(componentName.value)) : null
        ),
        h(DropTransition, { appear: true, delay: 0.24 }, () =>
          frontmatter.value.blog?.key === "timeline"
            ? h(TimelineItems)
            : h(ArticleList, { key: route.path, items: items.value })
        ),
      ]);
  },
});
