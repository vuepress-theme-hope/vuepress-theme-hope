import { copyCodePlugin } from "vuepress-plugin-copy-code2";

import type { Plugin } from "@vuepress/core";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { HopeThemeConfig } from "../../shared";
export const getCopyCodePlugin = (
  themeData: HopeThemeConfig,
  options?: CopyCodeOptions | false
): Plugin | null => {
  if (options === false) return null;

  return copyCodePlugin({
    selector: '.theme-hope-content div[class*="language-"] pre',
    pure: themeData.pure,
    ...options,
  });
};
