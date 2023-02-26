/* eslint-disable @typescript-eslint/naming-convention */
import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, expect, it } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getLocales } from "../../src/node/locales/helpers.js";

const defaultLocaleConfig = {
  "/en/": {
    text: "English",
    fallback: "English",
  },
  "/zh/": {
    text: "中文",
    fallback: "中文",
  },
  "/ja/": {
    text: "日本",
    fallback: "日本",
  },
  "/test/": {
    text: "Test",
    fallback: "Test",
  },
  "/id/": {
    text: "Indonesia",
    fallback: "Indonesia",
  },
};

describe("generate locale", () => {
  it("set default value for known language", () => {
    const app = createBaseApp({
      locales: {
        "/": { lang: "zh-CN" },
        "/en/": { lang: "en-US" },
        "/ja/": { lang: "ja-JP" },
        "/id/": { lang: "id-ID" },
      },
      source: path.resolve(__dirname, "./__fixtures__/src"),
      bundler: {} as any,
      theme: emptyTheme,
    });

    expect(getLocales({ app, default: defaultLocaleConfig })).toEqual({
      "/": {
        text: "中文",
        fallback: "中文",
      },
      "/en/": {
        text: "English",
        fallback: "English",
      },
      "/ja/": {
        text: "日本",
        fallback: "日本",
      },
      "/id/": {
        text: "Indonesia",
        fallback: "Indonesia",
      },
    });
  });

  it("Detect known language with different path", () => {
    const app = createBaseApp({
      locales: {
        "/": { lang: "zh-CN" },
        "/en-us/": { lang: "en-US" },
        "/ja-jp/": { lang: "ja-JP" },
        "/id-id/": { lang: "id-ID" },
      },
      source: path.resolve(__dirname, "./__fixtures__/src"),
      bundler: {} as any,
      theme: emptyTheme,
    });

    expect(getLocales({ app, default: defaultLocaleConfig })).toEqual({
      "/": {
        text: "中文",
        fallback: "中文",
      },
      "/en-us/": {
        text: "English",
        fallback: "English",
      },
      "/ja-jp/": {
        text: "日本",
        fallback: "日本",
      },
      "/id-id/": {
        text: "Indonesia",
        fallback: "Indonesia",
      },
    });
  });

  it("use user config if exists", () => {
    const app = createBaseApp({
      locales: {
        "/": { lang: "zh-CN" },
        "/en/": { lang: "en-US" },
        "/ja/": { lang: "ja-JP" },
        "/id/": { lang: "id-ID" },
      },
      source: path.resolve(__dirname, "./__fixtures__/src"),
      bundler: {} as any,
      theme: emptyTheme,
    });

    const config = {
      "/": { text: "简体中文" },
      "/en/": { text: "English (US)" },
      "/id/": { text: "Indonesia" },
    };

    const locales = getLocales({ app, default: defaultLocaleConfig, config });

    expect(locales).toEqual({
      "/": {
        text: "简体中文",
        fallback: "中文",
      },
      "/en/": {
        text: "English (US)",
        fallback: "English",
      },
      "/ja/": {
        text: "日本",
        fallback: "日本",
      },
      "/id/": {
        text: "Indonesia",
        fallback: "Indonesia",
      },
    });
  });

  describe("handle unknown locale", () => {
    it("fallback to root language if exists", () => {
      const app = createBaseApp({
        locales: {
          "/": { lang: "zh-CN" },
          "/en/": { lang: "en-US" },
          "/ja/": { lang: "ja-JP" },
          "/id/": { lang: "id-ID" },
          "/unknown/": { lang: "unknown-Language" },
        },
        source: path.resolve(__dirname, "./__fixtures__/src"),
        bundler: {} as any,
        theme: emptyTheme,
      });

      const locales = getLocales({ app, default: defaultLocaleConfig });

      expect(locales).toEqual({
        "/": {
          text: "中文",
          fallback: "中文",
        },
        "/en/": {
          text: "English",
          fallback: "English",
        },
        "/ja/": {
          text: "日本",
          fallback: "日本",
        },
        "/id/": {
          text: "Indonesia",
          fallback: "Indonesia",
        },
        "/unknown/": {
          text: "中文",
          fallback: "中文",
        },
      });
    });

    it("fallback to en-US without root language", () => {
      const app = createBaseApp({
        locales: {
          "/en/": { lang: "en-US" },
          "/zh/": { lang: "zh-CN" },
          "/ja/": { lang: "ja-JP" },
          "/id/": { lang: "id-ID" },
          "/unknown/": { lang: "unknown-Language" },
        },
        source: path.resolve(__dirname, "./__fixtures__/src"),
        bundler: {} as any,
        theme: emptyTheme,
      });

      const locales = getLocales({ app, default: defaultLocaleConfig });

      expect(locales).toEqual({
        "/": {
          text: "English",
          fallback: "English",
        },
        "/en/": {
          text: "English",
          fallback: "English",
        },
        "/zh/": {
          text: "中文",
          fallback: "中文",
        },
        "/ja/": {
          text: "日本",
          fallback: "日本",
        },
        "/id/": {
          text: "Indonesia",
          fallback: "Indonesia",
        },
        "/unknown/": {
          text: "English",
          fallback: "English",
        },
      });
    });
  });

  describe("handle new locale", () => {
    it("with default locale", () => {
      const app = createBaseApp({
        locales: {
          "/": { lang: "zh-CN" },
          "/en/": { lang: "en-US" },
          "/ja/": { lang: "ja-JP" },
          "/id/": { lang: "id-ID" },
          "/test/": { lang: "test-Language" },
        },
        source: path.resolve(__dirname, "./__fixtures__/src"),
        bundler: {} as any,
        theme: emptyTheme,
      });

      const locales = getLocales({ app, default: defaultLocaleConfig });

      expect(locales).toEqual({
        "/": {
          text: "中文",
          fallback: "中文",
        },
        "/en/": {
          text: "English",
          fallback: "English",
        },
        "/ja/": {
          text: "日本",
          fallback: "日本",
        },
        "/id/": {
          text: "Indonesia",
          fallback: "Indonesia",
        },
        "/test/": {
          text: "Test",
          fallback: "Test",
        },
      });
    });

    it("without default", () => {
      const app = createBaseApp({
        locales: {
          "/": { lang: "zh-CN" },
          "/en/": { lang: "en-US" },
          "/ja/": { lang: "ja-JP" },
          "/id/": { lang: "id-ID" },
          "/unknown/": { lang: "unknown-Language" },
        },
        source: path.resolve(__dirname, "./__fixtures__/src"),
        bundler: {} as any,
        theme: emptyTheme,
      });

      const config = {
        "/unknown/": { text: "Unknown" },
      };

      const locales = getLocales({ app, config, default: defaultLocaleConfig });

      expect(locales).toEqual({
        "/": {
          text: "中文",
          fallback: "中文",
        },
        "/en/": {
          text: "English",
          fallback: "English",
        },
        "/ja/": {
          text: "日本",
          fallback: "日本",
        },
        "/id/": {
          text: "Indonesia",
          fallback: "Indonesia",
        },
        "/unknown/": {
          text: "Unknown",
          fallback: "中文",
        },
      });
    });
  });
});
