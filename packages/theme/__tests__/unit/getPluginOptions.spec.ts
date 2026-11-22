import { describe, expect, it } from "vitest";
import type { App, Plugin, PluginFunction } from "vuepress/core";

import { getMediaPlugin } from "../../src/node/plugins/media.js";
import { getSharePlugin } from "../../src/node/plugins/share.js";

const getPluginName = (plugin: Plugin | PluginFunction | null): string | undefined =>
  typeof plugin === "function" ? plugin({} as App).name : plugin?.name;

describe("should resolve media and share plugin options correctly", () => {
  it("should keep media plugin disabled when the option is missing or false", () => {
    expect(getMediaPlugin()).toBeNull();
    expect(getMediaPlugin(false)).toBeNull();
  });

  it("should enable media plugin with the given options", () => {
    expect(getPluginName(getMediaPlugin({}))).toBe("@vuepress/plugin-media");
  });

  it("should keep share plugin disabled when the option is missing or false", () => {
    expect(getSharePlugin()).toBeNull();
    expect(getSharePlugin(false)).toBeNull();
  });

  it("should enable share plugin with the default options when the option is true", () => {
    expect(getPluginName(getSharePlugin(true))).toBe("@vuepress/plugin-share");
  });

  it("should enable share plugin with the given options", () => {
    expect(getPluginName(getSharePlugin({ services: ["x"] }))).toBe("@vuepress/plugin-share");
  });
});
