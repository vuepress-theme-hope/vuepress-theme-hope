import { resolve } from "path";
import { lang2Path } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { CopyCodeI18NConfig, CopyCodeOptions } from "../types";

export = (
  options: CopyCodeOptions,
  { themeConfig }: Context
): PluginOptionAPI => {
  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = lang2Path(baseLang);
  const copyCodeI18nConfig = i18n as PluginI18nConvert<CopyCodeI18NConfig>;

  copyCodeI18nConfig["/"] = copyCodeI18nConfig[baseLangPath];

  return {
    name: "copy-code",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS:
        Object.keys(options).length > 0 ? options : themeConfig.copyCode || {},
      CODE_COPY_I18N: copyCodeI18nConfig,
    }),

    clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),
  };
};
