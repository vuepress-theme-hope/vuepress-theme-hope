import type { Author, AuthorInfo } from "../types/index.js";

export const getAuthor = (
  author: Author | false | undefined,
  canDisable = false
): AuthorInfo[] => {
  if (author) {
    if (Array.isArray(author)) {
      return author.map((item) =>
        typeof item === "string" ? { name: item } : item
      );
    }

    if (typeof author === "string") return [{ name: author }];

    if (typeof author === "object" && author.name) return [author];

    console.error(
      `Expect 'author' to be \`AuthorInfo[] | AuthorInfo | string[] | string ${
        canDisable ? "" : "| false"
      } | undefined\`, but got`,
      author
    );

    return [];
  }

  return [];
};

export const getStringArray = (
  value: string[] | string | undefined,
  optionName?: string
): string[] => {
  if (value) {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return [value];

    console.error(
      `Expect ${
        optionName || "value"
      } to be \`string[] | string | undefined\`, but got`,
      value
    );
  }

  return [];
};

export const getCategory = (
  category: string[] | string | undefined
): string[] => getStringArray(category, "category");

export const getTag = (tag: string[] | string | undefined): string[] =>
  getStringArray(tag, "tag");
