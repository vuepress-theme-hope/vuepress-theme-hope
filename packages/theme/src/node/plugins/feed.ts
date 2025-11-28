import {
  deepAssign,
  entries,
  fromEntries,
  isPlainObject,
} from "@vuepress/helper";
import type { FeedPluginOptions } from "@vuepress/plugin-feed";
import type { Plugin } from "vuepress/core";

import { logMissingPkg } from "./utils.js";
import type { ThemeData } from "../../shared/index.js";
import { getAuthor } from "../../shared/index.js";

let feedPlugin:
  | ((options: FeedPluginOptions, legacy?: boolean) => Plugin)
  | null = null;

try {
  ({ feedPlugin } = await import("@vuepress/plugin-feed"));
} catch {
  // Do nothing
}

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-feed
 */
// oxlint-disable-next-line max-params
export const getFeedPlugin = (
  themeData: ThemeData,
  options?: Omit<FeedPluginOptions, "hostname"> | boolean,
  hostname?: string,
  favicon?: string,
  compact = false,
): Plugin | null => {
  // Disable feed if feed is disabled or no options for feed plugin
  if (!options) return null;

  if (!feedPlugin) {
    logMissingPkg("@vuepress/plugin-feed");

    return null;
  }

  const globalAuthor = getAuthor(
    themeData.author ?? themeData.locales["/"].author,
  );

  const defaultOptions: FeedPluginOptions = {
    // @ts-expect-error: hostname may not exist here
    hostname,
    filter: ({ frontmatter, filePathRelative }) =>
      Boolean(
        frontmatter.feed ??
        frontmatter.article ??
        (filePathRelative && !frontmatter.home),
      ),
    channel: {
      icon: favicon,
      image: themeData.locales["/"].logo,
      ...(globalAuthor.length > 0 ? { author: globalAuthor[0] } : {}),
    },
    locales: fromEntries(
      entries(themeData.locales).map(
        ([localePath, { logo, author, copyright }]) => {
          const localeAuthor = getAuthor(author);

          return [
            localePath,
            {
              channel: {
                icon: favicon,
                image: logo,
                ...(localeAuthor.length > 0 ? { author: localeAuthor[0] } : {}),
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
    compact,
  );
};
