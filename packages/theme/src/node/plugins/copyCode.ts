import type { Plugin } from "@vuepress/core";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-copy-code2
 */
export const getCopyCodePlugin = (
  options?: CopyCodeOptions | false,
): Plugin | null => {
  if (options === false) return null;

  return copyCodePlugin({
    selector: '.theme-hope-content div[class*="language-"] pre',
    ...options,
  });
};
