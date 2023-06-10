/* eslint-disable @typescript-eslint/naming-convention */
import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, expect, it } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { seoPlugin } from "../../src/node/index.js";

const app = createBaseApp({
  bundler: {} as any,
  source: path.resolve(__dirname, "./__fixtures__/src"),
  theme: emptyTheme,
  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
    },
  },
  plugins: [
    seoPlugin({
      hostname: "https://exmaple.com",
      canonical: "https://exmaple.com",
    }),
  ],
});

await app.init();

describe("Should generate seo information", () => {
  it("Should contain basic properties", () => {
    app.pages.forEach(({ frontmatter }) => {
      expect(frontmatter.head).toMatchSnapshot();
    });
  });
});
