import { copyCode } from "vuepress-plugin-copy-code2";

import type { PluginConfig } from "@vuepress/core";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import type { HopeThemeConfig } from "../../shared";
export const resolveCopyCodePlugin = (
  themeData: HopeThemeConfig,
  options?: CopyCodeOptions | false
): PluginConfig => {
  if (options === false) return ["", false];

  return copyCode({
    selector: '.theme-hope-content div[class*="language-"] pre',
    pure: themeData.pure,
    ...options,
  });
};
