import { isDef } from "@vuepress/helper/client";
import type { RouteLocationNormalizedLoaded } from "vuepress/client";

/**
 * Get the index of the first hash in path
 *
 * @param path Link path
 * @returns Index of the first hash, or `-1` when the path has no hash
 */
const getHashIndex = (path: string): number => path.indexOf("#");

/**
 * Get hash from path
 *
 * @param path Link path
 * @returns Hash
 */
export const getHash = (path: string): string => {
  const index = getHashIndex(path);

  if (index === -1) return "";

  return path.slice(index);
};

/**
 * Normalize a link path
 *
 * 规范化链接路径
 *
 * Decode the path, remove its hash and normalize its index page and extension.
 *
 * 解码路径，移除 hash，并规范化其中的主页与扩展名。
 *
 * @param path - Link path / 链接路径
 * @returns Normalized path / 规范化后的路径
 */
export const normalizePath = (path: string): string => {
  const decodedPath = decodeURI(path);
  const index = getHashIndex(decodedPath);

  return (index === -1 ? decodedPath : decodedPath.slice(0, index))
    .replace(/\/index\.html$/iu, "/")
    .replace(/\/(?:README|index)\.md$/iu, "/")
    .replace(/\.(?:html|md)$/iu, "");
};

/**
 * Whether the link is active
 *
 * @param route Current route
 * @param link Link path
 * @returns Whether the link is active
 */
export const isActiveLink = (route: RouteLocationNormalizedLoaded, link?: string): boolean => {
  if (!isDef(link)) return false;

  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);
  const linkHash = getHash(link);

  if (linkHash) return linkHash === route.hash && (!targetPath || currentPath === targetPath);

  return currentPath === targetPath;
};
