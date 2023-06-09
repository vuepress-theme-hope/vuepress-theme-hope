import { type Router } from "vue-router";
import {
  inferRoutePath,
  resolveRouteWithRedirect,
} from "vuepress-shared/client";

import { ArticleInfoType, type AutoLinkOptions } from "../../shared/index.js";

/**
 * Resolve AutoLink props from string
 *
 */
export const resolveLinkInfo = (
  router: Router,
  item: string,
  preferFull = false
): AutoLinkOptions => {
  const { fullPath, meta, name } = resolveRouteWithRedirect(
    router,
    inferRoutePath(encodeURI(item))
  );

  return {
    text:
      !preferFull && meta[ArticleInfoType.shortTitle]
        ? meta[ArticleInfoType.shortTitle]
        : meta[ArticleInfoType.title] || item,
    link: name === "404" ? item : fullPath,
    ...(meta[ArticleInfoType.icon] ? { icon: meta[ArticleInfoType.icon] } : {}),
  };
};
