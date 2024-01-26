import type { GitData } from "@vuepress/plugin-git";
import type { App, Page } from "vuepress/core";
import { colors, fs, path } from "vuepress/utils";
import { entries, fromEntries } from "vuepress-shared/node";

import { FeedItem } from "./feedItem.js";
import { FeedStore } from "./feedStore.js";
import { getAtomFeed } from "./generator/atom/index.js";
import { getJSONFeed } from "./generator/json/index.js";
import { getRssFeed } from "./generator/rss/index.js";
import type { ResolvedFeedOptionsMap } from "./options.js";
import { getFilename } from "./options.js";
import type { FeedPluginFrontmatter } from "./typings/index.js";
import { logger } from "./utils/index.js";

interface OutputOptions {
  app: App;
  name: string;
  filename: string;
  content: string;
}

const outputFeed = async ({
  app,
  content,
  filename,
  name,
}: OutputOptions): Promise<void> => {
  const { dest } = app.dir;

  await fs.ensureDir(path.dirname(dest(filename)));
  await fs.outputFile(dest(filename), content);

  logger.succeed(`Generated ${name} feed file to ${colors.cyan(filename)}`);
};

export const generateFeed = async (
  app: App,
  options: ResolvedFeedOptionsMap,
): Promise<void> => {
  const { dest } = app.dir;
  const localMap: Record<string, FeedStore> = fromEntries(
    entries(options).map(([localePath, localeOptions]) => [
      localePath,
      new FeedStore(app, localeOptions, localePath),
    ]),
  );

  const generateAtomTemplates = entries(options)
    // filter enabled locales
    .filter(([, { atom }]) => atom)
    // write template
    .map(([localePath, localeOptions]) => {
      const { atomXslTemplate, atomXslFilename } = getFilename(
        localeOptions,
        localePath,
      );

      return fs.copyFile(atomXslTemplate, dest(atomXslFilename));
    });

  const generateRSSTemplates = entries(options)
    // filter enabled locales
    .filter(([, { rss }]) => rss)
    // write template
    .map(([localePath, localeOptions]) => {
      const { rssXslFilename, rssXslTemplate } = getFilename(
        localeOptions,
        localePath,
      );

      return fs.copyFile(rssXslTemplate, dest(rssXslFilename));
    });

  const generateFeeds = entries(options)
    // filter enabled locales
    .filter(([, { atom, json, rss }]) => atom || json || rss)
    .map(async ([localePath, localeOptions]) => {
      const {
        atom,
        json,
        rss,
        count: feedCount = 100,
        filter,
        sorter,
      } = localeOptions;
      const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
        getFilename(localeOptions, localePath);

      const feedStore = localMap[localePath];
      const pages = app.pages
        .filter((page) => page.pathLocale === localePath)
        .filter(filter)
        .sort(sorter);

      // add feed items
      for (const page of pages) {
        const feedItem = new FeedItem(
          app,
          localeOptions,
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

      // generate feed
      await Promise.all([
        atom
          ? outputFeed({
              app,
              content: getAtomFeed(feedStore),
              filename: atomOutputFilename,
              name: "Atom",
            })
          : null,
        json
          ? outputFeed({
              app,
              content: getJSONFeed(feedStore),
              filename: jsonOutputFilename,
              name: "JSON",
            })
          : null,
        rss
          ? outputFeed({
              app,
              content: getRssFeed(feedStore),
              filename: rssOutputFilename,
              name: "RSS",
            })
          : null,
      ]);
    });

  await Promise.all([
    generateAtomTemplates,
    generateRSSTemplates,
    ...generateFeeds,
  ]);
};
