import { lang2Path } from "@mr-hope/vuepress-shared";
import { pageInfoI18n, valineI18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { CommentOptions, PageInfoI18nConfig } from "../types";
import type { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";

export = (
  options: CommentOptions,
  { themeConfig }: Context
): PluginOptionAPI => {
  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = lang2Path(baseLang);
  const pageInfoI18nConfig = pageInfoI18n as PluginI18nConvert<PageInfoI18nConfig>;
  const valineI18nConfig = valineI18n as PluginI18nConvert<string>;

  pageInfoI18nConfig["/"] = pageInfoI18nConfig[baseLangPath];
  valineI18nConfig["/"] = valineI18nConfig[baseLangPath];

  const config: PluginOptionAPI = {
    name: "comment",

    define: () => ({
      COMMENT_OPTIONS:
        Object.keys(options).length > 0 ? options : themeConfig.comment || {},
      PAGE_INFO_I18N: pageInfoI18nConfig,
      VALINE_I18N: valineI18nConfig,
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
