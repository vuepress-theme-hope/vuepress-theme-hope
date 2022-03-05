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

  return feed({
    hostname: themeConfig.hostname,
    author: themeConfig.author,
    ...(options || {}),
  } as FeedOptions);
};
