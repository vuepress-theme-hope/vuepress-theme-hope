import { isActiveLink } from "vuepress-shared/lib/client";

import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { ResolvedSidebarItem } from "../../../../shared";

export const isActiveSidebarItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem,
  exact = false
): boolean => {
  if ("activeMatch" in item)
    return new RegExp(item.activeMatch).test(route.path);

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
    return (
      item.children.some((child) => {
        if (child.type === "group") return isMatchedSidebarItem(route, child);

        return child.type === "page" && isActiveSidebarItem(route, child, true);
      }) ||
      ("prefix" in item && isActiveLink(route, item.prefix))
    );

  return false;
};
