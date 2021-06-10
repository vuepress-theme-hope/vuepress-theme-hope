import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { ResolvedSidebarItem } from "../../shared";

export const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, "")
    .replace(/(index)?\.(md|html)$/, "");

export const isActiveLink = (
  route: RouteLocationNormalizedLoaded,
  link?: string
): boolean => {
  if (link === undefined) return false;

  if (route.hash === link) return true;

  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);

  return currentPath === targetPath;
};

export const isActiveItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem
): boolean => {
  if (isActiveLink(route, item.link)) return true;

  if (item.children)
    return item.children.some((child) => isActiveItem(route, child));

  return false;
};
