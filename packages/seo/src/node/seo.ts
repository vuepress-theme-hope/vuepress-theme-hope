/* eslint-disable @typescript-eslint/naming-convention */
import { resolveUrl } from "./utils";
import type { PageSeoInfo, SeoContent, SeoOptions } from "../types";

export const generateSeo = (
  options: SeoOptions,
  base: string,
  { page, site, locale, path, themeConfig }: PageSeoInfo
): SeoContent => {
  const {
    frontmatter: {
      author: pageAuthor,
      date,
      image,
      time = date,
      tag,
      tags = tag,
    },
    createTimeStamp,
    updateTimeStamp,
  } = page;

  const type = ["article", "category", "tag", "timeline"].some((folder) =>
    page.regularPath.startsWith(`/${folder}`)
  )
    ? "website"
    : "article";
  const author =
    pageAuthor === false
      ? ""
      : pageAuthor || options.author || themeConfig.author || "";
  const publishTime = time
    ? new Date(time).toISOString()
    : typeof createTimeStamp === "number"
    ? new Date(createTimeStamp).toISOString()
    : "";
  const modifiedTime =
    typeof updateTimeStamp === "number"
      ? new Date(updateTimeStamp).toISOString()
      : "";
  const articleTags: string[] = Array.isArray(tags)
    ? tags
    : typeof tag === "string"
    ? [tag]
    : [];

  return {
    "og:url": resolveUrl(base, path),
    "og:site_name": site.title || "",
    "og:title": page.title,
    "og:description":
      page.frontmatter.description || page.frontmatter.summary || "",
    "og:type": type,
    "og:image": image ? resolveUrl(base, image) : "",
    "og:updated_time": modifiedTime,
    "og:locale": page._computed.$lang,
    "og:locale:alternate": locale,

    "twitter:card": "summary_large_image",
    "twitter:image:alt": site.title || "",

    "article:author": author,
    "article:tag": articleTags,
    "article:published_time": publishTime,
    "article:modified_time": modifiedTime,
  };
};
