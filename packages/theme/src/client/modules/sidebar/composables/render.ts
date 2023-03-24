import { isString } from "@vuepress/shared";
import { type VNode, h } from "vue";
import { useRoute } from "vue-router";

import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";

import { type AutoLinkOptions as AutoLinkType } from "../../../../shared/index.js";
import {
  type ResolvedSidebarHeaderItem,
  type ResolvedSidebarItem,
} from "../utils/index.js";

export const renderItem = (
  config: ResolvedSidebarItem,
  props: VNode["props"]
): VNode =>
  isString(config.link)
    ? // if the item has link, render it as `<AutoLink>`
      h(AutoLink, {
        ...props,
        config: config as AutoLinkType,
      })
    : // if the item only has text, render it as `<p>`
      h("p", props, [h(HopeIcon, { icon: config.icon }), config.text]);

export const renderChildren = (
  children: ResolvedSidebarHeaderItem[]
): VNode | null => {
  const route = useRoute();

  if (!children) return null;

  return h(
    "ul",
    { class: "sidebar-sub-headers" },
    children.map((child) => {
      const active = isActiveSidebarItem(route, child, true);

      return h("li", { class: "sidebar-sub-header" }, [
        renderItem(child, {
          class: ["sidebar-link", "heading", { active }],
        }),
        renderChildren(child.children),
      ]);
    })
  );
};
