import { isArray, isPlainObject, isString } from "./helper.js";
import type { Author, AuthorInfo } from "../types/index.js";

const isAuthorInfo = (author: unknown): author is AuthorInfo =>
  isPlainObject(author) && isString(author["name"]);

export const getAuthor = (
  author: Author | false | undefined,
  canDisable = false,
): AuthorInfo[] => {
  if (author) {
    if (isArray(author))
      return author
        .map((item) =>
          isString(item) ? { name: item } : isAuthorInfo(item) ? item : null,
        )
        .filter((item): item is AuthorInfo => item !== null);

    if (isString(author)) return [{ name: author }];

    if (isAuthorInfo(author)) return [author];

    console.error(
      `Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${
        canDisable ? "" : "| false"
      } | undefined\`, but got`,
      author,
    );

    return [];
  }

  return [];
};

export const getStringArray = (
  value: string[] | string | undefined,
  optionName?: string,
): string[] => {
  if (value) {
    if (isArray(value) && value.every(isString)) return value;
    if (isString(value)) return [value];

    console.error(
      `Expect ${
        optionName || "value"
      } to be \`string[] | string | undefined\`, but got`,
      value,
    );
  }

  return [];
};

export const getCategory = (
  category: string[] | string | undefined,
): string[] => getStringArray(category, "category");

export const getTag = (tag: string[] | string | undefined): string[] =>
  getStringArray(tag, "tag");
