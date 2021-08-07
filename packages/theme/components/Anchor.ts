import Vue from "vue";
import { SidebarHeader } from "@theme/utils/sidebar";
import { isActive } from "@theme/utils/path";

import type { CreateElement, PropType, VNode } from "vue";
import type { Route } from "vue-router";

interface AnchorItem {
  text: string;
  level?: number;
  link: string;
}

const renderLink = (
  h: CreateElement,
  { text, link, level }: AnchorItem
): VNode =>
  h(
    "RouterLink",
    {
      props: {
        to: link,
        activeClass: "",
        exactActiveClass: "",
      },
      class: {
        "anchor-link": true,
        [level ? `heading${level}` : ""]: level,
      },
    },
    [h("div", {}, [text])]
  );

interface RenderChildrenOptions {
  children: SidebarHeader[];
  route: Route;
}

const renderChildren = (
  h: CreateElement,
  { children, route }: RenderChildrenOptions
): VNode =>
  h(
    "ul",
    { class: "anchor-list" },
    children.map((child: SidebarHeader) => {
      const active = isActive(route, `${route.path}#${child.slug}`);

      return h("li", { class: { anchor: true, active } }, [
        renderLink(h, {
          text: child.title,
          link: `${route.path}#${child.slug}`,
          level: child.level,
        }),
      ]);
    })
  );

export default Vue.extend({
  name: "Anchor",

  functional: true,

  props: {
    items: {
      type: Array as PropType<SidebarHeader[]>,
      default: () => [],
    },
  },

  render(h, { props, parent: { $page, $route } }) {
    return h("div", { attrs: { class: "anchor-place-holder" } }, [
      h("aside", { attrs: { id: "anchor" } }, [
        h("div", { class: "anchor-wrapper" }, [
          props.items.length
            ? renderChildren(h, {
                children: props.items,
                route: $route,
              })
            : $page.headers
            ? renderChildren(h, {
                children: $page.headers,
                route: $route,
              })
            : null,
        ]),
      ]),
    ]);
  },
});
