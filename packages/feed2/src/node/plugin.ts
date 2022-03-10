import { checkOutput, ensureHostName, getFeedOptions } from "./options";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";
import { logger } from "./utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { FeedOptions } from "../shared";

export const feedPlugin: Plugin<FeedOptions> = (options, app) => {
  if (!ensureHostName(options)) {
    logger.error("Option 'hostname' is required!");

    return {
      name: "vuepress-plugin-feed2",
    };
  }

  if (!checkOutput(options)) {
    logger.info("No requested output, the plugin won't start!");

    return {
      name: "vuepress-plugin-feed2",
    };
  }

  const feedOptions = getFeedOptions(app, options as FeedOptions);

  return {
    name: "vuepress-plugin-feed2",

    onPrepared: (app): void => injectLinkstoHead(app, feedOptions),

    onGenerated: async (app): Promise<void> => {
      await new FeedGenerator(app, feedOptions).generateFeed();
    },
  };
};

export const feed = (
  options: FeedOptions | false
): PluginConfig<FeedOptions> => ["feed2", options];
