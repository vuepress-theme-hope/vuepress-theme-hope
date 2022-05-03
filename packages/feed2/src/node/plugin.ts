import { checkOutput, ensureHostName, getFeedOptions } from "./options";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";
import { logger } from "./utils";

import type { PluginFunction } from "@vuepress/core";
import type { FeedOptions } from "../shared";

export const feedPlugin =
  (options: FeedOptions): PluginFunction =>
  (app) => {
    if (!ensureHostName(options)) {
      logger.error("Option 'hostname' is required!");

      return {
        name: "vuepress-plugin-feed2",
      };
    }

    if (!checkOutput(options)) {
      logger.info("No requested output, the plugin won’t start!");

      return {
        name: "vuepress-plugin-feed2",
      };
    }

    const feedOptions = getFeedOptions(app, options);

    return {
      name: "vuepress-plugin-feed2",

      onPrepared: (app): void => injectLinkstoHead(app, feedOptions),

      onGenerated: async (app): Promise<void> => {
        await new FeedGenerator(app, feedOptions).generateFeed();
      },
    };
  };
