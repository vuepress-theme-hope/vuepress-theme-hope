import { isPlainObject } from "@vuepress/helper";
import type { MarkdownTabPluginOptions } from "@vuepress/plugin-markdown-tab";
import { markdownTabPlugin } from "@vuepress/plugin-markdown-tab";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-markdown-tab
 */
export const getMarkdownTabPlugin = (
  options?: Partial<MarkdownTabPluginOptions> | boolean,
): Plugin | null =>
  isPlainObject(options)
    ? markdownTabPlugin(options)
    : options
      ? markdownTabPlugin({ codeTabs: true, tabs: true })
      : null;
