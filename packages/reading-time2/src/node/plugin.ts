import { getLocales } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";
import { readingTime } from "./reading-time";

import type { Page, Plugin } from "@vuepress/core";
import type { ReadingTime, ReadingTimeOptions } from "../shared";

/** Reading time plugin */
export const readingTimePlugin: Plugin<ReadingTimeOptions> = (options, app) => {
  return {
    name: "vuepress-plugin-reading-time2",

    define: (): Record<string, unknown> => ({
      READING_TIME_I18N: getLocales(app, i18n, options.locales),
    }),

    extendsPage: (page: Page<{ readingTime: ReadingTime }>): void => {
      page.data.readingTime = readingTime(
        page.content,
        options.wordPerminute ||
          (app.options.themeConfig.wordPerminute as number) ||
          300
      );
    },
  };
};
