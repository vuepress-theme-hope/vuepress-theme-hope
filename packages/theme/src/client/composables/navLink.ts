import { isString } from "@vuepress/shared";
import { useResolveRouteWithRedirect } from "./resolveRouteWithRedirect";

import type {
  AutoLink,
  NavbarItem,
  NavbarGroup,
  ResolvedNavbarItem,
} from "../../shared";

/**
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useAutoLink = (item: string): AutoLink => {
  const resolved = useResolveRouteWithRedirect(item);
  return {
    text: resolved.meta.title || item,
    link: resolved.name === "404" ? item : resolved.fullPath,
  };
};

export const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) return useAutoLink(item);

  if ((item as NavbarGroup).children)
    return {
      ...item,
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    };

  return item as ResolvedNavbarItem;
};
