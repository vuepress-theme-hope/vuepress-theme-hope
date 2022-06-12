import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, it, expect } from "vitest";

import { getSidebarData, orderSort } from "../../src/node/prepare";
import { getStatus } from "../../src/node/status";
import { getThemeConfig } from "../../src/node/themeConfig";
import { HopeThemeOptions } from "../../src/shared";
import { sidebarTheme } from "./__fixtures__/theme/sidebar";

const app = createBaseApp({
  bundler: {} as any,
  source: path.resolve(__dirname, "./__fixtures__/src"),
  theme: sidebarTheme,
});

await app.init();

describe("should handle order", () => {
  it("Should preserve order", () => {
    expect(
      [
        { title: "1", order: null },
        { title: "2", order: null },
        { title: "3", order: null },
        { title: "4", order: null },
      ].sort((itemA, itemB) => orderSort(itemA.order, itemB.order))
    ).toEqual([
      { title: "1", order: null },
      { title: "2", order: null },
      { title: "3", order: null },
      { title: "4", order: null },
    ]);
  });

  it("Should put positive order in the front", () => {
    expect(
      [
        { title: "1", order: null },
        { title: "2", order: null },
        { title: "3", order: 1 },
        { title: "4", order: null },
      ].sort((itemA, itemB) => {
        console.log(
          itemA.order,
          itemB.order,
          orderSort(itemA.order, itemB.order)
        );

        return orderSort(itemA.order, itemB.order);
      })
    ).toEqual([
      { title: "3", order: 1 },
      { title: "1", order: null },
      { title: "2", order: null },
      { title: "4", order: null },
    ]);

    expect(
      [
        { title: "1", order: null },
        { title: "2", order: 1 },
        { title: "3", order: 1 },
        { title: "4", order: null },
      ].sort((itemA, itemB) => {
        console.log(
          itemA.order,
          itemB.order,
          orderSort(itemA.order, itemB.order)
        );

        return orderSort(itemA.order, itemB.order);
      })
    ).toEqual([
      { title: "2", order: 1 },
      { title: "3", order: 1 },
      { title: "1", order: null },
      { title: "4", order: null },
    ]);

    expect(
      [
        { title: "1", order: null },
        { title: "2", order: 2 },
        { title: "3", order: 1 },
        { title: "4", order: null },
      ].sort((itemA, itemB) => {
        console.log(
          itemA.order,
          itemB.order,
          orderSort(itemA.order, itemB.order)
        );

        return orderSort(itemA.order, itemB.order);
      })
    ).toEqual([
      { title: "3", order: 1 },
      { title: "2", order: 2 },
      { title: "1", order: null },
      { title: "4", order: null },
    ]);

    expect(
      [
        { title: "1", order: 4 },
        { title: "2", order: 3 },
        { title: "3", order: 2 },
        { title: "4", order: 1 },
      ].sort((itemA, itemB) => {
        console.log(
          itemA.order,
          itemB.order,
          orderSort(itemA.order, itemB.order)
        );

        return orderSort(itemA.order, itemB.order);
      })
    ).toEqual([
      { title: "4", order: 1 },
      { title: "3", order: 2 },
      { title: "2", order: 3 },
      { title: "1", order: 4 },
    ]);
  });

  it("Should put negative order in the end", () => {
    expect(
      [
        { title: "1", order: null },
        { title: "2", order: null },
        { title: "3", order: -1 },
        { title: "4", order: null },
      ].sort((itemA, itemB) => {
        console.log(
          itemA.order,
          itemB.order,
          orderSort(itemA.order, itemB.order)
        );

        return orderSort(itemA.order, itemB.order);
      })
    ).toEqual([
      { title: "1", order: null },
      { title: "2", order: null },
      { title: "4", order: null },
      { title: "3", order: -1 },
    ]);

    expect(
      [
        { title: "1", order: null },
        { title: "2", order: -1 },
        { title: "3", order: -1 },
        { title: "4", order: null },
      ].sort((itemA, itemB) => {
        console.log(
          itemA.order,
          itemB.order,
          orderSort(itemA.order, itemB.order)
        );

        return orderSort(itemA.order, itemB.order);
      })
    ).toEqual([
      { title: "1", order: null },
      { title: "4", order: null },
      { title: "2", order: -1 },
      { title: "3", order: -1 },
    ]);

    expect(
      [
        { title: "1", order: null },
        { title: "2", order: -1 },
        { title: "3", order: -2 },
        { title: "4", order: null },
      ].sort((itemA, itemB) => {
        console.log(
          itemA.order,
          itemB.order,
          orderSort(itemA.order, itemB.order)
        );

        return orderSort(itemA.order, itemB.order);
      })
    ).toEqual([
      { title: "1", order: null },
      { title: "4", order: null },
      { title: "3", order: -2 },
      { title: "2", order: -1 },
    ]);

    expect(
      [
        { title: "1", order: -1 },
        { title: "2", order: -2 },
        { title: "3", order: -3 },
        { title: "4", order: -4 },
      ].sort((itemA, itemB) => {
        console.log(
          itemA.order,
          itemB.order,
          orderSort(itemA.order, itemB.order)
        );

        return orderSort(itemA.order, itemB.order);
      })
    ).toEqual([
      { title: "4", order: -4 },
      { title: "3", order: -3 },
      { title: "2", order: -2 },
      { title: "1", order: -1 },
    ]);
  });

  it("Should handle order together", () => {
    expect(
      [
        { title: "1", order: null },
        { title: "2", order: null },
        { title: "3", order: -1 },
        { title: "4", order: 1 },
        { title: "5", order: null },
      ].sort((itemA, itemB) => {
        console.log(
          itemA.order,
          itemB.order,
          orderSort(itemA.order, itemB.order)
        );

        return orderSort(itemA.order, itemB.order);
      })
    ).toEqual([
      { title: "4", order: 1 },
      { title: "1", order: null },
      { title: "2", order: null },
      { title: "5", order: null },
      { title: "3", order: -1 },
    ]);
  });
});

describe("should generate sidebarData correcly", () => {
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
