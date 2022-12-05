import type { PluginSimple } from "markdown-it";

export const imageTitle: PluginSimple = (md): void => {
  const originalImageRender = md.renderer.rules.image!;

  md.renderer.rules.image = (tokens, index, options, env, self): string => {
    const token = tokens[index];
    const title = token.attrGet("title");

    const result = originalImageRender(tokens, index, options, env, self);

    return title
      ? `<figure>${result}<figcaption>${title}</figcaption></figure>`
      : result;
  };
};
