import { isPlainObject, keys } from "@vuepress/helper";
import type { SitemapPluginOptions } from "@vuepress/plugin-sitemap";
import { sitemapPlugin } from "@vuepress/plugin-sitemap";
import type { Plugin } from "vuepress/core";

/**
 * Resolve options for `@vuepress/plugin-sitemap`
 *
 * @param options Sitemap plugin options or a boolean to enable it with default options
 * @param hostname Hostname for sitemap plugin
 * @returns Sitemap plugin instance or null
 */
export const getSitemapPlugin = (
  options?: Omit<SitemapPluginOptions, "hostname"> | boolean,
  hostname?: string,
): Plugin | null => {
  if (options === false) return null;

  const sitemapOptions = isPlainObject(options) ? options : {};

  // Disable sitemap if `hostname` is not set and no options for sitemap plugin
  if (keys(sitemapOptions).length === 0 && !hostname) return null;

  return sitemapPlugin({ hostname, ...sitemapOptions } as SitemapPluginOptions);
};
