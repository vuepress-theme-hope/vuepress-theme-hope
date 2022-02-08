import { getFeedChannelOption, getFeedLinks } from "./options";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";
import { logger } from "./utils";

import type { Page, Plugin, PluginConfig } from "@vuepress/core";
import type { FeedOptions } from "../shared";

export const feedPlugin: Plugin<FeedOptions> = (options, app) => {
  // make sure hostname do not end with `/`
  if (options.hostname)
    options.hostname = options.hostname.replace(/\/?$/u, "");
  else {
    logger.error("Option 'hostname' is required!");

    return {
      name: "vuepress-plugin-feed2",
    };
  }

  const feedOptions = options as FeedOptions;
  const channelOptions = getFeedChannelOption(app, feedOptions);

  return {
    name: "vuepress-plugin-feed2",

    onPrepared(): void {
      injectLinkstoHead(app, feedOptions);
    },

    async onGenerated(app): Promise<void> {
      const {
        filter = ({ frontmatter, filePathRelative }: Page): boolean =>
          !(
            frontmatter.home ||
            !filePathRelative ||
            frontmatter.isArticle === false ||
            frontmatter.feed === false
          ),
      } = feedOptions;

      const feedPages = app.pages
        .filter(filter)
        .sort(feedOptions.sorter)
        .slice(0, feedOptions.count || 1000);

      await new FeedGenerator(app, feedOptions, feedPages, {
        channel: channelOptions,
        links: getFeedLinks(app, feedOptions),
      }).generateFeed();
    },
  };
};

export const feed = (
  options: FeedOptions | false
): PluginConfig<FeedOptions> => [feedPlugin, options];
