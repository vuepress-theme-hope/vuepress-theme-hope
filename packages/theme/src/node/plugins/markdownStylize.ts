import { markdownStylizePlugin } from "@vuepress/plugin-markdown-stylize";
import type { Plugin } from "vuepress/core";

import type { ThemeMarkdownOptions } from "../typings/index.js";

/**
 * Resolve options for `@vuepress/plugin-markdown-stylize`
 *
 * @param options - Theme markdown options
 * @returns Markdown stylize plugin instance
 */
export const getMarkdownStylizePlugin = ({
  stylize = [],
  ...options
}: ThemeMarkdownOptions): Plugin | null =>
  markdownStylizePlugin({
    ...options,
    custom: stylize,
  });
