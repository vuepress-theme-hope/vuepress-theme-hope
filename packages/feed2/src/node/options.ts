import { deepAssign, getRootLang, getAuthor } from "@mr-hope/vuepress-shared";
import { resolveUrl } from "./utils";

import { Author } from "@mr-hope/vuepress-shared";
import type { App } from "@vuepress/core";
import type { FeedChannelOption, FeedLinks, FeedOptions } from "../shared";

export const getFeedChannelOption = (
  options: FeedOptions,
  app: App
): FeedChannelOption => {
  const { hostname, icon, image } = options;
  const { base, themeConfig } = app.options;
  const { title, description } = app.siteData;
  const author =
    options.channel?.author?.name ||
    getAuthor(themeConfig.author as Author | undefined)[0]?.name;

  const copyright: string =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (themeConfig?.footer?.copyright as string | undefined) ||
    (author ? `Copyright by ${author}` : "");

  const defaultChannelOpion: FeedChannelOption = {
    title,
    link: resolveUrl(hostname, base),
    description,
    language: getRootLang(app),
    copyright,
    pubDate: new Date(),
    lastUpdated: new Date(),
    ...(icon ? { icon } : {}),
    ...(image ? { image } : {}),
    ...(author
      ? {
          author: {
            name: author,
          },
        }
      : {}),
  };

  return deepAssign(defaultChannelOpion, options.channel || {});
};

export const getFeedLinks = (options: FeedOptions, app: App): FeedLinks => {
  const { base } = app.options;
  const { hostname } = options;

  return {
    atom: resolveUrl(hostname, base, options.atomOutputFilename || "atom.xml"),
    json: resolveUrl(hostname, base, options.jsonOutputFilename || "feed.json"),
    rss: resolveUrl(hostname, base, options.jsonOutputFilename || "rss.xml"),
  };
};
