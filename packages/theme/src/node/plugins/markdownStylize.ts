import { markdownStylizePlugin } from "@vuepress/plugin-markdown-stylize";
import type { Plugin } from "vuepress/core";

import type { MarkdownOptions } from "../../shared/index.js";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-markdown-stylize
 */
export const getMarkdownStylizePlugin = ({
  stylize = [],
  ...options
}: MarkdownOptions): Plugin | null =>
  markdownStylizePlugin({
    ...options,
    custom: stylize,
  });
