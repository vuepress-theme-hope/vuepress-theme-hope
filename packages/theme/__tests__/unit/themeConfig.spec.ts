/* eslint-disable @typescript-eslint/naming-convention */
import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, it, expect } from "vitest";

import { getStatus } from "../../src/node/status";
import { getThemeConfig } from "../../src/node/themeConfig";
import { emptyTheme } from "./__fixtures__/theme/empty.js";

import type { HopeThemeOptions } from "../../src/shared";

const app = createBaseApp({
  bundler: {} as any,
  source: path.resolve(__dirname, "./__fixtures__/src"),
  theme: emptyTheme,
});

describe("should generate themeConfig correctly", () => {
  it("Should contain basic properties", () => {
    const themeConfig = {};

    expect(getThemeConfig(app, themeConfig, getStatus({}))).toMatchSnapshot();
  });

  it("Should handle single language", () => {
    const themeConfig = {
      navbar: ["/", "/about"],
      sidebar: ["/", "/about"],
    };

    expect(getThemeConfig(app, themeConfig, getStatus({}))).toMatchSnapshot();
  });

  it("locale should have higher property", () => {
    const themeConfig = {
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

    expect(getThemeConfig(app, themeConfig, getStatus({}))).toMatchSnapshot();
  });

  it("should fallback to root if locale config is missing", () => {
    const themeConfig = {
      navbar: ["/", "/about"],

      locales: {
        "/": {},
        "/zh/": {
          navbar: ["/zh/", "/zh/about"],
        },
      },
    };

    expect(getThemeConfig(app, themeConfig, getStatus({}))).toMatchSnapshot();
  });

  it("root only option should not appear in locales", () => {
    const themeConfig: HopeThemeOptions = {
      pure: true,
      darkmode: "disable",
      encrypt: {},
    };

    expect(getThemeConfig(app, themeConfig, getStatus({}))).toMatchSnapshot();
  });
});
