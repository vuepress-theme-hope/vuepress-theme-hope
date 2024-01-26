import { resolve } from "vuepress/client";

import type { AutoLinkOptions } from "../../shared/index.js";
import { ArticleInfoType } from "../../shared/index.js";

/**
 * Resolve AutoLink props from string
 *
 */
export const resolveLinkInfo = (
  item: string,
  preferFull = false
): AutoLinkOptions => {
  const { path, meta } = resolve(item);

  return meta
    ? {
        text:
          !preferFull && meta[ArticleInfoType.shortTitle]
            ? meta[ArticleInfoType.shortTitle]
            : meta[ArticleInfoType.title] || path,
        link: path,
        ...(meta[ArticleInfoType.icon]
          ? { icon: meta[ArticleInfoType.icon] }
          : {}),
      }
    : { text: item, link: item };
};
