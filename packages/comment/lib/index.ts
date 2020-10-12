/* eslint-disable @typescript-eslint/naming-convention */
import { i18n } from "@mr-hope/vuepress-shared-utils";

import { CommentOptions } from "../types";
import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";

export = (options: CommentOptions, context: Context): PluginOptionAPI => {
  const { themeConfig } = context;
  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = i18n.lang2path(baseLang);
  const { pageInfo, readingTime, valine } = i18n.config;

  pageInfo["/"] = pageInfo[baseLangPath];
  readingTime["/"] = readingTime[baseLangPath];
  valine["/"] = valine[baseLangPath];

  const config: PluginOptionAPI = {
    name: "comment",

    define: () => ({
      COMMENT_OPTIONS: options,
      PAGE_INFO_I18N: pageInfo,
      READING_TIME_I18N: readingTime,
      VALINE_I18N: valine,
    }),

    plugins: [
      ["@mr-hope/reading-time", { wordPerminute: options.wordPerminute }],
    ],
  };

  if (options.type === "vssue")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.plugins!.push(["@vssue/vuepress-plugin-vssue", options]);

  return config;
};
