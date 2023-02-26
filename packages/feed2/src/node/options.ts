import { type App, type Page } from "@vuepress/core";
import { type GitData } from "@vuepress/plugin-git";
import {
  ensureEndingSlash,
  isArray,
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";
import { deepAssign, fromEntries, keys, values } from "vuepress-shared/node";

import {
  type BaseFeedOptions,
  type FeedChannelOption,
  type FeedLinks,
  type FeedOptions,
} from "./typings/index.js";
import { compareDate, resolveUrl } from "./utils/index.js";

const __dirname = getDirname(import.meta.url);

const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../../templates")
);

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
    values(options.locales).some(
      ({ atom, json, rss }) => atom || json || rss
    )) ||
  // root option requests output
  Boolean(options.atom || options.json || options.rss);

export const getFeedOptions = (
  { siteData }: App,
  options: FeedOptions
): ResolvedFeedOptionsMap =>
  fromEntries(
    keys({
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
  const { channel = {}, hostname, icon, image } = options;
  const authorName = isArray(options.channel?.author)
    ? options.channel?.author[0]?.name
    : options.channel?.author?.name;

  const defaultChannelOption: FeedChannelOption = {
    title: locales[localePath]?.title || title || locales["/"]?.title || "",
    link: resolveUrl(hostname, base, localePath),
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
      ? { icon: isLinkHttp(icon) ? icon : resolveUrl(hostname, base, icon) }
      : {}),
    ...(image
      ? { image: isLinkHttp(image) ? image : resolveUrl(hostname, base, image) }
      : {}),
  };

  return deepAssign(defaultChannelOption, channel, {
    ...(channel.icon
      ? {
          icon: isLinkHttp(channel.icon)
            ? channel.icon
            : resolveUrl(hostname, base, channel.icon),
        }
      : {}),
    ...(channel.image
      ? {
          image: isLinkHttp(channel.image)
            ? channel.image
            : resolveUrl(hostname, base, channel.image),
        }
      : {}),
  });
};

export const getFilename = (
  options: ResolvedFeedOptions,
  prefix = "/"
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
  options: FeedOptions,
  localePath: string
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
    atom: resolveUrl(hostname, base, atomOutputFilename),
    atomXsl: resolveUrl(hostname, base, atomXslFilename),
    json: resolveUrl(hostname, base, jsonOutputFilename),
    rss: resolveUrl(hostname, base, rssOutputFilename),
    rssXsl: resolveUrl(hostname, base, rssXslFilename),
  };
};
