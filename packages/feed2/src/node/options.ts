import type { GitData } from "@vuepress/plugin-git";
import type { App, Page } from "vuepress/core";
import { getDirname, path } from "vuepress/utils";
import {
  compareDate,
  deepAssign,
  ensureEndingSlash,
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
  FeedLinks,
  FeedOptions,
} from "./typings/index.js";
import { getUrl } from "./utils/index.js";

const __dirname = getDirname(import.meta.url);

const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../../templates"),
);

export interface ResolvedFeedOptions
  extends Omit<BaseFeedOptions, "sorter" | "filter" | "preservedElements">,
    Required<Pick<BaseFeedOptions, "sorter" | "filter">> {
  hostname: string;
  isPreservedElement: (tagName: string) => boolean;
}

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
          ...options,
          ...options.locales?.[localePath],

          // make sure hostname is not overrode
          hostname: options.hostname,

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
    | "atomXslTemplate"
    | "jsonOutputFilename"
    | "rssOutputFilename"
    | "rssXslFilename"
    | "rssXslTemplate"
  >
> => ({
  atomOutputFilename: `${removeLeadingSlash(prefix)}${
    options.atomOutputFilename || "atom.xml"
  }`,
  atomXslFilename: `${removeLeadingSlash(prefix)}${
    options.atomXslFilename || "atom.xsl"
  }`,
  atomXslTemplate: options.atomXslTemplate || `${TEMPLATE_FOLDER}atom.xsl`,
  jsonOutputFilename: `${removeLeadingSlash(prefix)}${
    options.jsonOutputFilename || "feed.json"
  }`,
  rssOutputFilename: `${removeLeadingSlash(prefix)}${
    options.rssOutputFilename || "rss.xml"
  }`,
  rssXslFilename: `${removeLeadingSlash(prefix)}${
    options.rssXslFilename || "rss.xsl"
  }`,
  rssXslTemplate: options.rssXslTemplate || `${TEMPLATE_FOLDER}rss.xsl`,
});

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
