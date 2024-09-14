import { isPlainObject } from "@vuepress/helper";
import type { MarkdownMathPluginOptions } from "@vuepress/plugin-markdown-math";
import { markdownMathPlugin } from "@vuepress/plugin-markdown-math";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-markdown-math
 */
export const getMarkdownMathPlugin = (
  options?: Partial<MarkdownMathPluginOptions> | boolean,
): Plugin | null =>
  isPlainObject(options)
    ? markdownMathPlugin(options)
    : options
      ? markdownMathPlugin()
      : null;
