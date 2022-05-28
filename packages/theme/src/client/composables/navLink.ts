import { useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/lib/client";

import type { AutoLink } from "../../shared";

/**
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useAutoLink = (item: string, preferFull = true): AutoLink => {
  const router = useRouter();
  const resolved = resolveRouteWithRedirect(router, encodeURI(item));

  return {
    icon: resolved.meta.icon,
    text:
      !preferFull && resolved.meta.shortTitle
        ? resolved.meta.shortTitle
        : resolved.meta.title || item,
    link: resolved.name === "404" ? item : resolved.fullPath,
  };
};
