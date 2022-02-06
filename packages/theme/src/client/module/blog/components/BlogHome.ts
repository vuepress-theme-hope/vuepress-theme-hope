import { defineComponent, h, VNode } from "vue";

import ArticleList from "@theme-hope/module/blog/components/ArticleList";
import BlogHero from "@theme-hope/module/blog/components/BlogHero";
import BlogInfo from "@theme-hope/module/blog/components/BlogInfo";
import BlogProjectList from "@theme-hope/module/blog/components/BlogProjectList";

import DropTransition from "@theme-hope/components/transitions/DropTransition.vue";
import MarkdownContent from "@theme-hope/components/MarkdownContent";

import { useArticles } from "@theme-hope/module/blog/composables";

export default defineComponent({
  name: "BlogHome",

  setup() {
    const articles = useArticles();

    return (): VNode =>
      h("div", { class: "page blog" }, [
        h(BlogHero),
        h("div", { class: "blog-page-wrapper" }, [
          h("main", { class: "blog-home" }, [
            h(DropTransition, { delay: 0.16 }, () => h(BlogProjectList)),
            h(DropTransition, { delay: 0.24 }, () =>
              h(ArticleList, { items: articles.value.items })
            ),
          ]),
          h(DropTransition, { delay: 0.16 }, () => h(BlogInfo)),
        ]),
        h(DropTransition, { delay: 0.28 }, () => h(MarkdownContent)),
      ]);
  },
});
