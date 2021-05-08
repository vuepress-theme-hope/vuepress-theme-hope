import { resolve } from "path";
import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@mr-hope/vuepress-types";
import type { CopyCodeI18nConfig, CopyCodeOptions } from "../types";

const copyCodePlugin: Plugin<CopyCodeOptions> = (options, context) => {
  const copyCodeI18nConfig = i18n as PluginI18nConvert<CopyCodeI18nConfig>;

  copyCodeI18nConfig["/"] = copyCodeI18nConfig[getRootLangPath(context)];

  return {
    name: "copy-code",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS:
        Object.keys(options).length > 0
          ? options
          : context.themeConfig.copyCode || {},
      CODE_COPY_I18N: copyCodeI18nConfig,
    }),

    clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),
  };
};

export = copyCodePlugin;
