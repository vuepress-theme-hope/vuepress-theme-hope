import { feedPlugin } from "vuepress-plugin-feed2";
import { deepAssign } from "vuepress-shared/node";

import type { Plugin } from "@vuepress/core";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { HopeThemeConfig } from "../../shared/index.js";

export const getFeedPlugin = (
  themeConfig: HopeThemeConfig,
  options?: Omit<FeedOptions, "hostname"> | false,
  hostname?: string,
  legacy = false
): Plugin | null => {
  if (
    options === false ||
    // disable feed if no options for feed plugin
    !Object.keys(options || {}).length
  )
    return null;

  return feedPlugin(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deepAssign(
      {
        hostname,
        ...(themeConfig.author ? { author: themeConfig.author } : {}),
        locales: Object.entries(themeConfig.locales).map(
          ([localePath, { author, copyright }]) => [
            localePath,
            { author, channel: { copyright } },
          ]
        ),
      },
      options || {},
      {
        customElements: [
          "ExternalLinkIcon",
          "Badge",
          "Bilibili",
          "ChartJS",
          "CodeDemo",
          "CodePen",
          "CodeTabs",
          "ECharts",
          "FlowChart",
          "Mermaid",
          "PDF",
          "Playground",
          "Presentation",
          "StackBlitz",
          "Tabs",
          "VideoPlayer",
          "VuePlayground",
          "YouTube",
          ...(options?.customElements || []),
        ],
      }
    ),
    legacy
  );
};
