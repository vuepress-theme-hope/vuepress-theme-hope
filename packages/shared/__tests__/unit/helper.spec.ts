import { expect, it } from "vitest";

import {
  endsWith,
  entries,
  fromEntries,
  keys,
  startsWith,
  values,
} from "../../src/shared/utils/helper.js";

it("startsWith", () => {
  expect(startsWith("abc", "a")).toBe(true);
});

it("endsWith", () => {
  expect(endsWith("abc", "c")).toBe(true);
});

it("entries", () => {
  expect(entries({ a: 1, b: 2 })).toEqual([
    ["a", 1],
    ["b", 2],
  ]);
});

it("fromEntries", () => {
  expect(
    fromEntries([
      ["a", 1],
      ["b", 2],
    ])
  ).toEqual({ a: 1, b: 2 });
});

it("keys", () => {
  expect(keys({ a: 1, b: 2 })).toEqual(["a", "b"]);
});

it("values", () => {
  expect(values({ a: 1, b: 2 })).toEqual([1, 2]);
});
