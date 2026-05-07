import { describe, expect, it } from "vitest";

import { getAuthor, getCategory, getTag } from "../../src/shared/infoGetter.js";

const authorName = "Mr.Hope";
const authorNames = [authorName, "Mrs.Hope"];
const author = {
  name: "Mr.Hope",
  email: "mister-hope@outlook.com",
  url: "https://mister-hope.com",
};
const authors = [
  author,
  {
    name: "Mrs.Hope",
    email: "mistress-hope@outlook.com",
    url: "https://mrshope.site",
  },
];
const term = "Mr.Hope";
const terms = [term, "Mrs.Hope"];

describe(getAuthor, () => {
  it("should resolve author name to object with name property", () => {
    expect(getAuthor(authorName)).toStrictEqual([{ name: "Mr.Hope" }]);
  });

  it("should resolve author names to array of objects with name property", () => {
    expect(getAuthor(authorNames)).toStrictEqual([{ name: "Mr.Hope" }, { name: "Mrs.Hope" }]);
  });

  it("should resolve author object", () => {
    expect(getAuthor(author)).toStrictEqual([author]);
  });

  it("should resolve author objects", () => {
    expect(getAuthor(authors)).toStrictEqual(authors);
  });

  it("should return empty array if author is undefined", () => {
    expect(getAuthor(undefined)).toStrictEqual([]);
  });
});

describe(getCategory, () => {
  it("should resolve category term to array", () => {
    expect(getCategory(term)).toStrictEqual(["Mr.Hope"]);
  });

  it("should resolve category terms to array", () => {
    expect(getCategory(terms)).toStrictEqual(["Mr.Hope", "Mrs.Hope"]);
  });

  it("should return empty array if category is undefined", () => {
    expect(getCategory(undefined)).toStrictEqual([]);
  });
});

describe(getTag, () => {
  it("should resolve tag term to array", () => {
    expect(getTag(term)).toStrictEqual(["Mr.Hope"]);
  });

  it("should resolve tag terms to array", () => {
    expect(getTag(terms)).toStrictEqual(["Mr.Hope", "Mrs.Hope"]);
  });

  it("should return empty array if tag is undefined", () => {
    expect(getTag(undefined)).toStrictEqual([]);
  });
});
