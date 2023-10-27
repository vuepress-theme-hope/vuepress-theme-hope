import { createBaseApp } from "@vuepress/core";
import { getDirname, path } from "@vuepress/utils";
import { describe, expect, it } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { checkVersion } from "../../src/node/utils/checkVersion.js";

const __dirname = getDirname(import.meta.url);

const fixtures = path.resolve(__dirname, "./__fixtures__/check-version");

it("Should return true", () => {
  const app1 = createBaseApp({
    source: path.resolve(fixtures, "correct-version1"),

    bundler: {} as any,
    theme: emptyTheme,
  });
  const app2 = createBaseApp({
    source: path.resolve(fixtures, "correct-version2"),

    bundler: {} as any,
    theme: emptyTheme,
  });

  expect(checkVersion(app1, "test", "2.0.0-beta.67")).toEqual(true);
  expect(checkVersion(app2, "test", "2.0.0-beta.67")).toEqual(true);
});

it("Should return false", () => {
  const app1 = createBaseApp({
    source: path.resolve(fixtures, "wrong-version1"),
    bundler: {} as any,
    theme: emptyTheme,
  });
  const app2 = createBaseApp({
    source: path.resolve(fixtures, "wrong-version2"),
    bundler: {} as any,
    theme: emptyTheme,
  });

  expect(checkVersion(app1, "wrong1", "2.0.0-beta.61")).toEqual(false);
  expect(checkVersion(app2, "wrong2", "2.0.0-beta.61")).toEqual(false);
});

describe("Should support nesting", () => {
  it("Should return true", () => {
    const app1 = createBaseApp({
      source: path.resolve(fixtures, "nesting/sub-folder"),

      bundler: {} as any,
      theme: emptyTheme,
    });

    expect(checkVersion(app1, "nesting", "2.0.0-beta.67")).toEqual(true);
  });
});
