import { type Page, type PluginFunction } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import { checkVersion, getLocales } from "vuepress-shared/node";

import { readingTimeLocales } from "./locales.js";
import { type ReadingTimeOptions } from "./options.js";
import { getReadingTime } from "./readingTime.js";
import { type ReadingTime } from "./typings/index.js";
import { logger } from "./utils.js";

/** Reading time plugin */
export const readingTimePlugin =
  (options: ReadingTimeOptions): PluginFunction =>
  (app) => {
    if (!checkVersion(app, "2.0.0-beta.61"))
      logger.error(
        `VuePress version does not meet the requirement ${colors.cyan(
          "2.0.0-beta.61"
        )}`
      );
    if (app.env.isDebug) logger.info("Options:", options);

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
