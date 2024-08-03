import { load } from "js-yaml";
import type { Options, PluginSimple } from "markdown-it";
import type { RenderRule } from "markdown-it/lib/renderer.mjs";
import type Token from "markdown-it/lib/token.mjs";
import type { MarkdownEnv } from "vuepress/markdown";

import { stringifyProp } from "./utils.js";
import { logger } from "../utils.js";

const getComponentRender =
  (name: string): RenderRule =>
  (
    tokens: Token[],
    index: number,
    _options: Options,
    { filePathRelative }: MarkdownEnv,
  ): string => {
    const token = tokens[index];
    const { content } = token;

    let config: unknown = null;

    if (content.trim().startsWith("{"))
      try {
        config = JSON.parse(content) as unknown;
      } catch {
        // Do nothing
      }
    else
      try {
        config = load(content);
      } catch {
        // Do nothing
      }

    if (config) return `<${name} v-bind='${stringifyProp(config)}' />`;

    logger.error(
      `Invalid ${name} config${
        filePathRelative ? ` found in ${filePathRelative}` : ""
      }:
${content}
`,
    );

    return "";
  };

export const component: PluginSimple = (md) => {
  // Handle ```component  blocks
  const { fence } = md.renderer.rules;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const { info } = tokens[index];

    const [fenceName, componentName] = info.split(" ", 2);

    if (fenceName === "component") {
      const render = getComponentRender(componentName);

      return render(...args);
    }

    return fence!(...args);
  };
};
