import { getDate } from "@vuepress/helper";
import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { Page } from "vuepress/core";

import { dayjs, getLocale } from "./dayjs/index.js";

export const getDateString = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD");

export const getTimeString = (date: Date): string =>
  dayjs(date).format("HH:mm:ss");

export const getFullDateString = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD HH:mm:ss");

export interface DateOptions {
  /**
   * @default "en"
   */
  lang?: string;
  /**
   * Timezone
   */
  timezone?: string;
  /**
   * @default "full"
   */
  type?: "date" | "time" | "full";
}

export const timeTransformer = (
  date: string | Date | undefined,
  options: DateOptions = {},
): string | null => {
  const result = getDate(date);

  if (result) {
    const { lang, timezone, type } = options;

    dayjs.locale(getLocale(lang));

    const parsed = timezone
      ? dayjs(result.toISOString()).tz(timezone)
      : dayjs(result);
    const isDate =
      parsed.hour() === 0 &&
      parsed.minute() === 0 &&
      parsed.second() === 0 &&
      parsed.millisecond() === 0;

    return parsed.format(
      type === "date"
        ? "LL"
        : type === "time"
          ? "HH:ss"
          : isDate
            ? "LL"
            : "LLL",
    );
  }

  return null;
};

export const injectLocalizedDate = (
  page: Page<{ localizedDate?: string | null } & Partial<GitPluginPageData>>,
): void => {
  if (!page.data.localizedDate)
    if (page.frontmatter.date) {
      const date = getDate(page.frontmatter.date);

      if (date)
        page.data.localizedDate = timeTransformer(date, {
          lang: page.lang,
          type: "date",
        });
    } else if (page.data.git?.createdTime) {
      page.data.localizedDate = timeTransformer(
        new Date(page.data.git?.createdTime),
        {
          lang: page.lang,
          type: "date",
        },
      );
    }
};
