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

  md.renderer.rules.image = (tokens, index, options, env, self): string => {
    const token = tokens[index];
    const src = token.attrGet("src");

    if (src) {
      if (light.some((item) => src.endsWith(`#${item}`))) {
        token.attrSet("data-mode", "lightmode-only");
        token.attrSet("src", src.replace(/#.*?$/, ""));
      } else if (dark.some((item) => src.endsWith(`#${item}`))) {
        token.attrSet("data-mode", "darkmode-only");
        token.attrSet("src", src.replace(/#.*?$/, ""));
      }
    }

    return originalImageRender(tokens, index, options, env, self);
  };
};
