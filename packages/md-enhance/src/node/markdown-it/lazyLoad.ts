import type { PluginSimple } from "markdown-it";

export const lazyLoad: PluginSimple = (md) => {
  const originalImageRender = md.renderer.rules.image!;

  md.renderer.rules.image = (tokens, idx, options, env, self): string => {
    tokens[idx].attrSet("loading", "lazy");

    return originalImageRender(tokens, idx, options, env, self);
  };
};
