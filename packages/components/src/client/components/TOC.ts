import {
  isActiveLink,
  useLocaleConfig,
} from "@mr-hope/vuepress-shared/lib/client";
import { usePageData } from "@vuepress/client";
import { defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

import type { PageHeader } from "@vuepress/shared";
import type { PropType, VNode } from "vue";
import type { TOCLocaleConfig } from "../../shared";

import "../styles/toc.scss";

declare const TOC_LOCALES: TOCLocaleConfig;

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
  headingDepth: number
): VNode | null => {
  const route = useRoute();

  return headers.length && headingDepth > 0
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
          renderChildren(header.children, headingDepth - 1),
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

    headingDepth: {
      type: Number,
      default: 2,
    },
  },

  setup(props) {
    const page = usePageData();
    const locale = useLocaleConfig(TOC_LOCALES);

    return (): VNode => {
      const tocHeaders = props.items.length
        ? renderChildren(props.items, props.headingDepth)
        : page.value.headers
        ? renderChildren(page.value.headers, props.headingDepth)
        : null;

      return h("div", { class: "toc-place-holder" }, [
        h(
          "aside",
          { id: "toc-list" },
          tocHeaders
            ? [
                h("div", { class: "toc-header" }, locale.value.header),
                h("div", { class: "toc-wrapper" }, [tocHeaders]),
              ]
            : []
        ),
      ]);
    };
  },
});
