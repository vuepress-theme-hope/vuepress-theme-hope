import { resolveRoute } from "vuepress/client";

import type { AutoLinkOptions, PageInfoData } from "../../shared/index.js";
import { PageInfo } from "../../shared/index.js";

/**
 * Resolve AutoLink props from string
 *
 */
export const resolveLinkInfo = (
  item: string,
  preferFull = false,
  currentPath?: string,
): AutoLinkOptions => {
  const { meta, path, notFound } = resolveRoute<PageInfoData>(
    item,
    currentPath,
  );

  return notFound
    ? { text: path, link: path }
    : {
        text:
          !preferFull && meta[PageInfo.shortTitle]
            ? meta[PageInfo.shortTitle]
            : meta[PageInfo.title] || path,
        link: path,
        ...(meta[PageInfo.icon] ? { icon: meta[PageInfo.icon] } : {}),
      };
};
