import type { RouteLocationNormalizedLoaded } from "vuepress/client";
import { isActiveLink } from "vuepress-shared/client";

import type { ResolvedSidebarItem } from "./typings.js";

export const isActiveSidebarItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem,
  exact = false,
): boolean => {
  if ("activeMatch" in item)
    return new RegExp(item.activeMatch, "u").test(route.path);

  if (isActiveLink(route, item.link)) return true;

  if ("children" in item && !exact)
    return item.children.some((child) => isActiveSidebarItem(route, child));

  return false;
};
