import { LastUpdateOption } from "../types";
import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import getTime from "./time";
import dayjs = require("dayjs");
import localizedFormat = require("dayjs/plugin/localizedFormat");
import utc = require("dayjs/plugin/utc"); // dependent on utc plugin
import timezone = require("dayjs/plugin/timezone");
import "dayjs/locale/en";
import "dayjs/locale/zh";
import "dayjs/locale/zh-cn";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const getLang = (lang: string): string => {
  const langcode = lang.toLowerCase();

  return langcode === "en-us" || langcode === "en-uk" ? "en" : langcode;
};

const defaultTransformer = (
  timestamp: number,
  lang: string,
  timezone?: string
): string => {
  dayjs.locale(getLang(lang));
  if (timezone) dayjs.tz.setDefault(timezone);

  return `${dayjs(timestamp).format("LL")} ${dayjs(timestamp).format("HH:mm")}`;
};

export = (
  options: LastUpdateOption,
  { themeConfig }: Context
): PluginOptionAPI => ({
  name: "last-updated",

  extendPageData($page): void {
    const { transformer } = options;
    const timestamp = getTime($page._filePath);
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
