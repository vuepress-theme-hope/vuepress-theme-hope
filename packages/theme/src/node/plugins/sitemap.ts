import { sitemapPlugin } from "vuepress-plugin-sitemap2";

import type { Plugin } from "@vuepress/core";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";

export const getSitemapPlugin = (
  hostname: string,
  options?: Omit<SitemapOptions, "hostname"> | false
): Plugin | null => {
  if (options === false) return null;

  // disable sitemap if `hostname` is not set and no options for sitemap plugin
  if (!Object.keys(options || {}).length && !hostname) return null;

  return sitemapPlugin({
    hostname,
    ...(options || {}),
  } as SitemapOptions);
};
