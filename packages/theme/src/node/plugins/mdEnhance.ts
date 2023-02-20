import { type Plugin } from "@vuepress/core";
import {
  type MarkdownEnhanceOptions,
  mdEnhancePlugin,
} from "vuepress-plugin-md-enhance";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-md-enhance
 */
export const getMdEnhancePlugin = (
  options?: Partial<MarkdownEnhanceOptions> | false,
  legacy = true
): Plugin | null => {
  if (options === false) return null;

  return mdEnhancePlugin(
    {
      container: true,
      ...(options || {}),
    },
    legacy
  );
};
