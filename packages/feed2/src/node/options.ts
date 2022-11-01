import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/shared";
import { deepAssign } from "vuepress-shared/node";

import { compareDate, resolveUrl } from "./utils.js";

import type { App, Page } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type {
  BaseFeedOptions,
  FeedChannelOption,
  FeedLinks,
  FeedOptions,
} from "../shared/index.js";

export type ResolvedFeedOptions = BaseFeedOptions & { hostname: string };

export type ResolvedFeedOptionsMap = Record<string, ResolvedFeedOptions>;

export const ensureHostName = (options: Partial<FeedOptions>): boolean => {
  // make sure hostname do not end with `/`
  if (options.hostname) {
    options.hostname = isLinkHttp(options.hostname)
      ? removeEndingSlash(options.hostname)
      : `https://${removeEndingSlash(options.hostname)}`;

    return true;
  }

  return false;
};

export const checkOutput = (options: Partial<FeedOptions>): boolean =>
  // some locales request output
  (options.locales &&
    Object.entries(options.locales).some(
      ([, { atom, json, rss }]) => atom || json || rss
    )) ||
  // root option requests output
  Boolean(options.atom || options.json || options.rss);

export const getFeedOptions = (
  { siteData }: App,
  options: FeedOptions
): ResolvedFeedOptionsMap =>
  Object.fromEntries(
    Object.keys({
      // root locale must exists
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "/": {},
      ...siteData.locales,
    }).map((localePath) => [
      localePath,
      <ResolvedFeedOptions>{
        // default values
        filter: ({ frontmatter, filePathRelative }: Page): boolean =>
          !(
            frontmatter["home"] ||
            !filePathRelative ||
            frontmatter["article"] === false ||
            frontmatter["feed"] === false
          ),
        sorter: (
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
        ...options,
        ...options.locales?.[localePath],

        // make sure hostname is not been override
        hostname: options.hostname,
      },
    ])
  );

export const getFeedChannelOption = (
  app: App,
  options: FeedOptions,
  localePath = ""
): FeedChannelOption => {
  const { base } = app.options;
  const { title, description, lang, locales } = app.siteData;
  const { hostname, icon, image } = options;
  const author = options.channel?.author?.name;

  const defaultChannelOption: FeedChannelOption = {
    title: locales[localePath]?.title || title || locales["/"]?.title || "",
    link: resolveUrl(hostname, base, localePath),
    description:
      locales[localePath]?.description ||
      description ||
      locales["/"]?.description ||
      "",
    language: locales[localePath]?.lang || lang,
    copyright: author ? `Copyright by ${author}` : "",
    pubDate: new Date(),
    lastUpdated: new Date(),
    ...(icon ? { icon } : {}),
    ...(image ? { image } : {}),
    ...(author ? { author: { name: author } } : {}),
  };

  return deepAssign(defaultChannelOption, options.channel || {});
};

export const getFilename = (
  options: ResolvedFeedOptions,
  prefix = "/"
): {
  atomOutputFilename: string;
  jsonOutputFilename: string;
  rssOutputFilename: string;
} => ({
  atomOutputFilename: `${removeLeadingSlash(prefix)}${
    options.atomOutputFilename || "atom.xml"
  }`,
  jsonOutputFilename: `${removeLeadingSlash(prefix)}${
    options.jsonOutputFilename || "feed.json"
  }`,
  rssOutputFilename: `${removeLeadingSlash(prefix)}${
    options.rssOutputFilename || "rss.xml"
  }`,
});

export const getFeedLinks = (
  { options: { base } }: App,
  options: FeedOptions
): FeedLinks => {
  const { hostname } = options;
  const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
    getFilename(options);

  return {
    atom: resolveUrl(hostname, base, atomOutputFilename),
    json: resolveUrl(hostname, base, jsonOutputFilename),
    rss: resolveUrl(hostname, base, rssOutputFilename),
  };
};
