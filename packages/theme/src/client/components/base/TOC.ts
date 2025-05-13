import type { GetHeadersOptions, Slot } from "@vuepress/helper/client";
import { isPlainObject, useHeaders } from "@vuepress/helper/client";
import { useToggle, watchImmediate } from "@vueuse/core";
import type { PropType, SlotsType, VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, shallowRef } from "vue";
import type { PageHeader } from "vuepress/client";
import { ClientOnly, RouteLink, useRoute } from "vuepress/client";

import PrintButton from "@theme-hope/components/base/PrintButton";
import { useMetaLocale } from "@theme-hope/composables/info/useMetaLocale";
import { useData } from "@theme-hope/composables/useData";
import type { TocSlotData } from "@theme-hope/typings/slots";

import "../../styles/info/toc.scss";

const DEFAULT_TOC_OPTIONS: GetHeadersOptions = {
  selector: [
    ...Array.from({ length: 6 }).map((_, i) => `#markdown-content > h${i + 1}`),
    "[vp-content] > h2",
  ].join(", "),
  levels: "deep",
  ignore: [".vp-badge", ".vp-icon"],
};

export default defineComponent({
  name: "TOC",

  props: {
    /**
     * TOC items config
     *
     * TOC 项目配置
     */
    items: Array as PropType<PageHeader[]>,
  },

  slots: Object as SlotsType<{
    toc?: Slot<TocSlotData>;
    tocBefore?: Slot;
    tocAfter?: Slot;
  }>,

  setup(props, { slots }) {
    const { frontmatter, themeLocale } = useData();

    const tocOptions = computed(() => {
      const config = frontmatter.value.toc ?? themeLocale.value.toc;

      return isPlainObject(config)
        ? { ...DEFAULT_TOC_OPTIONS, ...config }
        : (config ?? true)
          ? DEFAULT_TOC_OPTIONS
          : undefined;
    });

    const headers = useHeaders(tocOptions);
    const route = useRoute();
    const metaLocale = useMetaLocale();
    const [isExpanded, toggleExpanded] = useToggle();

    const toc = shallowRef<HTMLElement>();
    const tocMarkerTop = ref("-2rem");

    const scrollTo = (top: number): void => {
      toc.value?.scrollTo({ top, behavior: "smooth" });
    };

    const updateTocMarker = (): void => {
      if (toc.value) {
        const activeTocItem = document.querySelector(".vp-toc-item.active");

        if (activeTocItem)
          tocMarkerTop.value = `${
            // Active toc item top
            activeTocItem.getBoundingClientRect().top -
            // Toc top
            toc.value.getBoundingClientRect().top +
            // Toc scroll top
            toc.value.scrollTop
          }px`;
        else tocMarkerTop.value = "-2rem";
      } else {
        tocMarkerTop.value = "-2rem";
      }
    };

    onMounted(() => {
      // Scroll to active toc item
      watchImmediate(
        () => route.hash,
        (hash): void => {
          if (toc.value) {
            // Get the active toc item DOM, whose href equals to the current route
            const activeTocItem = document.querySelector(
              `#toc a.vp-toc-link[href$="${hash}"]`,
            );

            if (!activeTocItem) return;

            // Get the top and height of the toc
            const { top: tocTop, height: tocHeight } =
              toc.value.getBoundingClientRect();
            // Get the top and height of the active toc item
            const { top: activeTocItemTop, height: activeTocItemHeight } =
              activeTocItem.getBoundingClientRect();

            // When the active toc item overflows the top edge of toc
            if (activeTocItemTop < tocTop)
              // Scroll to the top edge of toc
              scrollTo(toc.value.scrollTop + activeTocItemTop - tocTop);
            // When the active toc item overflows the bottom edge of toc
            else if (
              activeTocItemTop + activeTocItemHeight >
              tocTop + tocHeight
            )
              // Scroll to the bottom edge of toc
              scrollTo(
                toc.value.scrollTop +
                  activeTocItemTop +
                  activeTocItemHeight -
                  tocTop -
                  tocHeight,
              );
          }
        },
        { flush: "post" },
      );

      watchImmediate(() => route.fullPath, updateTocMarker, {
        flush: "post",
      });
    });

    const renderHeader = ({ title, level, slug }: PageHeader): VNode =>
      h(
        RouteLink,
        {
          to: `#${slug}`,
          class: ["vp-toc-link", `level${level}`],
          onClick: () => {
            toggleExpanded();
          },
        },
        () => title,
      );

    const renderChildren = (headers: PageHeader[]): VNode | null =>
      headers.length
        ? h(
            "ul",
            { class: "vp-toc-list" },
            headers.map((header) => {
              const children = renderChildren(header.children);

              return [
                h(
                  "li",
                  {
                    class: [
                      "vp-toc-item",
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

    return (): VNode | null =>
      tocOptions.value || props.items?.length
        ? h(ClientOnly, () => {
            const tocHeaders = props.items?.length
              ? renderChildren(props.items)
              : renderChildren(headers.value);

            const defaultContent =
              slots.toc?.(headers.value) ??
              (tocHeaders
                ? [
                    h(
                      "div",
                      {
                        class: "vp-toc-header",
                        onClick: () => {
                          toggleExpanded();
                        },
                      },
                      [
                        metaLocale.value.toc,
                        h(PrintButton),
                        h("div", {
                          class: ["arrow", isExpanded.value ? "down" : "end"],
                        }),
                      ],
                    ),
                    h(
                      "div",
                      {
                        class: [
                          "vp-toc-wrapper",
                          isExpanded.value ? "open" : "",
                        ],
                        ref: toc,
                      },
                      [
                        tocHeaders,
                        h("div", {
                          class: "vp-toc-marker",
                          style: {
                            top: tocMarkerTop.value,
                          },
                        }),
                      ],
                    ),
                  ]
                : null);
            const beforeContent = slots.tocBefore?.();
            const afterContent = slots.tocAfter?.();

            // headers can not be accessed during SSR, so we need to wrap it with ClientOnly
            return defaultContent || beforeContent || afterContent
              ? h("div", { class: "vp-toc-placeholder" }, [
                  h("aside", { id: "toc", "vp-toc": "" }, [
                    beforeContent,
                    defaultContent,
                    afterContent,
                  ]),
                ])
              : null;
          })
        : null;
  },
});
