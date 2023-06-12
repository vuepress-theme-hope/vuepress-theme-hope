import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { expect, it } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getLinksCheckStatus, linksCheck } from "../../src/node/linksCheck.js";

it("Should get status correctly", async () => {
  const devApp = createBaseApp(
    {
      bundler: {} as any,
      source: path.resolve(__dirname, "./__fixtures__/src"),
      theme: emptyTheme,
    },
    false
  );
  const buildApp = createBaseApp(
    {
      bundler: {} as any,
      source: path.resolve(__dirname, "./__fixtures__/src"),
      theme: emptyTheme,
    },
    true
  );

  await devApp.init();
  await buildApp.init();

  expect(
    getLinksCheckStatus(devApp, { checkLinks: { status: "always" } })
  ).toContain({
    enabled: true,
  });
  expect(
    getLinksCheckStatus(buildApp, { checkLinks: { status: "always" } })
  ).toContain({
    enabled: true,
  });
  expect(
    getLinksCheckStatus(devApp, { checkLinks: { status: "dev" } })
  ).toContain({
    enabled: true,
  });
  expect(
    getLinksCheckStatus(buildApp, { checkLinks: { status: "dev" } })
  ).toContain({
    enabled: false,
  });

  const { isIgnoreLink: isIgnoreLink1 } = getLinksCheckStatus(devApp, {
    checkLinks: { ignore: ["/test", /^\/a\//] },
  });

  expect(isIgnoreLink1("/")).toBe(false);
  expect(isIgnoreLink1("/test")).toBe(true);
  expect(isIgnoreLink1("/a/test")).toBe(true);

  const { isIgnoreLink: isIgnoreLink2 } = getLinksCheckStatus(devApp, {
    checkLinks: { ignore: () => true },
  });

  expect(isIgnoreLink2("/")).toBe(true);
  expect(isIgnoreLink2("/test")).toBe(true);
});

it("should check links correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: emptyTheme,
  });

  await app.init();

  const { enabled: linksCheckEnabled, isIgnoreLink } = getLinksCheckStatus(
    app,
    {}
  );

  if (linksCheckEnabled)
    app.pages.forEach((page) => linksCheck(page, app, isIgnoreLink));
});
