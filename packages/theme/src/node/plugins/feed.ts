import type { FeedOptions } from "vuepress-plugin-feed2";
import type { HopeThemeConfig } from "../../shared";

export const resolveFeedOptions = (
  themeConfig: HopeThemeConfig,
  options?: Partial<FeedOptions> | false
): FeedOptions | false => {
  if (options === false) return false;

  // disable feed if `hostname` is not set and no options for feed plugin
  if (!Object.keys(options || {}).length && !themeConfig.hostname) return false;

  return {
    hostname: themeConfig.hostname,
    ...(options || {}),
  } as FeedOptions;
};
