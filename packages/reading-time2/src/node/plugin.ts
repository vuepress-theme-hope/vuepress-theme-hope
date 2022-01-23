import { getLocales } from "@mr-hope/vuepress-shared";
import { readingTimeLocales } from "./locales";
import { readingTime } from "./reading-time";

import type { Page, Plugin } from "@vuepress/core";
import type { ReadingTime, ReadingTimeOptions } from "../shared";

/** Reading time plugin */
export const readingTimePlugin: Plugin<ReadingTimeOptions> = (options, app) => {
  return {
    name: "vuepress-plugin-reading-time2",

    define: (): Record<string, unknown> => ({
      READING_TIME_LOCALES: getLocales(
        app,
        readingTimeLocales,
        options.locales
      ),
    }),

    extendsPage: (page: Page<{ readingTime: ReadingTime }>): void => {
      page.data.readingTime = readingTime(
        page.content,
        options.wordPerminute || 300
      );
    },
  };
};
