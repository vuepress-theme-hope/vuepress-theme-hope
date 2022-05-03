import { getLocales } from "@mr-hope/vuepress-shared";
import { readingTimeLocales } from "./locales";
import { getReadingTime } from "./reading-time";

import type { Page, PluginObject } from "@vuepress/core";
import type { ReadingTime, ReadingTimeOptions } from "../shared";

/** Reading time plugin */
export const readingTimePlugin = (
  options: ReadingTimeOptions
): PluginObject => {
  return {
    name: "vuepress-plugin-reading-time2",

    define: (app): Record<string, unknown> => ({
      READING_TIME_LOCALES: getLocales({
        app,
        name: "reading-time",
        default: readingTimeLocales,
        config: options.locales,
      }),
    }),

    extendsPage: (page: Page<{ readingTime?: ReadingTime }>): void => {
      page.data.readingTime = getReadingTime(
        page.content,
        options.wordPerMinute || 300
      );
    },
  };
};
