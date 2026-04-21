import { markdownImagePlugin } from "@vuepress/plugin-markdown-image";
import type { Plugin } from "vuepress/core";

import type { ThemeMarkdownOptions } from "../typings/index.js";

/**
 * Resolve options for `@vuepress/plugin-markdown-image`
 *
 * @param options - Theme markdown options
 * @returns Markdown image plugin instance or null
 */
export const getMarkdownImagePlugin = (options: ThemeMarkdownOptions): Plugin | null =>
  markdownImagePlugin({
    figure: options.figure ?? false,
    lazyload: options.imgLazyload ?? false,
    mark: options.imgMark ?? false,
    size: options.imgSize ?? false,
    obsidianSize: options.obsidianImgSize ?? false,
    // oxlint-disable-next-line typescript/no-deprecated
    legacySize: options.legacyImgSize ?? false,
  });
