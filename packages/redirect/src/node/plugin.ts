import { type Page, type PluginFunction } from "@vuepress/core";
import { checkVersion } from "vuepress-shared/node";

import { convertOptions } from "./compact/index.js";
import { handleRedirect } from "./extends.js";
import { generateLocaleRedirects, generateRedirects } from "./generate.js";
import { ensureRootHomePage } from "./homepage.js";
import { getLocaleOptions } from "./locale.js";
import { type RedirectOptions } from "./options.js";
import { type RedirectPluginFrontmatterOption } from "./typings/index.js";
import { PLUGIN_NAME, logger } from "./utils.js";

export const redirectPlugin =
  (options: RedirectOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as RedirectOptions & Record<string, unknown>);
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.61");

    if (app.env.isDebug) logger.info("Options:", options);

    const localeOptions = getLocaleOptions(app, options);

    return {
      name: PLUGIN_NAME,

      extendsPage: (page, app) =>
        handleRedirect(
          <Page<Record<string, never>, RedirectPluginFrontmatterOption>>page,
          app,
          options
        ),

      onInitialized: async (app): Promise<void> => {
        if (localeOptions) await ensureRootHomePage(app, localeOptions);
      },

      onGenerated: async (app): Promise<void> => {
        await generateRedirects(app, options);
        if (localeOptions) await generateLocaleRedirects(app, localeOptions);
      },
    };
  };
