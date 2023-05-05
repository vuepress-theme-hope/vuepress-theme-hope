import { type UserConfig } from "@vuepress/cli";
import { type Plugin, type PluginConfig } from "@vuepress/core";
import { type MarkdownOptions } from "@vuepress/markdown";
import { colors } from "@vuepress/utils";
import {
  isArray,
  isFunction,
  isPlainObject,
  isString,
} from "vuepress-shared/node";

import { defineHopeConfig } from "./helper-v2.js";
import { convertThemeOptions } from "./theme.js";
import { deprecatedMsg } from "./utils.js";
import {
  type NavbarOptions,
  type SidebarOptions,
  type ThemeOptions,
} from "../../shared/index.js";
import { logger } from "../utils.js";

/**
 * @deprecated use `import { navbar } from "vuepress-theme-hope";` instead
 */
export const navbarConfig = (config: NavbarOptions): NavbarOptions => {
  deprecatedMsg(
    "navbarConfig",
    'import { navbar } from "vuepress-theme-hope";'
  );

  return config;
};

/**
 * @deprecated use `import { arraySidebar } from "vuepress-theme-hope";` instead
 */
export const sidebarConfig = (config: SidebarOptions): SidebarOptions => {
  deprecatedMsg(
    "sidebarConfig",
    'import { sidebar } from "vuepress-theme-hope";'
  );

  return config;
};

/**
 * @deprecated use `import { hopeThemeLegacy } from "vuepress-theme-hope";` instead
 */
export const themeConfig = (themeConfig: ThemeOptions): ThemeOptions => {
  deprecatedMsg(
    "themeConfig",
    'import { hopeThemeLegacy } from "vuepress-theme-hope";'
  );

  return convertThemeOptions(
    themeConfig as ThemeOptions & Record<string, unknown>
  );
};

const checkMarkdownOptions = (
  options: MarkdownOptions & Record<string, unknown> = {}
): void => {
  // lineNumbers
  if ("lineNumbers" in options) {
    logger.warn(
      `${colors.magenta("markdown.lineNumbers")} is ${colors.yellow(
        "deprecated"
      )}  in VuePress2, please use ${colors.magenta(
        "markdown.code.lineNumbers"
      )} instead.`
    );

    options.code = options.code ?? {};

    if (isPlainObject(options.code))
      options.code.lineNumbers = options["lineNumbers"] as boolean;

    delete options["lineNumbers"];
  }

  // slugify
  if ("slugify" in options) {
    logger.error(
      `\
${colors.magenta("markdown.slugify")} is ${colors.red(
        "no longer supported"
      )} in VuePress2.
If you want to change the slugify function anyway, set the following options separately:
· ${colors.blue("markdown.anchor.slugify")}
· ${colors.blue("markdown.toc.slugify")}
· ${colors.blue("markdown.headers.slugify")}
`
    );

    delete options["slugify"];
  }

  // pageSuffix
  if ("pageSuffix" in options) {
    logger.error(
      `${colors.magenta("markdown.pageSuffix")} is ${colors.red(
        "no longer supported"
      )} in VuePress2.`
    );

    delete options["pageSuffix"];
  }

  // externalLinks
  if ("externalLinks" in options) {
    logger.error(
      `${colors.magenta("markdown.externalLinks")} is ${colors.red(
        "no longer supported"
      )} in VuePress2, please use ${colors.magenta(
        "markdown.links.externalAttrs"
      )} instead.`
    );

    delete options["externalLinks"];
  }

  // plugins
  if ("plugins" in options) {
    logger.error(
      `${colors.magenta("markdown.plugins")} is ${colors.red(
        "no longer supported"
      )} in VuePress2, please use ${colors.magenta(
        "extendsMarkdown"
      )} hook instead.`
    );

    delete options["plugins"];
  }
};

const checkPluginOptions = (plugins: unknown): PluginConfig => {
  // check plugin array
  if (isArray(plugins))
    return plugins.flat().filter((item): item is Plugin => {
      if (isFunction(item)) return true;

      if (isPlainObject(item)) {
        const { name } = item as Plugin & Record<string, unknown>;

        // check name
        if (!isString(name)) {
          logger.error(
            'VuePress2 requires "name" option in plugins and it should strict equal it\'s package name.'
          );

          return false;
        }

        // check name
        if (!/^(@.*\/)?vuepress-plugin-/.test(name)) {
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
              `${colors.magenta(
                deprecatedOption
              )} options in plugin options is ${colors.yellow(
                "deprecated"
              )} in VuePress2, please use ${colors.magenta(newOption)} instead.`
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
              `${colors.magenta(
                removedOption
              )} option in plugin options is ${colors.red(
                "no longer supported"
              )} in VuePress2, make sure you are using a VuePress2 plugin.`
            );

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          delete item[removedOption];
        });
      }

      return false;
    });

  // check whether plugins is an object
  if (isPlainObject(plugins)) {
    logger.error(
      `${colors.magenta('object format "plugins"')} is ${colors.red(
        "no longer supported"
      )} in VuePress2, you should import plugins and call them in an array.`
    );

    return [];
  }

  return [];
};

const checkBundlerOptions = (config: Record<string, unknown>): void => {
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
        `"${colors.magenta(
          removedOption
        )}" option in config file is ${colors.red(
          "no longer supported"
        )} in VuePress2, you should set it in bundler options.`
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
        `"${deprecatedOption}" option in config file is ${colors.yellow(
          "deprecated"
        )} in VuePress2, please use "${newOption}" instead.`
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
        `"${removedOption}" option in config is ${colors.red(
          "no longer supported"
        )} in VuePress2${hint ? `, ${hint}.` : "."}`
      );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete userConfig[removedOption];
  });

  // other options
  if ("extraWatchFiles" in userConfig) {
    logger.error(
      `${colors.magenta("extraWatchFiles")} options is ${colors.red(
        "removed"
      )} in VuePress2, you should use "onWatched" hook.`
    );

    delete userConfig["extraWatchFiles"];
  }

  return defineHopeConfig(userConfig);
};
