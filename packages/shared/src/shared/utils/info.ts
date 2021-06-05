import { capitalize } from "./capitalize";

export const _getAuthor = (
  author: string[] | string | false | undefined,
  canDisable = false
): string[] => {
  if (author) {
    if (Array.isArray(author)) return author;
    if (typeof author === "string") return [author];

    console.error(
      `Expect 'author' to be \`string[] | string ${
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
    if (Array.isArray(category)) return category.map(capitalize);
    if (typeof category === "string") return [capitalize(category)];

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
