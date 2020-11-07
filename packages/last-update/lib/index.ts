import { defaultTransformer, getGitLastUpdatedTimeStamp } from "./time";
import { LastUpdateOptions } from "../types";
import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";

export = (
  options: LastUpdateOptions,
  { themeConfig }: Context
): PluginOptionAPI => ({
  name: "last-updated",

  extendPageData($page): void {
    const { transformer } = options;
    const timestamp = getGitLastUpdatedTimeStamp($page._filePath);
    const { $lang } = $page._computed;

    if (timestamp) {
      const lastUpdated =
        typeof transformer === "function"
          ? transformer(timestamp, $lang)
          : typeof themeConfig.lastUpdate === "function"
          ? themeConfig.lastUpdate
          : defaultTransformer(timestamp, $lang, options.timezone);

      $page.lastUpdated = lastUpdated;
      $page.lastUpdatedTime = timestamp;
    }
  },
});
