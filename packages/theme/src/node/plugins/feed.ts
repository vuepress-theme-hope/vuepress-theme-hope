import type { FeedOptions } from "vuepress-plugin-feed2";
import type { HopeThemeConfig } from "../../shared";

export const resolveFeedOptions = (
  themeConfig: HopeThemeConfig,
  options?: Omit<FeedOptions, "hostname"> | false
): FeedOptions | false => {
  if (options === false) return false;

  // disable feed if no options for feed plugin
  if (!Object.keys(options || {}).length) return false;

  return {
    hostname: themeConfig.hostname,
    author: themeConfig.author,
    ...(options || {}),
  } as FeedOptions;
};
