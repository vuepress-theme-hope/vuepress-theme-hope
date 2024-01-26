import type { GitData } from "@vuepress/plugin-git";
import type { App, Page } from "vuepress/core";
import {
  compareDate,
  deepAssign,
  fromEntries,
  isArray,
  isFunction,
  isLinkHttp,
  keys,
  removeEndingSlash,
  removeLeadingSlash,
  values,
} from "vuepress-shared/node";

import type {
  BaseFeedOptions,
  FeedChannelOption,
  FeedOptions,
} from "./typings/index.js";
import { getUrl } from "./utils/index.js";

export interface ResolvedFeedOptions
  extends Omit<BaseFeedOptions, "sorter" | "filter" | "preservedElements">,
    Required<Pick<BaseFeedOptions, "sorter" | "filter">> {
  hostname: string;
  isPreservedElement: (tagName: string) => boolean;
}

export type ResolvedFeedOptionsMap = Record<string, ResolvedFeedOptions>;

export const ensureHostName = (
  app: App,
  options: Partial<FeedOptions>,
): boolean => {
  const hostname = app.env.isDev
    ? options.devHostname || `http://localhost:${app.options.port}`
    : options.hostname;

  if (hostname) {
    // make sure hostname do not end with `/`
    options.hostname = isLinkHttp(hostname)
      ? removeEndingSlash(hostname)
      : `https://${removeEndingSlash(hostname)}`;

    return true;
  }

  return false;
};

export const checkOutput = (options: Partial<FeedOptions>): boolean =>
  // some locales request output
  (options.locales &&
    values(options.locales).some(
      ({ atom, json, rss }) => atom || json || rss,
    )) ||
  // root option requests output
  Boolean(options.atom || options.json || options.rss);

export const getFeedOptions = (
  { siteData }: App,
  options: FeedOptions,
): ResolvedFeedOptionsMap =>
  fromEntries(
    keys({
      // root locale must exists
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "/": {},
      ...siteData.locales,
    }).map((localePath) => {
      const preservedElements =
        options.locales?.[localePath]?.preservedElements ||
        options.preservedElements;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hostname, devServer, locales, ...rest } = options;

      return [
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
            pageB: Page<{ git?: GitData }, Record<string, never>>,
          ): number =>
            compareDate(
              pageA.data.git?.createdTime
                ? new Date(pageA.data.git?.createdTime)
                : pageA.frontmatter.date,
              pageB.data.git?.createdTime
                ? new Date(pageB.data.git?.createdTime)
                : pageB.frontmatter.date,
            ),

          ...rest,
          ...options.locales?.[localePath],

          // make sure these are not overrode
          hostname,
          isPreservedElement: isArray(preservedElements)
            ? (tagName: string): boolean =>
                preservedElements.some((item) =>
                  item instanceof RegExp
                    ? item.test(tagName)
                    : item === tagName,
                )
            : isFunction(preservedElements)
              ? preservedElements
              : (): boolean => false,
        },
      ];
    }),
  );

export const getFeedChannelOption = (
  app: App,
  options: FeedOptions,
  localePath = "",
): FeedChannelOption => {
  const { base } = app.options;
  const { title, description, lang, locales } = app.siteData;
  const { channel = {}, hostname, icon, image } = options;
  const authorName = isArray(options.channel?.author)
    ? options.channel?.author[0]?.name
    : options.channel?.author?.name;

  const defaultChannelOption: FeedChannelOption = {
    title: locales[localePath]?.title || title || locales["/"]?.title || "",
    link: getUrl(hostname, base, localePath),
    description:
      locales[localePath]?.description ||
      description ||
      locales["/"]?.description ||
      "",
    language: locales[localePath]?.lang || lang,
    copyright: authorName ? `Copyright by ${authorName}` : "",
    pubDate: new Date(),
    lastUpdated: new Date(),
    ...(icon
      ? { icon: isLinkHttp(icon) ? icon : getUrl(hostname, base, icon) }
      : {}),
    ...(image
      ? { image: isLinkHttp(image) ? image : getUrl(hostname, base, image) }
      : {}),
  };

  return deepAssign(defaultChannelOption, channel, {
    ...(channel.icon
      ? {
          icon: isLinkHttp(channel.icon)
            ? channel.icon
            : getUrl(hostname, base, channel.icon),
        }
      : {}),
    ...(channel.image
      ? {
          image: isLinkHttp(channel.image)
            ? channel.image
            : getUrl(hostname, base, channel.image),
        }
      : {}),
  });
};

export const getFilename = (
  options: ResolvedFeedOptions,
  prefix = "/",
): Required<
  Pick<
    FeedOptions,
    | "atomOutputFilename"
    | "atomXslFilename"
    | "jsonOutputFilename"
    | "rssOutputFilename"
    | "rssXslFilename"
  >
> => ({
  atomOutputFilename: `${removeLeadingSlash(prefix)}${
    options.atomOutputFilename || "atom.xml"
  }`,
  atomXslFilename: `${removeLeadingSlash(prefix)}${
    options.atomXslFilename || "atom.xsl"
  }`,

  jsonOutputFilename: `${removeLeadingSlash(prefix)}${
    options.jsonOutputFilename || "feed.json"
  }`,
  rssOutputFilename: `${removeLeadingSlash(prefix)}${
    options.rssOutputFilename || "rss.xml"
  }`,
  rssXslFilename: `${removeLeadingSlash(prefix)}${
    options.rssXslFilename || "rss.xsl"
  }`,
});

export interface FeedLinks {
  localePath: string;
  atom: string;
  atomXsl: string;
  json: string;
  rss: string;
  rssXsl: string;
}

export const getFeedLinks = (
  { options: { base } }: App,
  options: ResolvedFeedOptions,
  localePath: string,
): FeedLinks => {
  const { hostname } = options;
  const {
    atomOutputFilename,
    atomXslFilename,
    jsonOutputFilename,
    rssOutputFilename,
    rssXslFilename,
  } = getFilename(options, localePath);

  return {
    localePath,
    atom: getUrl(hostname, base, atomOutputFilename),
    atomXsl: getUrl(hostname, base, atomXslFilename),
    json: getUrl(hostname, base, jsonOutputFilename),
    rss: getUrl(hostname, base, rssOutputFilename),
    rssXsl: getUrl(hostname, base, rssXslFilename),
  };
};
