import { isPlainObject, keys } from "@vuepress/helper";
import type { SitemapPluginOptions } from "@vuepress/plugin-sitemap";
import { sitemapPlugin } from "@vuepress/plugin-sitemap";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-sitemap
 */
export const getSitemapPlugin = (
  options?: Omit<SitemapPluginOptions, "hostname"> | boolean,
  hostname?: string,
): Plugin | null => {
  if (options === false) return null;

  const sitemapOptions = isPlainObject(options) ? options : {};

  // Disable sitemap if `hostname` is not set and no options for sitemap plugin
  if (!keys(sitemapOptions).length && !hostname) return null;

  return sitemapPlugin(<SitemapPluginOptions>{ hostname, ...sitemapOptions });
};
