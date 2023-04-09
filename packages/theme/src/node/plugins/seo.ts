import { type Page, type Plugin } from "@vuepress/core";
import { seoPlugin } from "vuepress-plugin-seo2";
import { isPlainObject, keys } from "vuepress-shared/node";

import { type PluginsOptions, type ThemeData } from "../../shared/index.js";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-seo2
 */
export const getSEOPlugin = (
  themeData: ThemeData,
  { seo }: PluginsOptions,
  hostname = "",
  legacy = false
): Plugin | null => {
  if (seo === false) return null;
  const seoOptions = isPlainObject(seo) ? seo : {};

  // disable seo if `hostname` is not set and no options for seo plugin
  if (!keys(seoOptions).length && !hostname) return null;

  return seoPlugin(
    {
      hostname,
      ...(themeData.author ? { author: themeData.author } : {}),
      isArticle: ({ filePathRelative, frontmatter }: Page): boolean =>
        Boolean(filePathRelative) &&
        !frontmatter["home"] &&
        frontmatter["article"] !== false,
      ...seoOptions,
    },
    legacy
  );
};
