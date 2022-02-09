import type { SitemapOptions } from "vuepress-plugin-sitemap2";
import type { HopeThemeConfig } from "../../shared";

export const resolveSitemapOptions = (
  themeConfig: HopeThemeConfig,
  options?: Omit<SitemapOptions, "hostname"> | false
): SitemapOptions | false => {
  if (options === false) return false;

  // disable feed if `hostname` is not set and no options for feed plugin
  if (!Object.keys(options || {}).length && !themeConfig.hostname) return false;

  return {
    hostname: themeConfig.hostname,
    ...(options || {}),
  } as SitemapOptions;
};
