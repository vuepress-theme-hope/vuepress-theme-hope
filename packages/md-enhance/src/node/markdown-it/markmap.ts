import { encodeData } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token.js";

const markmapRender = (tokens: Token[], index: number): string => {
  const token = tokens[index];
  const key = `markmap-${index}`;
  const { content } = token;

  return `<MarkMap id="${key}" content="${encodeData(content)}"></MarkMap>`;
};

export const markmap: PluginSimple = (md) => {
  // Handle ```markmap blocks
  const { fence } = md.renderer.rules;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const { info } = tokens[index];
    const [realInfo] = info.split(":", 2);

    if (realInfo === "markmap") return markmapRender(tokens, index);

    return fence!(...args);
  };

  md.renderer.rules["markmap"] = markmapRender;
};
