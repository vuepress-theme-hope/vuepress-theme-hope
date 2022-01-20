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
    private pages: Page[],
    private options: FeedOptions,
    feedOption: FeedInitOptions,
    private app: App
  ) {
    this.feed = new Feed(feedOption);
  }

  addPages(): void {
    let count = 0;
    const pages = this.pages.slice(0, this.options.count);

    for (const page of pages) {
      const item = new FeedPage(
        page,
        this.feed,
        this.options,
        this.app
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

    logger.load("Generating Feed");

    // generate atom files
    if (this.options.atom) {
      const fileName = this.options.atomOutputFilename || "atom.xml";

      await fs.outputFile(dest(fileName), this.feed.atom());

      logger.update(
        `Atom feed file generated and saved to ${chalk.cyan(fileName)}`
      );
      logger.succeed();
      logger.load("Generating Feed");
    }

    // generate json files
    if (this.options.json) {
      const fileName = this.options.jsonOutputFilename || "feed.json";

      await fs.outputFile(dest(fileName), this.feed.json());

      logger.update(
        `JSON feed file generated and saved to ${chalk.cyan(fileName)}`
      );
      logger.succeed();
      logger.load("Generating Feed");
    }

    // generate rss files
    if (this.options.rss) {
      const fileName = this.options.rssOutputFilename || "rss.xml";

      await fs.outputFile(dest(fileName), this.feed.rss());

      logger.update(
        `RSS feed file generated and saved to ${chalk.cyan(fileName)}`
      );
      logger.succeed();
    }
  }
}
