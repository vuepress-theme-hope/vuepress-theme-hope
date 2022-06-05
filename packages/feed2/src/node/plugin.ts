import { chalk } from "@vuepress/utils";
import { covertOptions } from "./compact";
import { checkOutput, ensureHostName, getFeedOptions } from "./options";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";
import { logger } from "./utils";

import type { PluginFunction, PluginObject } from "@vuepress/core";
import type { FeedOptions } from "../shared";

export const feedPlugin =
  (options: FeedOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy) covertOptions(options as FeedOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const plugin: PluginObject = {
      name: "vuepress-plugin-feed2",
    };

    if (!ensureHostName(options)) {
      logger.error(`Option ${chalk.magenta("hostname")} is required!`);

      return plugin;
    }

    if (!checkOutput(options)) {
      logger.info("No requested output, the plugin won’t start!");

      return plugin;
    }

    const feedOptions = getFeedOptions(app, options);

    return {
      ...plugin,

      onPrepared: (app): void => injectLinkstoHead(app, feedOptions),

      onGenerated: async (app): Promise<void> => {
        await new FeedGenerator(app, feedOptions).generateFeed();
      },
    };
  };
