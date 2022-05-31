import { feedPlugin } from "vuepress-plugin-feed2";
import { deepAssign } from "vuepress-shared";

import type { Plugin } from "@vuepress/core";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { HopeThemeConfig } from "../../shared";

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
        author: themeConfig.author,
        locales: Object.entries(themeConfig.locales).map(
          ([localePath, { author, copyright }]) => [
            localePath,
            { author, channel: { copyright } },
          ]
        ),
        customElements: [
          "ExternalLinkIcon",
          "Badge",
          "ChartJS",
          "CodeDemo",
          "CodeTabs",
          "FlowChart",
          "Mermaid",
          "Presentation",
        ],
      },
      options || {}
    ),
    legacy
  );
};
