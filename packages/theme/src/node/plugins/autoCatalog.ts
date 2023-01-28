import { isPlainObject } from "@vuepress/shared";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

import type { Plugin } from "@vuepress/core";
import type { AutoCatalogOptions } from "vuepress-plugin-auto-catalog";

/**
 * Resolve options for vuepress-plugin-auto-catalog
 */
export const getAutoCatalogPlugin = (
  autoCatalog?: AutoCatalogOptions | boolean
): Plugin | null => {
  if (autoCatalog === false) return null;

  return autoCatalogPlugin({
    // exclude auto generated page from articles, feed and sitemaps
    frontmatter: () => ({ article: false, feed: false, sitemap: false }),
    ...(isPlainObject(autoCatalog) ? autoCatalog : {}),
    // inject info
    titleRouteMetaKey: "t",
    iconRouteMetaKey: "i",
    indexRouteMetaKey: "I",
    orderRouteMetaKey: "O",
  });
};
