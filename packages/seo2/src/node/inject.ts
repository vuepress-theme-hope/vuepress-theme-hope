import type { HeadConfig } from "@vuepress/core";
import type { ArticleSeoContent, SeoContent, SeoOptions } from "../shared";

interface MetaOptions {
  name: string;
  content: string;
  attribute?: string;
}

const addMeta = (
  meta: HeadConfig[],
  {
    name,
    content,
    attribute = ["article:", "og:"].some((type) => name.startsWith(type))
      ? "property"
      : "name",
  }: MetaOptions
): void => {
  if (content) meta.push(["meta", { [attribute]: name, content }]);
};

export const appendSEO = (
  head: HeadConfig[],
  content: SeoContent,
  options: SeoOptions
): void => {
  for (const property in content)
    switch (property) {
      case "article:tag":
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (content as ArticleSeoContent)["article:tag"]!.forEach((tag: string) =>
          addMeta(head, { name: "article:tag", content: tag })
        );
        break;
      case "og:locale:alternate":
        content["og:locale:alternate"].forEach((locale: string) => {
          if (locale !== content["og:locale"])
            addMeta(head, { name: "og:locale:alternate", content: locale });
        });
        break;
      default:
        if (content[property as keyof SeoContent] as string)
          addMeta(head, {
            name: property,
            content: content[property as keyof SeoContent] as string,
          });
    }

  if (options.restrictions)
    addMeta(head, {
      name: "og:restrictions:age",
      content: options.restrictions,
    });

  if (options.twitterID)
    addMeta(head, { name: "twitter:creator", content: options.twitterID });
};
