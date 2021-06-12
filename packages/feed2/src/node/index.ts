import {
  checkOptions,
  getFeedChannelOption,
  getFeedLinks,
  getOutput,
} from "./options";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";

import type { Page, PageFrontmatter, Plugin } from "@vuepress/core";
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

  const pages: Page[] = [];

  return {
    name: "feed2",

    /**
     * Store pages for future usage
     */
    extendsPageData($page): void {
      if (!feedOptions.filter) pages.push($page);
      else if (
        typeof feedOptions.filter === "function" &&
        feedOptions.filter($page) &&
        isFeed($page.frontmatter as PageFrontmatter<FeedPluginFrontmatter>)
      )
        pages.push($page);
    },

    onPrepared(): void {
      injectLinkstoHead(feedOptions, app);
    },

    async onGenerated(): Promise<void> {
      const feedPages = (
        typeof feedOptions.sort === "function"
          ? pages.sort(feedOptions.sort)
          : pages
      ).slice(0, feedOptions.count);

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
