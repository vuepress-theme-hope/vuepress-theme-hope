import { expect, it } from "vitest";

import {
  endsWith,
  entries,
  fromEntries,
  isBoolean,
  isFunction,
  isNumber,
  isRegExp,
  isString,
  keys,
  startsWith,
  values,
} from "../../src/shared/utils/helper.js";

it("isBoolean", () => {
  expect(isBoolean(true)).toBe(true);
  expect(isBoolean(false)).toBe(true);
  expect(isBoolean(1)).toBe(false);
  expect(isBoolean("abc")).toBe(false);
});

it("isFunction", () => {
  expect(isFunction(isBoolean)).toBe(true);
  expect(isFunction(console.log)).toBe(true);
  expect(isFunction(1)).toBe(false);
  expect(isFunction("abc")).toBe(false);
});

it("isNumber", () => {
  expect(isNumber(1)).toBe(true);
  expect(isNumber(1.3)).toBe(true);
  expect(isNumber(0xac1)).toBe(true);
  expect(isNumber(false)).toBe(false);
  expect(isNumber("abc")).toBe(false);
});

it("isString", () => {
  expect(isString("abc")).toBe(true);
  expect(
    isString(`\
test
`)
  ).toBe(true);
  expect(isString(console)).toBe(false);
  expect(isString(false)).toBe(false);
  expect(isString(3)).toBe(false);
});

it("isRegExp", () => {
  expect(isRegExp(new RegExp("abc"))).toBe(true);
  expect(isRegExp(/\.html$/)).toBe(true);
  expect(isRegExp(console)).toBe(false);
  expect(isRegExp(false)).toBe(false);
  expect(isRegExp(3)).toBe(false);
});

it("startsWith", () => {
  expect(startsWith("abc", "a")).toBe(true);
  expect(startsWith("abc", "b")).toBe(false);
});

it("endsWith", () => {
  expect(endsWith("abc", "c")).toBe(true);
  expect(endsWith("abc", "b")).toBe(false);
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
