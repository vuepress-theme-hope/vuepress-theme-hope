import { Context } from "@mr-hope/vuepress-types";
import { FeedChannelOption } from "../types/feed";
import { error, resolveUrl } from "./utils";
import { FeedLinks, FeedOptions, FeedOutput } from "../types";
import { deepAssign } from "@mr-hope/vuepress-utils";

export interface ResolvedFeedOutputConfig {
  enable: boolean;
  path: string;
}

export interface ResolvedFeedOutput {
  atom: ResolvedFeedOutputConfig;
  json: ResolvedFeedOutputConfig;
  rss: ResolvedFeedOutputConfig;
}

export const checkOptions = (
  options: FeedOptions,
  context: Context
): boolean => {
  const baseLang = options.baseLang || context.themeConfig.baseLang;
  const hostname = options.hostname || context.themeConfig.hostname;

  if (hostname) options.hostname = hostname;
  else {
    error("Option 'hostname' is required!");
    return false;
  }

  options.baseLang = baseLang || "en-US";

  return true;
};

export const getOutput = (output?: FeedOutput): ResolvedFeedOutput => {
  const defaultOption: ResolvedFeedOutput = {
    atom: {
      enable: true,
      path: "atom.xml",
    },
    json: {
      enable: true,
      path: "feed.json",
    },
    rss: {
      enable: true,
      path: "rss.xml",
    },
  };

  return deepAssign(defaultOption, output || {});
};

export const getFeedChannelOption = (
  options: FeedOptions,
  context: Context
): FeedChannelOption => {
  const { baseLang, hostname, icon, image } = options;
  const { base, themeConfig } = context;
  const { title, description } = context.getSiteData();
  const author = options.channel?.author?.name || themeConfig.author;

  const copyright =
    themeConfig.footer?.copyright || (author ? `Copyright by ${author}` : "");

  const defaultChannelOpion: FeedChannelOption = {
    title,
    link: resolveUrl(hostname, base),
    description,
    language: baseLang,
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

export const getFeedLinks = (
  options: FeedOptions,
  output: ResolvedFeedOutput,
  context: Context
): FeedLinks => {
  const { base } = context;
  const { hostname } = options;

  return {
    atom: resolveUrl(hostname, base, output.atom.path),
    json: resolveUrl(hostname, base, output.json.path),
    rss: resolveUrl(hostname, base, output.rss.path),
  };
};
