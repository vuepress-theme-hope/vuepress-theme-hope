import { deepAssign, getRootLang } from "@mr-hope/vuepress-shared";
import { error, resolveUrl } from "./utils";

import type { App } from "@vuepress/core";
import type {
  FeedChannelOption,
  FeedLinks,
  FeedOptions,
  FeedOutput,
} from "./types";

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
  options: Partial<FeedOptions>,
  app: App
): FeedOptions | false => {
  const { themeConfig } = app.options;
  const hostname =
    options.hostname || (themeConfig.hostname as string | undefined);

  // make sure hostname do not end with `/`
  if (hostname) options.hostname = hostname.replace(/\/?$/u, "");
  else {
    error("Option 'hostname' is required!");
    return false;
  }

  options.rootLang = getRootLang(app);

  return options as FeedOptions;
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
  app: App
): FeedChannelOption => {
  const { rootLang, hostname, icon, image } = options;
  const { base, themeConfig } = app.options;
  const { title, description } = app.siteData;
  const author =
    options.channel?.author?.name || (themeConfig.author as string | undefined);

  const copyright: string =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (themeConfig?.footer?.copyright as string | undefined) ||
    (author ? `Copyright by ${author}` : "");

  const defaultChannelOpion: FeedChannelOption = {
    title,
    link: resolveUrl(hostname, base),
    description,
    language: rootLang,
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
  app: App
): FeedLinks => {
  const { base } = app.options;
  const { hostname } = options;

  return {
    atom: resolveUrl(hostname, base, output.atom.path),
    json: resolveUrl(hostname, base, output.json.path),
    rss: resolveUrl(hostname, base, output.rss.path),
  };
};
