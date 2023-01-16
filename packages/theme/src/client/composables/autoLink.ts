import { useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/client";

import { ArticleInfoType } from "../../shared/index.js";
import type { AutoLinkOptions } from "../../shared/index.js";

/**
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: "/README.md"
 * - Output: { text: "Home", link: "/" }
 */
export const useAutoLink = (
  item: string,
  preferFull = false
): AutoLinkOptions => {
  const router = useRouter();
  const { fullPath, meta, name } = resolveRouteWithRedirect(
    router,
    encodeURI(item)
  );

  return {
    text:
      !preferFull && meta[ArticleInfoType.shortTitle]
        ? meta[ArticleInfoType.shortTitle]
        : meta.title || item,
    link: name === "404" ? item : fullPath,
    ...(meta[ArticleInfoType.icon] ? { icon: meta[ArticleInfoType.icon] } : {}),
  };
};
