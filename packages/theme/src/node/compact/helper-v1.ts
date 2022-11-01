import { defineHopeConfig } from "./helper-v2.js";
import { convertThemeConfig } from "./theme.js";

import { logger } from "../utils.js";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { UserConfig } from "@vuepress/cli";
import type { MarkdownOptions } from "@vuepress/markdown";
import type {
  HopeThemeNavbarConfig,
  HopeThemeSidebarConfig,
  HopeThemeOptions,
} from "../../shared/index.js";

/**
 * @deprecated use `navbar` instead
 */
export const navbarConfig = (
  config: HopeThemeNavbarConfig
): HopeThemeNavbarConfig => {
  logger.warn(
    '"navbarConfig" is deprecated, please import and use "navbar" from vuepress-theme-hope instead.'
  );

  return config;
};

/**
 * @deprecated use `sidebar` instead
 */
export const sidebarConfig = (
  config: HopeThemeSidebarConfig
): HopeThemeSidebarConfig => {
  logger.warn(
    '"sidebarConfig" is deprecated, please import and use "sidebar" from vuepress-theme-hope instead.'
  );

  return config;
};

/**
 * @deprecated import and use `hopeTheme` instead
 */
export const themeConfig = (
  themeConfig: HopeThemeOptions
): HopeThemeOptions => {
  logger.warn(
    '"themeConfig" is deprecated, please import "hopeTheme" from vuepress-theme-hope and use "theme : hopeTheme(themeConfig)" instead.'
  );

  return convertThemeConfig(
    themeConfig as HopeThemeOptions & Record<string, unknown>
  );
};

const checkMarkdownOptions = (
  options: MarkdownOptions & Record<string, unknown> = {}
): void => {
  // lineNumbers
  if ("lineNumbers" in options) {
    logger.warn(
      '"markdown.lineNumbers" is deprecated in VuePress2, please use "markdown.code.lineNumbers" instead.'
    );

    options.code = options.code ?? {};

    if (typeof options.code === "object")
      options.code.lineNumbers = options["lineNumbers"] as boolean;

    delete options["lineNumbers"];
  }

  // slugify
  if ("slugify" in options) {
    logger.error(
      '"markdown.slugify" is no longer supported in VuePress2.\nIf you want to change the slugify function anyway, set the following options separately:\n· markdown.anchor.slugify\n· markdown.toc.slugify\n· markdown.extractHeaders.slugify'
    );

    delete options["slugify"];
  }

  // pageSuffix
  if ("pageSuffix" in options) {
    logger.error('"markdown.pageSuffix" is no longer supported in VuePress2.');

    delete options["pageSuffix"];
  }

  // externalLinks
  if ("externalLinks" in options) {
    logger.error(
      '"markdown.externalLinks" is no longer supported in VuePress2, please use "markdown.links.externalAttrs" instead.'
    );

    delete options["externalLinks"];
  }

  // plugins
  if ("plugins" in options) {
    logger.error(
      '"markdown.plugins" is no longer supported in VuePress2, please use "extendsMarkdown" hook instead.'
    );

    delete options["plugins"];
  }
};

const checkPluginOptions = (plugins: unknown): PluginConfig => {
  // check plugin array
  if (Array.isArray(plugins))
    return plugins.flat().filter((item): item is Plugin => {
      if (typeof item === "function") return true;

      if (typeof item === "object") {
        const { name } = item as Plugin & Record<string, unknown>;

        // check name
        if (typeof name !== "string") {
          logger.error(
            'VuePress2 requires "name" option in plugins and it should strict equal it\'s package name.'
          );

          return false;
        }

        // check name
        if (
          !name.startsWith("vuepress-plugin-") &&
          !name.match(/@.*\/vuepress-plugin-/)
        ) {
          logger.error(
            "VuePress2 requires plugin name to strict equal a package name, you should fix it"
          );

          return false;
        }

        // check renamed options
        [
          // v1
          ["ready", "onPrepared"],
          ["updated", "onWatched"],
          ["generated", "onGenerated"],
          ["extendMarkdown", "extendsMarkdown"],
          ["extendPageData", "extendsPage"],

          // v2
          ["templateSSR", "templateBuild"],
        ].forEach(([deprecatedOption, newOption]) => {
          if (deprecatedOption in item)
            logger.warn(
              `"${deprecatedOption}" options in plugin options is deprecated in VuePress2, please use "${newOption}" instead.`
            );

          // eslint-disable-next-line
          item[newOption] = item[deprecatedOption];

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          delete item[deprecatedOption];
        });

        // check removed options
        [
          // v1
          "plugins",
          "chainMarkdown",
          "extendsCli",
          "configureWebpack",
          "chainWebpack",
          "beforeDevServer",
          "afterDevServer",
          "additionalPages",
          "clientDynamicModules",
          "enhanceAppFiles",
          "globalUIComponents",
          "clientRootMixin",

          // v2
          "clientAppEnhanceFiles",
          "clientAppRootComponentFiles",
          "clientAppSetupFiles",
        ].forEach((removedOption) => {
          if (removedOption in item)
            logger.error(
              `"${removedOption}" option in plugin options is no longer supported in VuePress2, make sure you are using a VuePress2 plugin.`
            );

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          delete item[removedOption];
        });
      }

      return false;
    });

  // check whether plugins is an object
  if (typeof plugins === "object") {
    logger.error(
      'VuePress2 does not support object format "plugins" anymore, you should import plugins and call them in an array.'
    );

    return [];
  }

  return [];
};

export const checkBundlerOptions = (config: Record<string, unknown>): void => {
  [
    "postcss",
    "stylus",
    "scss",
    "sass",
    "less",
    "chainWebpack",
    "configureWebpack",
    "beforeDevServer",
    "afterDevServer",
    "evergreen",
  ].forEach((removedOption) => {
    if (removedOption in config)
      logger.error(
        `"${removedOption}" option in config file is no longer supported in VuePress2, you should set it in bundler options.`
      );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete config[removedOption];
  });
};

/**
 * @deprecated import and use `hopeTheme` instead
 */
export const config = (userConfig: Record<string, unknown>): UserConfig => {
  checkMarkdownOptions(
    userConfig["markdown"] as
      | (MarkdownOptions & Record<string, unknown>)
      | undefined
  );
  checkBundlerOptions(userConfig);

  userConfig["plugins"] = checkPluginOptions(userConfig["plugins"]);

  // check renamed options
  [
    ["ready", "onPrepared"],
    ["updated", "onWatched"],
    ["generated", "onGenerated"],
    ["extendMarkdown", "extendsMarkdown"],
    ["extendPageData", "extendsPage"],
    ["patterns", "pagePatterns"],
    ["templateSSR", "templateBuild"],
  ].forEach(([deprecatedOption, newOption]) => {
    if (deprecatedOption in userConfig)
      logger.warn(
        `"${deprecatedOption}" option in config file is deprecated in VuePress2, please use "${newOption}" instead.`
      );

    // eslint-disable-next-line
    userConfig[newOption] = userConfig[deprecatedOption];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete userConfig[deprecatedOption];
  });

  // check removed options
  [
    ["chainMarkdown", 'please use "extendsMarkdown" instead'],
    ["extendsCli"],
    ["configureWebpack", 'please set options in "bundler" instead'],
    ["chainWebpack", 'please set options in "bundler" instead'],
    [
      "additionalPages",
      'please use "app.pages.push(createPage())" in "onInitialized" hook',
    ],
    [
      "clientDynamicModules",
      'please use "app.writeTemp()" in "onPrepared" hook',
    ],
    ["clientAppRootComponentFiles", 'please use "clientConfigFile" instead'],
    ["clientAppSetupFiles", 'please use "clientConfigFile" instead'],
    ["clientAppEnhanceFiles", 'please use "clientConfigFile" instead'],
  ].forEach(([removedOption, hint = ""]) => {
    if (removedOption in userConfig)
      logger.error(
        `"${removedOption}" option in config is no longer supported in VuePress2${
          hint ? `, ${hint}.` : "."
        }`
      );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete userConfig[removedOption];
  });

  // other options
  if ("extraWatchFiles" in userConfig) {
    logger.error(
      '"extraWatchFiles" options is removed in VuePress2, you should use "onWatched" hook.'
    );

    delete userConfig["extraWatchFiles"];
  }

  return defineHopeConfig(userConfig);
};
