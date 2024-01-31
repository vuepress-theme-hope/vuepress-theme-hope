import { parseDate } from "@vuepress/helper/node";
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
   * timezone
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
  const result = parseDate(date);

  if (result?.value) {
    const { lang, timezone, type = result.type } = options;

    dayjs.locale(getLocale(lang));

    console.log(
      result.value.toISOString(),
      timezone ? dayjs(result.value.toISOString()).tz(timezone) : "",
    );

    const parsed = timezone
      ? dayjs(result.value.toISOString()).tz(timezone)
      : dayjs(result.value);

    return parsed.format(
      type === "date" ? "LL" : type === "time" ? "HH:mm" : "LLL",
    );
  }

  return null;
};

export const injectLocalizedDate = (
  page: Page<{ localizedDate?: string | null } & Partial<GitPluginPageData>>,
): void => {
  if (!page.data.localizedDate)
    if (page.frontmatter.date) {
      const date = parseDate(page.frontmatter.date)?.value;

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
