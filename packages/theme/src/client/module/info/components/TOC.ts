import { isActiveLink } from "@mr-hope/vuepress-shared/lib/client";
import { usePageData } from "@vuepress/client";
import { defineComponent, h, onMounted, watch, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { useMetaLocale } from "@theme-hope/module/info/composables";

import type { PageHeader } from "@vuepress/shared";
import type { PropType, VNode } from "vue";

import "../styles/toc.scss";

const renderHeader = ({ title, level, slug }: PageHeader): VNode =>
  h(
    RouterLink,
    {
      to: `#${slug}`,
      class: ["toc-link", `level${level}`],
    },
    () => title
  );

const renderChildren = (
  headers: PageHeader[],
  headerDepth: number
): VNode | null => {
  const route = useRoute();

  return headers.length && headerDepth > 0
    ? h(
        "ul",
        { class: "toc-list" },
        headers.map((header: PageHeader) => [
          h(
            "li",
            {
              class: [
                "toc-item",
                { active: isActiveLink(route, `#${header.slug}`) },
              ],
            },
            [renderHeader(header)]
          ),
          renderChildren(header.children, headerDepth - 1),
        ])
      )
    : null;
};

export default defineComponent({
  name: "TOC",

  props: {
    items: {
      type: Array as PropType<PageHeader[]>,
      default: () => [],
    },

    headerDepth: {
      type: Number,
      default: 2,
    },
  },

  setup(props) {
    const route = useRoute();
    const page = usePageData();
    const metaLocale = useMetaLocale();
    const toc = ref<HTMLElement | null>(null);

    onMounted(() => {
      // scroll to active toc item
      watch(
        () => route.hash,
        (hash): void => {
          // get the active toc item DOM, whose href equals to the current route
          const activeTocItem = document.querySelector(
            `#toc-list a.toc-link[href="${route.path}${hash}"]`
          );

          if (!activeTocItem) return;

          // get the top and height of the toc
          const { top: tocTop, height: tocHeight } =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            toc.value!.getBoundingClientRect();
          // get the top and height of the active toc item
          const { top: activeTocItemTop, height: activeTocItemHeight } =
            activeTocItem.getBoundingClientRect();

          // when the active toc item overflows the top edge of toc
          if (activeTocItemTop < tocTop)
            // scroll to the top edge of toc
            activeTocItem.scrollIntoView(true);
          // when the active toc item overflows the bottom edge of toc
          else if (activeTocItemTop + activeTocItemHeight > tocTop + tocHeight)
            // scroll to the bottom edge of toc
            activeTocItem.scrollIntoView(false);
        }
      );
    });

    return (): VNode => {
      const tocHeaders = props.items.length
        ? renderChildren(props.items, props.headerDepth)
        : page.value.headers
        ? renderChildren(page.value.headers, props.headerDepth)
        : null;

      return h("div", { class: "toc-place-holder", ref: toc }, [
        h(
          "aside",
          { id: "toc-list" },
          tocHeaders
            ? [
                h("div", { class: "toc-header" }, metaLocale.value.toc),
                h("div", { class: "toc-wrapper" }, [tocHeaders]),
              ]
            : []
        ),
      ]);
    };
  },
});
