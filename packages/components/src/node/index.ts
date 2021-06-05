import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { i18n } from "./i18n";
import { ComponentI18nConfig } from "../shared";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@vuepress/core";

export * from "../shared/types";

const componentPlugin: Plugin<never> = (_options, app) => {
  const componentConfig = i18n as PluginI18nConvert<ComponentI18nConfig>;

  componentConfig["/"] = componentConfig[getRootLangPath(app)];

  return {
    name: "components",

    define: (): Record<string, unknown> => ({
      COMPONENT_I18N: componentConfig,
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/BackToTop.js"
    ),
  };
};

export default componentPlugin;
