import { ensureEndingSlash, isLinkAbsolute } from "@vuepress/helper/client";
import { resolveRoute } from "vuepress-shared/client";

import type { AutoLinkOptions } from "../../shared/index.js";
import { ArticleInfoType } from "../../shared/index.js";

export const resolvePrefix = (prefix = "", path = ""): string =>
  isLinkAbsolute(path) ? path : `${ensureEndingSlash(prefix)}${path}`;

/**
 * Resolve AutoLink props from string
 *
 */
export const resolveLinkInfo = (
  item: string,
  preferFull = false,
): AutoLinkOptions => {
  const { meta, path } = resolveRoute(item);

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
    : { text: path, link: path };
};
