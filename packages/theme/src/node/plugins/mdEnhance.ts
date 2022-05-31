import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

import type { Plugin } from "@vuepress/core";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";

export const getMdEnhancePlugin = (
  options?: Partial<MarkdownEnhanceOptions> | false,
  legacy = false
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
