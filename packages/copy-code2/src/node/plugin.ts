import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { getLocales } from "vuepress-shared";

import { copyCodeLocales } from "./locales";
import { logger } from "./utils";

import type { PluginFunction } from "@vuepress/core";
import type { CopyCodeOptions } from "../shared";

export const copyCodePlugin =
  (options: CopyCodeOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    useSassPalettePlugin(app, { id: "hope" });

    const userCopyCodeLocales = getLocales({
      app,
      name: "copy-code",
      default: copyCodeLocales,
      config: options.locales,
    });

    delete options.locales;

    return {
      name: "vuepress-plugin-copy-code2",

      define: (): Record<string, unknown> => ({
        CODE_COPY_OPIONS: options,
        CODE_COPY_LOCALES: userCopyCodeLocales,
      }),

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };
