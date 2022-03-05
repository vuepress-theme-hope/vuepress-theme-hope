import { mdEnhance } from "vuepress-plugin-md-enhance";

import type { PluginConfig } from "@vuepress/core";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";

export const resolveMdEnhancePlugin = (
  options?: Partial<MarkdownEnhanceOptions> | false
): PluginConfig => {
  if (options === false) return ["", false];

  return mdEnhance({
    container: true,
    ...(options || {}),
  });
};
