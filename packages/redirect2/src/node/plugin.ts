import { handleRedirect } from "./extends";
import { generateHTML } from "./generate";
import { logger } from "./utils";

import type { Page, Plugin, PluginConfig, PluginObject } from "@vuepress/core";
import type {
  RedirectOptions,
  RedirectPluginFrontmatterOption,
} from "../shared";

export const redirectPlugin: Plugin<RedirectOptions> = (options) => {
  const plugin: PluginObject = {
    name: "vuepress-plugin-redirect2",
  };

  if (!options.config) {
    logger.warn('"config" is required');

    return plugin;
  }

  const redirectOptions = options as RedirectOptions;

  return {
    ...plugin,

    extendsPage: (
      page: Page<Record<string, never>, RedirectPluginFrontmatterOption>,
      app
    ) => handleRedirect(page, app, redirectOptions),

    onGenerated: (app): Promise<void> => generateHTML(app, redirectOptions),
  };
};

export const redirect = (
  options: RedirectOptions | false
): PluginConfig<RedirectOptions> => ["redirect2", options];
