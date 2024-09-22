import type { MarkdownHintPluginOptions } from "@vuepress/plugin-markdown-hint";
import { markdownHintPlugin } from "@vuepress/plugin-markdown-hint";
import type { Plugin } from "vuepress/core";
import { isPlainObject } from "vuepress/shared";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-markdown-hint
 */
export const getMarkdownHintPlugin = (
  options?: MarkdownHintPluginOptions | boolean,
): Plugin | null =>
  options === false
    ? null
    : markdownHintPlugin(isPlainObject(options) ? options : { hint: true });
