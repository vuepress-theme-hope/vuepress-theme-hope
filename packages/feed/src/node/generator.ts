import { cyan } from "chalk";
import { relative } from "path";
import { outputFile } from "fs-extra";
import { Feed } from "./feed";
import { getOutput } from "./options";
import { FeedPage } from "./page";
import { wait, success } from "./utils";

import type { App, Page } from "@vuepress/core";
import type { FeedOptions, FeedInitOptions } from "./types";

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

    success(`added ${cyan(`${count} page(s)`)} as feed item(s)`);
  }

  async generateFeed(): Promise<void> {
    const { dest } = this.app.dir;
    const output = getOutput(this.options.output);

    this.addPages();

    wait("Generating Feed...");

    // generate atom files
    if (output.atom.enable) {
      const filePath = dest(output.atom.path);

      await outputFile(filePath, this.feed.atom());

      success(
        `Atom feed file generated and saved to ${cyan(
          relative(__dirname, filePath)
        )}`
      );
    }

    // generate json files
    if (output.json.enable) {
      const filePath = dest(output.json.path);

      await outputFile(filePath, this.feed.json());

      success(
        `JSON feed file generated and saved to ${cyan(
          relative(__dirname, filePath)
        )}`
      );
    }

    // generate rss files
    if (output.rss.enable) {
      const filePath = dest(output.rss.path);

      await outputFile(filePath, this.feed.rss());

      success(
        `RSS feed file generated and saved to ${cyan(
          relative(__dirname, filePath)
        )}`
      );
    }
  }
}
