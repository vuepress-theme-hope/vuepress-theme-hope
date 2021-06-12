import { getLocales } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { i18n } from "./i18n";

import type { Plugin } from "@vuepress/core";
import type { ComponentOptions } from "../shared";

export * from "../shared";

const componentPlugin: Plugin<ComponentOptions> = (options, app) => {
  usePalettePlugin(app, { id: "hope" });

  return {
    name: "@mr-hope/vuepress-plugin-components",

    define: (): Record<string, unknown> => ({
      COMPONENT_I18N: getLocales(app, i18n, options.locale),
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/BackToTop.js"
    ),
  };
};

export default componentPlugin;
