import {
  checkOptions,
  getFeedChannelOption,
  getFeedLinks,
  getOutput,
} from "./options";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";

import type { PageFrontmatter, Plugin } from "@vuepress/core";
import type { FeedOptions, FeedPluginFrontmatter } from "./types";

export * from "./types";

const isFeed = (frontmatter: PageFrontmatter<FeedPluginFrontmatter>): boolean =>
  !frontmatter.home &&
  frontmatter.article !== false &&
  (!frontmatter.feed || frontmatter.feed.enable !== false);

const feedPlugin: Plugin<FeedOptions> = (options, app) => {
  const feedOptions = checkOptions(options, app);

  // plugin option is missing required field
  if (!feedOptions) return {};

  const channelOptions = getFeedChannelOption(feedOptions, app);
  const output = getOutput(feedOptions.output);
  const feedLinks = getFeedLinks(feedOptions, output, app);

  return {
    name: "feed2",

    onPrepared(): void {
      injectLinkstoHead(feedOptions, app);
    },

    async onGenerated(app): Promise<void> {
      const feedPages = app.pages
        .filter(
          (page) =>
            !feedOptions.filter ||
            (typeof feedOptions.filter === "function" &&
              feedOptions.filter(page) &&
              isFeed(
                page.frontmatter as PageFrontmatter<FeedPluginFrontmatter>
              ))
        )
        .sort(feedOptions.sort)
        .slice(0, feedOptions.count);

      await new FeedGenerator(
        feedPages,
        feedOptions,
        { channel: channelOptions, links: feedLinks },
        app
      ).generateFeed();
    },
  };
};

export default feedPlugin;
