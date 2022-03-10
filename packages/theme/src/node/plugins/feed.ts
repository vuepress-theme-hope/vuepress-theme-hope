import { deepAssign } from "@mr-hope/vuepress-shared";
import { feed } from "vuepress-plugin-feed2";

import type { PluginConfig } from "@vuepress/core";
import type { FeedOptions } from "vuepress-plugin-feed2";
import type { HopeThemeConfig } from "../../shared";

export const resolveFeedPlugin = (
  themeConfig: HopeThemeConfig,
  options?: Omit<FeedOptions, "hostname"> | false
): PluginConfig => {
  if (
    options === false ||
    // disable feed if no options for feed plugin
    !Object.keys(options || {}).length
  )
    return ["", false];

  return feed(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deepAssign(
      {
        hostname: themeConfig.hostname,
        author: themeConfig.author,
        locales: Object.entries(themeConfig.locales).map(
          ([localePath, { author, copyright }]) => [
            localePath,
            { author, channel: { copyright } },
          ]
        ),
      },
      options || {}
    )
  );
};
