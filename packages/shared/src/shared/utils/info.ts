import { isArray, isPlainObject, isString } from "@vuepress/shared";

import { type Author, type AuthorInfo } from "../types/index.js";

export const getAuthor = (
  author: Author | false | undefined,
  canDisable = false
): AuthorInfo[] => {
  if (author) {
    if (isArray(author))
      return author.map((item) => (isString(item) ? { name: item } : item));

    if (isString(author)) return [{ name: author }];

    if (isPlainObject(author) && author.name) return [author];

    console.error(
      `Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${
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
    if (isArray(value)) return value;
    if (isString(value)) return [value];

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
