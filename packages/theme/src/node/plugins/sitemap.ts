import { isPlainObject } from "@vuepress/shared";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

import type { Plugin } from "@vuepress/core";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";

export const getSitemapPlugin = (
  options?: Omit<SitemapOptions, "hostname"> | boolean,
  hostname?: string,
  legacy = false
): Plugin | null => {
  if (options === false) return null;

  const sitemapOptions = isPlainObject(options) ? options : {};

  // disable sitemap if `hostname` is not set and no options for sitemap plugin
  if (!Object.keys(sitemapOptions).length && !hostname) return null;

  return sitemapPlugin(<SitemapOptions>{ hostname, ...sitemapOptions }, legacy);
};
