import { isDef } from "@vuepress/helper/client";
import type { RouteLocationNormalizedLoaded } from "vuepress/client";

const HASH_REGEXP = /#.*$/u;

/**
 * Get hash from path
 *
 * @param path link path
 * @returns hash
 */
export const getHash = (path: string): string => {
  const match = HASH_REGEXP.exec(path);

  if (match) return match[0];

  return "";
};

export const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(HASH_REGEXP, "")
    .replace(/\/index\.html$/iu, "/")
    .replace(/\.html$/iu, "")
    .replace(/(README|index)?\.md$/iu, "");

/**
 * Whether the lick is active
 *
 * @param route Current route
 * @param link link path
 * @returns Whether the lick is active
 */
export const isActiveLink = (
  route: RouteLocationNormalizedLoaded,
  link?: string,
): boolean => {
  if (!isDef(link)) return false;

  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);
  const linkHash = getHash(link);

  if (linkHash)
    return (
      linkHash === route.hash && (!targetPath || currentPath === targetPath)
    );

  return currentPath === targetPath;
};
