/* eslint-disable no-underscore-dangle */
import { Page, PluginOptionAPI } from "vuepress-types";
import { LastUpdateOption } from "../types";
import getTime from "./time";
import moment = require("moment");

const defaultTransformer = (timestamp: number, lang: string): string => {
  moment.locale(lang);

  return `${moment(timestamp).format("LL")} ${moment(timestamp).format(
    "HH:mm"
  )}`;
};

export = (options: LastUpdateOption): PluginOptionAPI => ({
  name: "last-updated",

  extendPageData($page: Page & Record<string, any>): void {
    const { transformer } = options;
    const timestamp = getTime($page._filePath);
    const { $lang } = $page._computed;

    if (timestamp) {
      const lastUpdated =
        typeof transformer === "function"
          ? transformer(timestamp, $lang)
          : defaultTransformer(timestamp, $lang);

      $page.lastUpdated = lastUpdated;
      $page.lastUpdatedTime = timestamp;
    }
  },
});
