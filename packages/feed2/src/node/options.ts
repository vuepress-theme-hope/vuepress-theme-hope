import { deepAssign, getRootLang, _getAuthor } from "@mr-hope/vuepress-shared";
import { logger, resolveUrl } from "./utils";

import { Author } from "@mr-hope/vuepress-shared";
import type { App } from "@vuepress/core";
import type { FeedChannelOption, FeedLinks, FeedOptions } from "../shared";

export const checkOptions = (
  options: Partial<FeedOptions>,
  app: App
): FeedOptions | false => {
  const { themeConfig } = app.options;
  const hostname =
    options.hostname || (themeConfig.hostname as string | undefined);

  // make sure hostname do not end with `/`
  if (hostname) options.hostname = hostname.replace(/\/?$/u, "");
  else {
    logger.error("Option 'hostname' is required!");
    return false;
  }

  return options as FeedOptions;
};

export const getFeedChannelOption = (
  options: FeedOptions,
  app: App
): FeedChannelOption => {
  const { hostname, icon, image } = options;
  const { base, themeConfig } = app.options;
  const { title, description } = app.siteData;
  const author =
    options.channel?.author?.name ||
    _getAuthor(themeConfig.author as Author | undefined)[0]?.name;

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
