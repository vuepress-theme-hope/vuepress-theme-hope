import { markdownStylizePlugin } from "@vuepress/plugin-markdown-stylize";
import type { Plugin } from "vuepress/core";

import type { ThemeMarkdownOptions } from "../typings/index.js";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-markdown-stylize
 */
export const getMarkdownStylizePlugin = ({
  stylize = [],
  ...options
}: ThemeMarkdownOptions): Plugin | null =>
  markdownStylizePlugin({
    ...options,
    custom: stylize,
  });
