import type { PluginSimple } from "markdown-it";

export const imageTitle: PluginSimple = (
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
    const title = token.attrGet("title");

    if (src) {
      if (light.some((item) => src.endsWith(`#${item}`))) {
        token.attrSet("data-mode", "lightmode-only");
        token.attrSet("src", src.replace(/#.*?$/, ""));
      } else if (dark.some((item) => src.endsWith(`#${item}`))) {
        token.attrSet("data-mode", "darkmode-only");
        token.attrSet("src", src.replace(/#.*?$/, ""));
      }
    }

    const result = originalImageRender(tokens, index, options, env, self);

    return title
      ? `<figure>${result}<figcaption>${title}</figcaption></figure>`
      : result;
  };
};
