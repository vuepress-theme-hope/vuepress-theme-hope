import { isString } from "@vuepress/shared";
import { useResolveRouteWithRedirect } from "./resolveRouteWithRedirect";

import type {
  NavbarItem,
  NavbarGroup,
  NavLink,
  ResolvedNavbarItem,
} from "../../shared";

export const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) return useNavLink(item);

  if ((item as NavbarGroup).children)
    return {
      ...item,
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    };

  return item as ResolvedNavbarItem;
};

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useNavLink = (item: string): NavLink => {
  const resolved = useResolveRouteWithRedirect(item);
  return {
    text: resolved.meta.title || item,
    link: resolved.name === "404" ? item : resolved.fullPath,
  };
};
