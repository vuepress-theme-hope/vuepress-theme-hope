/* eslint-disable @typescript-eslint/naming-convention */
import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, expect, it } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getStatus } from "../../src/node/config/status.js";
import { getThemeData } from "../../src/node/config/themeData.js";
import { type ThemeOptions } from "../../src/shared/index.js";

describe("should generate themeData correctly", () => {
  it("Should contain basic properties", () => {
    const app = createBaseApp({
      locales: {
        "/": {
          lang: "en-US",
        },
      },
      bundler: {} as any,
      source: path.resolve(__dirname, "./__fixtures__/src"),
      theme: emptyTheme,
    });
    const themeOptions = {};

    const result = getThemeData(app, themeOptions, getStatus(app, {}));

    expect(result).toHaveProperty("encrypt");
    expect(result.locales).toBeTypeOf("object");
    expect(Object.keys(result.locales)).toEqual(["/"]);
    expect(result).toMatchSnapshot();
  });

  it("Should handle single language", () => {
    const app = createBaseApp({
      locales: {
        "/": {
          lang: "en-US",
        },
      },
      bundler: {} as any,
      source: path.resolve(__dirname, "./__fixtures__/src"),
      theme: emptyTheme,
    });
    const themeOptions = {
      navbar: ["/", "/about"],
      sidebar: ["/", "/about"],
    };

    const result = getThemeData(app, themeOptions, getStatus(app, {}));

    expect(result.locales).toBeTypeOf("object");
    expect(Object.keys(result.locales)).toEqual(["/"]);
    expect(result.locales["/"].navbar).toEqual(["/", "/about"]);
    expect(result.locales["/"].sidebar).toEqual(["/", "/about"]);
  });

  it("locale should have higher property", () => {
    const app = createBaseApp({
      locales: {
        "/": {
          lang: "en-US",
        },
        "/zh/": {
          lang: "zh-CN",
        },
      },
      bundler: {} as any,
      source: path.resolve(__dirname, "./__fixtures__/src"),
      theme: emptyTheme,
    });
    const themeOptions = {
      navbar: ["/", "/about"],

      locales: {
        "/": {
          navbar: ["/", "/guide", "/about"],
        },
        "/zh/": {
          navbar: ["/zh/", "/zh/guide", "/zh/about"],
        },
      },
    };

    const result = getThemeData(app, themeOptions, getStatus(app, {}));

    expect(result.locales).toBeTypeOf("object");
    expect(new Set(Object.keys(result.locales))).toEqual(
      new Set(["/", "/zh/"])
    );
    expect(result.locales["/"].navbar).toEqual(["/", "/guide", "/about"]);
    expect(result.locales["/zh/"].navbar).toEqual([
      "/zh/",
      "/zh/guide",
      "/zh/about",
    ]);
  });

  it("should fallback to root if locale config is missing", () => {
    const app = createBaseApp({
      locales: {
        "/": {
          lang: "en-US",
        },
        "/zh/": {
          lang: "zh-CN",
        },
      },
      bundler: {} as any,
      source: path.resolve(__dirname, "./__fixtures__/src"),
      theme: emptyTheme,
    });
    const themeOptions = {
      navbar: ["/", "/guide", "/about"],

      locales: {
        "/": {},
        "/zh/": {
          navbar: ["/zh/", "/zh/guide", "/zh/about"],
        },
      },
    };

    const result = getThemeData(app, themeOptions, getStatus(app, {}));

    expect(result.locales["/"].navbar).toEqual(["/", "/guide", "/about"]);
    expect(result.locales["/zh/"].navbar).toEqual([
      "/zh/",
      "/zh/guide",
      "/zh/about",
    ]);
  });

  it("root only option should not appear in locales", () => {
    const app = createBaseApp({
      locales: {
        "/": {
          lang: "en-US",
        },
      },
      bundler: {} as any,
      source: path.resolve(__dirname, "./__fixtures__/src"),
      theme: emptyTheme,
    });
    const themeOptions: ThemeOptions = {
      pure: true,
      darkmode: "disable",
      encrypt: {},
    };

    const result = getThemeData(app, themeOptions, getStatus(app, {}));

    expect(result.locales["/"]).not.toHaveProperty("darkmode");
    expect(result.locales["/"]).not.toHaveProperty("encrypt");
    expect(result.locales["/"]).not.toHaveProperty("pure");
  });
});
