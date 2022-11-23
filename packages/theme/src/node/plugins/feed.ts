import { feedPlugin } from "vuepress-plugin-feed2";
import { deepAssign } from "vuepress-shared/node";

import type { Plugin } from "@vuepress/core";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { HopeThemeConfig } from "../../shared/index.js";

export const getFeedPlugin = (
  themeConfig: HopeThemeConfig,
  options?: Omit<FeedOptions, "hostname">,
  hostname?: string,
  legacy = false
): Plugin | null => {
  // disable feed if no options for feed plugin
  if (!Object.keys(options || {}).length) return null;

  return feedPlugin(
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
          // @vuepress/plugin-external-link
          "ExternalLinkIcon",

          // vuepress-plugin-components
          "Badge",
          "BiliBili",
          "CodePen",
          "PDF",
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
          ...(options?.customElements || []),
        ],
      }
    ),
    legacy
  );
};
