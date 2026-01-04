import { expect, it } from "vitest";

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

it("getAuthor()", () => {
  expect(getAuthor(authorName)).toEqual([{ name: "Mr.Hope" }]);
  expect(getAuthor(authorNames)).toEqual([
    { name: "Mr.Hope" },
    { name: "Mrs.Hope" },
  ]);
  expect(getAuthor(author)).toEqual([author]);
  expect(getAuthor(authors)).toEqual(authors);
  // oxlint-disable-next-line unicorn/no-useless-undefined
  expect(getAuthor(undefined)).toEqual([]);
});

it("getCategory()", () => {
  expect(getCategory(term)).toEqual(["Mr.Hope"]);
  expect(getCategory(terms)).toEqual(["Mr.Hope", "Mrs.Hope"]);
  // oxlint-disable-next-line unicorn/no-useless-undefined
  expect(getCategory(undefined)).toEqual([]);
});

it("getTag()", () => {
  expect(getTag(term)).toEqual(["Mr.Hope"]);
  expect(getTag(terms)).toEqual(["Mr.Hope", "Mrs.Hope"]);
  // oxlint-disable-next-line unicorn/no-useless-undefined
  expect(getTag(undefined)).toEqual([]);
});
