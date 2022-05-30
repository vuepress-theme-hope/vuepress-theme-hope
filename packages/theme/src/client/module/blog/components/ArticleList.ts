import { computed, defineComponent, h, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import ArticleItem from "@theme-hope/module/blog/components/ArticleItem";
import Pagination from "@theme-hope/module/blog/components/Pagination";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { EmptyIcon } from "@theme-hope/module/blog/components/icons";
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
    const route = useRoute();
    const router = useRouter();

    const blogOptions = useBlogOptions();

    const currentPage = ref(1);

    const articlePerPage = computed(
      () => blogOptions.value.articlePerPage || 10
    );

    const currentArticles = computed(() =>
      props.items.slice(
        (currentPage.value - 1) * articlePerPage.value,
        currentPage.value * articlePerPage.value
      )
    );

    const updatePage = (page: number): void => {
      currentPage.value = page;

      const query = { ...route.query };

      if (query["page"] === page.toString() || (page === 1 && !query["page"]))
        return;
      if (page === 1) delete query["page"];
      else query["page"] = page.toString();

      void router.push({ path: route.path, query });
    };

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

    onMounted(() => {
      const { page } = route.query;

      updatePage(page ? Number(page) : 1);
    });

    return (): VNode =>
      h(
        "div",
        { id: "article-list", class: "article-wrapper" },
        currentArticles.value.length
          ? [
              ...currentArticles.value.map(({ info, path }, index) =>
                h(DropTransition, { appear: true, delay: index * 0.04 }, () =>
                  h(ArticleItem, { key: path, info, path })
                )
              ),
              h(Pagination, {
                currentPage: currentPage.value,
                perPage: articlePerPage.value,
                total: props.items.length,
                onUpdateCurrentPage: updatePage,
              }),
            ]
          : h(EmptyIcon)
      );
  },
});
