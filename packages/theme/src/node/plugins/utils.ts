import type { PluginObject } from "vuepress/core";
import { colors, logger } from "vuepress/utils";

export const isHighlighterPlugin = (plugin: PluginObject): boolean =>
  ["@vuepress/plugin-prismjs", "@vuepress/plugin-shiki"].includes(plugin.name);

export const logMissingPkg = (pkg: string): void => {
  logger.error(
    ` ${colors.cyan(pkg)} is not installed, please install it manually!`,
  );
};
