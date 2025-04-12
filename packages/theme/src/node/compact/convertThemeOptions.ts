/* eslint-disable @typescript-eslint/no-deprecated */
import { entries, isArray, isPlainObject } from "@vuepress/helper";
import { colors } from "vuepress/utils";
import { createConverter } from "vuepress-shared";

import {
  convertNavbarLayoutOptions,
  convertNavbarOptions,
} from "./convertNavbarOptions.js";
import { convertSidebarOptions } from "./convertSidebarOptions.js";
import type { ThemeOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

const DEPRECATED_THEME_OPTIONS: [string, string][] = [
  // v2
  ["hideSiteNameonMobile", "hideSiteNameOnMobile"],
  ["fullScreen", "fullscreen"],
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
  if (isPlainObject<Record<string, unknown>>(options.blog)) {
    const blogOptions = options.blog;

    if ("links" in blogOptions) {
      logger.warn(
        `${colors.magenta("blog.links")} options is deprecated, please use ${colors.magenta("blog.medias")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );
      blogOptions.medias = blogOptions.links;
      delete blogOptions.links;
    }

    if ("perPage" in blogOptions) {
      logger.warn(
        `${colors.magenta("blog.perPage")} options is deprecated, please use ${colors.magenta("blog.articlePerPage")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );
      blogOptions.articlePerPage = blogOptions.perPage;
      delete blogOptions.perPage;
    }

    if ("autoExcerpt" in blogOptions) {
      logger.error(
        `${colors.magenta("blog.autoExcerpt")} options is no longer supported, please use ${colors.magenta("plugins.blog.excerptLength")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );
      delete blogOptions.autoExcerpt;
    }

    if (!plugins.blog)
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
  if (isPlainObject(themeLocaleOptions.footer)) {
    const { footer } = themeLocaleOptions;

    if ("copyright" in footer) {
      logger.warn(
        `${colors.magenta("footer.copyright")} options is deprecated, please use ${colors.magenta("copyright")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );

      themeLocaleOptions.copyright = footer.copyright as string;
    }

    if ("display" in footer) {
      logger.warn(
        `${colors.magenta("footer.display")} options is deprecated, please use ${colors.magenta("displayFooter")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );

      themeLocaleOptions.displayFooter = footer.display as boolean;
    }

    if ("content" in footer) {
      logger.warn(
        `${colors.magenta("footer.content")} options is deprecated, please use ${colors.magenta("footer")} instead${localePath ? ` , found in locale path ${localePath}` : ""}.`,
      );

      themeLocaleOptions.footer = footer.content as string;
    } else {
      delete themeLocaleOptions.footer;
    }
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
const covertPluginOptions = (themeOptions: Record<string, unknown>): void => {
  const { deprecatedLogger } = createConverter("theme plugin options");

  const markdownOptions = (themeOptions.markdown ??= {}) as Record<
    string,
    unknown
  >;
  const pluginOptions = themeOptions.plugins as Record<string, unknown>;

  // Handle component
  if (isArray(pluginOptions.components)) {
    logger.warn(
      `${colors.magenta(
        "plugins.components",
      )} no longer accepts array, please set it to ${colors.magenta(
        "plugin.components.components",
      )} instead.`,
    );

    pluginOptions.components = {
      components: pluginOptions.components,
    };
  }

  if (pluginOptions.linksCheck) {
    deprecatedLogger({
      options: themeOptions,
      old: "plugins.linksCheck",
      new: "markdown.linksCheck",
    });
  }

  if (isPlainObject(pluginOptions.mdEnhance)) {
    const { mdEnhance: mdEnhanceOptions } = pluginOptions;

    if ("alert" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.alert",
        new: "markdown.alert",
      });
    }

    if ("hint" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.hint",
        new: "markdown.hint",
      });
    }

    if ("figure" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.figure",
        new: "markdown.figure",
      });
    }

    if ("imgLazyload" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.imgLazyload",
        new: "markdown.imgLazyload",
      });
    }

    if ("imgSize" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.imgSize",
        new: "markdown.imgSize",
      });
    }

    if ("imgSize" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.obsidianImgSize",
        new: "markdown.obsidianImgSize",
      });
    }

    if ("imgMark" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.imgMark",
        new: "markdown.imgMark",
      });
    }

    if ("katex" in mdEnhanceOptions) {
      logger.warn(
        `${colors.magenta("plugins.mdEnhance.katex")} is deprecated, you should use ${colors.magenta("markdown.math")} instead.`,
      );

      pluginOptions.markdownMath = {
        type: "katex",
        ...(isPlainObject(mdEnhanceOptions.katex)
          ? mdEnhanceOptions.katex
          : {}),
      };
    }

    if ("mathjax" in mdEnhanceOptions) {
      logger.warn(
        `${colors.magenta("plugins.mdEnhance.mathjax")} is deprecated, you should use ${colors.magenta("markdown.math")} instead.`,
      );

      pluginOptions.markdownMath = {
        type: "mathjax",
        ...(isPlainObject(mdEnhanceOptions.mathjax)
          ? mdEnhanceOptions.mathjax
          : {}),
      };
    }

    if ("codetabs" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.codetabs",
        new: "markdown.codeTabs",
      });
    }

    if ("tabs" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.tabs",
        new: "markdown.tabs",
      });
    }

    if ("gfm" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.gfm",
        new: "markdown.gfm",
      });
    }

    if ("footnote" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.footnote",
        new: "markdown.footnote",
      });
    }

    if ("tasklist" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.tasklist",
        new: "markdown.tasklist",
      });
    }

    if ("breaks" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.breaks",
        new: "markdown.breaks",
      });
    }

    if ("linkify" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.linkify",
        new: "markdown.linkify",
      });
    }

    if ("component" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.component",
        new: "markdown.component",
      });
    }

    if ("vPre" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.vPre",
        new: "markdown.vPre",
      });
    }

    if ("include" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.include",
        new: "markdown.include",
      });
    }

    if ("align" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.align",
        new: "markdown.align",
      });
    }

    if ("attrs" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.attrs",
        new: "markdown.attrs",
      });
    }

    if ("mark" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.mark",
        new: "markdown.mark",
      });
    }

    if ("spoiler" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.spoiler",
        new: "markdown.spoiler",
      });
    }

    if ("sup" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.sup",
        new: "markdown.sup",
      });
    }

    if ("sub" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.sub",
        new: "markdown.sub",
      });
    }

    if ("stylize" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.stylize",
        new: "markdown.stylize",
      });
    }

    if ("revealJs" in mdEnhanceOptions) {
      logger.warn(
        `${colors.magenta("plugins.mdEnhance.revealJs")} is deprecated, you should install ${colors.cyan("@vuepress/plugin-revealjs")} and use ${colors.magenta("markdown.revealjs")} instead.`,
      );

      markdownOptions.revealjs = true;
    }

    if ("chart" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.chart",
        new: "markdown.chartjs",
      });
    }

    if ("echarts" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.echarts",
        new: "markdown.echarts",
      });
    }

    if ("flowchart" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.flowchart",
        new: "markdown.flowchart",
      });
    }

    if ("mermaid" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.mermaid",
        new: "markdown.mermaid",
      });
    }

    if ("markmap" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.markmap",
        new: "markdown.markmap",
      });
    }

    if ("plantuml" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.plantuml",
        new: "markdown.plantuml",
      });
    }

    if ("demo" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.demo",
        new: "markdown.demo",
      });
    }

    if ("vuePlayground" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.vuePlayground",
        new: "markdown.vuePlayground",
      });
    }

    if ("kotlinPlayground" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.kotlinPlayground",
        new: "markdown.kotlinPlayground",
      });
    }

    if ("sandpack" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.sandpack",
        new: "markdown.sandpack",
      });
    }

    if ("playground" in mdEnhanceOptions) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.mdEnhance.playground",
        new: "markdown.playground",
      });
    }

    delete pluginOptions.mdEnhance;
  }

  if ("markdownHint" in pluginOptions) {
    logger.warn(
      `${colors.magenta("plugins.markdownHint")} is deprecated, you should use ${colors.magenta("markdown.alert")} and ${colors.magenta("markdown.hint")} instead.`,
    );

    if (isPlainObject(pluginOptions.markdownHint)) {
      const markdownHint = pluginOptions.markdownHint as Record<
        string,
        unknown
      >;

      if ("alert" in markdownHint) {
        deprecatedLogger({
          options: themeOptions,
          old: "plugins.markdownHint.alert",
          new: "markdown.alert",
        });
      }

      if ("hint" in markdownHint) {
        deprecatedLogger({
          options: themeOptions,
          old: "plugins.markdownHint.hint",
          new: "markdown.hint",
        });
      }
    } else if (pluginOptions.markdownHint === false) {
      markdownOptions.hint = false;
    }

    delete pluginOptions.markdownHint;
  }

  if (pluginOptions.markdownImg) {
    logger.warn(
      `${colors.magenta("plugins.markdownImg")} is deprecated, you should use ${colors.magenta("markdown.figure")} ${colors.magenta("markdown.imgLazyload")} ${colors.magenta("markdown.imgMark")} ${colors.magenta("markdown.imgSize")} and ${colors.magenta("markdown.obsidianImgSize")} instead.`,
    );

    if (isPlainObject(pluginOptions.markdownImg)) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.markdownImg.figure",
        new: "markdown.figure",
      });

      deprecatedLogger({
        options: themeOptions,
        old: "plugins.markdownImg.lazyload",
        new: "markdown.imgLazyload",
      });

      deprecatedLogger({
        options: themeOptions,
        old: "plugins.markdownImg.mark",
        new: "markdown.imgMark",
      });

      deprecatedLogger({
        options: themeOptions,
        old: "plugins.markdownImg.size",
        new: "markdown.imgSize",
      });

      deprecatedLogger({
        options: themeOptions,
        old: "plugins.markdownImg.obsidian",
        new: "markdown.obsidianImgSize",
      });
    } else if (pluginOptions.markdownImg === true) {
      markdownOptions.figure = true;
      markdownOptions.imgLazyload = true;
    }

    delete pluginOptions.markdownImg;
  }

  if (pluginOptions.markdownMath) {
    logger.warn(
      `${colors.magenta("plugins.markdownMath")} is deprecated, you should use ${colors.magenta("markdown.math")} instead.`,
    );

    deprecatedLogger({
      options: themeOptions,
      old: "plugins.markdownMath",
      new: "markdown.math",
    });

    delete pluginOptions.markdownMath;
  }

  if (pluginOptions.markdownTab) {
    logger.warn(
      `${colors.magenta("plugins.markdownTab")} is deprecated, you should use ${colors.magenta("markdown.tabs")} and ${colors.magenta("markdown.codeTabs")} instead.`,
    );

    if (isPlainObject(pluginOptions.markdownTab)) {
      deprecatedLogger({
        options: themeOptions,
        old: "plugins.markdownTab.tabs",
        new: "markdown.tabs",
      });

      deprecatedLogger({
        options: themeOptions,
        old: "plugins.markdownTab.code",
        new: "markdown.codeTabs",
      });
    } else if (pluginOptions.markdownTab === true) {
      markdownOptions.codeTabs = true;
      markdownOptions.tabs = true;
    }

    delete pluginOptions.markdownTab;
  }

  if (pluginOptions.searchPro) {
    logger.warn(
      `${colors.magenta("plugins.searchPro")} is deprecated, you should replace ${colors.cyan("vuepress-plugin-search-pro")} with ${colors.cyan("@vuepress/plugin-slimsearch")} in ${colors.green("package.json")} and use ${colors.magenta("plugins.slimsearch")} instead.`,
    );
    pluginOptions.slimsearch = pluginOptions.searchPro;
    delete pluginOptions.searchPro;
  }

  if (pluginOptions.prismjs) {
    logger.warn(
      `${colors.magenta("plugins.prismjs")} is deprecated, you should use ${colors.magenta("markdown.highlighter")} with ${colors.cyan('{ type: "prismjs", ...other options }')} instead.`,
    );

    markdownOptions.highlighter = {
      type: "prismjs",
      ...(isPlainObject(pluginOptions.prismjs) ? pluginOptions.prismjs : {}),
    };

    delete pluginOptions.prismjs;
  }

  if (pluginOptions.shiki) {
    logger.warn(
      `${colors.magenta("plugins.shiki")} is deprecated, you should use ${colors.magenta("markdown.highlighter")} with ${colors.cyan('{ type: "shiki", ...other options }')} instead.`,
    );

    markdownOptions.highlighter = {
      type: "shiki",
      ...(isPlainObject(pluginOptions.shiki) ? pluginOptions.shiki : {}),
    };

    delete pluginOptions.shiki;
  }

  if (pluginOptions.revealjs) {
    deprecatedLogger({
      options: themeOptions,
      old: "plugins.revealjs",
      new: "markdown.revealjs",
    });
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 */
export const convertThemeOptions = (
  themeOptions: Record<string, unknown>,
): ThemeOptions => {
  const { deprecatedLogger, droppedLogger } = createConverter("theme options");

  // Ensure plugins
  const plugins = (themeOptions.plugins ??= {}) as Record<string, unknown>;

  covertPluginOptions(themeOptions);

  DEPRECATED_THEME_OPTIONS.forEach(([oldOption, newOption]) => {
    deprecatedLogger({
      options: themeOptions,
      old: oldOption,
      new: newOption,
    });
  });

  // Handle navbar
  if ("navbar" in themeOptions)
    themeOptions.navbar = convertNavbarOptions(themeOptions.navbar);

  if ("sidebar" in themeOptions)
    themeOptions.sidebar = convertSidebarOptions(themeOptions.sidebar);

  convertNavbarLayoutOptions(themeOptions);
  convertBlogOptions(themeOptions, plugins);
  convertFooterOptions(themeOptions);

  // handle icon options
  deprecatedLogger({
    options: themeOptions,
    old: "iconAssets",
    new: "plugins.icon.assets",
  });
  deprecatedLogger({
    options: themeOptions,
    old: "iconPrefix",
    new: "plugins.icon.prefix",
  });
  // handle addThis
  if (themeOptions.addThis)
    droppedLogger({
      options: themeOptions,
      old: "addThis",
    });

  // Handle copyright plugin
  if (isPlainObject(themeOptions.copyright) || themeOptions.copyright === true)
    logger.warn(
      `${colors.magenta(
        "copyright",
      )} is deprecated in V2, please use ${colors.magenta(
        "plugins.copyright",
      )} instead.`,
    );

  // Handle encrypt
  if (isPlainObject(themeOptions.encrypt)) {
    const encrypt = themeOptions.encrypt as Record<string, unknown>;

    if ("global" in encrypt && typeof encrypt.global !== "boolean") {
      logger.warn(
        `${colors.magenta(
          "encrypt.global",
        )} is deprecated in V2, please use ${colors.magenta(
          "encrypt.admin",
        )} instead.`,
      );

      encrypt.admin = encrypt.global;
    }

    if ("status" in encrypt) {
      logger.warn(
        `${colors.magenta(
          "encrypt.status",
        )} is deprecated, please use ${colors.magenta(
          "encrypt.global",
        )} instead.`,
      );

      encrypt.global = encrypt.status === "global";
      delete encrypt.status;
    }
  }

  // Handle each locale
  if ("locales" in themeOptions && isPlainObject(themeOptions.locales))
    entries(themeOptions.locales).forEach(
      ([localePath, localeConfig]: [string, Record<string, unknown>]) => {
        DEPRECATED_THEME_OPTIONS.forEach(([oldOption, newOption]) => {
          deprecatedLogger({
            options: localeConfig,
            old: oldOption,
            new: newOption,
            scope: "themeConfig.locales",
          });
        });

        // Handle navbar
        if ("navbar" in localeConfig)
          localeConfig.navbar = convertNavbarOptions(
            localeConfig.navbar,
            localePath,
          );

        // Handle sidebar
        if ("sidebar" in localeConfig)
          localeConfig.sidebar = convertSidebarOptions(
            localeConfig.sidebar,
            localePath,
          );

        if (typeof localeConfig.headingDepth === "number") {
          logger.warn(
            `${colors.magenta(
              "headingDepth",
            )} is deprecated, please use ${colors.magenta(
              "toc.levels",
            )} instead.`,
          );

          if (localeConfig.toc !== false)
            localeConfig.toc = {
              levels: [2, localeConfig.headingDepth + 2],
            };
        }

        if (typeof localeConfig.headerDepth === "number") {
          logger.warn(
            `${colors.magenta(
              "headerDepth",
            )} is deprecated, please use ${colors.magenta(
              "toc.levels",
            )} instead.`,
          );

          if (localeConfig.toc !== false)
            localeConfig.toc = {
              levels: [2, localeConfig.headerDepth + 2],
            };
        }

        convertNavbarLayoutOptions(localeConfig);
        convertBlogOptions(localeConfig, plugins, localePath);
        convertFooterOptions(localeConfig);
      },
    );

  return themeOptions;
};
