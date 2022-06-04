import { getLocales } from "vuepress-shared";

import { readingTimeLocales } from "./locales";
import { getReadingTime } from "./readingTime";
import { logger } from "./utils";

import type { Page, PluginFunction } from "@vuepress/core";
import type { ReadingTime, ReadingTimeOptions } from "../shared";

/** Reading time plugin */
export const readingTimePlugin =
  (options: ReadingTimeOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

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
