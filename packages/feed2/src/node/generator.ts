import { chalk, fs } from "@vuepress/utils";
import { Feed } from "./feed";
import { FeedPage } from "./page";
import { logger } from "./utils";

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
    const pages = this.pages.slice(0, this.options.count);

    for (const page of pages) {
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

    this.addPages();

    // generate atom files
    if (this.options.atom !== false) {
      const fileName = this.options.atomOutputFilename || "atom.xml";

      logger.load("Generating Atom Feed");

      await fs.outputFile(dest(fileName), this.feed.atom());

      logger.update(
        `Atom feed file generated and saved to ${chalk.cyan(fileName)}`
      );
      logger.succeed();
    }

    // generate json files
    if (this.options.json !== false) {
      const fileName = this.options.jsonOutputFilename || "feed.json";

      logger.load("Generating JSON Feed");

      await fs.outputFile(dest(fileName), this.feed.json());

      logger.update(
        `JSON feed file generated and saved to ${chalk.cyan(fileName)}`
      );
      logger.succeed();
    }

    // generate rss files
    if (this.options.rss !== false) {
      const fileName = this.options.rssOutputFilename || "rss.xml";

      logger.load("Generating RSS Feed");

      await fs.outputFile(dest(fileName), this.feed.rss());

      logger.update(
        `RSS feed file generated and saved to ${chalk.cyan(fileName)}`
      );
      logger.succeed();
    }
  }
}
