import { addViteSsrNoExternal, getLocaleConfig } from "@vuepress/helper/node";
import type { Page, PluginFunction } from "vuepress/core";

import { convertOptions } from "./compact.js";
import { readingTimeLocales } from "./locales.js";
import type { ReadingTimeOptions } from "./options.js";
import { getReadingTime } from "./readingTime.js";
import { PLUGIN_NAME, logger } from "./utils.js";
import type { ReadingTime } from "../shared/index.js";

/** Reading time plugin */
export const readingTimePlugin =
  (options: ReadingTimeOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    if (legacy) convertOptions(options as Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    return {
      name: PLUGIN_NAME,

      define: (app): Record<string, unknown> => ({
        READING_TIME_LOCALES: getLocaleConfig({
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

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          "@vuepress/helper",
          "vuepress-shared",
        ]);
      },
    };
  };
