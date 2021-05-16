import {
  checkOptions,
  getFeedChannelOption,
  getFeedLinks,
  getOutput,
} from "./options";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";

import type { Page, PageFrontmatter, Plugin } from "@mr-hope/vuepress-types";
import type { FeedOptions } from "../types";

const isFeed = (frontmatter: PageFrontmatter): boolean =>
  !frontmatter.home &&
  frontmatter.article !== false &&
  (!frontmatter.feed || frontmatter.feed.enable !== false);

const feedPlugin: Plugin<FeedOptions> = (options, context) => {
  if (!checkOptions(options, context)) return {};

  const channelOptions = getFeedChannelOption(options, context);
  const output = getOutput(options.output);
  const feedLinks = getFeedLinks(options, output, context);

  const pages: Page[] = [];

  return {
    name: "feed",

    /**
     * Store pages for future usage
     */
    extendPageData($page): void {
      if (!options.filter) pages.push($page);
      else if (
        typeof options.filter === "function" &&
        options.filter($page) &&
        isFeed($page.frontmatter)
      )
        pages.push($page);
    },

    ready(): void {
      injectLinkstoHead(options, context);
    },

    async generated(): Promise<void> {
      const feedPages = (
        typeof options.sort === "function" ? pages.sort(options.sort) : pages
      ).slice(0, options.count);

      await new FeedGenerator(
        feedPages,
        options,
        { channel: channelOptions, links: feedLinks },
        context
      ).generateFeed();
    },
  };
};

export = feedPlugin;
