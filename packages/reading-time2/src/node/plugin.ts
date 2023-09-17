import type { Page, PluginFunction } from "@vuepress/core";
import { checkVersion, getLocales } from "vuepress-shared/node";

import { readingTimeLocales } from "./locales.js";
import type { ReadingTimeOptions } from "./options.js";
import { getReadingTime } from "./readingTime.js";
import { PLUGIN_NAME, logger } from "./utils.js";
import type { ReadingTime } from "../shared/index.js";

/** Reading time plugin */
export const readingTimePlugin =
  (options: ReadingTimeOptions): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.67");

    if (app.env.isDebug) logger.info("Options:", options);

    return {
      name: PLUGIN_NAME,

      define: (app): Record<string, unknown> => ({
        READING_TIME_LOCALES: getLocales({
          app,
          name: PLUGIN_NAME,
          default: readingTimeLocales,
          config: options.locales,
        }),
      }),

      extendsPage: (page: Page<{ readingTime?: ReadingTime }>): void => {
        page.data.readingTime = getReadingTime(
          page.content,
          options.wordPerMinute || 300,
        );
      },
    };
  };
