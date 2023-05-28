import { type VNode, defineComponent, h } from "vue";

import MarkdownContent from "@theme-hope/components/MarkdownContent";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import ArticleList from "@theme-hope/modules/blog/components/ArticleList";
import BlogHero from "@theme-hope/modules/blog/components/BlogHero";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel";
import ProjectPanel from "@theme-hope/modules/blog/components/ProjectPanel";
import { useArticles } from "@theme-hope/modules/blog/composables/index";

import "../styles/home.scss";

export default defineComponent({
  name: "BlogHome",

  setup() {
    const articles = useArticles();

    return (): VNode =>
      h("div", { class: "vp-page vp-blog" }, [
        h(BlogHero),
        h("div", { class: "blog-page-wrapper" }, [
          h("main", { id: "main-content", class: "vp-blog-main" }, [
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
