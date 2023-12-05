import { colors } from "@vuepress/utils";
import { isArray, isPlainObject, values } from "vuepress-shared/node";

import { convertNavbarOptions } from "./navbar.js";
import { convertSidebarOptions } from "./sidebar.js";
import { deprecatedLogger, droppedLogger } from "./utils.js";
import type { ThemeOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

const DEPRECATED_THEME_OPTIONS: [string, string][] = [
  // v1
  ["darkLogo", "logoDark"],
  ["navAutoHide", "navbarAutoHide"],
  ["hideSiteTitleonMobile", "hideSiteNameOnMobile"],
  ["sidebarDepth ", "headerDepth"],
  ["prevLinks", "prevLink"],
  ["nextLinks", "nextLink"],
  ["editLinks", "editLink"],
  ["updateTime", "lastUpdated"],
  ["anchorDisplay", "toc"],
  ["nav", "navbar"],
  ["activeHash", "plugins.activeHeaderLinks"],
  ["comment", "plugins.comment"],
  ["copyCode", "plugins.copyCode"],
  ["feed", "plugins.feed"],
  ["git", "plugins.git"],
  ["mdEnhance", "plugins.mdEnhance"],
  ["readingTime", "plugins.readingTime"],
  ["photoswipe", "plugins.photoswipe"],
  ["pwa", "plugins.pwa"],
  ["sitemap", "plugins.sitemap"],
  ["seo", "plugins.seo"],
  ["wordPerMinute", "plugins.readingTime.wordPerMinute"],

  // v2
  ["hideSiteNameonMobile", "hideSiteNameOnMobile"],
  ["fullScreen", "fullscreen"],
  ["headingDepth", "headerDepth"],
  ["wideBreakPoint", "pcBreakPoint"],
];

const DROPPED_THEME_OPTIONS: [string, string?, string?][] = [
  // v1
  [
    "algolia",
    'The theme no longer bundles docsearch package, you should install and use "@vuepress/plugin-docsearch".',
  ],
  [
    "algoliaType",
    'The theme no longer bundles docsearch package, you should install and use "@vuepress/plugin-docsearch".',
  ],
  [
    "custom",
    "VuePress2 remove markdown slot support, you should extend theme layout to support similar feature.",
  ],
  [
    "displayAllHeaders",
    "Due to scalability consideration, V2 no longer supports this.",
  ],
  [
    "chunkRename",
    "Since it's hard to implement such feature on vite, we no longer support this plugin in V2.",
  ],
  [
    "cleanUrl",
    "Due to better seo consideration, we no longer support this plugin in V2.",
  ],
  [
    "smoothScroll",
    "We provides smooth scrolling via CSS in V2, so this plugin is no longer needed.",
  ],
];

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
const handleBlogOptions = (blogOptions: Record<string, unknown>): void => {
  if ("links" in blogOptions) {
    logger.warn(
      '"blog.links" options is deprecated, please use "blog.medias" instead',
    );
    blogOptions["medias"] = blogOptions["links"];
    delete blogOptions["links"];
  }

  if ("perPage" in blogOptions) {
    logger.warn(
      '"blog.perPage" options is deprecated, please use "blog.articlePerPage" instead',
    );
    blogOptions["articlePerPage"] = blogOptions["perPage"];
    delete blogOptions["perPage"];
  }

  if ("autoExcerpt" in blogOptions) {
    logger.error(
      '"blog.autoExcerpt" options is no longer supported, please use "plugins.blog.excerptLength" instead',
    );
    delete blogOptions["autoExcerpt"];
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
const handleFooterOptions = (options: Record<string, unknown>): void => {
  if (isPlainObject(options["footer"]) && options["footer"]) {
    const footer = options["footer"];

    if ("copyright" in footer) {
      logger.warn(
        '"footer.copyright" options is deprecated, please use "copyright" instead',
      );

      options["copyright"] = <string>footer["copyright"];
    }

    if ("display" in footer) {
      logger.warn(
        '"footer.display" options is deprecated, please use "displayFooter" instead',
      );

      options["displayFooter"] = <boolean>footer["display"];
    }

    if ("content" in footer) {
      logger.warn(
        '"footer.content" options is deprecated, please use "footer" instead',
      );

      options["footer"] = <string>footer["content"];
    } else {
      delete options["footer"];
    }
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
export const convertThemeOptions = (
  themeOptions: Record<string, unknown>,
): ThemeOptions => {
  // ensure plugins
  const plugins = (themeOptions["plugins"] ??= {}) as Record<string, unknown>;

  DEPRECATED_THEME_OPTIONS.forEach(([deprecatedOption, newOption]) =>
    deprecatedLogger({
      options: themeOptions,
      deprecatedOption,
      newOption,
      scope: "themeConfig",
    }),
  );
  DROPPED_THEME_OPTIONS.forEach((item) => droppedLogger(themeOptions, ...item));

  // handle navbar
  if ("navbar" in themeOptions)
    themeOptions["navbar"] = convertNavbarOptions(themeOptions["navbar"]);

  // handle navbar layout
  if (isPlainObject(themeOptions["navbarLayout"])) {
    if ("left" in themeOptions["navbarLayout"]) {
      logger.warn(
        `To have better meaning under RTL layout, ${colors.magenta(
          "navbarLayout.left",
        )}" option is deprecated, please use ${colors.magenta(
          "navbarLayout.start",
        )} instead`,
      );
      themeOptions["navbarLayout"]["start"] = themeOptions["navbarLayout"][
        "left"
      ] as string[];
    }

    if ("right" in themeOptions["navbarLayout"]) {
      logger.warn(
        `To have better meaning under RTL layout, ${colors.magenta(
          "navbarLayout.right",
        )}" option is deprecated, please use ${colors.magenta(
          "navbarLayout.end",
        )} instead`,
      );
      themeOptions["navbarLayout"]["end"] = themeOptions["navbarLayout"][
        "right"
      ] as string[];
    }
  }

  // handle sidebar
  if ("sidebar" in themeOptions)
    themeOptions["sidebar"] = convertSidebarOptions(themeOptions["sidebar"]);

  // handle blog
  if (isPlainObject(themeOptions["blog"]) && themeOptions["blog"]) {
    handleBlogOptions(themeOptions["blog"] as Record<string, unknown>);

    if (!plugins["blog"])
      logger.warn(
        `Blog feature is tree-shakable in v2, you should set ${colors.magenta(
          "plugins.blog: true",
        )} in theme options to enable it.`,
      );
  }

  // handle component
  if (isArray(plugins["components"])) {
    logger.warn(
      `${colors.magenta(
        "plugins.components",
      )} no longer accepts array, please set it to ${colors.magenta(
        "plugin.components.components",
      )} instead.`,
    );

    plugins["components"] = {
      components: plugins["components"],
    };
  }

  // handle copyright plugin
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

  if (themeOptions["addThis"]) droppedLogger(themeOptions, "addThis");

  // handle encrypt
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

  // handle footer
  handleFooterOptions(themeOptions);

  // handle each locale
  if ("locales" in themeOptions && isPlainObject(themeOptions["locales"]))
    values(themeOptions["locales"]!).forEach(
      (localeConfig: Record<string, unknown>) => {
        DEPRECATED_THEME_OPTIONS.forEach(([deprecatedOption, newOption]) =>
          deprecatedLogger({
            options: localeConfig,
            deprecatedOption,
            newOption,
            scope: "themeConfig.locales",
          }),
        );
        DROPPED_THEME_OPTIONS.forEach((item) =>
          droppedLogger(localeConfig, ...item),
        );

        // handle navbar
        if ("navbar" in localeConfig)
          localeConfig["navbar"] = convertNavbarOptions(localeConfig["navbar"]);

        // handle navbar layout
        if (isPlainObject(localeConfig["navbarLayout"])) {
          if ("left" in localeConfig["navbarLayout"]) {
            logger.warn(
              `To have better meaning under RTL layout, ${colors.magenta(
                "navbarLayout.left",
              )}" option is deprecated, please use ${colors.magenta(
                "navbarLayout.start",
              )} instead`,
            );
            localeConfig["navbarLayout"]["start"] = localeConfig[
              "navbarLayout"
            ]["left"] as string[];
          }

          if ("right" in localeConfig["navbarLayout"]) {
            logger.warn(
              `To have better meaning under RTL layout, ${colors.magenta(
                "navbarLayout.right",
              )}" option is deprecated, please use ${colors.magenta(
                "navbarLayout.end",
              )} instead`,
            );
            localeConfig["navbarLayout"]["end"] = localeConfig["navbarLayout"][
              "right"
            ] as string[];
          }
        }

        // handle sidebar
        if ("sidebar" in localeConfig)
          localeConfig["sidebar"] = convertSidebarOptions(
            localeConfig["sidebar"],
          );

        // handle footer
        handleFooterOptions(localeConfig);

        // handle blog
        if (isPlainObject(localeConfig["blog"]) && localeConfig["blog"]) {
          handleBlogOptions(localeConfig["blog"] as Record<string, unknown>);

          if (!plugins["blog"])
            logger.warn(
              'Blog feature is tree-shakable in v2, you should set "plugins.blog: true" in theme options to enable it.',
            );
        }
      },
    );

  return themeOptions;
};
