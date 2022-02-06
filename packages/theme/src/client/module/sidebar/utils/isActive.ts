import { isActiveLink } from "@theme-hope/utils";

import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { ResolvedSidebarItem } from "../../../../shared";

export const isActiveSidebarItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem
): boolean => {
  if (isActiveLink(route, item.link)) return true;

  if (item.children)
    return item.children.some((child) => isActiveSidebarItem(route, child));

  return false;
};
