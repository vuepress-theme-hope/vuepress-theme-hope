/* eslint-disable @typescript-eslint/naming-convention */
import { PageSeoInfo, SeoOptions } from "../types";
import { SeoContent } from "../types/seo";

export const generateSeo = (
  options: SeoOptions,
  { $page, $site, locale, path, themeConfig }: PageSeoInfo
): SeoContent => {
  const {
    frontmatter: {
      author: pageAuthor,
      date,
      image,
      time = date as Date,
      tag,
      tags = tag as string[],
    },
    lastUpdatedTime,
  } = $page;
  const hostname = (options.hostname || themeConfig.hostname || "").replace(
    /\/$/u,
    ""
  );
  const type = ["article", "category", "tag", "timeline"].some((folder) =>
    $page.regularPath.startsWith(`/${folder}`)
  )
    ? "website"
    : "article";
  const author =
    pageAuthor === false
      ? ""
      : (pageAuthor as string) || options.author || themeConfig.author || "";
  const modifiedTime =
    typeof lastUpdatedTime === "number"
      ? new Date(lastUpdatedTime).toISOString()
      : "";
  const articleTags: string[] = Array.isArray(tags)
    ? tags
    : typeof tag === "string"
    ? [tag]
    : [];

  return {
    "og:url": `${hostname}${path}`,
    "og:site_name": $site.title || "",
    "og:title": $page.title,
    "og:description": $page.frontmatter.description || "",
    "og:type": type,
    "og:image": image ? `${hostname}${image}` : "",
    "og:updated_time": modifiedTime,
    "og:locale": $page._computed.$lang,
    "og:locale:alternate": locale,

    "twitter:card": "summary_large_image",
    "twitter:image:alt": $site.title || "",

    "article:author": author,
    "article:tag": articleTags,
    "article:published_time": time ? new Date(time).toISOString() : "",
    "article:modified_time": modifiedTime,
  };
};
