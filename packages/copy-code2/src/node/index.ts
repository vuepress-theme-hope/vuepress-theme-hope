import { path } from "@vuepress/utils";
import { getLocales } from "@mr-hope/vuepress-shared";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { copyCodeLocales } from "./locales";

import type { Plugin } from "@vuepress/core";
import type { CopyCodeOptions } from "../shared";

export * from "../shared";

const copyCodePlugin: Plugin<CopyCodeOptions> = (options, app) => {
  usePalettePlugin(app, { id: "hope" });

  return {
    name: "vuepress-plugin-copy-code2",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS: options,
      CODE_COPY_LOCALES: getLocales(app, copyCodeLocales, options.locales),
    }),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),
  };
};

export default copyCodePlugin;
