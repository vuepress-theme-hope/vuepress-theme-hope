import { resolveRoute } from "vuepress/client";

import type { AutoLinkOptions, PageInfoData } from "../../shared/index.js";

/**
 * Resolve AutoLink props from string
 *
 * @param item - The string to resolve
 * @param preferFull - Whether to prefer full title
 * @param currentPath - The current page path
 * @returns AutoLink props
 */
export const resolveLinkInfo = (
  item: string,
  preferFull = false,
  currentPath?: string,
): AutoLinkOptions => {
  const { meta, path, notFound } = resolveRoute<PageInfoData>(item, currentPath);

  return notFound
    ? { text: path, link: path }
    : {
        text: !preferFull && meta.shortTitle ? meta.shortTitle : meta.title || path,
        link: path,
        icon: meta.icon,
      };
};
