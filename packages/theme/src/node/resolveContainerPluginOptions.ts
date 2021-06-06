import type { LocaleConfig } from "@vuepress/core";
import type { ContainerPluginOptions } from "@vuepress/plugin-container";
import type { HopeThemePluginsOptions, HopeThemeData } from "../shared";

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For custom containers default title
 */
export const resolveContainerPluginOptions = (
  themePlugins: HopeThemePluginsOptions,
  localeOptions: HopeThemeData,
  type: "tip" | "warning" | "danger"
): ContainerPluginOptions | boolean => {
  if (themePlugins?.container?.[type] === false) return false;

  const locales = Object.entries(localeOptions.locales || {}).reduce(
    (result: LocaleConfig<{ defaultInfo: string }>, [key, value]) => {
      result[key] = {
        defaultInfo: value?.[type] ?? localeOptions[type],
      };
      return result;
    },
    {}
  );

  return {
    type,
    locales,
  };
};

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For details container
 */
export const resolveContainerPluginOptionsForDetails = (
  themePlugins: HopeThemePluginsOptions
): ContainerPluginOptions | boolean => {
  if (themePlugins?.container?.details === false) return false;

  return {
    type: "details",
    before: (info): string =>
      `<details class="custom-container details">${
        info ? `<summary>${info}</summary>` : ""
      }\n`,
    after: (): string => "</details>\n",
  };
};

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For code-group container
 */
export const resolveContainerPluginOptionsForCodeGroup = (
  themePlugins: HopeThemePluginsOptions
): ContainerPluginOptions | boolean => {
  if (themePlugins?.container?.codeGroup === false) return false;

  return {
    type: "code-group",
    before: (): string => `<CodeGroup>\n`,
    after: (): string => "</CodeGroup>\n",
  };
};

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For code-group-item block
 */
export const resolveContainerPluginOptionsForCodeGroupItem = (
  themePlugins: HopeThemePluginsOptions
): ContainerPluginOptions | boolean => {
  if (themePlugins?.container?.codeGroupItem === false) return false;

  return {
    type: "code-group-item",
    before: (info): string => `<CodeGroupItem title="${info}">\n`,
    after: (): string => "</CodeGroupItem>\n",
  };
};
