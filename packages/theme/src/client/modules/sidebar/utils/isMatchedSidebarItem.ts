import type { RouteLocationNormalizedLoaded } from "vuepress/client";
import { isActiveLink } from "vuepress-shared/client";

import { isActiveSidebarItem } from "./isActiveSidebarItem.js";
import type { ResolvedSidebarItem } from "./typings.js";

export const isMatchedSidebarItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem,
): boolean => {
  if (item.type === "group")
    return (
      item.children.some((child) => {
        if (child.type === "group") return isMatchedSidebarItem(route, child);

        return child.type === "page" && isActiveSidebarItem(route, child, true);
      }) ||
      ("prefix" in item && isActiveLink(route, item.prefix))
    );

  return false;
};
