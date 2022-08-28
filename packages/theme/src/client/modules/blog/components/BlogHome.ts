import { defineComponent, h, VNode } from "vue";

import ArticleList from "@theme-hope/modules/blog/components/ArticleList.js";
import BlogHero from "@theme-hope/modules/blog/components/BlogHero.js";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel.js";
import ProjectPanel from "@theme-hope/modules/blog/components/ProjectPanel.js";

import DropTransition from "@theme-hope/components/transitions/DropTransition.js";
import MarkdownContent from "@theme-hope/components/MarkdownContent.js";

import { useArticles } from "@theme-hope/modules/blog/composables/index.js";

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
