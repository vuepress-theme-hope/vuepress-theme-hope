import {
  deepAssign,
  entries,
  fromEntries,
  isPlainObject,
} from "@vuepress/helper";
import type { FeedPluginOptions } from "@vuepress/plugin-feed";
import type { Plugin } from "vuepress/core";
import { colors } from "vuepress/utils";
import { getAuthor } from "vuepress-shared/node";

import type { ThemeData } from "../../shared/index.js";
import { logger } from "../utils.js";

let feedPlugin: (options: FeedPluginOptions, legacy?: boolean) => Plugin;

try {
  ({ feedPlugin } = await import("@vuepress/plugin-feed"));
} catch (e) {
  // Do nothing
}

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-feed
 */
export const getFeedPlugin = (
  themeData: ThemeData,
  options?: Omit<FeedPluginOptions, "hostname"> | boolean | undefined,
  hostname?: string,
  favicon?: string,
  legacy = false,
): Plugin | null => {
  // Disable feed if feed is disabled or no options for feed plugin
  if (!options) return null;

  if (!feedPlugin) {
    logger.error(`${colors.cyan("@vuepress/plugin-feed")} is not installed!`);

    return null;
  }

  const globalAuthor = getAuthor(themeData.author);

  const defaultOptions: FeedPluginOptions = {
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
