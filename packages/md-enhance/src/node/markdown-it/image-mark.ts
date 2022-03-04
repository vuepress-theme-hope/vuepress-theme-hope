/***************************************************
 * Created by nanyuantingfeng on 2020/3/1 10:10. *
 ***************************************************/

import type MarkdownIt = require("markdown-it");
import type { PluginWithOptions } from "markdown-it";

export interface ImageMarkOptions {
  /** lightmode only ids */
  light?: string[];
  /** darkmode only ids */
  dark?: string[];
}

export const imageMark: PluginWithOptions<ImageMarkOptions> = (
  md: MarkdownIt,
  {
    light = ["gh-light-mode-only", "light"],
    dark = ["gh-dark-mode-only", "dark"],
  } = {}
): void => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const originalImageRender = md.renderer.rules.image!;

  md.renderer.rules.image = (tokens, idx, options, env, self): string => {
    const token = tokens[idx];
    const src = token.attrGet("src") || "";

    if (light.some((item) => src.endsWith(`#${item}`))) {
      token.attrSet("data-mode", "lightmode-only");
      token.attrSet("src", src.replace(/#.*?$/, ""));
    }

    if (dark.some((item) => src.endsWith(`#${item}`))) {
      token.attrSet("data-mode", "darkmode-only");
      token.attrSet("src", src.replace(/#.*?$/, ""));
    }

    return originalImageRender(tokens, idx, options, env, self);
  };
};
