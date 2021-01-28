import type { ArticleSeoContent, SeoContent, SeoOptions } from "../types";

type Meta = Record<string, string>[];

interface MetaOptions {
  name: string;
  content: string;
  attribute?: string;
}

const addMeta = (
  meta: Meta,
  {
    name,
    content,
    attribute = ["article:", "og:"].some((type) => name.startsWith(type))
      ? "property"
      : "name",
  }: MetaOptions
): void => {
  if (content) meta.push({ [attribute]: name, content });
};

export const appendMeta = (
  meta: Meta,
  content: SeoContent,
  options: SeoOptions
): void => {
  for (const property in content)
    switch (property) {
      case "article:tag":
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (content as ArticleSeoContent)["article:tag"]!.forEach((tag: string) =>
          addMeta(meta, { name: "article:tag", content: tag })
        );
        break;
      case "og:locale:alternate":
        content["og:locale:alternate"].forEach((locale: string) => {
          if (locale !== content["og:locale"])
            addMeta(meta, { name: "og:locale:alternate", content: locale });
        });
        break;
      default:
        addMeta(meta, {
          name: property,
          content: content[property as keyof SeoContent] as string,
        });
    }

  if (options.restrictions)
    addMeta(meta, {
      name: "og:restrictions:age",
      content: options.restrictions,
    });

  if (options.twitterID)
    addMeta(meta, { name: "twitter:creator", content: options.twitterID });
};
