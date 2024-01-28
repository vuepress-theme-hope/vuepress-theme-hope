import type { PluginFunction, PluginObject } from "vuepress/core";
import { colors } from "vuepress/utils";
import { useCustomDevServer } from "vuepress-shared/node";

import { convertOptions } from "./compact.js";
import { getSiteMap } from "./getSitemap.js";
import { getSiteMapTemplate } from "./getSitemapTemplate.js";
import type { SitemapOptions } from "./options.js";
import { outputSitemap } from "./outputSitemap.js";
import { PLUGIN_NAME, ensureHostName, logger } from "./utils.js";

export const sitemapPlugin =
  (options: SitemapOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as SitemapOptions & Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    const plugin: PluginObject = {
      name: PLUGIN_NAME,
    };

    if (!ensureHostName(app, options)) {
      logger.error(`Option ${colors.magenta("hostname")} is required!`);

      return plugin;
    }

    return {
      ...plugin,

      extendsBundlerOptions: async (config, app): Promise<void> => {
        if (options.devServer)
          [await getSiteMap(app, options), getSiteMapTemplate(options)].forEach(
            ([path, content]) => {
              useCustomDevServer(config, app, {
                path,
                response: async () => Promise.resolve(content),
                errMsg: "Unexpected sitemap generation error",
              });
            },
          );
      },

      onGenerated: (app): Promise<void> => outputSitemap(app, options),
    };
  };
