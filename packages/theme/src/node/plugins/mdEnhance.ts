import type { Plugin } from "vuepress/core";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-md-enhance
 */
export const getMdEnhancePlugin = (
  options?: Partial<MarkdownEnhanceOptions> | false,
  legacy = false,
): Plugin | null => {
  if (options === false) return null;

  return mdEnhancePlugin(
    {
      hint: true,
      ...(options || {}),
    },
    legacy,
  );
};
