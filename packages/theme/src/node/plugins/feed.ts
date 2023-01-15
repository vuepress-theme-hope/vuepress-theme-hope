import { feedPlugin } from "vuepress-plugin-feed2";
import { deepAssign } from "vuepress-shared/node";

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
  options?: Omit<FeedOptions, "hostname">,
  hostname?: string,
  legacy = false
): Plugin | null => {
  // disable feed if no options for feed plugin
  if (!Object.keys(options || {}).length) return null;

  const { removedElements } = options || {};

  return feedPlugin(
    // @ts-ignore
    deepAssign(
      {
        hostname,
        ...(themeData.author ? { author: themeData.author } : {}),
        locales: Object.entries(themeData.locales).map(
          ([localePath, { author, copyright }]) => [
            localePath,
            { author, channel: { copyright } },
          ]
        ),
      },
      options || {},
      {
        removedElements: isFunction(removedElements)
          ? (tagName: string): boolean =>
              themeComponents.includes(tagName) || removedElements(tagName)
          : [...themeComponents, ...(removedElements || [])],
      }
    ),
    legacy
  );
};
