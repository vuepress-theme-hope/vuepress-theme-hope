import type { PluginConfig } from "@vuepress/core";
import type { HopeThemePluginsOptions } from "../../shared";
import { logger } from "../utils";

const isSearchPluginInstalled = (): boolean => {
  try {
    require.resolve("@vuepress/plugin-search");

    return true;
  } catch {
    return false;
  }
};

const isDocSearchPluginInstalled = (): boolean => {
  try {
    require.resolve("@vuepress/plugin-docsearch");

    return true;
  } catch {
    return false;
  }
};

export const resolveSearchPlugin = (
  plugins: HopeThemePluginsOptions
): PluginConfig => {
  if (plugins.search) {
    if (!isSearchPluginInstalled()) {
      logger.error('"@vuepress/plugin-search" is not installed');

      return ["@vuepress/search", false];
    }

    return ["@vuepress/search", plugins.search];
  }
  if (plugins.docsearch) {
    if (!isDocSearchPluginInstalled()) {
      logger.error('"@vuepress/plugin-docsearch" is not installed');

      return ["@vuepress/docsearch", false];
    }

    return ["@vuepress/docsearch", plugins.docsearch];
  }

  return [{ name: "" }, false];
};
