import {
  ensureEndingSlash,
  isLinkAbsolute,
  resolveRoute,
} from "@vuepress/helper/client";

import type { AutoLinkOptions, PageInfoData } from "../../shared/index.js";
import { PageInfo } from "../../shared/index.js";

export const resolvePrefix = (prefix = "", path = ""): string =>
  isLinkAbsolute(path) ? path : `${ensureEndingSlash(prefix)}${path}`;

/**
 * Resolve AutoLink props from string
 *
 */
export const resolveLinkInfo = (
  item: string,
  preferFull = false,
  current?: string,
): AutoLinkOptions => {
  const { meta, path, notFound } = resolveRoute<PageInfoData>(item, current);

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
