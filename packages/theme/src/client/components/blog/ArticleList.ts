import type { Slot } from "@vuepress/helper/client";
import { isSupported, usePageview } from "@vuepress/plugin-comment/pageview";
import type { PropType, SlotsType, VNode } from "vue";
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vuepress/client";

import ArticleItem from "@theme-hope/components/blog/ArticleItem";
import Pagination from "@theme-hope/components/blog/Pagination";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useBlogLocaleData } from "@theme-hope/composables/blog/useBlogLocale";
import { useBlogOptions } from "@theme-hope/composables/blog/useBlogOptions";
import type {
  ArticleCoverSlotData,
  ArticleExcerptSlotData,
  ArticleInfoSlotData,
  ArticleTitleSlotData,
} from "@theme-hope/typings/slots";

import type { ArticleInfoData, PageInfoData } from "../../../shared/index.js";

import "../../styles/blog/article-list.scss";

export default defineComponent({
  name: "ArticleList",

  props: {
    /**
     * Articles
     *
     * 文章项目
     */
    items: {
      type: Array as PropType<
        { path: string; info: PageInfoData & ArticleInfoData }[]
      >,

      required: true,
    },
  },

  slots: Object as SlotsType<{
    articleCover?: Slot<ArticleCoverSlotData>;
    articleTitle?: Slot<ArticleTitleSlotData>;
    articleInfo?: Slot<ArticleInfoSlotData>;
    articleExcerpt?: Slot<ArticleExcerptSlotData>;
  }>,

  setup(props, { slots }) {
    const route = useRoute();
    const router = useRouter();
    const blogLocale = useBlogLocaleData();
    const blogOptions = useBlogOptions();
    const updatePageview = usePageview();

    const currentPage = ref(1);

    const articlePerPage = computed(
      () => blogOptions.value.articlePerPage ?? 10,
    );

    const currentArticles = computed(() =>
      props.items.slice(
        (currentPage.value - 1) * articlePerPage.value,
        currentPage.value * articlePerPage.value,
      ),
    );

    const updatePage = async (page: number): Promise<void> => {
      currentPage.value = page;

      const query = { ...route.query };

      const needUpdate = !(
        query.page === page.toString() || // Page equal as query
        // Page is 1 and query is empty
        (page === 1 && !query.page)
      );

      if (needUpdate) {
        if (page === 1) delete query.page;
        else query.page = page.toString();

        await router.push({ path: route.path, query });
      }

      if (isSupported) {
        await nextTick();
        updatePageview({ selector: ".vp-pageview" });
      }
    };

    onMounted(() => {
      const { page } = route.query;

      void updatePage(page ? Number(page) : 1);

      watch(currentPage, () => {
        // List top border distance
        const distance =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          document.querySelector("#article-list")!.getBoundingClientRect().top +
          window.scrollY;

        setTimeout(() => {
          window.scrollTo(0, distance);
        }, 100);
      });
    });

    return (): VNode =>
      h(
        "div",
        { id: "article-list", class: "vp-article-list", role: "feed" },
        currentArticles.value.length
          ? [
              ...currentArticles.value.map(({ info, path }, index) =>
                h(DropTransition, { appear: true, delay: index * 0.04 }, () =>
                  h(ArticleItem, { key: path, info, path }, slots),
                ),
              ),
              h(Pagination, {
                current: currentPage.value,
                perPage: articlePerPage.value,
                total: props.items.length,
                onUpdateCurrentPage: updatePage,
              }),
            ]
          : h("h2", { class: "vp-empty-hint" }, blogLocale.value.empty),
      );
  },
});
