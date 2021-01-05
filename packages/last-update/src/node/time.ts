import { basename, dirname } from "path";
import dayjs = require("dayjs");
import localizedFormat = require("dayjs/plugin/localizedFormat");
import utc = require("dayjs/plugin/utc"); // dependent on utc plugin
import timezone = require("dayjs/plugin/timezone");
import spawn = require("cross-spawn");

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

export const getGitLastUpdatedTimeStamp = (
  filePath: string
): number | undefined => {
  try {
    const timestamp = spawn
      .sync("git", ["log", "-1", "--format=%at", basename(filePath)], {
        cwd: dirname(filePath),
      })
      .stdout.toString();

    return parseInt(timestamp) * 1000;
  } catch (err) {
    /* do not handle for now */
    return undefined;
  }
};

export const defaultTransformer = (
  timestamp: number,
  lang: string,
  timezone?: string
): string => {
  dayjs.locale(getLang(lang));

  return timezone
    ? `${dayjs(timestamp).tz(timezone).format("LL")} ${dayjs(timestamp)
        .tz(timezone)
        .format("HH:mm")}`
    : `${dayjs(timestamp).format("LL")} ${dayjs(timestamp).format("HH:mm")}`;
};
