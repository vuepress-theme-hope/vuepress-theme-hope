import { isActiveLink } from "@mr-hope/vuepress-shared/lib/client";
import { usePageData } from "@vuepress/client";
import { defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

import type { PageHeader } from "@vuepress/shared";
import type { PropType, VNode } from "vue";

import "../styles/page-anchor.scss";

const renderHeader = ({ title, level, slug }: PageHeader): VNode =>
  h(
    RouterLink,
    {
      to: `#${slug}`,
      class: [
        "anchor-link",
        {
          [`heading${level}`]: level,
        },
      ],
    },
    () => h("div", title)
  );

const renderChildren = (headers: PageHeader[]): VNode | null => {
  const route = useRoute();

  return headers.length
    ? h(
        "ul",
        { class: "anchor-list" },
        headers.map((header: PageHeader) => [
          h(
            "li",
            {
              class: [
                "anchor",
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
  name: "PageAnchor",

  props: {
    items: {
      type: Array as PropType<PageHeader[]>,
      default: () => [],
    },
  },

  setup(props) {
    const page = usePageData();

    return (): VNode =>
      h("div", { class: "anchor-place-holder" }, [
        h("aside", { id: "anchor" }, [
          h("div", { class: "anchor-wrapper" }, [
            props.items.length
              ? renderChildren(props.items)
              : page.value.headers
              ? renderChildren(page.value.headers)
              : null,
          ]),
        ]),
      ]);
  },
});
