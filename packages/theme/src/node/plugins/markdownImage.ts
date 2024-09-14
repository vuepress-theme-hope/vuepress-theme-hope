import { isPlainObject } from "@vuepress/helper";
import type { MarkdownImagePluginOptions } from "@vuepress/plugin-markdown-image";
import { markdownImagePlugin } from "@vuepress/plugin-markdown-image";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-markdown-image
 */
export const getMarkdownImagePlugin = (
  options?: Partial<MarkdownImagePluginOptions> | boolean,
): Plugin | null =>
  options === false
    ? null
    : markdownImagePlugin(
        isPlainObject(options)
          ? options
          : {
              figure: true,
              lazyload: true,
            },
      );
