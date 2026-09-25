// oxlint-disable typescript/no-deprecated
// oxlint-disable max-lines
import { entries, isArray, isPlainObject } from "@vuepress/helper";
import { createConverter } from "vuepress-shared";
import { colors } from "vuepress/utils";

import type { ThemeOptions } from "../typings/index.js";
import { logger } from "../utils.js";
import { convertNavbarLayoutOptions, convertNavbarOptions } from "./convertNavbarOptions.js";
import { convertSidebarOptions } from "./convertSidebarOptions.js";

const DEPRECATED_THEME_OPTIONS: [string, string][] = [
  // v2
  ["hideSiteNameonMobile", "hideSiteNameOnMobile"],
  ["fullScreen", "fullscreen"],
  ["wideBreakPoint", "pcBreakPoint"],
];

/**
 * @deprecated You should use V2 standard options and avoid using it
 * @param options - Theme options
 * @param plugins - Theme plugins options
 * @param localePath - Locale path
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

    if (!plugins.blog) {
      logger.warn(
        `Blog feature is tree-shakable in v2, you should set ${colors.magenta(
          "plugins.blog: true",
        )} in theme options to enable it.`,
      );
    }
  }
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 * @param themeLocaleOptions - Theme locale options
 * @param localePath - Locale path
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
 * Components whose own embed player is used, and the `embeds` name they are converted to
 *
 * 使用平台自带嵌入播放器的组件，以及它们转换后的 `embeds` 名称
 */
const EMBED_COMPONENTS = new Map<string, string>([
  ["BiliBili", "bilibili"],
  ["YouTube", "youtube"],
]);

/**
 * Components played by ArtPlayer or Video.js, and the plugin options they are converted to
 *
 * 由 ArtPlayer 或 Video.js 播放的组件，以及它们转换后的插件选项
 *
 * The two players of the removed `VidStack` component are replaced by Video.js.
 *
 * 已移除的 `VidStack` 组件的两个播放器由 Video.js 代替。
 */
const MEDIA_COMPONENTS = new Map<string, string[]>([
  ["ArtPlayer", ["artplayer"]],
  ["AudioPlayer", ["videojsAudio"]],
  ["PDF", ["pdf"]],
  ["VidStack", ["videojs", "videojsAudio"]],
  ["VideoPlayer", ["videojs"]],
]);

/**
 * Convert the media components to the options of `@vuepress/plugin-media`
 *
 * 将媒体组件转换为 `@vuepress/plugin-media` 的选项
 *
 * @param componentsOptions - Component plugin options / 组件插件选项
 * @param mediaOptions - Media plugin options / 媒体插件选项
 * @returns Names of the converted components / 已转换的组件名称
 */
const convertMediaComponents = (
  componentsOptions: Record<string, unknown>,
  mediaOptions: Record<string, unknown>,
): string[] => {
  const componentNames = isArray(componentsOptions.components)
    ? (componentsOptions.components as string[])
    : [];
  const convertedComponents = componentNames.filter(
    (name) => MEDIA_COMPONENTS.has(name) || EMBED_COMPONENTS.has(name),
  );

  if (!convertedComponents.length) return convertedComponents;

  const embeds = isArray(mediaOptions.embeds) ? (mediaOptions.embeds as string[]) : [];

  for (const component of convertedComponents) {
    const embed = EMBED_COMPONENTS.get(component);

    if (embed) {
      if (!embeds.includes(embed)) embeds.push(embed);
    } else {
      for (const option of MEDIA_COMPONENTS.get(component) ?? []) mediaOptions[option] ??= true;
    }
  }

  if (embeds.length) mediaOptions.embeds = embeds;

  const restComponents = componentNames.filter((name) => !convertedComponents.includes(name));

  if (restComponents.length) componentsOptions.components = restComponents;
  else delete componentsOptions.components;

  return convertedComponents;
};

/**
 * Drop the component options that are removed with the media components
 *
 * 移除随媒体组件一同删除的组件选项
 *
 * @param componentsOptions - Component plugin options / 组件插件选项
 * @param mediaOptions - Media plugin options / 媒体插件选项
 */
const dropMediaComponentOptions = (
  componentsOptions: Record<string, unknown>,
  mediaOptions: Record<string, unknown>,
): void => {
  const { componentOptions: componentGlobalOptions, locales } = componentsOptions;

  if (isPlainObject<Record<string, unknown>>(componentGlobalOptions)) {
    const { artPlayer } = componentGlobalOptions;

    if ("artPlayer" in componentGlobalOptions) {
      if (mediaOptions.artplayer === true) {
        mediaOptions.artplayer = artPlayer;
      } else {
        logger.error(
          `${colors.magenta(
            "plugins.components.componentOptions.artPlayer",
          )} is ${colors.red("no longer supported")}, please use ${colors.magenta(
            "artplayer",
          )} option of ${colors.cyan("@vuepress/plugin-media")} instead.`,
        );
      }

      delete componentGlobalOptions.artPlayer;
    }

    if ("pdf" in componentGlobalOptions) {
      logger.error(
        `${colors.magenta("plugins.components.componentOptions.pdf")} is ${colors.red(
          "no longer supported",
        )}, as the PDF viewer is replaced by ${colors.magenta(
          "PDFViewer",
        )} of ${colors.cyan("@vuepress/plugin-media")}.`,
      );

      delete componentGlobalOptions.pdf;
    }
  }

  if (isPlainObject<Record<string, unknown>>(locales)) {
    ["pdf", "vidstack"].forEach((key) => {
      if (key in locales) {
        logger.error(
          `${colors.magenta(`plugins.components.locales.${key}`)} is ${colors.red(
            "no longer supported",
          )}, please use ${colors.magenta(
            key === "pdf" ? "plugins.media.pdfLocales" : "plugins.media.videojsLocales",
          )} of ${colors.cyan("@vuepress/plugin-media")} instead.`,
        );

        // oxlint-disable-next-line typescript/no-dynamic-delete
        delete locales[key];
      }
    });
  }
};

/**
 * Move media components of `vuepress-plugin-components` to `@vuepress/plugin-media`
 *
 * 将 `vuepress-plugin-components` 的媒体组件迁移至 `@vuepress/plugin-media`
 *
 * @deprecated You should use V2 standard options and avoid using it
 * @param pluginOptions - Theme plugin options
 */
const convertComponentOptions = (pluginOptions: Record<string, unknown>): void => {
  const componentsOptions = pluginOptions.components;

  if (!isPlainObject<Record<string, unknown>>(componentsOptions)) return;
  // Keep the media plugin disabled when the user disables it
  if ("media" in pluginOptions && !isPlainObject(pluginOptions.media)) return;

  const mediaOptions: Record<string, unknown> = isPlainObject<Record<string, unknown>>(
    pluginOptions.media,
  )
    ? pluginOptions.media
    : {};

  const convertedComponents = convertMediaComponents(componentsOptions, mediaOptions);

  if (!convertedComponents.length) return;

  pluginOptions.media = mediaOptions;

  dropMediaComponentOptions(componentsOptions, mediaOptions);

  logger.warn(
    `Media components are removed from ${colors.magenta(
      "plugins.components",
    )}, please use ${colors.magenta("plugins.media")} of ${colors.cyan(
      "@vuepress/plugin-media",
    )} instead. The following components are converted for you: ${convertedComponents
      .map((component) => colors.magenta(component))
      .join(", ")}.`,
  );
};

/**
 * @deprecated You should use V2 standard options and avoid using it
 * @param themeOptions - Theme options
 */
// oxlint-disable-next-line complexity, max-lines-per-function, max-statements
const covertPluginOptions = (themeOptions: Record<string, unknown>): void => {
  const { deprecatedLogger } = createConverter("theme plugin options");

  const markdownOptions = (themeOptions.markdown ??= {}) as Record<string, unknown>;
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

  convertComponentOptions(pluginOptions);

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
        ...(isPlainObject(mdEnhanceOptions.katex) ? mdEnhanceOptions.katex : {}),
      };
    }

    if ("mathjax" in mdEnhanceOptions) {
      logger.warn(
        `${colors.magenta("plugins.mdEnhance.mathjax")} is deprecated, you should use ${colors.magenta("markdown.math")} instead.`,
      );

      pluginOptions.markdownMath = {
        type: "mathjax",
        ...(isPlainObject(mdEnhanceOptions.mathjax) ? mdEnhanceOptions.mathjax : {}),
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
      const markdownHint = pluginOptions.markdownHint as Record<string, unknown>;

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
 * @param themeOptions - Theme options
 * @returns Converted theme options
 */
// oxlint-disable-next-line max-lines-per-function
export const convertThemeOptions = (themeOptions: Record<string, unknown>): ThemeOptions => {
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
  if ("navbar" in themeOptions) themeOptions.navbar = convertNavbarOptions(themeOptions.navbar);

  if ("sidebar" in themeOptions) themeOptions.sidebar = convertSidebarOptions(themeOptions.sidebar);

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
  if (themeOptions.addThis) {
    droppedLogger({
      options: themeOptions,
      old: "addThis",
    });
  }

  // Handle copyright plugin
  if (isPlainObject(themeOptions.copyright) || themeOptions.copyright === true) {
    logger.warn(
      `${colors.magenta("copyright")} is deprecated in V2, please use ${colors.magenta(
        "plugins.copyright",
      )} instead.`,
    );
  }

  // Handle encrypt
  if (isPlainObject(themeOptions.encrypt)) {
    const encrypt = themeOptions.encrypt as Record<string, unknown>;

    if ("global" in encrypt && typeof encrypt.global !== "boolean") {
      logger.warn(
        `${colors.magenta("encrypt.global")} is deprecated in V2, please use ${colors.magenta(
          "encrypt.admin",
        )} instead.`,
      );

      encrypt.admin = encrypt.global;
    }

    if ("status" in encrypt) {
      logger.warn(
        `${colors.magenta("encrypt.status")} is deprecated, please use ${colors.magenta(
          "encrypt.global",
        )} instead.`,
      );

      encrypt.global = encrypt.status === "global";
      delete encrypt.status;
    }
  }

  // Handle each locale
  if ("locales" in themeOptions && isPlainObject(themeOptions.locales)) {
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
          localeConfig.navbar = convertNavbarOptions(localeConfig.navbar, localePath);

        // Handle sidebar
        if ("sidebar" in localeConfig)
          localeConfig.sidebar = convertSidebarOptions(localeConfig.sidebar, localePath);

        if (typeof localeConfig.headingDepth === "number") {
          logger.warn(
            `${colors.magenta("headingDepth")} is deprecated, please use ${colors.magenta(
              "toc.levels",
            )} instead.`,
          );

          if (localeConfig.toc !== false) {
            localeConfig.toc = {
              levels: [2, localeConfig.headingDepth + 2],
            };
          }
        }

        if (typeof localeConfig.headerDepth === "number") {
          logger.warn(
            `${colors.magenta("headerDepth")} is deprecated, please use ${colors.magenta(
              "toc.levels",
            )} instead.`,
          );

          if (localeConfig.toc !== false) {
            localeConfig.toc = {
              levels: [2, localeConfig.headerDepth + 2],
            };
          }
        }

        convertNavbarLayoutOptions(localeConfig);
        convertBlogOptions(localeConfig, plugins, localePath);
        convertFooterOptions(localeConfig);
      },
    );
  }

  return themeOptions;
};
