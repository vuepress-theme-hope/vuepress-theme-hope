import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, expect, it } from "vitest";

import { emptyTheme } from "./__fixtures__/theme/empty.js";
import { getStatus } from "../../src/node/config/status.js";
import { getThemeData } from "../../src/node/config/themeData.js";
import { getSidebarData } from "../../src/node/prepare/sidebar/index.js";
import { type ThemeOptions } from "../../src/shared/index.js";

describe("should generate sidebarData correctly", async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, "./__fixtures__/src"),
    theme: emptyTheme,
  });

  await app.init();

  it("Should resolve structure in root", () => {
    const themeOptions: ThemeOptions = {
      sidebar: "structure",
    };

    const themeData = getThemeData(
      app,
      themeOptions,
      getStatus(app, themeOptions)
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
      getStatus(app, themeOptions)
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
      getStatus(app, themeOptions)
    );

    expect(getSidebarData(app, themeData)).toMatchSnapshot();
  });
});
