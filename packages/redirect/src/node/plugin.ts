import { addViteSsrNoExternal, getLocaleConfig } from "@vuepress/helper";
import type { PluginFunction } from "vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { convertOptions } from "./compact.js";
import { CLIENT_FOLDER, PLUGIN_NAME } from "./constant.js";
import { generateAutoLocaleRedirects, generateRedirects } from "./generate.js";
import { ensureRootHomePage } from "./homepage.js";
import { getLocaleSettings } from "./locale.js";
import { redirectLocales } from "./locales.js";
import type { RedirectOptions } from "./options.js";
import { prepareRedirects } from "./prepare.js";
import { getRedirectMap, handleRedirectTo, logger } from "./utils/index.js";

export const redirectPlugin =
  (options: RedirectOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as RedirectOptions & Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    const localeConfig = getLocaleSettings(app, options);
    let redirectMap: Record<string, string>;

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: {
        REDIRECT_LOCALE_CONFIG: localeConfig,
        REDIRECT_LOCALE_SWITCH: Boolean(localeConfig.switchLocale),
        REDIRECT_LOCALES: getLocaleConfig({
          app,
          name: "redirect",
          config: options.locales,
          default: redirectLocales,
        }),
      },

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          "@vuepress/helper",
          "vuepress-shared",
        ]);
      },

      onInitialized: async (app): Promise<void> => {
        redirectMap = getRedirectMap(app, options);

        if (app.env.isDebug) logger.info("Redirect Map:", redirectMap);

        handleRedirectTo(app, options);

        if (localeConfig.autoLocale)
          await ensureRootHomePage(app, localeConfig);
      },

      onPrepared: (app): Promise<void> => prepareRedirects(app, redirectMap),

      onGenerated: async (app): Promise<void> => {
        await generateRedirects(app, redirectMap);
        if (localeConfig.autoLocale)
          await generateAutoLocaleRedirects(app, localeConfig);
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };
