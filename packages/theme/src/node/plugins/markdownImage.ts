import { markdownImagePlugin } from "@vuepress/plugin-markdown-image";
import type { Plugin } from "vuepress/core";

import type { MarkdownOptions } from "../../shared/index.js";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-markdown-image
 */
export const getMarkdownImagePlugin = (
  options: MarkdownOptions,
): Plugin | null =>
  markdownImagePlugin({
    figure: options.figure ?? false,
    lazyload: options.imgLazyload ?? false,
    mark: options.imgMark ?? false,
    size: options.imgSize ?? false,
    obsidianSize: options.obsidianImgSize ?? false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    legacySize: options.legacyImgSize ?? false,
  });
