import { getLocales } from "@mr-hope/vuepress-shared";
import { readingTimeLocales } from "./locales";
import { getReadingTime } from "./reading-time";

import type { Page, Plugin, PluginConfig } from "@vuepress/core";
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
      page.data.readingTime = getReadingTime(
        page.content,
        options.wordPerminute || 300
      );
    },
  };
};

export const readingTime = (
  options: ReadingTimeOptions | false
): PluginConfig<ReadingTimeOptions> => [readingTimePlugin, options];
