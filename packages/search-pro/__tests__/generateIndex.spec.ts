import { type Page, createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, expect, it } from "vitest";
import { getPageExcerpt } from "vuepress-shared/node";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { generatePageIndex } from "../src/node/generateIndex.js";

const app = createBaseApp({
  bundler: {} as any,
  source: path.resolve(__dirname, "./__fixtures__/src"),
  theme: emptyTheme,
});

await app.init();

describe("generateIndex", () => {
  it("Should generate index", () => {
    app.pages.forEach((page) => {
      page.data["excerpt"] = getPageExcerpt(app, page, {
        excerptLength: 0,
      });

      expect(generatePageIndex(page)).toMatchSnapshot();
    });
  });

  it("Should generate full index", () => {
    app.pages.forEach((page) => {
      page.data["excerpt"] = getPageExcerpt(app, page, {
        excerptLength: 0,
      });

      expect(generatePageIndex(page, [], true)).toMatchSnapshot();
    });
  });

  it("Should support customFields", () => {
    app.pages.forEach((page) => {
      page.data["excerpt"] = getPageExcerpt(app, page, {
        excerptLength: 0,
      });

      expect(
        generatePageIndex(page, [
          {
            getter: ({ frontmatter }: Page): string[] | string | null =>
              (frontmatter.tag as string[] | string) || null,
          },
        ])
      ).toMatchSnapshot();
    });
  });

  it("Should support customFields with full index", () => {
    app.pages.forEach((page) => {
      expect(
        generatePageIndex(
          page,
          [
            {
              getter: ({ frontmatter }: Page): string[] | string | null =>
                (frontmatter.tag as string[] | string) || null,
            },
          ],
          true
        )
      ).toMatchSnapshot();
    });
  });
});
