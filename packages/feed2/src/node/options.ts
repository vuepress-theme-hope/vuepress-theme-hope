import { deepAssign, getRootLang } from "@mr-hope/vuepress-shared";
import { resolveUrl } from "./utils";

import type { App } from "@vuepress/core";
import type { FeedChannelOption, FeedLinks, FeedOptions } from "../shared";

export const getFeedChannelOption = (
  options: FeedOptions,
  app: App
): FeedChannelOption => {
  const { hostname, icon, image } = options;
  const { base } = app.options;
  const { title, description } = app.siteData;
  const author = options.channel?.author?.name;

  const defaultChannelOpion: FeedChannelOption = {
    title,
    link: resolveUrl(hostname, base),
    description,
    language: getRootLang(app),
    copyright: author ? `Copyright by ${author}` : "",
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
