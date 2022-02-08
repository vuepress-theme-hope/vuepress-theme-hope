import { chalk, fs } from "@vuepress/utils";
import { Feed } from "./feed";
import { FeedPage } from "./page";
import { getFilename, logger } from "./utils";

import type { App, Page } from "@vuepress/core";
import type { FeedOptions, FeedInitOptions } from "../shared";

export class FeedGenerator {
  /** feed 生成器 */
  feed: Feed;

  constructor(
    private app: App,
    private options: FeedOptions,
    private pages: Page[],
    feedOption: FeedInitOptions
  ) {
    this.feed = new Feed(feedOption);
  }

  addPages(): void {
    let count = 0;

    for (const page of this.pages) {
      const item = new FeedPage(
        this.app,
        this.options,
        page,
        this.feed
      ).getFeedItem();

      if (item) {
        this.feed.addItem(item);
        count += 1;
      }
    }

    logger.succeed(`added ${chalk.cyan(`${count} page(s)`)} as feed item(s)`);
  }

  async generateFeed(): Promise<void> {
    const { dest } = this.app.dir;
    const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
      getFilename(this.options);

    this.addPages();

    // generate atom files
    if (this.options.atom) {
      logger.load("Generating Atom Feed");

      await fs.outputFile(dest(atomOutputFilename), this.feed.atom());

      logger.update(
        `Atom feed file generated and saved to ${chalk.cyan(
          atomOutputFilename
        )}`
      );
      logger.succeed();
    }

    // generate json files
    if (this.options.json) {
      logger.load("Generating JSON Feed");

      await fs.outputFile(dest(jsonOutputFilename), this.feed.json());

      logger.update(
        `JSON feed file generated and saved to ${chalk.cyan(
          jsonOutputFilename
        )}`
      );
      logger.succeed();
    }

    // generate rss files
    if (this.options.rss) {
      logger.load("Generating RSS Feed");

      await fs.outputFile(dest(rssOutputFilename), this.feed.rss());

      logger.update(
        `RSS feed file generated and saved to ${chalk.cyan(rssOutputFilename)}`
      );
      logger.succeed();
    }
  }
}
