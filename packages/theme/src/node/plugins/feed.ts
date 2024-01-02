import type { Plugin } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import type { FeedOptions } from "vuepress-plugin-feed2";
import {
  deepAssign,
  entries,
  fromEntries,
  getAuthor,
  isPlainObject,
  keys,
} from "vuepress-shared/node";

import type { ThemeData } from "../../shared/index.js";
import { logger } from "../utils.js";

let feedPlugin: (options: FeedOptions, legacy?: boolean) => Plugin;

try {
  ({ feedPlugin } = await import("vuepress-plugin-feed2"));
} catch (e) {
  // do nothing
}

/**
 * @private
 *
 * Resolve options for vuepress-plugin-feed2
 */
export const getFeedPlugin = (
  themeData: ThemeData,
  options: Omit<FeedOptions, "hostname"> | boolean = false,
  hostname?: string,
  favicon?: string,
  legacy = false,
): Plugin | null => {
  // disable feed if feed is disabled or no options for feed plugin
  if (options === false || (isPlainObject(options) && keys(options).length))
    return null;

  if (!feedPlugin) {
    logger.error(`${colors.cyan("vuepress-plugin-feed2")} is not installed!`);

    return null;
  }

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

  return feedPlugin(
    deepAssign(
      defaultOptions,
      isPlainObject(options) ? options : { rss: true },
    ),
    legacy,
  );
};
