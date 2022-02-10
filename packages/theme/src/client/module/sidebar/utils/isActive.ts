import { isActiveLink } from "@mr-hope/vuepress-shared/lib/client";

import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { ResolvedSidebarItem } from "../../../../shared";

export const isActiveSidebarItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem,
  exact = false
): boolean => {
  if (isActiveLink(route, item.link)) return true;

  if (item.children && !exact)
    return item.children.some((child) => isActiveSidebarItem(route, child));

  return false;
};
