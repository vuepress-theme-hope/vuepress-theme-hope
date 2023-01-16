import { colors } from "@vuepress/utils";
import { convertOptions } from "./compact/index.js";
import { checkOutput, ensureHostName, getFeedOptions } from "./options.js";
import { FeedGenerator } from "./generator/index.js";
import { injectLinksToHead } from "./injectHead.js";
import { logger } from "./utils/index.js";

import type { PluginFunction, PluginObject } from "@vuepress/core";
import type { FeedOptions } from "./typings/index.js";

export const feedPlugin =
  (options: FeedOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as FeedOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info("Options:", options);

    const plugin: PluginObject = {
      name: "vuepress-plugin-feed2",
    };

    if (!ensureHostName(options)) {
      logger.error(`Option ${colors.magenta("hostname")} is required!`);

      return plugin;
    }

    if (!checkOutput(options)) {
      logger.info("No requested output, the plugin won’t start!");

      return plugin;
    }

    const feedOptions = getFeedOptions(app, options);

    return {
      ...plugin,

      onPrepared: (app): void => injectLinksToHead(app, feedOptions),

      onGenerated: async (app): Promise<void> => {
        await new FeedGenerator(app, feedOptions).generateFeed();
      },
    };
  };
