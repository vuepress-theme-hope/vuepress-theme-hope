import { isActiveLink } from "@mr-hope/vuepress-shared/lib/client";
import { usePageData } from "@vuepress/client";
import { defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

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

const renderChildren = (headers: PageHeader[]): VNode | null => {
  const route = useRoute();

  return headers.length
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
          renderChildren(header.children),
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
  },

  setup(props) {
    const page = usePageData();

    return (): VNode =>
      h("div", { class: "toc-place-holder" }, [
        h(
          "aside",
          { id: "toc-list" },
          h("div", { class: "toc-wrapper" }, [
            props.items.length
              ? renderChildren(props.items)
              : page.value.headers
              ? renderChildren(page.value.headers)
              : null,
          ])
        ),
      ]);
  },
});
