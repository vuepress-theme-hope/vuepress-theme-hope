import { isPlainObject, keys } from "@vuepress/helper";
import type { SeoPluginOptions } from "@vuepress/plugin-seo";
import { seoPlugin } from "@vuepress/plugin-seo";
import type { Page, Plugin } from "vuepress/core";

import type { ThemeData } from "../../shared/index.js";

/**
 * Resolve options for `@vuepress/plugin-seo`
 *
 * @param themeData - theme data
 * @param seo - options for `@vuepress/plugin-seo`
 * @param hostname - hostname of current site
 *
 * @returns SEO plugin instance or null
 */
export const getSEOPlugin = (
  themeData: ThemeData,
  seo?: Omit<SeoPluginOptions, "hostname" | "author"> | boolean,
  hostname = "",
): Plugin | null => {
  if (seo === false) return null;
  const seoOptions = isPlainObject(seo) ? seo : {};

  // Disable seo if `hostname` is not set and no options for seo plugin
  if (keys(seoOptions).length === 0 && !hostname) return null;

  const author = themeData.author ?? themeData.locales["/"].author;

  return seoPlugin({
    hostname,
    author,
    isArticle: ({ filePathRelative, frontmatter }: Page): boolean =>
      (frontmatter.article as boolean | undefined) ??
      (Boolean(filePathRelative) && !frontmatter.home),
    ...seoOptions,
  });
};
