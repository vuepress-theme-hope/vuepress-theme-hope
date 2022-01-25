/* eslint-disable @typescript-eslint/naming-convention */
import { Logger, getDate, getAuthor } from "@mr-hope/vuepress-shared";
import { fs } from "@vuepress/utils";
import { getLocales, getLink } from "./utils";

import type { AppDir } from "@vuepress/core";
import type {
  ArticleJSONLD,
  PageSeoInfo,
  SeoContent,
  SeoOptions,
} from "./types";

const logger = new Logger("Seo");

export const generateSeo = (
  options: SeoOptions,
  { page, app, permalink }: PageSeoInfo
): { OGP: SeoContent; JSONLD: ArticleJSONLD | null } => {
  const { base } = app.options;
  const {
    frontmatter: {
      author: pageAuthor,
      time,
      date = time,
      banner,
      cover,
      tag,
      tags = tag as string[],
    },
    git = {},
  } = page;
  const { siteData } = app;
  const locales = getLocales(siteData.locales, page.lang);

  const type = ["article", "category", "tag", "timeline"].some(
    (folder) =>
      page.filePathRelative && page.filePathRelative.startsWith(`/${folder}`)
  )
    ? "website"
    : "article";

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
  const image = cover
    ? getLink(options.hostname, base, cover)
    : banner
    ? getLink(options.hostname, base, banner)
    : "";

  let publishedTime = "";

  if (date instanceof Date) publishedTime = new Date(date).toISOString();
  else if (date) {
    const dateInfo = getDate(date);
    if (dateInfo && dateInfo.value)
      publishedTime = dateInfo.value.toISOString();
  }

  return {
    OGP: {
      "og:url": getLink(options.hostname, base, permalink || page.path),
      "og:site_name": siteData.title,
      "og:title": articleTitle,
      "og:description": page.frontmatter.description || "",
      "og:type": type,
      "og:image": image,
      "og:updated_time": modifiedTime,
      "og:locale": page.lang,
      "og:locale:alternate": locales,

      "twitter:card": "summary_large_image",
      "twitter:image:alt": siteData.title,

      "article:author": author[0]?.name,
      "article:tag": articleTags,
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
    },
    JSONLD:
      type === "article"
        ? {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: articleTitle,
            image: [image],
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
