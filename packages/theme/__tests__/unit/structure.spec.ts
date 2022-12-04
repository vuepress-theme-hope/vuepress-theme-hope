import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, it, expect } from "vitest";

import { sidebarTheme } from "./__fixtures__/theme/sidebar.js";
import { getStructure } from "../../src/node/prepare/index.js";

describe("should generate structure info correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: sidebarTheme,
  });

  await app.init();

  it("Should generate structure info for whole dir", () => {
    expect(getStructure(app.pages, "")).toMatchSnapshot();
  });

  it("Should resolve structure in dir", () => {
    expect(getStructure(app.pages, "dir/")).toMatchSnapshot();
  });
});
