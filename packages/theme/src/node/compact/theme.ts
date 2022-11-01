import { convertNavbarConfig } from "./navbar.js";
import { convertSidebarConfig } from "./sidebar.js";
import { droppedLogger, deprecatedLogger } from "./utils.js";
import { logger } from "../utils.js";

import type { HopeThemeOptions } from "../../shared/index.js";

const DEPRECATED_THEME_OPTIONS: [string, string][] = [
  // v1
  ["darkLogo", "logoDark"],
  ["navAutoHide", "navbarAutoHide"],
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
  ["copyright", "plugins.copyright"],
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
  ["fullScreen", "fullscreen"],
  ["headingDepth", "headerDepth"],
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
    "hideSiteTitleonMobile",
    "Site title will be hide on mobile because there is no space for it.",
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
      '"blog.links" options is deprecated, please use "blog.medias" instead'
    );
    blogOptions["medias"] = blogOptions["links"];
    delete blogOptions["links"];
  }

  if ("perPage" in blogOptions) {
    logger.warn(
      '"blog.perPage" options is deprecated, please use "blog.articlePerPage" instead'
    );
    blogOptions["articlePerPage"] = blogOptions["perPage"];
    delete blogOptions["perPage"];
  }

  if ("autoExcerpt" in blogOptions) {
    logger.error(
      '"blog.autoExcerpt" options is no longer supported, please use "plugins.blog.autoExcerpt" instead'
    );
    delete blogOptions["autoExcerpt"];
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
const handleFooterOptions = (options: Record<string, unknown>): void => {
  if (typeof options["footer"] === "object" && options["footer"]) {
    const footer = options["footer"];

    if ("copyright" in footer) {
      logger.warn(
        '"footer.copyright" options is deprecated, please use "copyright" instead'
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options["copyright"] = footer["copyright"];
    }

    if ("display" in footer) {
      logger.warn(
        '"footer.display" options is deprecated, please use "displayFooter" instead'
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options["displayFooter"] = footer["display"];
    }

    if ("content" in footer) {
      logger.warn(
        '"footer.content" options is deprecated, please use "footer" instead'
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options["footer"] = footer["content"];
    } else delete options["footer"];
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
export const convertThemeConfig = (
  themeOptions: Record<string, unknown>
): HopeThemeOptions => {
  // ensure plugins
  const plugins = (themeOptions["plugins"] =
    (themeOptions["plugins"] as Record<string, unknown>) || {});

  DEPRECATED_THEME_OPTIONS.forEach(([deprecatedOption, newOption]) =>
    deprecatedLogger({
      options: themeOptions,
      deprecatedOption,
      newOption,
      scope: "themeConfig",
    })
  );
  DROPPED_THEME_OPTIONS.forEach((item) => droppedLogger(themeOptions, ...item));

  // handle navbar
  if ("navbar" in themeOptions)
    themeOptions["navbar"] = convertNavbarConfig(themeOptions["navbar"]);

  // handle sidebar
  if ("sidebar" in themeOptions)
    themeOptions["sidebar"] = convertSidebarConfig(themeOptions["sidebar"]);

  // handle footer
  handleFooterOptions(themeOptions);

  // handle blog
  if (typeof themeOptions["blog"] === "object" && themeOptions["blog"]) {
    handleBlogOptions(themeOptions["blog"] as Record<string, unknown>);
    if (!plugins["blog"]) plugins["blog"] = true;
  }

  // handle encrypt
  if (typeof themeOptions["encrypt"] === "object" && themeOptions["encrypt"]) {
    const encrypt = themeOptions["encrypt"] as Record<string, unknown>;

    if ("global" in encrypt && typeof encrypt["global"] !== "boolean") {
      logger.warn(
        'Setting admin password with "encrypt.global" in V1 is deprecated in V2, please use "encrypt.admin" instead.'
      );

      encrypt["admin"] = encrypt["global"];
    }

    if ("status" in encrypt) {
      logger.warn(
        '"encrypt.status" is deprecated, please use "encrypt.global" instead.'
      );

      encrypt["global"] = encrypt["status"] === "global";
      delete encrypt["status"];
    }
  }

  if (
    "locales" in themeOptions &&
    typeof themeOptions["locales"] === "object"
  ) {
    Object.values(themeOptions["locales"]!).forEach(
      (localeConfig: Record<string, unknown>) => {
        DEPRECATED_THEME_OPTIONS.forEach(([deprecatedOption, newOption]) =>
          deprecatedLogger({
            options: localeConfig,
            deprecatedOption,
            newOption,
            scope: "themeConfig.locales",
          })
        );
        DROPPED_THEME_OPTIONS.forEach((item) =>
          droppedLogger(localeConfig, ...item)
        );

        // handle navbar
        if ("navbar" in localeConfig)
          localeConfig["navbar"] = convertNavbarConfig(localeConfig["navbar"]);

        // handle sidebar
        if ("sidebar" in localeConfig)
          localeConfig["sidebar"] = convertSidebarConfig(
            localeConfig["sidebar"]
          );

        // handle footer
        handleFooterOptions(localeConfig);

        // handle blog
        if (typeof localeConfig["blog"] === "object" && localeConfig["blog"]) {
          handleBlogOptions(localeConfig["blog"] as Record<string, unknown>);
          if (!plugins["blog"]) plugins["blog"] = true;
        }
      }
    );
  }

  return themeOptions;
};
