import type { Plugin } from "@vuepress/core";
import type { AutoCatalogOptions } from "vuepress-plugin-auto-catalog";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";
import { isPlainObject } from "vuepress-shared/node";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-auto-catalog
 */
export const getAutoCatalogPlugin = (
  autoCatalog?: AutoCatalogOptions | boolean,
  legacy = false,
): Plugin | null => {
  if (autoCatalog === false) return null;

  return autoCatalogPlugin(
    {
      // exclude auto generated page from articles, feed and sitemaps
      frontmatter: () => ({ article: false, feed: false, sitemap: false }),
      ...(isPlainObject(autoCatalog) ? autoCatalog : {}),
    },
    legacy,
  );
};
