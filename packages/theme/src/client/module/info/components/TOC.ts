import { isActiveLink } from "@mr-hope/vuepress-shared/lib/client";
import { usePageData } from "@vuepress/client";
import { defineComponent, h } from "vue";
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
      class: [
        "toc-link",
        {
          [`level${level}`]: level,
        },
      ],
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
    const page = usePageData();
    const metaLocale = useMetaLocale();

    return (): VNode => {
      const tocHeaders = props.items.length
        ? renderChildren(props.items, props.headerDepth)
        : page.value.headers
        ? renderChildren(page.value.headers, props.headerDepth)
        : null;

      return h("div", { class: "toc-place-holder" }, [
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
