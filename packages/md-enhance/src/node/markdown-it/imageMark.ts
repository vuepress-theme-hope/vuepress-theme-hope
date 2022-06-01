import type { PluginWithOptions } from "markdown-it";

import type { ImageMarkOptions } from "../../shared";

export const imageMark: PluginWithOptions<ImageMarkOptions> = (
  md,
  {
    light = ["gh-light-mode-only", "light"],
    dark = ["gh-dark-mode-only", "dark"],
  } = {}
): void => {
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
