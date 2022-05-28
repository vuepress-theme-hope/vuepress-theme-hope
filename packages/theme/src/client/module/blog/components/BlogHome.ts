import { defineComponent, h, VNode } from "vue";

import ArticleList from "@theme-hope/module/blog/components/ArticleList";
import BlogHero from "@theme-hope/module/blog/components/BlogHero";
import InfoPanel from "@theme-hope/module/blog/components/InfoPanel";
import ProjectPanel from "@theme-hope/module/blog/components/ProjectPanel";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import MarkdownContent from "@theme-hope/components/MarkdownContent";

import { useArticles } from "@theme-hope/module/blog/composables";

import "../styles/home.scss";

export default defineComponent({
  name: "BlogHome",

  setup() {
    const articles = useArticles();

    return (): VNode =>
      h("div", { class: "page blog" }, [
        h(BlogHero),
        h("div", { class: "blog-page-wrapper" }, [
          h("main", { class: "blog-home", id: "main-content" }, [
            h(DropTransition, { appear: true, delay: 0.16 }, () =>
              h(ProjectPanel)
            ),
            h(DropTransition, { appear: true, delay: 0.24 }, () =>
              h(ArticleList, { items: articles.value.items })
            ),
          ]),
          h(DropTransition, { appear: true, delay: 0.16 }, () => h(InfoPanel)),
        ]),
        h(DropTransition, { appear: true, delay: 0.28 }, () =>
          h(MarkdownContent)
        ),
      ]);
  },
});
