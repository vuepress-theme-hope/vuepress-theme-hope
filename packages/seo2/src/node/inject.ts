import type { HeadConfig } from "@vuepress/core";
import type { ArticleJSONLD, ArticleSeoContent, SeoContent } from "../shared";

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
        (content as ArticleSeoContent)["article:tag"]!.forEach((tag: string) =>
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
        if (content[property as keyof SeoContent] as string)
          appendMetatoHead(head, {
            name: property,
            content: content[property as keyof SeoContent] as string,
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
