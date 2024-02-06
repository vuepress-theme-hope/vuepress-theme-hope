import { describe, expect, it } from "vitest";

import {
  sidebarDateDescSorter,
  sidebarDateSorter,
  sidebarFilenameSorter,
  sidebarOrderSorter,
  sidebarReadmeSorter,
  sidebarTitleSorter,
} from "../../src/node/prepare/sidebar/sorter.js";

it("should handle readme", () => {
  expect(
    [
      { type: "file", filename: "2.md" },
      { type: "file", filename: "1.md" },
      { type: "file", filename: "4.md" },
      { type: "file", filename: "3.md" },
      { type: "file", filename: "22.md" },
      { type: "file", filename: "README.md" },

      // @ts-ignore
    ].sort(sidebarReadmeSorter),
  ).toEqual([
    { type: "file", filename: "README.md" },
    { type: "file", filename: "2.md" },
    { type: "file", filename: "1.md" },
    { type: "file", filename: "4.md" },
    { type: "file", filename: "3.md" },
    { type: "file", filename: "22.md" },
  ]);

  expect(
    [
      { type: "file", filename: "2.md" },
      { type: "file", filename: "1.md" },
      { type: "file", filename: "README.md" },
      { type: "file", filename: "4.md" },
      { type: "file", filename: "3.md" },
      { type: "file", filename: "22.md" },

      // @ts-ignore
    ].sort(sidebarReadmeSorter),
  ).toEqual([
    { type: "file", filename: "README.md" },
    { type: "file", filename: "2.md" },
    { type: "file", filename: "1.md" },
    { type: "file", filename: "4.md" },
    { type: "file", filename: "3.md" },
    { type: "file", filename: "22.md" },
  ]);

  expect(
    [
      { type: "file", filename: "2.md" },
      { type: "file", filename: "1.md" },
      { type: "file", filename: "4.md" },
      { type: "file", filename: "3.md" },
      { type: "file", filename: "22.md" },
      { type: "file", filename: "readme.md" },

      // @ts-ignore
    ].sort(sidebarReadmeSorter),
  ).toEqual([
    { type: "file", filename: "readme.md" },
    { type: "file", filename: "2.md" },
    { type: "file", filename: "1.md" },
    { type: "file", filename: "4.md" },
    { type: "file", filename: "3.md" },
    { type: "file", filename: "22.md" },
  ]);

  expect(
    [
      { type: "file", filename: "2.md" },
      { type: "file", filename: "1.md" },
      { type: "file", filename: "readme.md" },
      { type: "file", filename: "4.md" },
      { type: "file", filename: "3.md" },
      { type: "file", filename: "22.md" },

      // @ts-ignore
    ].sort(sidebarReadmeSorter),
  ).toEqual([
    { type: "file", filename: "readme.md" },
    { type: "file", filename: "2.md" },
    { type: "file", filename: "1.md" },
    { type: "file", filename: "4.md" },
    { type: "file", filename: "3.md" },
    { type: "file", filename: "22.md" },
  ]);
});

describe("should handle order", () => {
  it("Should preserve order", () => {
    expect(
      [
        { label: "1", order: null },
        { label: "2", order: null },
        { label: "3", order: null },
        { label: "4", order: null },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "1", order: null },
      { label: "2", order: null },
      { label: "3", order: null },
      { label: "4", order: null },
    ]);
  });

  it("Should put positive order in the front", () => {
    expect(
      [
        { label: "1", order: null },
        { label: "2", order: null },
        { label: "3", order: 1 },
        { label: "4", order: null },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "3", order: 1 },
      { label: "1", order: null },
      { label: "2", order: null },
      { label: "4", order: null },
    ]);

    expect(
      [
        { label: "1", order: null },
        { label: "2", order: 1 },
        { label: "3", order: 1 },
        { label: "4", order: null },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "2", order: 1 },
      { label: "3", order: 1 },
      { label: "1", order: null },
      { label: "4", order: null },
    ]);

    expect(
      [
        { label: "1", order: null },
        { label: "2", order: 2 },
        { label: "3", order: 1 },
        { label: "4", order: null },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "3", order: 1 },
      { label: "2", order: 2 },
      { label: "1", order: null },
      { label: "4", order: null },
    ]);

    expect(
      [
        { label: "1", order: 4 },
        { label: "2", order: 3 },
        { label: "3", order: 2 },
        { label: "4", order: 1 },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "4", order: 1 },
      { label: "3", order: 2 },
      { label: "2", order: 3 },
      { label: "1", order: 4 },
    ]);
  });

  it("Should put negative order in the end", () => {
    expect(
      [
        { label: "1", order: null },
        { label: "2", order: null },
        { label: "3", order: -1 },
        { label: "4", order: null },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "1", order: null },
      { label: "2", order: null },
      { label: "4", order: null },
      { label: "3", order: -1 },
    ]);

    expect(
      [
        { label: "1", order: null },
        { label: "2", order: -1 },
        { label: "3", order: -1 },
        { label: "4", order: null },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "1", order: null },
      { label: "4", order: null },
      { label: "2", order: -1 },
      { label: "3", order: -1 },
    ]);

    expect(
      [
        { label: "1", order: null },
        { label: "2", order: -1 },
        { label: "3", order: -2 },
        { label: "4", order: null },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "1", order: null },
      { label: "4", order: null },
      { label: "3", order: -2 },
      { label: "2", order: -1 },
    ]);

    expect(
      [
        { label: "1", order: -1 },
        { label: "2", order: -2 },
        { label: "3", order: -3 },
        { label: "4", order: -4 },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "4", order: -4 },
      { label: "3", order: -3 },
      { label: "2", order: -2 },
      { label: "1", order: -1 },
    ]);
  });

  it("Should handle order together", () => {
    expect(
      [
        { label: "1", order: null },
        { label: "2", order: null },
        { label: "3", order: -1 },
        { label: "4", order: 1 },
        { label: "5", order: null },

        // @ts-ignore
      ].sort(sidebarOrderSorter),
    ).toEqual([
      { label: "4", order: 1 },
      { label: "1", order: null },
      { label: "2", order: null },
      { label: "5", order: null },
      { label: "3", order: -1 },
    ]);
  });
});

describe("should handle time", () => {
  it("time should come first and ascending", () => {
    expect(
      [
        { label: "1", frontmatter: {} },
        { label: "2", frontmatter: {} },
        { label: "3", frontmatter: { date: new Date("2022-01-01") } },
        { label: "4", frontmatter: { date: new Date("1970-01-01") } },
        { label: "5", frontmatter: {} },

        // @ts-ignore
      ].sort(sidebarDateSorter),
    ).toEqual([
      { label: "4", frontmatter: { date: new Date("1970-01-01") } },
      { label: "3", frontmatter: { date: new Date("2022-01-01") } },
      { label: "1", frontmatter: {} },
      { label: "2", frontmatter: {} },
      { label: "5", frontmatter: {} },
    ]);
  });

  it("time should come first and descending", () => {
    expect(
      [
        { label: "1", frontmatter: {} },
        { label: "2", frontmatter: {} },
        { label: "3", frontmatter: { date: new Date("2022-01-01") } },
        { label: "4", frontmatter: { date: new Date("1970-01-01") } },
        { label: "5", frontmatter: {} },

        // @ts-ignore
      ].sort(sidebarDateDescSorter),
    ).toEqual([
      { label: "3", frontmatter: { date: new Date("2022-01-01") } },
      { label: "4", frontmatter: { date: new Date("1970-01-01") } },
      { label: "1", frontmatter: {} },
      { label: "2", frontmatter: {} },
      { label: "5", frontmatter: {} },
    ]);
  });
});

describe("should handle title", () => {
  it("sort title alphabetically", () => {
    expect(
      [
        { title: "bc" },
        { title: "aBC" },
        { title: "Abc" },
        { title: "a" },
        { title: "A" },
        { title: "a b c" },

        // @ts-ignore
      ].sort(sidebarTitleSorter),
    ).toEqual([
      { title: "a" },
      { title: "A" },
      { title: "a b c" },
      { title: "aBC" },
      { title: "Abc" },
      { title: "bc" },
    ]);
  });

  it("sort title with number", () => {
    expect(
      [
        { title: "5" },
        { title: "2" },
        { title: "1" },
        { title: "4" },
        { title: "3" },
        { title: "22" },

        // @ts-ignore
      ].sort(sidebarTitleSorter),
    ).toEqual([
      { title: "1" },
      { title: "2" },
      { title: "3" },
      { title: "4" },
      { title: "5" },
      { title: "22" },
    ]);

    expect(
      [
        { title: "README" },
        { title: "2" },
        { title: "1" },
        { title: "4" },
        { title: "3" },
        { title: "22" },

        // @ts-ignore
      ].sort(sidebarTitleSorter),
    ).toEqual([
      { title: "1" },
      { title: "2" },
      { title: "3" },
      { title: "4" },
      { title: "22" },
      { title: "README" },
    ]);

    expect(
      [
        { title: "README" },
        { title: "apple2" },
        { title: "apple1" },
        { title: "apple4" },
        { title: "apple3" },
        { title: "apple22" },

        // @ts-ignore
      ].sort(sidebarTitleSorter),
    ).toEqual([
      { title: "apple1" },
      { title: "apple2" },
      { title: "apple3" },
      { title: "apple4" },
      { title: "apple22" },
      { title: "README" },
    ]);

    expect(
      [
        { title: "README" },
        { title: "2apple" },
        { title: "1apple" },
        { title: "4apple" },
        { title: "3apple" },
        { title: "22apple" },

        // @ts-ignore
      ].sort(sidebarTitleSorter),
    ).toEqual([
      { title: "1apple" },
      { title: "2apple" },
      { title: "3apple" },
      { title: "4apple" },
      { title: "22apple" },
      { title: "README" },
    ]);

    expect(
      [
        { title: "README" },
        { title: "apple-2" },
        { title: "apple-1" },
        { title: "apple-4" },
        { title: "apple-3" },
        { title: "apple-22" },

        // @ts-ignore
      ].sort(sidebarTitleSorter),
    ).toEqual([
      { title: "apple-1" },
      { title: "apple-2" },
      { title: "apple-3" },
      { title: "apple-4" },
      { title: "apple-22" },
      { title: "README" },
    ]);

    expect(
      [
        { title: "README" },
        { title: "2-apple" },
        { title: "1-apple" },
        { title: "4-apple" },
        { title: "3-apple" },
        { title: "22-apple" },

        // @ts-ignore
      ].sort(sidebarTitleSorter),
    ).toEqual([
      { title: "1-apple" },
      { title: "2-apple" },
      { title: "3-apple" },
      { title: "4-apple" },
      { title: "22-apple" },
      { title: "README" },
    ]);

    expect(
      [
        { title: "Apple 22" },
        { title: "Banana 1" },
        { title: "Apple 5" },
        { title: "Apple 2" },
        { title: "Banana 4" },
        { title: "Banana 3" },

        // @ts-ignore
      ].sort(sidebarTitleSorter),
    ).toEqual([
      { title: "Apple 2" },
      { title: "Apple 5" },
      { title: "Apple 22" },
      { title: "Banana 1" },
      { title: "Banana 3" },
      { title: "Banana 4" },
    ]);
  });
});

it("should handle filename", () => {
  expect(
    [
      { type: "file", filename: "README.md" },
      { type: "file", filename: "2.md" },
      { type: "file", filename: "1.md" },
      { type: "file", filename: "4.md" },
      { type: "file", filename: "3.md" },
      { type: "file", filename: "22.md" },

      // @ts-ignore
    ].sort(sidebarFilenameSorter),
  ).toEqual([
    { type: "file", filename: "1.md" },
    { type: "file", filename: "2.md" },
    { type: "file", filename: "3.md" },
    { type: "file", filename: "4.md" },
    { type: "file", filename: "22.md" },
    { type: "file", filename: "README.md" },
  ]);

  expect(
    [
      { type: "file", filename: "2.md" },
      { type: "file", filename: "1.md" },
      { type: "file", filename: "README.md" },
      { type: "file", filename: "4.md" },
      { type: "file", filename: "3.md" },
      { type: "file", filename: "22.md" },

      // @ts-ignore
    ].sort(sidebarFilenameSorter),
  ).toEqual([
    { type: "file", filename: "1.md" },
    { type: "file", filename: "2.md" },
    { type: "file", filename: "3.md" },
    { type: "file", filename: "4.md" },
    { type: "file", filename: "22.md" },
    { type: "file", filename: "README.md" },
  ]);

  expect(
    [
      { type: "file", filename: "readme.md" },
      { type: "file", filename: "2.md" },
      { type: "file", filename: "1.md" },
      { type: "file", filename: "4.md" },
      { type: "file", filename: "3.md" },
      { type: "file", filename: "22.md" },

      // @ts-ignore
    ].sort(sidebarFilenameSorter),
  ).toEqual([
    { type: "file", filename: "1.md" },
    { type: "file", filename: "2.md" },
    { type: "file", filename: "3.md" },
    { type: "file", filename: "4.md" },
    { type: "file", filename: "22.md" },
    { type: "file", filename: "readme.md" },
  ]);

  expect(
    [
      { type: "file", filename: "2.md" },
      { type: "file", filename: "1.md" },
      { type: "file", filename: "readme.md" },
      { type: "file", filename: "4.md" },
      { type: "file", filename: "3.md" },
      { type: "file", filename: "22.md" },

      // @ts-ignore
    ].sort(sidebarFilenameSorter),
  ).toEqual([
    { type: "file", filename: "1.md" },
    { type: "file", filename: "2.md" },
    { type: "file", filename: "3.md" },
    { type: "file", filename: "4.md" },
    { type: "file", filename: "22.md" },
    { type: "file", filename: "readme.md" },
  ]);

  expect(
    [
      { type: "file", filename: "abc.md" },
      { type: "file", filename: "b.md" },
      { type: "file", filename: "c.md" },
      { type: "file", filename: "a.md" },
      { type: "dir", dirname: "a-b-c" },
      { type: "file", filename: "a-b-c.md" },
      { type: "dir", dirname: "abc" },
      { type: "dir", dirname: "c" },
      { type: "dir", dirname: "b" },
      { type: "dir", dirname: "a" },

      // @ts-ignore
    ].sort(sidebarFilenameSorter),
  ).toEqual([
    { type: "file", filename: "a.md" },
    { type: "dir", dirname: "a" },
    { type: "file", filename: "a-b-c.md" },
    { type: "dir", dirname: "a-b-c" },
    { type: "file", filename: "abc.md" },
    { type: "dir", dirname: "abc" },
    { type: "file", filename: "b.md" },
    { type: "dir", dirname: "b" },
    { type: "file", filename: "c.md" },
    { type: "dir", dirname: "c" },
  ]);
});
