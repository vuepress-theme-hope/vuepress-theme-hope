import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { it } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { linksCheck } from "../../src/node/linksCheck.js";

it("should check links correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: emptyTheme,
  });

  await app.init();

  app.pages.forEach((page) => linksCheck(page, app, () => false));
});
