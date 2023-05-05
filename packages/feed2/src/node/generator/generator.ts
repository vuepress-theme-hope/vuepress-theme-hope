import { type App, type Page } from "@vuepress/core";
import { type GitData } from "@vuepress/plugin-git";
import { colors, fs, path } from "@vuepress/utils";
import { entries, fromEntries } from "vuepress-shared/node";

import { Feed } from "./feed.js";
import { FeedInfo } from "../extractor/index.js";
import {
  type ResolvedFeedOptionsMap,
  getFeedChannelOption,
  getFeedLinks,
  getFilename,
} from "../options.js";
import { type FeedPluginFrontmatter } from "../typings/index.js";
import { compareDate, logger } from "../utils/index.js";

export class FeedGenerator {
  /** feed 生成器 */
  feedMap: Record<string, Feed>;

  constructor(private app: App, private options: ResolvedFeedOptionsMap) {
    this.feedMap = fromEntries(
      entries(options).map(([localePath, localeOptions]) => [
        localePath,
        new Feed({
          channel: getFeedChannelOption(app, localeOptions, localePath),
          links: getFeedLinks(app, localeOptions, localePath),
        }),
      ])
    );
  }

  addPages(localePath: string): void {
    const feed = this.feedMap[localePath];
    const localeOption = this.options[localePath];
    const {
      count: feedCount = 100,
      filter = ({ frontmatter, filePathRelative }: Page): boolean =>
        !(
          frontmatter["home"] ||
          !filePathRelative ||
          frontmatter["article"] === false ||
          frontmatter["feed"] === false
        ),
      sorter = (
        pageA: Page<{ git?: GitData }, Record<string, never>>,
        pageB: Page<{ git?: GitData }, Record<string, never>>
      ): number =>
        compareDate(
          pageA.data.git?.createdTime
            ? new Date(pageA.data.git?.createdTime)
            : pageA.frontmatter.date,
          pageB.data.git?.createdTime
            ? new Date(pageB.data.git?.createdTime)
            : pageB.frontmatter.date
        ),
    } = localeOption;
    const pages = this.app.pages
      .filter((page) => page.pathLocale === localePath)
      .filter(filter)
      // @ts-ignore
      .sort(sorter)
      .slice(0, feedCount);

    let count = 0;

    for (const page of pages) {
      const item = new FeedInfo(
        this.app,
        localeOption,
        <Page<{ git?: GitData }, FeedPluginFrontmatter>>page,
        feed
      ).getFeedItem();

      if (item) {
        feed.addItem(item);
        count += 1;
      }
    }

    logger.succeed(
      `added ${colors.cyan(
        `${count} page${count > 1 ? "s" : ""}`
      )} as feed item${count > 1 ? "s" : ""} in route ${colors.cyan(
        localePath
      )}`
    );
  }

  async generateFeed(): Promise<void> {
    const { dest } = this.app.dir;

    await Promise.all([
      ...entries(this.options).map(async ([localePath, localeOptions]) => {
        // current locale has valid output
        if (localeOptions.atom || localeOptions.json || localeOptions.rss) {
          const feed = this.feedMap[localePath];
          const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
            getFilename(localeOptions, localePath);

          this.addPages(localePath);

          // generate atom files
          if (localeOptions.atom) {
            await fs.ensureDir(path.dirname(dest(atomOutputFilename)));
            await fs.outputFile(dest(atomOutputFilename), feed.atom());

            logger.succeed(
              `Atom feed file generated and saved to ${colors.cyan(
                `/${atomOutputFilename}`
              )}`
            );
          }

          // generate json files
          if (localeOptions.json) {
            await fs.ensureDir(path.dirname(dest(jsonOutputFilename)));
            await fs.outputFile(dest(jsonOutputFilename), feed.json());

            logger.succeed(
              `JSON feed file generated and saved to ${colors.cyan(
                `/${jsonOutputFilename}`
              )}`
            );
          }

          // generate rss files
          if (localeOptions.rss) {
            await fs.ensureDir(path.dirname(dest(rssOutputFilename)));
            await fs.outputFile(dest(rssOutputFilename), feed.rss());

            logger.succeed(
              `RSS feed file generated and saved to ${colors.cyan(
                `/${rssOutputFilename}`
              )}`
            );
          }
        }
      }),
      entries(this.options)
        .filter(([, { atom }]) => atom)
        .map(([localePath, localeOptions]) => {
          const { atomXslTemplate, atomXslFilename } = getFilename(
            localeOptions,
            localePath
          );

          return fs.copyFile(atomXslTemplate, dest(atomXslFilename));
        }),
      entries(this.options)
        .filter(([, { rss }]) => rss)
        .map(([localePath, localeOptions]) => {
          const { rssXslFilename, rssXslTemplate } = getFilename(
            localeOptions,
            localePath
          );

          return fs.copyFile(rssXslTemplate, dest(rssXslFilename));
        }),
    ]);
  }
}
