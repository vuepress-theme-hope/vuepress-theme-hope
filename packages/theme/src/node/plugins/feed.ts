import { deepAssign } from "@mr-hope/vuepress-shared";
import { feedPlugin } from "vuepress-plugin-feed2";

import type { Plugin } from "@vuepress/core";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { HopeThemeConfig } from "../../shared";

export const getFeedPlugin = (
  hostname: string,
  themeConfig: HopeThemeConfig,
  options?: Omit<FeedOptions, "hostname"> | false
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
          "CodeGroup",
          "CodeGroupItem",
          "FlowChart",
          "Mermaid",
          "Presentation",
        ],
      },
      options || {}
    )
  );
};
