import { isString } from "@vuepress/shared";
import { useResolveRouteWithRedirect } from "./resolveRouteWithRedirect";

import type {
  AutoLink,
  NavbarItem,
  NavbarGroup,
  NavGroup,
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

  if ("children" in item)
    return {
      ...item,
      children: item.children.map(resolveNavbarItem) as (
        | NavGroup<AutoLink>
        | AutoLink
      )[],
    };

  return item as ResolvedNavbarItem;
};
