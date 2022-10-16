import { useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/lib/client";

import { ICON, SHORT_TITLE, TITLE } from "../../shared/index.js";
import type { AutoLink } from "../../shared/index.js";

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
    text:
      !preferFull && meta[SHORT_TITLE]
        ? meta[SHORT_TITLE]
        : meta[TITLE] || item,
    link: name === "404" ? item : fullPath,
    ...(meta[ICON] ? { icon: meta[ICON] } : {}),
  };
};
