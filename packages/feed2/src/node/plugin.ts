import { getFeedChannelOption, getFeedLinks } from "./options";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";
import { compareDate, logger } from "./utils";

import type { Page, Plugin, PluginConfig } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
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

  if (!feedOptions.atom && !feedOptions.json && !feedOptions.rss) {
    logger.info("No requested output, the plugin won't start!");

    return {
      name: "vuepress-plugin-feed2",
    };
  }

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
            frontmatter.article === false ||
            frontmatter.feed === false
          ),
        sorter = (
          pageA: Page<Record<string, never>, { git?: GitData }>,
          pageB: Page<Record<string, never>, { git?: GitData }>
        ): number => {
          return compareDate(
            pageA.git?.createdTime
              ? new Date(pageA.git?.createdTime)
              : pageA.frontmatter.date,
            pageB.git?.createdTime
              ? new Date(pageB.git?.createdTime)
              : pageB.frontmatter.date
          );
        },
      } = feedOptions;

      const feedPages = app.pages
        .filter(filter)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .sort(sorter)
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
): PluginConfig<FeedOptions> => ["feed2", options];
