import { describe, expect, it } from "vitest";
import { createBaseApp } from "vuepress/core";
import { path } from "vuepress/utils";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getStructureInfo } from "../../src/node/prepare/sidebar/structure.js";

describe("should generate structure info correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: emptyTheme,
  });

  await app.init();

  it("Should generate structure info for whole dir", () => {
    expect(getStructureInfo(app.pages, "")).toMatchSnapshot();
  });

  it("Should resolve structure in dir", () => {
    expect(getStructureInfo(app.pages, "dir/")).toMatchSnapshot();
  });
});
