/* eslint-disable @typescript-eslint/naming-convention */
import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, it, expect } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getStatus, getThemeData } from "../../src/node/config/index.js";

import type { ThemeOptions } from "../../src/shared/index.js";

const app = createBaseApp({
  bundler: {} as any,
  source: path.resolve(__dirname, "./__fixtures__/src"),
  theme: emptyTheme,
});

describe("should generate themeData correctly", () => {
  it("Should contain basic properties", () => {
    const themeOptions = {};

    expect(
      getThemeData(app, themeOptions, getStatus(app, {}))
    ).toMatchSnapshot();
  });

  it("Should handle single language", () => {
    const themeOptions = {
      navbar: ["/", "/about"],
      sidebar: ["/", "/about"],
    };

    expect(
      getThemeData(app, themeOptions, getStatus(app, {}))
    ).toMatchSnapshot();
  });

  it("locale should have higher property", () => {
    const themeOptions = {
      navbar: ["/", "/about"],

      locales: {
        "/": {
          navbar: ["/", "/guide", "/about"],
        },
        "/zh/": {
          navbar: ["/zh/", "/zh/about"],
        },
      },
    };

    expect(
      getThemeData(app, themeOptions, getStatus(app, {}))
    ).toMatchSnapshot();
  });

  it("should fallback to root if locale config is missing", () => {
    const themeOptions = {
      navbar: ["/", "/about"],

      locales: {
        "/": {},
        "/zh/": {
          navbar: ["/zh/", "/zh/about"],
        },
      },
    };

    expect(
      getThemeData(app, themeOptions, getStatus(app, {}))
    ).toMatchSnapshot();
  });

  it("root only option should not appear in locales", () => {
    const themeOptions: ThemeOptions = {
      pure: true,
      darkmode: "disable",
      encrypt: {},
    };

    expect(
      getThemeData(app, themeOptions, getStatus(app, {}))
    ).toMatchSnapshot();
  });
});
