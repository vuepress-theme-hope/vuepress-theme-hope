import { LastUpdateOption } from "../types";
import { PluginOptionAPI } from "@mr-hope/vuepress-types";
import getTime from "./time";
import dayjs = require("dayjs");
import localizedFormat = require("dayjs/plugin/localizedFormat");
import "dayjs/locale/en";
import "dayjs/locale/zh";
import "dayjs/locale/zh-cn";

dayjs.extend(localizedFormat);

const getLang = (lang: string): string => {
  const langcode = lang.toLowerCase();

  return langcode === "en-us" || langcode === "en-uk" ? "en" : langcode;
};

const defaultTransformer = (timestamp: number, lang: string): string => {
  dayjs.locale(getLang(lang));

  return `${dayjs(timestamp).format("LL")} ${dayjs(timestamp).format("HH:mm")}`;
};

export = (options: LastUpdateOption): PluginOptionAPI => ({
  name: "last-updated",

  extendPageData($page): void {
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
