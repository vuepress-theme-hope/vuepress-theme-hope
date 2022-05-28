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
export const useAutoLink = (item: string, preferFull = false): AutoLink => {
  const router = useRouter();
  const { fullPath, meta, name } = resolveRouteWithRedirect(
    router,
    encodeURI(item)
  );

  return {
    text: !preferFull && meta.shortTitle ? meta.shortTitle : meta.title || item,
    link: name === "404" ? item : fullPath,
    ...(meta.icon ? { icon: meta.icon } : {}),
  };
};
