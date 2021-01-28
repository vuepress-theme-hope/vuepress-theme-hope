import { lang2Path } from "@mr-hope/vuepress-shared";
import readingTime from "./reading-time";
import { i18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { ReadingTimeOptions } from "../types";

export = (
  options: ReadingTimeOptions,
  { themeConfig }: Context
): PluginOptionAPI => {
  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = lang2Path(baseLang);
  const readingTimeConfig = i18n as PluginI18nConvert<ReadingTimeOptions>;

  readingTimeConfig["/"] = readingTimeConfig[baseLangPath];

  return {
    name: "reading-time",

    define: (): Record<string, unknown> => ({
      READING_TIME_I18N: readingTimeConfig,
    }),

    extendPageData($page): void {
      $page.readingTime = readingTime(
        $page._strippedContent,
        options.wordPerminute || themeConfig.wordPerminute || 300
      );
    },
  };
};
