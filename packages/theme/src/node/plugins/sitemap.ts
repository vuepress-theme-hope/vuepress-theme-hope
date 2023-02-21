import { type Plugin } from "@vuepress/core";
import { isPlainObject } from "@vuepress/shared";
import { type SitemapOptions, sitemapPlugin } from "vuepress-plugin-sitemap2";
import { keys } from "vuepress-shared/node";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-sitemap2
 */
export const getSitemapPlugin = (
  options?: Omit<SitemapOptions, "hostname"> | boolean,
  hostname?: string,
  legacy = true
): Plugin | null => {
  if (options === false) return null;

  const sitemapOptions = isPlainObject(options) ? options : {};

  // disable sitemap if `hostname` is not set and no options for sitemap plugin
  if (!keys(sitemapOptions).length && !hostname) return null;

  return sitemapPlugin(<SitemapOptions>{ hostname, ...sitemapOptions }, legacy);
};
