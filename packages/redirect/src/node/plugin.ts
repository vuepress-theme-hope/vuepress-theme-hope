import { type Page, type PluginFunction } from "@vuepress/core";
import { checkVersion } from "vuepress-shared/node";

import { convertOptions } from "./compact/index.js";
import { handleRedirectTo } from "./extends.js";
import { generateAutoLocaleRedirects, generateRedirects } from "./generate.js";
import { ensureRootHomePage } from "./homepage.js";
import { getLocaleConfig } from "./locale.js";
import { type RedirectOptions } from "./options.js";
import { prepareRedirects } from "./prepare.js";
import { type RedirectPluginFrontmatterOption } from "./typings/index.js";
import { CLIENT_FOLDER, PLUGIN_NAME, getRedirectMap, logger } from "./utils.js";

export const redirectPlugin =
  (options: RedirectOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as RedirectOptions & Record<string, unknown>);
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.61");

    if (app.env.isDebug) logger.info("Options:", options);

    const localeConfig = getLocaleConfig(app, options);
    let redirectMap: Record<string, string>;

    return {
      name: PLUGIN_NAME,

      define: {
        REDIRECT_LOCALE_CONFIG: localeConfig,
      },

      extendsPage: (page, app) =>
        handleRedirectTo(
          <Page<Record<string, never>, RedirectPluginFrontmatterOption>>page,
          app,
          options
        ),

      onInitialized: async (app): Promise<void> => {
        redirectMap = getRedirectMap(app, options);
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
