import { describe, expect, it } from "vitest";
import type { Bundler } from "vuepress/core";
import { createBaseApp } from "vuepress/core";
import { path } from "vuepress/utils";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getStructureInfo } from "../../src/node/prepare/sidebar/getStructureInfo.js";

const app = createBaseApp({
  bundler: {} as Bundler,
  source: path.resolve(__dirname, "./__fixtures__/src"),
  theme: emptyTheme,
});

await app.init();

describe("should generate structure info correctly", () => {
  it("Should generate structure info for whole dir", () => {
    expect(getStructureInfo(app.pages, "")).toMatchSnapshot();
  });

  it("Should resolve structure in dir", () => {
    expect(getStructureInfo(app.pages, "dir/")).toMatchSnapshot();
  });
});
