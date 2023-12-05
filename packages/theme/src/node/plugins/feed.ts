import type { Plugin } from "@vuepress/core";
import type { FeedOptions } from "vuepress-plugin-feed2";
import { feedPlugin } from "vuepress-plugin-feed2";
import {
  deepAssign,
  entries,
  fromEntries,
  getAuthor,
  keys,
} from "vuepress-shared/node";

import type { ThemeData } from "../../shared/index.js";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-feed2
 */
export const getFeedPlugin = (
  themeData: ThemeData,
  options: Omit<FeedOptions, "hostname"> = {},
  hostname?: string,
  favicon?: string,
  legacy = false,
): Plugin | null => {
  // disable feed if no options for feed plugin
  if (!keys(options).length) return null;

  const globalAuthor = getAuthor(themeData.author);

  const defaultOptions: FeedOptions = {
    // @ts-expect-error
    hostname,
    channel: {
      ...(favicon ? { icon: favicon } : {}),
      ...(themeData.locales["/"].logo
        ? { image: themeData.locales["/"].logo }
        : {}),
      ...(globalAuthor.length ? { author: globalAuthor[0] } : {}),
    },
    locales: fromEntries(
      entries(themeData.locales).map(
        ([localePath, { logo, author, copyright }]) => {
          const localeAuthor = getAuthor(author);

          return [
            localePath,
            {
              channel: {
                ...(favicon ? { icon: favicon } : {}),
                ...(logo ? { image: logo } : {}),
                ...(localeAuthor.length ? { author: localeAuthor[0] } : {}),
                ...(typeof copyright === "string" ? { copyright } : {}),
              },
            },
          ];
        },
      ),
    ),
  };

  return feedPlugin(deepAssign(defaultOptions, options), legacy);
};
