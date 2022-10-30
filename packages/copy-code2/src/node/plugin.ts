import { getDirname, path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { addViteSsrNoExternal, getLocales } from "vuepress-shared/node";

import { copyCodeLocales } from "./locales.js";
import { logger } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { CopyCodeOptions } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

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
        CODE_COPY_OPTIONS: options,
        CODE_COPY_LOCALES: userCopyCodeLocales,
      }),

      extendsBundlerOptions: (config: unknown, app): void => {
        addViteSsrNoExternal({ app, config }, "vuepress-shared");
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };
