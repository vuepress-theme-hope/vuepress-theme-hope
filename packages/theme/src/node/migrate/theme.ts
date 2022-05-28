import { covertNavbarConfig } from "./navbar";
import { convertSidebarConfig } from "./sidebar";
import { droppedLogger, deprecatedLogger } from "./utils";
import { logger } from "../utils";

import type { HopeThemeOptions } from "../../shared";

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
  ["fullSreen", "fullscreen"],
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

const handleBlogOptions = (blogOptions: Record<string, unknown>): void => {
  if ("links" in blogOptions) {
    logger.warn(
      '"blog.links" options is deprecated, please use "blog.medias" instead'
    );
    blogOptions.medias = blogOptions.links;
    delete blogOptions.links;
  }

  if ("perPage" in blogOptions) {
    logger.warn(
      '"blog.perPage" options is deprecated, please use "blog.articlePerPage" instead'
    );
    blogOptions.articlePerPage = blogOptions.perPage;
    delete blogOptions.perPage;
  }

  if ("autoExcerpt" in blogOptions) {
    logger.error(
      '"blog.autoExcerpt" options is no longer supported, please use "plugins.blog.autoExcerpt" instead'
    );
    delete blogOptions.autoExcerpt;
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
export const covertThemeConfig = (
  themeOptions: Record<string, unknown>
): HopeThemeOptions => {
  // ensure plugins
  const plugins = (themeOptions.plugins =
    (themeOptions.plugins as Record<string, unknown>) || {});

  DEPRECATED_THEME_OPTIONS.forEach(([deprecatedOption, newOption]) =>
    deprecatedLogger({
      options: themeOptions,
      deprecatedOption,
      newOption,
      scope: "themeConfig",
    })
  );
  DROPPED_THEME_OPTIONS.forEach((item) => droppedLogger(themeOptions, ...item));

  if (Array.isArray(themeOptions.navbar))
    themeOptions.navbar = covertNavbarConfig(themeOptions.navbar);

  if (typeof themeOptions.sidebar === "object")
    themeOptions.sidebar = convertSidebarConfig(themeOptions.sidebar);

  if (typeof themeOptions.blog === "object" && themeOptions.blog) {
    handleBlogOptions(themeOptions.blog as Record<string, unknown>);
    if (!plugins.blog) plugins.blog = true;
  }

  // handle encrypt
  if (typeof themeOptions.encrypt === "object" && themeOptions.encrypt) {
    const encrypt = themeOptions.ecrypt as Record<string, unknown>;

    if ("global" in encrypt && typeof encrypt.global !== "boolean") {
      logger.warn(
        'Setting admin password with "encrypt.global" in V1 is deprecated in V2, please use "encrypt.admin" instead.'
      );

      encrypt.admin = encrypt.global;
    }

    if ("status" in encrypt) {
      logger.warn(
        '"encrypt.status" is deprecated, please use "encrypt.global" instead.'
      );

      encrypt.gloabl = encrypt.status === "global";
      delete encrypt.status;
    }
  }

  if ("locales" in themeOptions && typeof themeOptions.locales === "object") {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Object.values(themeOptions.locales!).forEach(
      (value: Record<string, unknown>) => {
        DEPRECATED_THEME_OPTIONS.forEach(([deprecatedOption, newOption]) =>
          deprecatedLogger({
            options: value,
            deprecatedOption,
            newOption,
            scope: "themeConfig.locales",
          })
        );
        DROPPED_THEME_OPTIONS.forEach((item) => droppedLogger(value, ...item));

        if (Array.isArray(value.navbar))
          value.navbar = covertNavbarConfig(value.navbar);

        if (typeof value.sidebar === "object")
          value.sidebar = convertSidebarConfig(value.sidebar);

        if (typeof value.blog === "object" && value.blog) {
          handleBlogOptions(value.blog as Record<string, unknown>);
          if (!plugins.blog) plugins.blog = true;
        }
      }
    );
  }

  return themeOptions;
};
