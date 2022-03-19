import type { SitemapOptions } from "vuepress-plugin-sitemap2";

export const resolveSitemapOptions = (
  hostname: string,
  options?: Omit<SitemapOptions, "hostname"> | false
): SitemapOptions | false => {
  if (options === false) return false;

  // disable feed if `hostname` is not set and no options for feed plugin
  if (!Object.keys(options || {}).length && !hostname) return false;

  return {
    hostname,
    ...(options || {}),
  } as SitemapOptions;
};
