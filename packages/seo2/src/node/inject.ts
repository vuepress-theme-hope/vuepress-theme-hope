import type { HeadConfig } from "@vuepress/core";
import type {
  ArticleJSONLD,
  ArticleSeoContent,
  SeoContent,
} from "../shared/index.js";

interface MetaOptions {
  name: string;
  content: string;
  attribute?: string;
}

const appendMetatoHead = (
  head: HeadConfig[],
  {
    name,
    content,
    attribute = ["article:", "og:"].some((type) => name.startsWith(type))
      ? "property"
      : "name",
  }: MetaOptions
): void => {
  if (content) head.push(["meta", { [attribute]: name, content }]);
};

export const addOGP = (head: HeadConfig[], content: SeoContent): void => {
  for (const property in content)
    switch (property) {
      case "article:tag":
        (<ArticleSeoContent>content)["article:tag"]!.forEach((tag: string) =>
          appendMetatoHead(head, { name: "article:tag", content: tag })
        );
        break;
      case "og:locale:alternate":
        content["og:locale:alternate"].forEach((locale: string) => {
          if (locale !== content["og:locale"])
            appendMetatoHead(head, {
              name: "og:locale:alternate",
              content: locale,
            });
        });
        break;
      default:
        if (<string>content[<keyof SeoContent>property])
          appendMetatoHead(head, {
            name: property,
            content: <string>content[<keyof SeoContent>property],
          });
    }
};

export const appendJSONLD = (
  head: HeadConfig[],
  content: ArticleJSONLD | null
): void => {
  if (content)
    head.push([
      "script",
      { type: "application/ld+json" },
      JSON.stringify(content),
    ]);
};

export const appendCanonical = (
  head: HeadConfig[],
  url?: string | null
): void => {
  if (url) head.push(["link", { rel: "canonical", href: url }]);
};

export const appendAlternate = (
  head: HeadConfig[],
  urls: { lang: string; path: string }[]
): void => {
  urls.forEach(({ lang, path }) => {
    head.push([
      "link",
      { rel: "alternate", hreflang: lang.toLowerCase(), href: path },
    ]);
  });
};
