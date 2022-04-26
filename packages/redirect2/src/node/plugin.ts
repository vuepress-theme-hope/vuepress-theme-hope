import { handleRedirect } from "./extends";
import { generateHTML } from "./generate";
import { logger } from "./utils";

import type { Page, PluginObject } from "@vuepress/core";
import type {
  RedirectOptions,
  RedirectPluginFrontmatterOption,
} from "../shared";

export const redirectPlugin = (options: RedirectOptions): PluginObject => {
  const plugin: PluginObject = {
    name: "vuepress-plugin-redirect2",
  };

  if (!options.config) {
    logger.warn('"config" is required');

    return plugin;
  }

  return {
    ...plugin,

    extendsPage: (page, app) =>
      handleRedirect(
        page as Page<Record<string, never>, RedirectPluginFrontmatterOption>,
        app,
        options
      ),

    onGenerated: (app): Promise<void> => generateHTML(app, options),
  };
};
