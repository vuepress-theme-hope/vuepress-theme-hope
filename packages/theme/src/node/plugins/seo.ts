import { isPlainObject, keys } from "@vuepress/helper";
import type { SeoPluginOptions } from "@vuepress/plugin-seo";
import { seoPlugin } from "@vuepress/plugin-seo";
import type { Page, Plugin } from "vuepress/core";

import type { ThemeData } from "../../shared/index.js";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-seo
 */
export const getSEOPlugin = (
  themeData: ThemeData,
  seo?: Omit<SeoPluginOptions, "hostname" | "author"> | boolean,
  hostname = "",
): Plugin | null => {
  if (seo === false) return null;
  const seoOptions = isPlainObject(seo) ? seo : {};

  // Disable seo if `hostname` is not set and no options for seo plugin
  if (!keys(seoOptions).length && !hostname) return null;

  const author = themeData.author ?? themeData.locales["/"].author;

  return seoPlugin({
    hostname,
    ...(author ? { author } : {}),
    isArticle: ({ filePathRelative, frontmatter }: Page): boolean =>
      (frontmatter.article as boolean | undefined) ??
      (Boolean(filePathRelative) && !frontmatter.home),
    ...seoOptions,
  });
};
