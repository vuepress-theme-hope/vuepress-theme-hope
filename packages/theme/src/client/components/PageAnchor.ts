import { usePageData } from "@vuepress/client";
import { defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { isActiveLink } from "@theme-hope/utils";

import type { PageHeader } from "@vuepress/shared";
import type { PropType, VNode } from "vue";

import "../styles/page-anchor.scss";

interface AnchorItem {
  text: string;
  level?: number;
  link: string;
}

const renderLink = ({ text, link, level }: AnchorItem): VNode =>
  h(
    RouterLink,
    {
      to: link,
      class: ["anchor-link", level ? `heading${level}` : ""],
    },
    () => h("div", text)
  );

const renderChildren = (headers: PageHeader[]): VNode => {
  const route = useRoute();

  return h(
    "ul",
    { class: "anchor-list" },
    headers.map((header: PageHeader) => {
      const active = isActiveLink(route, `#${header.slug}`);

      return h("li", { class: ["anchor", { active }] }, [
        renderLink({
          text: header.title,
          link: `#${header.slug}`,
          level: header.level,
        }),
      ]);
    })
  );
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
