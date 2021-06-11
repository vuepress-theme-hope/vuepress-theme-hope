import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { ResolvedSidebarItem } from "../../shared";

export const hashRE = /#.*$/u;

export const getHash = (path: string): string | void => {
  const match = hashRE.exec(path);
  if (match) return match[0];

  return "";
};

export const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, "")
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

export const isActiveItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem
): boolean => {
  if (isActiveLink(route, item.link)) return true;

  if (item.children)
    return item.children.some((child) => isActiveItem(route, child));

  return false;
};
