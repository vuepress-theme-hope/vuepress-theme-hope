import { isPlainObject } from "@vuepress/helper";
import type { CatalogPluginOptions } from "@vuepress/plugin-catalog";
import { catalogPlugin } from "@vuepress/plugin-catalog";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-catalog
 */
export const getCatalogPlugin = (
  catalog?: CatalogPluginOptions | boolean,
): Plugin | null => {
  if (catalog === false) return null;

  return catalogPlugin({
    // Exclude auto generated page from articles, feed and sitemaps
    frontmatter: () => ({ article: false, feed: false, sitemap: false }),
    ...(isPlainObject(catalog) ? catalog : {}),
  });
};
