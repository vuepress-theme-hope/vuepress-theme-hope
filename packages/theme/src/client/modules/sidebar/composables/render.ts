import { isString } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { h } from "vue";
import { useRoute } from "vuepress/client";

import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";

import type { AutoLinkOptions as AutoLinkType } from "../../../../shared/index.js";
import type {
  ResolvedSidebarHeaderItem,
  ResolvedSidebarItem,
} from "../utils/index.js";

export const renderSidebarItem = (
  config: ResolvedSidebarItem,
  props: VNode["props"],
): VNode =>
  isString(config.link)
    ? // If the item has link, render it as `<AutoLink>`
      h(AutoLink, {
        ...props,
        config: config as AutoLinkType,
      })
    : // If the item only has text, render it as `<p>`
      h("p", props, [h(HopeIcon, { icon: config.icon }), config.text]);

export const renderSidebarChildren = (
  children: ResolvedSidebarHeaderItem[],
): VNode | null => {
  const route = useRoute();

  return children
    ? h(
        "ul",
        { class: "vp-sidebar-sub-headers" },
        children.map((child) =>
          h("li", { class: "vp-sidebar-sub-header" }, [
            renderSidebarItem(child, {
              class: [
                "vp-sidebar-link",
                "vp-heading",
                { active: isActiveSidebarItem(route, child, true) },
              ],
            }),
            renderSidebarChildren(child.children),
          ]),
        ),
      )
    : null;
};
