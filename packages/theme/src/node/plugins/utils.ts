import type { PluginObject } from "vuepress/core";

export const isHighlighterPlugin = (plugin: PluginObject): boolean =>
  ["@vuepress/plugin-prismjs", "@vuepress/plugin-shiki"].includes(plugin.name);
