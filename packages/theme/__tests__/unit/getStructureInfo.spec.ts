import { describe, expect, it } from "vitest";
import type { Bundler } from "vuepress/core";
import { createBuildApp } from "vuepress/core";
import { path } from "vuepress/utils";

import { getStructureInfo } from "../../src/node/prepare/sidebar/getStructureInfo.js";
import { emptyTheme } from "./__fixtures__/theme/empty.js";

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(__dirname, "./__fixtures__/src"),
  theme: emptyTheme,
});

await app.init();

describe(getStructureInfo, () => {
  it("should generate structure info for whole dir", () => {
    expect(getStructureInfo(app.pages, "")).toMatchSnapshot();
  });

  it("should resolve structure in dir", () => {
    expect(getStructureInfo(app.pages, "dir/")).toMatchSnapshot();
  });
});
