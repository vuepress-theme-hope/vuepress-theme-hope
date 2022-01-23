import { h } from "vue";
import { useRoute } from "vue-router";
import { useIconPrefix } from "../themeData";
import AutoLink from "../../components/AutoLink";
import { isActiveLink } from "../../utils";

import type { VNode } from "vue";
import type {
  ResolvedSidebarItem,
  ResolvedSidebarHeaderItem,
  ResolvedSidebarGroupItem,
} from "../../../shared";

export const renderIcon = (icon?: string): VNode | null =>
  icon
    ? h("i", {
        class: ["iconfont", `${useIconPrefix().value}${icon}`],
      })
    : null;

export const renderItem = (
  config: ResolvedSidebarItem,
  props: VNode["props"]
): VNode => {
  return config.link
    ? // if the item has link, render it as `<AutoLink>`
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      h(AutoLink, {
        ...props,
        config,
      })
    : // if the item only has text, render it as `<p>`
      h("p", props, [renderIcon(config.icon), config.text]);
};

export const renderGroupHeader = (
  { collapsable, icon, text }: ResolvedSidebarGroupItem,
  open: boolean
): (VNode | null)[] => [
  // icon
  renderIcon(icon),
  // title
  h("span", { class: "title" }, text),
  // arrow
  collapsable
    ? h("span", { class: ["arrow", open ? "down" : "right"] }, text)
    : null,
];

export const renderChildren = (
  children: ResolvedSidebarHeaderItem[]
): VNode | null => {
  const route = useRoute();
  if (!children) return null;

  return h(
    "ul",
    { class: "sidebar-sub-headers" },
    children.map((child) => {
      const active = isActiveLink(route, child.link);

      return h("li", { class: "sidebar-sub-header" }, [
        renderItem(child, {
          class: {
            "sidebar-link": true,
            heading: true,
            active,
          },
        }),
        renderChildren(child.children),
      ]);
    })
  );
};
