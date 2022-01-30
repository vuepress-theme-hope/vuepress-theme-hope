import { useRouteLocale } from "@vuepress/client";
import {
  computed,
  defineComponent,
  h,
  ref,
  resolveComponent,
  watch,
} from "vue";
import ArticleItem from "./ArticleItem";
import DropTransition from "../transitions/DropTransition.vue";
import EmptyIcon from "../icons/EmptyIcon.vue";
import { useArticles, useBlogOptions } from "../../composables";
import { sortArticles } from "../../utils";

import type { PropType, VNode } from "vue";
import type { ArticleDetail } from "../../../shared";

import "../../styles/blog/article-list.scss";

// filter(): ((page: PageComputed) => boolean) | undefined {
//   const { path } = this.$route;

//   return path.includes("/article")
//     ? (page: PageComputed): boolean => page.frontmatter.layout !== "Slide"
//     : path.includes("/star")
//     ? (page: PageComputed): boolean =>
//         Boolean(page.frontmatter.star || page.frontmatter.sticky)
//     : path.includes("/encrypt")
//     ? (page: PageComputed): boolean =>
//         getPathMatchedKeys(this.$themeConfig.encrypt, page.path).length !==
//           0 || Boolean(page.frontmatter.password)
//     : path.includes("/slide")
//     ? (page: PageComputed): boolean => page.frontmatter.layout === "Slide"
//     : undefined;
// },

export default defineComponent({
  name: "ArticleList",

  props: {
    filter: {
      type: Function as PropType<(article: ArticleDetail) => boolean>,
      required: true,
    },
  },

  setup(props) {
    const currentPage = ref(1);
    const article = useArticles();
    const routeLcoale = useRouteLocale();

    const options = useBlogOptions();

    const articlePerPage = computed(() => options.value.articlePerPage);

    const articleList = computed(() => {
      return sortArticles(article[routeLcoale.value].filter(props.filter));
    });

    const currentArticles = computed(() =>
      articleList.value.slice(
        (currentPage.value - 1) * articlePerPage.value,
        currentPage.value * articlePerPage.value
      )
    );

    watch(currentPage, () => {
      // list top border distance
      const distance =
        (
          document.querySelector("#article-list") as Element
        ).getBoundingClientRect().top + window.scrollY;

      setTimeout(() => {
        window.scrollTo(0, distance);
      }, 100);
    });

    return (): VNode =>
      h(
        "div",
        { id: "article-list", class: "article-wrapper" },
        currentArticles.value.length
          ? [
              ...currentArticles.value.map((article, index) =>
                h(DropTransition, { delay: index * 0.04 }, () =>
                  h(ArticleItem, { article })
                )
              ),
              h(resolveComponent("Pagination"), {
                currentPage: currentPage.value,
                perPage: articlePerPage.value,
                total: articleList.value.length,
                updateCurrentPage: (value: number) => {
                  currentPage.value = value;
                },
              }),
            ]
          : h(EmptyIcon)
      );
  },
});
