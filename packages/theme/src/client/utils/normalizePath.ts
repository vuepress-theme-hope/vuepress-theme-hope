import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { ResolvedSidebarItem } from "../../shared";

const HASH_REGEXP = /#.*$/u;

export const getHash = (path: string): string | void => {
  const match = HASH_REGEXP.exec(path);
  if (match) return match[0];

  return "";
};

export const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(HASH_REGEXP, "")
    .replace(/(index)?\.(md|html)$/, "");

export const isActiveLink = (
  route: RouteLocationNormalizedLoaded,
  link?: string
): boolean => {
  if (link === undefined) return false;

  const linkHash = getHash(link);

  if (linkHash && route.hash !== link) return false;

  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);

  return currentPath === targetPath;
};

export const isActiveSidebarItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem
): boolean => {
  if (isActiveLink(route, item.link)) return true;

  if (item.children)
    return item.children.some((child) => isActiveSidebarItem(route, child));

  return false;
};
