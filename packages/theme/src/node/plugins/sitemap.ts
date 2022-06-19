import { sitemapPlugin } from "vuepress-plugin-sitemap2";

import type { Plugin } from "@vuepress/core";
import type { SitemapOptions } from "vuepress-plugin-sitemap2";

export const getSitemapPlugin = (
  options?: Omit<SitemapOptions, "hostname"> | false,
  hostname?: string,
  legacy = false
): Plugin | null => {
  if (options === false) return null;

  // disable sitemap if `hostname` is not set and no options for sitemap plugin
  if (!Object.keys(options || {}).length && !hostname) return null;

  return sitemapPlugin(
    {
      hostname,
      ...(options || {}),
    } as SitemapOptions,
    legacy
  );
};
