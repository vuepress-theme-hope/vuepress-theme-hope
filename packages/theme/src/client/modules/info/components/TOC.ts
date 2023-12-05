import type { PageHeader } from "@vuepress/client";
import { usePageData } from "@vuepress/client";
import type { PropType, SlotsType, VNode } from "vue";
import { defineComponent, h, onMounted, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import { VPLink } from "vuepress-shared/client";

import PrintButton from "@theme-hope/modules/info/components/PrintButton";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";

import "../styles/toc.scss";

const renderHeader = ({ title, level, slug }: PageHeader): VNode =>
  h(
    VPLink,
    {
      to: `#${slug}`,
      class: ["toc-link", `level${level}`],
    },
    () => title,
  );

const renderChildren = (
  headers: PageHeader[],
  headerDepth: number,
): VNode | null => {
  const route = useRoute();

  return headers.length && headerDepth > 0
    ? h(
        "ul",
        { class: "toc-list" },
        headers.map((header) => {
          const children = renderChildren(header.children, headerDepth - 1);

          return [
            h(
              "li",
              {
                class: [
                  "toc-item",
                  { active: route.hash === `#${header.slug}` },
                ],
              },
              renderHeader(header),
            ),
            children ? h("li", children) : null,
          ];
        }),
      )
    : null;
};

export default defineComponent({
  name: "TOC",

  props: {
    /**
     * TOC items config
     *
     * TOC 项目配置
     */
    items: {
      type: Array as PropType<PageHeader[]>,
      default: () => [],
    },

    /**
     * Max header nesting depth
     *
     * 最大的标题嵌套深度
     */
    headerDepth: {
      type: Number,
      default: 2,
    },
  },

  slots: Object as SlotsType<{
    before?: () => VNode[] | VNode | null;
    after?: () => VNode[] | VNode | null;
  }>,

  setup(props, { slots }) {
    const route = useRoute();
    const page = usePageData();
    const metaLocale = useMetaLocale();

    const toc = shallowRef<HTMLElement>();
    const tocMarkerTop = ref("-1.7rem");

    const scrollTo = (top: number): void => {
      toc.value?.scrollTo({ top, behavior: "smooth" });
    };

    const updateTocMarker = (): void => {
      if (toc.value) {
        const activeTocItem = document.querySelector(".toc-item.active");

        if (activeTocItem)
          tocMarkerTop.value = `${
            // active toc item top
            activeTocItem.getBoundingClientRect().top -
            // toc top
            toc.value.getBoundingClientRect().top +
            // toc scroll top
            toc.value.scrollTop
          }px`;
        else tocMarkerTop.value = "-1.7rem";
      } else {
        tocMarkerTop.value = "-1.7rem";
      }
    };

    onMounted(() => {
      // scroll to active toc item
      watch(
        () => route.hash,
        (hash): void => {
          if (toc.value) {
            // get the active toc item DOM, whose href equals to the current route
            const activeTocItem = document.querySelector(
              `#toc a.toc-link[href$="${hash}"]`,
            );

            if (!activeTocItem) return;

            // get the top and height of the toc
            const { top: tocTop, height: tocHeight } =
              toc.value.getBoundingClientRect();
            // get the top and height of the active toc item
            const { top: activeTocItemTop, height: activeTocItemHeight } =
              activeTocItem.getBoundingClientRect();

            // when the active toc item overflows the top edge of toc
            if (activeTocItemTop < tocTop)
              // scroll to the top edge of toc
              scrollTo(toc.value.scrollTop + activeTocItemTop - tocTop);
            // when the active toc item overflows the bottom edge of toc
            else if (
              activeTocItemTop + activeTocItemHeight >
              tocTop + tocHeight
            )
              // scroll to the bottom edge of toc
              scrollTo(
                toc.value.scrollTop +
                  activeTocItemTop +
                  activeTocItemHeight -
                  tocTop -
                  tocHeight,
              );
          }
        },
      );

      watch(() => route.fullPath, updateTocMarker, {
        flush: "post",
        immediate: true,
      });
    });

    return (): VNode | null => {
      const tocHeaders = props.items.length
        ? renderChildren(props.items, props.headerDepth)
        : page.value.headers
          ? renderChildren(page.value.headers, props.headerDepth)
          : null;

      return tocHeaders
        ? h("div", { class: "toc-place-holder" }, [
            h("aside", { id: "toc" }, [
              slots.before?.(),
              h("div", { class: "toc-header" }, [
                metaLocale.value.toc,
                h(PrintButton),
              ]),
              h("div", { class: "toc-wrapper", ref: toc }, [
                tocHeaders,
                h("div", {
                  class: "toc-marker",
                  style: {
                    top: tocMarkerTop.value,
                  },
                }),
              ]),
              slots.after?.(),
            ]),
          ])
        : null;
    };
  },
});
