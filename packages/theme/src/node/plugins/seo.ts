import type { SeoOptions } from "vuepress-plugin-seo2";
import type { HopeThemeConfig } from "../../shared";

export const resolveSEOOptions = (
  themeConfig: HopeThemeConfig,
  options?: Omit<SeoOptions, "hostname"> | false
): SeoOptions | false => {
  if (options === false) return false;

  // disable feed if `hostname` is not set and no options for feed plugin
  if (!Object.keys(options || {}).length && !themeConfig.hostname) return false;

  return {
    hostname: themeConfig.hostname,
    ...(options || {}),
  } as SeoOptions;
};
