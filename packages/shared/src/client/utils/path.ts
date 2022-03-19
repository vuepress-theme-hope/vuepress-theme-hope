import type { RouteLocationNormalizedLoaded } from "vue-router";

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

  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);
  const linkHash = getHash(link);

  if (linkHash)
    return (
      linkHash === route.hash && (!targetPath || currentPath === targetPath)
    );

  return currentPath === targetPath;
};
