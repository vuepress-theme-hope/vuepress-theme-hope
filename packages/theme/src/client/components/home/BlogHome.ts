import { defineComponent, h, VNode } from "vue";
import ArticleList from "../blog/ArticleList";
import BlogHero from "./BlogHero";
import BlogInfo from "../blog/BlogInfo";
import BlogProjectList from "./BlogProjectList";
import DropTransition from "../transitions/DropTransition.vue";
import MarkdownContent from "../MarkdownContent";
import { useArticles } from "../../composables";

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
