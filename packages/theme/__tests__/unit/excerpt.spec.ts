import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, it, expect } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getPageExcerpt } from "../../src/node/page/blog.js";
import type { Page } from "@vuepress/core";
import type { ThemePageData } from "../../src/node/index.js";

describe("Should generate page excerpt correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: emptyTheme,
  });

  await app.init();

  it("Should generate excerpt", () => {
    app.pages.forEach((page) => {
      if (page.path.startsWith("/excerpt/")) {
        expect(
          getPageExcerpt(app, page as Page<ThemePageData>, 200)
        ).toMatchSnapshot();
      }
    });
  });
});
