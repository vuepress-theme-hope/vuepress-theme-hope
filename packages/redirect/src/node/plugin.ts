import { handleRedirect } from "./extends";
import { generateHTML } from "./generate";
import { logger } from "./utils";

import type { Page, PluginFunction } from "@vuepress/core";
import type {
  RedirectOptions,
  RedirectPluginFrontmatterOption,
} from "../shared";

export const redirectPlugin =
  (options: RedirectOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    return {
      name: "vuepress-plugin-redirect",

      extendsPage: (page, app) =>
        handleRedirect(
          <Page<Record<string, never>, RedirectPluginFrontmatterOption>>page,
          app,
          options
        ),

      onGenerated: (app): Promise<void> => generateHTML(app, options),
    };
  };
