/* eslint-disable @typescript-eslint/naming-convention */
import type { App } from "@vuepress/core";
import {
  getAuthor,
  getDateInfo,
  isArray,
  isFunction,
  isString,
  removeEndingSlash,
} from "vuepress-shared/node";

import type { SeoOptions } from "./options.js";
import type {
  ArticleSchema,
  BlogPostingSchema,
  ExtendPage,
  SeoContent,
  WebPageSchema,
} from "./typings/index.js";
import { getAlternateInfo, getCover, getImages, resolveUrl } from "./utils.js";

export const getOGP = (
  page: ExtendPage,
  options: SeoOptions,
  app: App,
): SeoContent => {
  const {
    isArticle = (page): boolean =>
      Boolean(page.filePathRelative && !page.frontmatter["home"]),
    author: globalAuthor,
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
      tags = <string[]>tag,
    },
    data: { git = {} },
  } = page;

  const title =
    siteData.locales[page.pathLocale]?.title ||
    siteData.title ||
    siteData.locales["/"]?.title ||
    "";
  const author =
    pageAuthor === false ? [] : getAuthor(pageAuthor || globalAuthor);
  const modifiedTime = git.updatedTime
    ? new Date(git.updatedTime).toISOString()
    : null;
  const articleTags = isArray(tags) ? tags : isString(tag) ? [tag] : [];
  const articleTitle = page.title;
  const cover = getCover(page, app, options);
  const images = getImages(page, app, options);
  const locales = getAlternateInfo(page, app);
  const publishedTime = getDateInfo(date)?.value?.toISOString();

  const ogImage = cover || images[0] || options.fallBackImage || "";

  const defaultOGP: SeoContent = {
    "og:url": resolveUrl(options.hostname, base, page.path),
    "og:site_name": title,
    "og:title": articleTitle,
    "og:description": page.frontmatter.description || "",
    "og:type": isArticle(page) ? "article" : "website",
    "og:image": ogImage,
    "og:locale": page.lang,
    "og:locale:alternate": locales.map(({ lang }) => lang),
    ...(modifiedTime ? { "og:updated_time": modifiedTime } : {}),
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
    ...(publishedTime ? { "article:published_time": publishedTime } : {}),
    ...(modifiedTime ? { "article:modified_time": modifiedTime } : {}),
  };

  return defaultOGP;
};

export const getJSONLD = (
  page: ExtendPage,
  options: SeoOptions,
  app: App,
): ArticleSchema | BlogPostingSchema | WebPageSchema => {
  const {
    isArticle = (page): boolean =>
      Boolean(page.filePathRelative && !page.frontmatter["home"]),
    author: globalAuthor,
  } = options;

  const {
    title,
    frontmatter: { author: pageAuthor, description, time, date = time },
    data: { git = {} },
  } = page;

  const author =
    pageAuthor === false ? [] : getAuthor(pageAuthor || globalAuthor);
  const datePublished = getDateInfo(date)?.value?.toISOString();
  const dateModified = git.updatedTime
    ? new Date(git.updatedTime).toISOString()
    : null;
  const cover = getCover(page, app, options);
  const images = getImages(page, app, options);

  return isArticle(page)
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        image: images.length ? images : [cover || options.fallBackImage || ""],
        datePublished,
        dateModified,
        author: author.map((item) => ({ "@type": "Person", ...item })),
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        ...(description ? { description } : {}),
      };
};

export const getCanonicalLink = (
  page: ExtendPage,
  options: SeoOptions,
): string | null =>
  isFunction(options.canonical)
    ? options.canonical(page)
    : isString(options.canonical)
    ? `${removeEndingSlash(options.canonical)}${page.path}`
    : null;

export const getAlternateLinks = (
  page: ExtendPage,
  { hostname }: SeoOptions,
  app: App,
): { lang: string; path: string }[] =>
  getAlternateInfo(page, app).map(({ lang, path }) => ({
    lang,
    path: resolveUrl(hostname, app.options.base, path),
  }));
