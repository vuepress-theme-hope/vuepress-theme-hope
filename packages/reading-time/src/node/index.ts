import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";
import { readingTime } from "./reading-time";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@vuepress/core";
import type { ReadingTime, ReadingTimeOptions } from "../shared";

export * from "./reading-time";
export * from "../shared";

const readingTimePlugin: Plugin<ReadingTimeOptions> = (options, app) => {
  const readingTimeConfig = i18n as PluginI18nConvert<ReadingTimeOptions>;

  readingTimeConfig["/"] = readingTimeConfig[getRootLangPath(app)];

  return {
    name: "reading-time",

    define: (): Record<string, unknown> => ({
      READING_TIME_I18N: readingTimeConfig,
    }),

    extendsPageData: (page): { readingTime: ReadingTime } => ({
      readingTime: readingTime(
        page.content,
        options.wordPerminute || app.options.themeConfig.wordPerminute || 300
      ),
    }),
  };
};

export default readingTimePlugin;
