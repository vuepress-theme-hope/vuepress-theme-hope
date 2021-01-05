import { i18n, lang2path } from "@mr-hope/vuepress-utils";
import { resolve } from "path";

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { ComponentOptions } from "../types";

export = (options: ComponentOptions, context: Context): PluginOptionAPI => {
  const { themeConfig } = context;
  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = lang2path(baseLang);
  const componentConfig = i18n.component;

  componentConfig["/"] = componentConfig[baseLangPath];

  return {
    name: "components",

    define: (): Record<string, unknown> => ({
      COMPONENT_I18N: componentConfig,
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: "BackToTop",
  };
};
