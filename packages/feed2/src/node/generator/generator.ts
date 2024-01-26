import type { GitData } from "@vuepress/plugin-git";
import type { App, Page } from "vuepress/core";
import { colors, fs, path } from "vuepress/utils";
import { entries, fromEntries } from "vuepress-shared/node";

import { FeedStore } from "./feedStore.js";
import { FeedItem } from "../feedItem.js";
import type { ResolvedFeedOptionsMap } from "../options.js";
import { getFeedChannelOption, getFeedLinks, getFilename } from "../options.js";
import type { FeedPluginFrontmatter } from "../typings/index.js";
import { logger } from "../utils/index.js";

export class FeedGenerator {
  /** feed 生成器 */
  private map: Record<string, FeedStore>;

  constructor(
    private app: App,
    private options: ResolvedFeedOptionsMap,
  ) {
    this.map = fromEntries(
      entries(options).map(([localePath, localeOptions]) => [
        localePath,
        new FeedStore({
          channel: getFeedChannelOption(app, localeOptions, localePath),
          links: getFeedLinks(app, localeOptions, localePath),
        }),
      ]),
    );
  }

  addPages(localePath: string): void {
    const feedStore = this.map[localePath];
    const localeOption = this.options[localePath];
    const { count: feedCount = 100, filter, sorter } = localeOption;
    const pages = this.app.pages
      .filter((page) => page.pathLocale === localePath)
      .filter(filter)
      .sort(sorter);

    for (const page of pages) {
      const feedItem = new FeedItem(
        this.app,
        localeOption,
        <Page<{ git?: GitData }, FeedPluginFrontmatter>>page,
      );

      feedStore.add(feedItem);
      if (feedStore.items.length === feedCount) break;
    }

    const count = feedStore.items.length;

    logger.succeed(
      `added ${colors.cyan(
        `${count} page${count > 1 ? "s" : ""}`,
      )} as feed item${count > 1 ? "s" : ""} in route ${colors.cyan(
        localePath,
      )}`,
    );
  }

  async generateFeed(): Promise<void> {
    const { dest } = this.app.dir;

    await Promise.all([
      ...entries(this.options).map(async ([localePath, localeOptions]) => {
        // current locale has valid output
        if (localeOptions.atom || localeOptions.json || localeOptions.rss) {
          const feed = this.map[localePath];
          const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
            getFilename(localeOptions, localePath);

          this.addPages(localePath);

          // generate atom files
          if (localeOptions.atom) {
            await fs.ensureDir(path.dirname(dest(atomOutputFilename)));
            await fs.outputFile(dest(atomOutputFilename), feed.atom());

            logger.succeed(
              `Atom feed file generated and saved to ${colors.cyan(
                `/${atomOutputFilename}`,
              )}`,
            );
          }

          // generate json files
          if (localeOptions.json) {
            await fs.ensureDir(path.dirname(dest(jsonOutputFilename)));
            await fs.outputFile(dest(jsonOutputFilename), feed.json());

            logger.succeed(
              `JSON feed file generated and saved to ${colors.cyan(
                `/${jsonOutputFilename}`,
              )}`,
            );
          }

          // generate rss files
          if (localeOptions.rss) {
            await fs.ensureDir(path.dirname(dest(rssOutputFilename)));
            await fs.outputFile(dest(rssOutputFilename), feed.rss());

            logger.succeed(
              `RSS feed file generated and saved to ${colors.cyan(
                `/${rssOutputFilename}`,
              )}`,
            );
          }
        }
      }),
      entries(this.options)
        .filter(([, { atom }]) => atom)
        .map(([localePath, localeOptions]) => {
          const { atomXslTemplate, atomXslFilename } = getFilename(
            localeOptions,
            localePath,
          );

          return fs.copyFile(atomXslTemplate, dest(atomXslFilename));
        }),
      entries(this.options)
        .filter(([, { rss }]) => rss)
        .map(([localePath, localeOptions]) => {
          const { rssXslFilename, rssXslTemplate } = getFilename(
            localeOptions,
            localePath,
          );

          return fs.copyFile(rssXslTemplate, dest(rssXslFilename));
        }),
    ]);
  }
}
