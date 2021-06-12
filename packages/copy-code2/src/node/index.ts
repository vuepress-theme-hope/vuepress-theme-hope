import { path } from "@vuepress/utils";
import { getLocales } from "@mr-hope/vuepress-shared";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { i18n } from "./i18n";

import type { Plugin } from "@vuepress/core";
import type { CopyCodeOptions } from "../shared";

export * from "../shared";

const copyCodePlugin: Plugin<CopyCodeOptions> = (options, app) => {
  usePalettePlugin(app, { id: "hope" });

  return {
    name: "vuepress-plugin-copy-code2",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS:
        Object.keys(options).length > 0
          ? options
          : app.options.themeConfig.copyCode || {},
      CODE_COPY_I18N: getLocales(app, i18n, options.locale),
    }),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),
  };
};

export default copyCodePlugin;
