import { type Plugin } from "@vuepress/core";
import { isFunction } from "@vuepress/shared";
import { type FeedOptions, feedPlugin } from "vuepress-plugin-feed2";
import {
  deepAssign,
  entries,
  fromEntries,
  getAuthor,
  keys,
} from "vuepress-shared/node";

import { type ThemeData } from "../../shared/index.js";

const themeComponents = [
  // @vuepress/plugin-external-link
  "ExternalLinkIcon",

  // vuepress-plugin-auto-catalog
  "AutoCatalog",

  // vuepress-plugin-components
  "ArtPlayer",
  "AudioPlayer",
  "Badge",
  "BiliBili",
  "CodePen",
  "FontIcon",
  "PDF",
  "Replit",
  "SiteInfo",
  "StackBlitz",
  "VideoPlayer",
  "YouTube",

  // vuepress-plugin-md-enhance
  "ChartJS",
  "CodeDemo",
  "CodeTabs",
  "ECharts",
  "FlowChart",
  "Mermaid",
  "Playground",
  "Presentation",
  "Tabs",
  "VuePlayground",
];

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
  legacy = true
): Plugin | null => {
  // disable feed if no options for feed plugin
  if (!keys(options).length) return null;

  const { removedElements } = options;

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
        }
      )
    ),
  };

  return feedPlugin(
    deepAssign(defaultOptions, options, {
      // merge removedElements
      removedElements: isFunction(removedElements)
        ? (tagName: string): boolean =>
            themeComponents.includes(tagName) || removedElements(tagName)
        : [...themeComponents, ...(removedElements || [])],
    }),
    legacy
  );
};
