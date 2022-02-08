import { deepAssign, getRootLang } from "@mr-hope/vuepress-shared";
import { getFilename, resolveUrl } from "./utils";

import type { App } from "@vuepress/core";
import type { FeedChannelOption, FeedLinks, FeedOptions } from "../shared";

export const getFeedChannelOption = (
  app: App,
  options: FeedOptions
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

export const getFeedLinks = (app: App, options: FeedOptions): FeedLinks => {
  const { base } = app.options;
  const { hostname } = options;
  const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
    getFilename(options);

  return {
    atom: resolveUrl(hostname, base, atomOutputFilename),
    json: resolveUrl(hostname, base, jsonOutputFilename),
    rss: resolveUrl(hostname, base, rssOutputFilename),
  };
};
