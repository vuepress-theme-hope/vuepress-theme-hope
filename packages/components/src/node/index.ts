import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import { i18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { ComponentI18nConfig } from "../types";

export = (_options: never, context: Context): PluginOptionAPI => {
  const componentConfig = i18n as PluginI18nConvert<ComponentI18nConfig>;

  componentConfig["/"] = componentConfig[getRootLangPath(context)];

  return {
    name: "components",

    define: (): Record<string, unknown> => ({
      COMPONENT_I18N: componentConfig,
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: "BackToTop",
  };
};
