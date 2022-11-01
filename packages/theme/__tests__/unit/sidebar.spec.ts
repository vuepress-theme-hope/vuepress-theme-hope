import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, it, expect } from "vitest";

import {
  getSidebarData,
  orderSorter,
  dateDescSorter,
  dateSorter,
  titleNumberDescSorter,
  titleNumberSorter,
  titleSorter,
} from "../../src/node/prepare/index.js";
import { getStatus } from "../../src/node/status.js";
import { getThemeConfig } from "../../src/node/themeConfig.js";
import { HopeThemeOptions } from "../../src/shared/index.js";
import { sidebarTheme } from "./__fixtures__/theme/sidebar.js";

describe("should handle order", () => {
  it("Should preserve order", () => {
    expect(
      [
        { label: "1", order: null },
        { label: "2", order: null },
        { label: "3", order: null },
        { label: "4", order: null },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(orderSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(dateSorter)
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(dateDescSorter)
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
  it("title should be sorted ascending", () => {
    expect(
      [
        { title: "5" },
        { title: "2" },
        { title: "1" },
        { title: "4" },
        { title: "3" },
        { title: "22" },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(titleSorter)
    ).toEqual([
      { title: "1" },
      { title: "2" },
      { title: "22" },
      { title: "3" },
      { title: "4" },
      { title: "5" },
    ]);
  });

  it("title should come first and ascending", () => {
    expect(
      [
        { title: "5" },
        { title: "2" },
        { title: "22" },
        { title: "1" },
        { title: "4" },
        { title: "3" },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(titleNumberSorter)
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
        { title: "Apple 22" },
        { title: "Banana 1" },
        { title: "Apple 5" },
        { title: "Apple 2" },
        { title: "Banana 4" },
        { title: "Banana 3" },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(titleNumberSorter)
    ).toEqual([
      { title: "Apple 2" },
      { title: "Apple 5" },
      { title: "Apple 22" },
      { title: "Banana 1" },
      { title: "Banana 3" },
      { title: "Banana 4" },
    ]);
  });

  it("title should be sorted descending with number", () => {
    expect(
      [
        { title: "5" },
        { title: "2" },
        { title: "22" },
        { title: "1" },
        { title: "4" },
        { title: "3" },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(titleNumberDescSorter)
    ).toEqual([
      { title: "22" },
      { title: "5" },
      { title: "4" },
      { title: "3" },
      { title: "2" },
      { title: "1" },
    ]);

    expect(
      [
        { title: "Apple 22" },
        { title: "Banana 1" },
        { title: "Apple 5" },
        { title: "Apple 2" },
        { title: "Banana 4" },
        { title: "Banana 3" },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      ].sort(titleNumberDescSorter)
    ).toEqual([
      { title: "Apple 22" },
      { title: "Apple 5" },
      { title: "Apple 2" },
      { title: "Banana 4" },
      { title: "Banana 3" },
      { title: "Banana 1" },
    ]);
  });
});

describe("should generate sidebarData correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: sidebarTheme,
  });

  await app.init();

  it("Should resolve structure in root", () => {
    const themeOptions: HopeThemeOptions = {
      sidebar: "structure",
    };

    const themeConfig = getThemeConfig(
      app,
      themeOptions,
      getStatus(themeOptions)
    );

    expect(getSidebarData(app, themeConfig)).toMatchSnapshot();
  });

  it("Should resolve structure in dir", () => {
    const themeOptions: HopeThemeOptions = {
      sidebar: {
        "/dir/": "structure",
        "/dir-negative-order/": "structure",
        "/dir-no-order/": "structure",
        "/link/": "structure",
        "/nested-dir/": "structure",
        "/nested-dir/nested-dir1/": "structure",
        "/options/": "structure",
      },
    };

    const themeConfig = getThemeConfig(
      app,
      themeOptions,
      getStatus(themeOptions)
    );

    expect(getSidebarData(app, themeConfig)).toMatchSnapshot();
  });

  it("Should resolve structure in group options", () => {
    const themeOptions: HopeThemeOptions = {
      sidebar: {
        "/nested-dir/": [
          "",
          "file1",
          {
            text: "nested-dir1",
            prefix: "nested-dir1/",
            children: "structure",
          },
        ],
      },
    };

    const themeConfig = getThemeConfig(
      app,
      themeOptions,
      getStatus(themeOptions)
    );

    expect(getSidebarData(app, themeConfig)).toMatchSnapshot();
  });
});
