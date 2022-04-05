import type { Author, AuthorInfo } from "../types";

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

export const getCategory = (
  category: string[] | string | undefined
): string[] => {
  if (category) {
    if (Array.isArray(category)) return category;
    if (typeof category === "string") return [category];

    console.error(
      `Expect 'category' to be \`string[] | string | undefined\`, but got`,
      category
    );
  }

  return [];
};

export const getTag = (tag: string[] | string | undefined): string[] => {
  if (tag) {
    if (Array.isArray(tag)) return tag;
    if (typeof tag === "string") return [tag];

    console.error(
      `Expect 'tag' to be \`string[] | string | undefined\`, but got`,
      tag
    );
  }

  return [];
};
