import type { PluginFunction, PluginObject } from "vuepress/core";
import { colors } from "vuepress/utils";
import { useCustomDevServer } from "vuepress-shared/node";

import { addFeedLinks } from "./addFeedLinks.js";
import { convertOptions } from "./compact.js";
import { getFeedFiles } from "./getFeed.js";
import { getAtomTemplates, getRSSTemplates } from "./getTemplate.js";
import { checkOutput, ensureHostName, getFeedOptions } from "./options.js";
import { writeFiles } from "./output.js";
import type { FeedOptions } from "./typings/index.js";
import { FEED_GENERATOR, logger } from "./utils/index.js";

export const feedPlugin =
  (options: FeedOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as FeedOptions & Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    const plugin: PluginObject = {
      name: FEED_GENERATOR,
    };

    if (!ensureHostName(app, options)) {
      logger.error(`Option ${colors.magenta("hostname")} is required!`);

      return plugin;
    }

    if (!checkOutput(options)) {
      logger.info("No feed output requested, the plugin won’t start!");

      return plugin;
    }

    const feedOptions = getFeedOptions(app, options);

    return {
      ...plugin,

      onInitialized: (app): void => {
        if (app.env.isBuild || options.devServer)
          addFeedLinks(app, feedOptions);
      },

      extendsBundlerOptions: (config, app): void => {
        if (options.devServer)
          [
            ...getFeedFiles(app, feedOptions),
            ...getAtomTemplates(feedOptions),
            ...getRSSTemplates(feedOptions),
          ].forEach(([path, content]) => {
            useCustomDevServer(config, app, {
              path,
              response: async () => Promise.resolve(content),
              errMsg: "Unexpected feed generation error",
            });
          });
      },

      onGenerated: async (app): Promise<void> => {
        await Promise.all([
          ...writeFiles(app, getFeedFiles(app, feedOptions)),
          ...writeFiles(app, getAtomTemplates(feedOptions)),
          ...writeFiles(app, getRSSTemplates(feedOptions)),
        ]);
      },
    };
  };
