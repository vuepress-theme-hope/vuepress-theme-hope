import { feedPlugin } from "vuepress-plugin-feed2";
import { deepAssign, getAuthor } from "vuepress-shared/node";

import type { Plugin } from "@vuepress/core";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { ThemeData } from "../../shared/index.js";
import { isFunction } from "@vuepress/shared";

const themeComponents = [
  // @vuepress/plugin-external-link
  "ExternalLinkIcon",

  // vuepress-plugin-components
  "ArtPlayer",
  "AudioPlayer",
  "Badge",
  "BiliBili",
  "Catalog",
  "CodePen",
  "FontIcon",
  "PDF",
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

export const getFeedPlugin = (
  themeData: ThemeData,
  options: Omit<FeedOptions, "hostname"> = {},
  hostname?: string,
  favicon?: string,
  legacy = false
): Plugin | null => {
  // disable feed if no options for feed plugin
  if (!Object.keys(options).length) return null;

  const { removedElements } = options;

  const globalAuthor = getAuthor(themeData.author);

  const defaultOptions: FeedOptions = {
    // @ts-expect-error
    hostname,
    channel: {
      ...(favicon ? { icon: favicon } : {}),
      ...(themeData.locales["/"].logo
        ? {
            image: themeData.locales["/"].logo,
          }
        : {}),
      ...(globalAuthor.length ? { author: globalAuthor[0] } : {}),
    },
    locales: Object.fromEntries(
      Object.entries(themeData.locales).map(
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
