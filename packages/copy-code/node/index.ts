/* eslint-disable @typescript-eslint/naming-convention */
import { resolve } from "path";
import { i18nConfig, lang2path } from "@mr-hope/vuepress-shared-utils";

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { CopyCodeOptions } from "../types";

export = (
  options: CopyCodeOptions,
  { themeConfig }: Context
): PluginOptionAPI => {
  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = lang2path(baseLang);
  const copyCodeConfig = i18nConfig.copyCode;

  copyCodeConfig["/"] = copyCodeConfig[baseLangPath];

  return {
    name: "copy-code",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS:
        Object.keys(options).length > 0 ? options : themeConfig.copyCode || {},
      CODE_COPY_I18N: copyCodeConfig,
    }),

    clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),
  };
};
