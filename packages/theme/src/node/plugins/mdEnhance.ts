import type { Plugin } from "vuepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

import type { ThemeMarkdownOptions } from "../typings/index.js";

export const getMdEnhancePlugin = (
  {
    demo = false,
    playground,
    sandpack = false,
    vuePlayground = false,
    kotlinPlayground = false,
  }: ThemeMarkdownOptions,
  compact: boolean,
): Plugin | null => {
  if (
    !demo &&
    !playground &&
    !sandpack &&
    !vuePlayground &&
    !kotlinPlayground
  ) {
    return null;
  }

  return mdEnhancePlugin(
    {
      demo,
      kotlinPlayground,
      playground,
      sandpack,
      vuePlayground,
    },
    compact,
  );
};
