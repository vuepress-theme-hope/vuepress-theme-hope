import type { RouteLocationNormalizedLoaded } from "vuepress/client";
import { isActiveLink } from "vuepress-shared/client";

import type { SidebarItem } from "@theme-hope/typings/sidebar";
import { isActiveItem } from "@theme-hope/utils/isActiveItem";

export const isActiveSidebarItem = (
  route: RouteLocationNormalizedLoaded,
  item: SidebarItem,
): boolean =>
  "children" in item
    ? (Boolean(item.prefix) && isActiveLink(route, item.prefix)) ||
      item.children.some((child) => isActiveSidebarItem(route, child))
    : isActiveItem(route, item);
