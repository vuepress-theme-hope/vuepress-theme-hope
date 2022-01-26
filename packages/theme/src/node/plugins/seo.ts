import type { SeoOptions } from "vuepress-plugin-seo2";
import type { HopeThemeOptions } from "../../shared";

export const resolveSEOOptions = (
  themeConfig: HopeThemeOptions,
  options?: SeoOptions | false
): SeoOptions | false => {
  if (options === false) return false;

  // disable feed if `hostname` is not set and no options for feed plugin
  if (!Object.keys(options || {}).length && !themeConfig.hostname) return false;

  return {
    hostname: themeConfig.hostname,
    ...(options || {}),
  } as SeoOptions;
};
