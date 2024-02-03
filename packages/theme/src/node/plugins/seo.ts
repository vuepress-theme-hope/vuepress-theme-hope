import { isPlainObject, keys } from "@vuepress/helper";
import { seoPlugin } from "@vuepress/plugin-seo";
import type { Page, Plugin } from "vuepress/core";

import type { PluginsOptions, ThemeData } from "../../shared/index.js";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-seo
 */
export const getSEOPlugin = (
  themeData: ThemeData,
  { seo }: PluginsOptions,
  hostname = "",
): Plugin | null => {
  if (seo === false) return null;
  const seoOptions = isPlainObject(seo) ? seo : {};

  // Disable seo if `hostname` is not set and no options for seo plugin
  if (!keys(seoOptions).length && !hostname) return null;

  return seoPlugin({
    hostname,
    ...(themeData.author ? { author: themeData.author } : {}),
    isArticle: ({ filePathRelative, frontmatter }: Page): boolean =>
      Boolean(filePathRelative) &&
      !frontmatter["home"] &&
      frontmatter["article"] !== false,
    ...seoOptions,
  });
};
