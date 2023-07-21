import type { Router } from "vue-router";
import {
  inferRouteLink,
  resolveRouteWithRedirect,
} from "vuepress-shared/client";

import type { AutoLinkOptions } from "../../shared/index.js";
import { ArticleInfoType } from "../../shared/index.js";

/**
 * Resolve AutoLink props from string
 *
 */
export const resolveLinkInfo = (
  router: Router,
  item: string,
  preferFull = false,
): AutoLinkOptions => {
  let result = resolveRouteWithRedirect(
    router,
    inferRouteLink(encodeURI(item)),
  );

  // the inferred path may be wrong, so we need to resolve the original path
  if (result.name === "404") result = resolveRouteWithRedirect(router, item);

  const { fullPath, meta, name } = result;

  return {
    text:
      !preferFull && meta[ArticleInfoType.shortTitle]
        ? meta[ArticleInfoType.shortTitle]
        : meta[ArticleInfoType.title] || item,
    link: name === "404" ? item : fullPath,
    ...(meta[ArticleInfoType.icon] ? { icon: meta[ArticleInfoType.icon] } : {}),
  };
};
