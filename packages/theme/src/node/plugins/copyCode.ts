import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { HopeThemeConfig } from "../../shared";
export const resolveCopyCodeOptions = (
  themeData: HopeThemeConfig,
  options?: CopyCodeOptions | false
): CopyCodeOptions | false =>
  options === false
    ? false
    : {
        selector: '.theme-hope-content div[class*="language-"] pre',
        pure: themeData.pure,
        ...options,
      };
