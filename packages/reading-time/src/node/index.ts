import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";
import { readingTime } from "./reading-time";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@mr-hope/vuepress-types";
import type { ReadingTimeOptions } from "../types";

const readingTimePlugin: Plugin<ReadingTimeOptions> = (options, context) => {
  const readingTimeConfig = i18n as PluginI18nConvert<ReadingTimeOptions>;

  readingTimeConfig["/"] = readingTimeConfig[getRootLangPath(context)];

  return {
    name: "reading-time",

    define: (): Record<string, unknown> => ({
      READING_TIME_I18N: readingTimeConfig,
    }),

    extendPageData($page): void {
      $page.readingTime = readingTime(
        $page._strippedContent,
        options.wordPerminute || context.themeConfig.wordPerminute || 300
      );
    },
  };
};

export = readingTimePlugin;
