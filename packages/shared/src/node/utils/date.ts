import { dayjs, getLocale } from "./dayjs/";
import { getDate } from "../../shared";

import type { Page } from "@vuepress/core";
import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { DateOptions } from "../../shared";

export const timeTransformer = (
  date: string | Date | undefined,
  options: DateOptions = {}
): string | null => {
  const result = getDate(date, options.timezone);

  if (result) {
    const { lang, timezone, type = result.type } = options;

    dayjs.locale(getLocale(lang));

    const parsed = timezone
      ? dayjs(result.value).tz(timezone)
      : dayjs(result.value);

    return parsed.format(
      type === "date" ? "LL" : type === "time" ? "HH:mm" : "LLL"
    );
  }

  return null;
};

export const injectLocalizedDate = (
  page: Page<{ localizedDate?: string | null } & Partial<GitPluginPageData>>,
  options: DateOptions
): void => {
  if (!page.data.localizedDate) {
    if (page.frontmatter.date) {
      const date = getDate(page.frontmatter.date, options.timezone)?.value;

      if (date) page.data.localizedDate = timeTransformer(date, options);
    } else if (page.data.git?.createdTime)
      page.data.localizedDate = timeTransformer(
        new Date(page.data.git?.createdTime),
        options
      );
  }
};
