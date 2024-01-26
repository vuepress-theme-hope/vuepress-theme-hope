import type { PluginFunction, PluginObject } from "vuepress/core";
import { colors } from "vuepress/utils";
import { checkVersion } from "vuepress-shared/node";

import { addFeedLinks } from "./addFeedLinks.js";
import { convertOptions } from "./compact.js";
import { checkOutput, ensureHostName, getFeedOptions } from "./options.js";
import {
  outputAtomTemplates,
  outputFeedFiles,
  outputRSSTemplates,
} from "./output.js";
import type { FeedOptions } from "./typings/index.js";
import { FEED_GENERATOR, logger } from "./utils/index.js";

export const feedPlugin =
  (options: FeedOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as FeedOptions & Record<string, unknown>);
    checkVersion(app, FEED_GENERATOR, "2.0.0-rc.2");

    if (app.env.isDebug) logger.info("Options:", options);

    const plugin: PluginObject = {
      name: FEED_GENERATOR,
    };

    if (!ensureHostName(options)) {
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

      onInitialized: (app): void => addFeedLinks(app, feedOptions),

      onGenerated: async (app): Promise<void> => {
        await Promise.all([
          ...outputFeedFiles(app, feedOptions),
          ...outputAtomTemplates(app, feedOptions),
          ...outputRSSTemplates(app, feedOptions),
        ]);
      },
    };
  };
