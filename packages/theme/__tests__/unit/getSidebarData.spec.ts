import { describe, expect, it } from "vitest";
import type { Bundler } from "vuepress/core";
import { createBuildApp } from "vuepress/core";
import { path } from "vuepress/utils";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getThemeData } from "../../src/node/config/getThemeData.js";
import { getThemeStatus } from "../../src/node/config/getThemeStatus.js";
import { getSidebarData } from "../../src/node/prepare/sidebar/index.js";
import type { ThemeOptions } from "../../src/shared/index.js";

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(__dirname, "./__fixtures__/src"),
  theme: emptyTheme,
});

await app.init();

describe("should generate sidebarData correctly", () => {
  it("Should resolve structure in root", () => {
    const themeOptions: ThemeOptions = {
      sidebar: "structure",
    };

    const themeData = getThemeData(
      app,
      themeOptions,
      getThemeStatus(app, themeOptions),
    );

    expect(getSidebarData(app, themeData)).toMatchSnapshot();
  });

  it("Should resolve structure in dir", () => {
    const themeOptions: ThemeOptions = {
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

    const themeData = getThemeData(
      app,
      themeOptions,
      getThemeStatus(app, themeOptions),
    );

    expect(getSidebarData(app, themeData)).toMatchSnapshot();
  });

  it("Should resolve structure in group options", () => {
    const themeOptions: ThemeOptions = {
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

    const themeData = getThemeData(
      app,
      themeOptions,
      getThemeStatus(app, themeOptions),
    );

    expect(getSidebarData(app, themeData)).toMatchSnapshot();
  });
});
