import { seoPlugin } from "vuepress-plugin-seo2";
import { getBlogOptions } from "./blog.js";

import type { Page, Plugin } from "@vuepress/core";
import type { ThemeData, PluginsOptions } from "../../shared/index.js";

export const getSEOPlugin = (
  themeData: ThemeData,
  { blog, seo }: PluginsOptions,
  hostname = "",
  legacy = false
): Plugin | null => {
  if (seo === false) return null;
  const seoOptions = typeof seo === "object" ? seo : {};

  // disable seo if `hostname` is not set and no options for seo plugin
  if (!Object.keys(seoOptions).length && !hostname) return null;

  const blogOptions = getBlogOptions(blog);

  const isArticle = ({
    filePathRelative,
    frontmatter,
    pathLocale,
    path,
  }: Page): boolean => {
    if (!filePathRelative || frontmatter["home"]) return false;

    const localePath = path.replace(new RegExp(`^${pathLocale}`), "/");

    return Object.entries(blogOptions)
      .filter<[string, string]>(
        (item): item is [string, string] => typeof item[1] === "string"
      )
      .every(([, value]) => !localePath.startsWith(value));
  };

  return seoPlugin(
    {
      hostname,
      ...(themeData.author ? { author: themeData.author } : {}),
      isArticle,
      ...seoOptions,
    },
    legacy
  );
};
