/* eslint-disable @typescript-eslint/naming-convention */
import { getDate, getAuthor } from "@mr-hope/vuepress-shared";
import { fs } from "@vuepress/utils";
import { getCover, getImages, getLocales, logger, resolveUrl } from "./utils";

import type { App, AppDir } from "@vuepress/core";
import type {
  ArticleJSONLD,
  ExtendPage,
  SeoContent,
  SeoOptions,
} from "../shared";

export const generateSeo = (
  page: ExtendPage,
  options: SeoOptions,
  app: App
): { OGP: SeoContent; JSONLD: ArticleJSONLD | null } => {
  const {
    isArticle = (page): boolean =>
      Boolean(page.filePathRelative && !page.frontmatter.home),
  } = options;
  const { base } = app.options;
  const {
    frontmatter: {
      author: pageAuthor,
      time,
      date = time,
      tag,
      tags = tag as string[],
    },
    git = {},
  } = page;
  const { siteData } = app;

  const title =
    siteData.locales[page.pathLocale].title ||
    siteData.title ||
    siteData.locales["/"].title ||
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

  return {
    OGP: {
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
    },
    JSONLD: isArticle(page)
      ? {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: articleTitle,
          image: images.length
            ? images
            : [cover || options.fallBackImage || ""],
          datePublished: publishedTime,
          dateModified: modifiedTime,
          author: author.map((item) => ({ "@type": "Person", ...item })),
        }
      : null,
  };
};

export const generateRobotsTxt = async (dir: AppDir): Promise<void> => {
  logger.load("Generating robots.txt");
  const publicPath = dir.public("robots.txt");

  let content = fs.existsSync(publicPath)
    ? await fs.readFile(publicPath, { encoding: "utf8" })
    : "";

  if (content && !content.includes("User-agent")) {
    logger.error();
    logger.update("robots.txt seems invalid!");
  } else {
    content += "\nUser-agent:*\nDisallow:\n";

    await fs.writeFile(dir.dest("robots.txt"), content, {
      flag: "w",
    });

    logger.succeed();
  }
};
