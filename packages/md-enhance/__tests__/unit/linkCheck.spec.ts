import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { it } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { checkLinks } from "../../src/node/checkLink.js";

it("should check links correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: emptyTheme,
  });

  await app.init();

  app.pages.forEach((page) => checkLinks(page, app));
});
