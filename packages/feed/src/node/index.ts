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

const isFeed = (frontmatter: PageFrontmatter<FeedPluginFrontmatter>): boolean =>
  !frontmatter.home &&
  frontmatter.article !== false &&
  (!frontmatter.feed || frontmatter.feed.enable !== false);

const feedPlugin: Plugin<FeedOptions> = (options, app) => {
  const pluginOptions = checkOptions(options, app);

  // plugin option is missing required field
  if (!pluginOptions) return {};

  const channelOptions = getFeedChannelOption(pluginOptions, app);
  const output = getOutput(pluginOptions.output);
  const feedLinks = getFeedLinks(pluginOptions, output, app);

  const pages: Page[] = [];

  return {
    name: "feed",

    /**
     * Store pages for future usage
     */
    extendsPageData($page): void {
      if (!pluginOptions.filter) pages.push($page);
      else if (
        typeof pluginOptions.filter === "function" &&
        pluginOptions.filter($page) &&
        isFeed($page.frontmatter)
      )
        pages.push($page);
    },

    ready(): void {
      injectLinkstoHead(pluginOptions, app);
    },

    async generated(): Promise<void> {
      const feedPages = (
        typeof pluginOptions.sort === "function"
          ? pages.sort(pluginOptions.sort)
          : pages
      ).slice(0, pluginOptions.count);

      await new FeedGenerator(
        feedPages,
        pluginOptions,
        { channel: channelOptions, links: feedLinks },
        app
      ).generateFeed();
    },
  };
};

export default feedPlugin;
