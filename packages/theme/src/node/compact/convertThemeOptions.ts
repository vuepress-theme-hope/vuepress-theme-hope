import { entries, isArray, isPlainObject } from "@vuepress/helper";
import { colors } from "vuepress/utils";

import {
  convertNavbarLayoutOptions,
  convertNavbarOptions,
} from "./convertNavbarOptions.js";
import { convertSidebarOptions } from "./convertSidebarOptions.js";
import { deprecatedLogger, droppedLogger } from "./utils.js";
import type { ThemeOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

const DEPRECATED_THEME_OPTIONS: [string, string][] = [
  // v2
  ["hideSiteNameonMobile", "hideSiteNameOnMobile"],
  ["fullScreen", "fullscreen"],
  ["headingDepth", "headerDepth"],
  ["wideBreakPoint", "pcBreakPoint"],
];

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
const convertBlogOptions = (
  options: Record<string, unknown>,
  plugins: Record<string, unknown>,
  localePath?: string,
): void => {
  // Handle blog
  if (isPlainObject<Record<string, unknown>>(options["blog"])) {
    const blogOptions = options["blog"];

    if ("links" in blogOptions) {
      logger.warn(
        `${colors.magenta("blog.links")} options is deprecated, please use ${colors.magenta("blog.medias")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );
      blogOptions["medias"] = blogOptions["links"];
      delete blogOptions["links"];
    }

    if ("perPage" in blogOptions) {
      logger.warn(
        `${colors.magenta("blog.perPage")} options is deprecated, please use ${colors.magenta("blog.articlePerPage")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );
      blogOptions["articlePerPage"] = blogOptions["perPage"];
      delete blogOptions["perPage"];
    }

    if ("autoExcerpt" in blogOptions) {
      logger.error(
        `${colors.magenta("blog.autoExcerpt")} options is no longer supported, please use ${colors.magenta("plugins.blog.excerptLength")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );
      delete blogOptions["autoExcerpt"];
    }

    if (!plugins["blog"])
      logger.warn(
        `Blog feature is tree-shakable in v2, you should set ${colors.magenta(
          "plugins.blog: true",
        )} in theme options to enable it.`,
      );
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
const convertFooterOptions = (
  themeLocaleOptions: Record<string, unknown>,
  localePath?: string,
): void => {
  if (
    isPlainObject(themeLocaleOptions["footer"]) &&
    themeLocaleOptions["footer"]
  ) {
    const { footer } = themeLocaleOptions;

    if ("copyright" in footer) {
      logger.warn(
        `${colors.magenta("footer.copyright")} options is deprecated, please use ${colors.magenta("copyright")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );

      themeLocaleOptions["copyright"] = footer["copyright"] as string;
    }

    if ("display" in footer) {
      logger.warn(
        `${colors.magenta("footer.display")} options is deprecated, please use ${colors.magenta("displayFooter")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );

      themeLocaleOptions["displayFooter"] = footer["display"] as boolean;
    }

    if ("content" in footer) {
      logger.warn(
        `${colors.magenta("footer.content")} options is deprecated, please use ${colors.magenta("footer")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );

      themeLocaleOptions["footer"] = footer["content"] as string;
    } else {
      delete themeLocaleOptions["footer"];
    }
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
const covertPluginOptions = (themeOptions: Record<string, unknown>): void => {
  const markdownOptions = (themeOptions["markdown"] ??= {}) as Record<
    string,
    unknown
  >;
  const pluginOptions = themeOptions["plugins"] as Record<string, unknown>;

  // Handle component
  if (isArray(pluginOptions["components"])) {
    logger.warn(
      `${colors.magenta(
        "plugins.components",
      )} no longer accepts array, please set it to ${colors.magenta(
        "plugin.components.components",
      )} instead.`,
    );

    pluginOptions["components"] = {
      components: pluginOptions["components"],
    };
  }

  if (pluginOptions["linksCheck"]) {
    deprecatedLogger({
      options: themeOptions,
      deprecatedOption: "plugins.linksCheck",
      newOption: "markdown.linksCheck",
    });
  }
  if (isPlainObject(pluginOptions["mdEnhance"])) {
    const { mdEnhance: mdEnhanceOptions } = pluginOptions;

    if ("alert" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.alert",
        newOption: "markdown.alert",
      });
    }

    if ("hint" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.hint",
        newOption: "markdown.hint",
      });
    }

    if ("figure" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.figure",
        newOption: "markdown.figure",
      });
    }

    if ("imgLazyload" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.imgLazyload",
        newOption: "markdown.imgLazyload",
      });
    }

    if ("imgSize" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.imgSize",
        newOption: "markdown.imgSize",
      });
    }

    if ("imgSize" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.obsidianImgSize",
        newOption: "markdown.obsidianImgSize",
      });
    }

    if ("imgMark" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.imgMark",
        newOption: "markdown.imgMark",
      });
    }

    if ("katex" in mdEnhanceOptions) {
      logger.warn(
        `${colors.magenta("plugins.mdEnhance.katex")} is deprecated, you should use ${colors.magenta("markdown.math")} instead.`,
      );

      markdownOptions["math"] = {
        type: "katex",
        ...(isPlainObject(mdEnhanceOptions["katex"])
          ? mdEnhanceOptions["katex"]
          : {}),
      };
    }

    if ("mathjax" in mdEnhanceOptions) {
      logger.warn(
        `${colors.magenta("plugins.mdEnhance.mathjax")} is deprecated, you should use ${colors.magenta("markdown.math")} instead.`,
      );

      markdownOptions["math"] = {
        type: "mathjax",
        ...(isPlainObject(mdEnhanceOptions["mathjax"])
          ? mdEnhanceOptions["mathjax"]
          : {}),
      };
    }

    if ("codetabs" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.codetabs",
        newOption: "markdown.codeTabs",
      });
    }

    if ("tabs" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.tabs",
        newOption: "markdown.tabs",
      });
    }

    if ("gfm" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.gfm",
        newOption: "markdown.gfm",
      });
    }

    if ("footnote" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.footnote",
        newOption: "markdown.footnote",
      });
    }

    if ("tasklist" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.tasklist",
        newOption: "markdown.tasklist",
      });
    }

    if ("breaks" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.breaks",
        newOption: "markdown.breaks",
      });
    }

    if ("linkify" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.linkify",
        newOption: "markdown.linkify",
      });
    }

    if ("component" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.component",
        newOption: "markdown.component",
      });
    }

    if ("vPre" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.vPre",
        newOption: "markdown.vPre",
      });
    }

    if ("include" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.include",
        newOption: "markdown.include",
      });
    }

    if ("align" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.align",
        newOption: "markdown.align",
      });
    }

    if ("attrs" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.attrs",
        newOption: "markdown.attrs",
      });
    }

    if ("mark" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.mark",
        newOption: "markdown.mark",
      });
    }

    if ("spoiler" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.spoiler",
        newOption: "markdown.spoiler",
      });
    }

    if ("sup" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.sup",
        newOption: "markdown.sup",
      });
    }

    if ("sub" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.sub",
        newOption: "markdown.sub",
      });
    }

    if ("stylize" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        deprecatedOption: "plugins.mdEnhance.stylize",
        newOption: "markdown.stylize",
      });
    }

    if ("revealJs" in mdEnhanceOptions) {
      logger.warn(
        `${colors.magenta("plugins.mdEnhance.revealJs")} is deprecated, you should install ${colors.cyan("@vuepress/plugin-revealjs")} and use ${colors.magenta("markdown.revealjs")} instead.`,
      );

      markdownOptions["revealjs"] = true;
    }
  }

  if (pluginOptions["markdownHint"]) {
    logger.warn(
      `${colors.magenta("plugins.markdownHint")} is deprecated, you should use ${colors.magenta("markdown.alert")} and ${colors.magenta("markdown.hint")} instead.`,
    );
  }

  if (pluginOptions["markdownImg"]) {
    logger.warn(
      `${colors.magenta("plugins.markdownImg")} is deprecated, you should use ${colors.magenta("markdown.figure")} ${colors.magenta("markdown.imgLazyload")} ${colors.magenta("markdown.imgMark")} ${colors.magenta("markdown.imgSize")} and ${colors.magenta("markdown.obsidianImgSize")} instead.`,
    );
  }

  if (pluginOptions["markdownMath"]) {
    logger.warn(
      `${colors.magenta("plugins.markdownMath")} is deprecated, you should use ${colors.magenta("markdown.math")} instead.`,
    );
  }

  if (pluginOptions["markdownTab"]) {
    logger.warn(
      `${colors.magenta("plugins.markdownTab")} is deprecated, you should use ${colors.magenta("markdown.tabs")} and ${colors.magenta("markdown.codeTabs")} instead.`,
    );
  }

  if (pluginOptions["revealjs"]) {
    logger.warn(
      `${colors.magenta("plugins.revealjs")} is deprecated, you should use ${colors.magenta("markdown.revealjs")} instead.`,
    );
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
export const convertThemeOptions = (
  themeOptions: Record<string, unknown>,
): ThemeOptions => {
  // Ensure plugins
  const plugins = (themeOptions["plugins"] ??= {}) as Record<string, unknown>;

  covertPluginOptions(themeOptions);

  DEPRECATED_THEME_OPTIONS.forEach(([deprecatedOption, newOption]) =>
    deprecatedLogger({
      options: themeOptions,
      deprecatedOption,
      newOption,
      scope: "themeConfig",
    }),
  );

  // Handle navbar
  if ("navbar" in themeOptions)
    themeOptions["navbar"] = convertNavbarOptions(themeOptions["navbar"]);

  if ("sidebar" in themeOptions)
    themeOptions["sidebar"] = convertSidebarOptions(themeOptions["sidebar"]);

  convertNavbarLayoutOptions(themeOptions);
  convertBlogOptions(themeOptions, plugins);
  convertFooterOptions(themeOptions);

  // handle addThis
  if (themeOptions["addThis"]) droppedLogger(themeOptions, "addThis");

  // Handle copyright plugin
  if (
    isPlainObject(themeOptions["copyright"]) ||
    themeOptions["copyright"] === true
  )
    logger.warn(
      `${colors.magenta(
        "copyright",
      )} is deprecated in V2, please use ${colors.magenta(
        "plugins.copyright",
      )} instead.`,
    );

  // Handle encrypt
  if (isPlainObject(themeOptions["encrypt"]) && themeOptions["encrypt"]) {
    const encrypt = themeOptions["encrypt"] as Record<string, unknown>;

    if ("global" in encrypt && typeof encrypt["global"] !== "boolean") {
      logger.warn(
        `${colors.magenta(
          "encrypt.global",
        )} is deprecated in V2, please use ${colors.magenta(
          "encrypt.admin",
        )} instead.`,
      );

      encrypt["admin"] = encrypt["global"];
    }

    if ("status" in encrypt) {
      logger.warn(
        `${colors.magenta(
          "encrypt.status",
        )} is deprecated, please use ${colors.magenta(
          "encrypt.global",
        )} instead.`,
      );

      encrypt["global"] = encrypt["status"] === "global";
      delete encrypt["status"];
    }
  }

  // Handle each locale
  if ("locales" in themeOptions && isPlainObject(themeOptions["locales"]))
    entries(themeOptions["locales"]).forEach(
      ([localePath, localeConfig]: [string, Record<string, unknown>]) => {
        DEPRECATED_THEME_OPTIONS.forEach(([deprecatedOption, newOption]) =>
          deprecatedLogger({
            options: localeConfig,
            deprecatedOption,
            newOption,
            scope: "themeConfig.locales",
          }),
        );

        // Handle navbar
        if ("navbar" in localeConfig)
          localeConfig["navbar"] = convertNavbarOptions(localeConfig["navbar"]);

        // Handle sidebar
        if ("sidebar" in localeConfig)
          localeConfig["sidebar"] = convertSidebarOptions(
            localeConfig["sidebar"],
          );

        convertNavbarLayoutOptions(localeConfig);
        convertBlogOptions(localeConfig, plugins, localePath);
        convertFooterOptions(localeConfig);
      },
    );

  return themeOptions;
};
