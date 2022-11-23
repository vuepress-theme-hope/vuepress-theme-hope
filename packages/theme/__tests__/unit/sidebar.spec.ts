import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, it, expect } from "vitest";

import { getSidebarData } from "../../src/node/prepare/index.js";
import { getStatus } from "../../src/node/status.js";
import { getThemeConfig } from "../../src/node/themeConfig.js";
import { HopeThemeOptions } from "../../src/shared/index.js";
import { sidebarTheme } from "./__fixtures__/theme/sidebar.js";

describe("should generate sidebarData correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: sidebarTheme,
  });

  await app.init();

  it("Should resolve structure in root", () => {
    const themeOptions: HopeThemeOptions = {
      sidebar: "structure",
    };

    const themeConfig = getThemeConfig(
      app,
      themeOptions,
      getStatus(themeOptions)
    );

    expect(getSidebarData(app, themeConfig)).toMatchSnapshot();
  });

  it("Should resolve structure in dir", () => {
    const themeOptions: HopeThemeOptions = {
      sidebar: {
        "/dir/": "structure",
        "/dir-negative-order/": "structure",
        "/dir-no-order/": "structure",
        "/link/": "structure",
        "/nested-dir/": "structure",
        "/nested-dir/nested-dir1/": "structure",
        "/options/": "structure",
      },
    };

    const themeConfig = getThemeConfig(
      app,
      themeOptions,
      getStatus(themeOptions)
    );

    expect(getSidebarData(app, themeConfig)).toMatchSnapshot();
  });

  it("Should resolve structure in group options", () => {
    const themeOptions: HopeThemeOptions = {
      sidebar: {
        "/nested-dir/": [
          "",
          "file1",
          {
            text: "nested-dir1",
            prefix: "nested-dir1/",
            children: "structure",
          },
        ],
      },
    };

    const themeConfig = getThemeConfig(
      app,
      themeOptions,
      getStatus(themeOptions)
    );

    expect(getSidebarData(app, themeConfig)).toMatchSnapshot();
  });
});
