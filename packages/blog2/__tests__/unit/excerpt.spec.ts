import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, it, expect } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getPageExcerpt } from "../../src/node/index.js";

describe("Should generate page excerpt correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: emptyTheme,
  });

  await app.init();

  it("Should generate excerpt", () => {
    app.pages.forEach((page) => {
      expect(getPageExcerpt(app, page, "<!-- more -->", 200)).toMatchSnapshot();
    });
  });
});
