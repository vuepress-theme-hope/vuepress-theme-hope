import { basename, dirname } from "path";
import execa = require("execa");
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

/**
 * Get unix timestamp in milliseconds of the first commit
 */
export const getCreatedTimeStamp = async (
  filePath: string
): Promise<number> => {
  const { stdout } = await execa(
    "git",
    [
      "--no-pager",
      "log",
      "--diff-filter=A",
      "--format=%at",
      basename(filePath),
    ],
    { cwd: dirname(filePath) }
  );

  return Number.parseInt(stdout, 10) * 1000;
};
/**
 * Get unix timestamp in milliseconds of the last commit
 */
export const getUpdatedTimeStamp = async (
  filePath: string
): Promise<number> => {
  const { stdout } = await execa(
    "git",
    ["--no-pager", "log", "-1", "--format=%at", basename(filePath)],
    { cwd: dirname(filePath) }
  );

  return Number.parseInt(stdout, 10) * 1000;
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
