import {
  computed,
  defineComponent,
  h,
  ref,
  resolveComponent,
  watch,
} from "vue";

import ArticleItem from "@theme-hope/module/blog/components/ArticleItem";
import DropTransition from "@theme-hope/components/transitions/DropTransition.vue";
import EmptyIcon from "@theme-hope/module/blog/components/icons/EmptyIcon.vue";
import { useBlogOptions } from "@theme-hope/module/blog/composables";

import type { PropType, VNode } from "vue";
import type { ArticleInfo } from "../../../../shared";

import "../styles/article-list.scss";

export default defineComponent({
  name: "ArticleList",

  props: {
    items: {
      type: Array as PropType<{ path: string; info: ArticleInfo }[]>,
      default: () => [],
    },
  },

  setup(props) {
    const blogOptions = useBlogOptions();

    const currentPage = ref(1);

    const articlePerPage = computed(() => blogOptions.value.articlePerPage);

    const currentArticles = computed(() =>
      props.items.slice(
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
              ...currentArticles.value.map(({ info, path }, index) =>
                h(DropTransition, { delay: index * 0.04 }, () =>
                  h(ArticleItem, { info, path })
                )
              ),
              h(resolveComponent("Pagination"), {
                currentPage: currentPage.value,
                perPage: articlePerPage.value,
                total: props.items.length,
                onUpdateCurrentPage: (value: number) => {
                  currentPage.value = value;
                },
              }),
            ]
          : h(EmptyIcon)
      );
  },
});
