/* eslint-disable @typescript-eslint/naming-convention */
import { removeEndingSlash } from "@vuepress/shared";
import { getAuthor, getDate } from "vuepress-shared";

import { getCover, getImages, getLocales, resolveUrl } from "./utils";

import type { App } from "@vuepress/core";
import type {
  ArticleJSONLD,
  ExtendPage,
  SeoContent,
  SeoOptions,
} from "../shared";

export const getOGP = (
  page: ExtendPage,
  options: SeoOptions,
  app: App
): SeoContent => {
  const {
    isArticle = (page): boolean =>
      Boolean(page.filePathRelative && !page.frontmatter["home"]),
  } = options;
  const {
    options: { base },
    siteData,
  } = app;
  const {
    frontmatter: {
      author: pageAuthor,
      time,
      date = time,
      tag,
      tags = tag as string[],
    },
    data: { git = {} },
  } = page;

  const title =
    siteData.locales[page.pathLocale]?.title ||
    siteData.title ||
    siteData.locales["/"]?.title ||
    "";
  const author =
    pageAuthor === false ? [] : getAuthor(pageAuthor || options.author);
  const { updatedTime } = git;

  const modifiedTime = updatedTime ? new Date(updatedTime).toISOString() : "";
  const articleTags: string[] = Array.isArray(tags)
    ? tags
    : typeof tag === "string"
    ? [tag]
    : [];

  const articleTitle = page.title;
  const cover = getCover(page, options, app);
  const images = getImages(page, options, app);
  const locales = getLocales(page.lang, siteData.locales);

  let publishedTime = "";

  if (date instanceof Date) publishedTime = new Date(date).toISOString();
  else if (date) {
    const dateInfo = getDate(date);

    if (dateInfo && dateInfo.value)
      publishedTime = dateInfo.value.toISOString();
  }

  const ogImage = cover || images[0] || options.fallBackImage || "";

  const defaultOGP: SeoContent = {
    "og:url": resolveUrl(options.hostname, base, page.path),
    "og:site_name": title,
    "og:title": articleTitle,
    "og:description":
      page.frontmatter.description ||
      (options.autoDescription ? page.frontmatter.summary || "" : ""),
    "og:type": isArticle(page) ? "article" : "website",
    "og:image": ogImage,
    "og:updated_time": modifiedTime,
    "og:locale": page.lang,
    "og:locale:alternate": locales,
    ...(options.restrictions
      ? { "og:restrictions:age": options.restrictions }
      : {}),

    ...(options.twitterID ? { "twitter:creator": options.twitterID } : {}),
    ...(ogImage
      ? {
          "twitter:card": "summary_large_image",
          "twitter:image:alt": articleTitle,
        }
      : {}),

    "article:author": author[0]?.name,
    "article:tag": articleTags,
    "article:published_time": publishedTime,
    "article:modified_time": modifiedTime,
  };

  return defaultOGP;
};

export const getJSONLD = (
  page: ExtendPage,
  options: SeoOptions,
  app: App
): ArticleJSONLD | null => {
  const {
    isArticle = (page): boolean =>
      Boolean(page.filePathRelative && !page.frontmatter["home"]),
  } = options;

  const {
    frontmatter: { author: pageAuthor, time, date = time },
    data: { git = {} },
  } = page;

  const author =
    pageAuthor === false ? [] : getAuthor(pageAuthor || options.author);
  const { updatedTime } = git;

  const modifiedTime = updatedTime ? new Date(updatedTime).toISOString() : "";

  const articleTitle = page.title;
  const cover = getCover(page, options, app);
  const images = getImages(page, options, app);

  let publishedTime = "";

  if (date instanceof Date) publishedTime = new Date(date).toISOString();
  else if (date) {
    const dateInfo = getDate(date);

    if (dateInfo && dateInfo.value)
      publishedTime = dateInfo.value.toISOString();
  }

  return isArticle(page)
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: articleTitle,
        image: images.length ? images : [cover || options.fallBackImage || ""],
        datePublished: publishedTime,
        dateModified: modifiedTime,
        author: author.map((item) => ({ "@type": "Person", ...item })),
      }
    : null;
};

export const getCanonicalLink = (
  page: ExtendPage,
  options: SeoOptions
): string | null => {
  if (typeof options.canonical === "function") return options.canonical(page);

  if (typeof options.canonical === "string")
    return `${removeEndingSlash(options.canonical)}${page.path}`;

  return null;
};
