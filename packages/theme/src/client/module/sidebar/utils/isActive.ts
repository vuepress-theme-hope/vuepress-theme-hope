import { isActiveLink } from "vuepress-shared/lib/client";

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

export const isMatchedSidebarItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem
): boolean => {
  if (item.type === "group")
    return item.children.some((child) => {
      if (child.type === "group")
        return (
          isMatchedSidebarItem(route, child) ||
          ("prefix" in child && isActiveLink(route, child.prefix))
        );

      return child.type === "page" && isActiveSidebarItem(route, child, true);
    });

  return false;
};
