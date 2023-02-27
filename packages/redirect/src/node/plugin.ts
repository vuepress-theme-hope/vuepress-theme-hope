import { type Page, type PluginFunction } from "@vuepress/core";
import { checkVersion } from "vuepress-shared/node";

import { handleRedirect } from "./extends.js";
import { generateHTML } from "./generate.js";
import { type RedirectOptions } from "./options.js";
import { type RedirectPluginFrontmatterOption } from "./typings/index.js";
import { PLUGIN_NAME, logger } from "./utils.js";

export const redirectPlugin =
  (options: RedirectOptions = {}): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.61");

    if (app.env.isDebug) logger.info("Options:", options);

    return {
      name: PLUGIN_NAME,

      extendsPage: (page, app) =>
        handleRedirect(
          <Page<Record<string, never>, RedirectPluginFrontmatterOption>>page,
          app,
          options
        ),

      onGenerated: (app): Promise<void> => generateHTML(app, options),
    };
  };
