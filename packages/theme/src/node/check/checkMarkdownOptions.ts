import { keys } from "@vuepress/helper";
import type { MarkdownOptions as VuePressMarkdownOptions } from "vuepress/markdown";
import { colors } from "vuepress/utils";

import type { MarkdownOptions as ThemeMarkdownOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

export const KNOWN_CORE_MARKDOWN_OPTIONS = [
  "anchor",
  "assets",
  "component",
  "emoji",
  "frontmatter",
  "headers",
  "title",
  "importCode",
  "links",
  "sfc",
  "slugify",
  "toc",
  "vPre",
];

export const KNOWN_THEME_MARKDOWN_OPTIONS = [
  // plugin-links-check
  "linksCheck",

  // plugin-markdown-ext
  "gfm",
  "breaks",
  "linkify",
  "footnote",
  "tasklist",
  "component",
  "vPre",

  // plugin-markdown-hint
  "alert",
  "hint",

  // plugin-markdown-image
  "figure",
  "imgLazyload",
  "imgMark",
  "imgSize",
  "legacyImgSize",
  "obsidianImgSize",

  // plugin-markdown-include
  "include",

  // plugin-markdown-stylize
  "align",
  "attrs",
  "sup",
  "sub",
  "mark",
  "spoiler",
  "stylize",

  // plugin-markdown-tab
  "tabs",
  "codeTabs",

  // plugin-markdown-math
  "math",

  // plugin-prismjs and plugin-shiki
  "highlighter",

  // plugin-revealjs
  "revealjs",

  // vuepress-plugin-md-enhance
  "chartjs",
  "echarts",
  "flowchart",
  "markmap",
  "mermaid",
  "plantuml",
  "demo",
  "playground",
  "kotlinPlayground",
  "vuePlayground",
  "sandpack",
];

/**
 * @private
 *
 * Check vuepress markdown options for noob users
 */
export const checkVuePressMarkdownOptions = (
  vuepressMarkdownOptions: VuePressMarkdownOptions,
  themeMarkdownOptions: ThemeMarkdownOptions,
): void => {
  keys(vuepressMarkdownOptions).forEach((key) => {
    if (!KNOWN_CORE_MARKDOWN_OPTIONS.includes(key)) {
      if (KNOWN_THEME_MARKDOWN_OPTIONS.includes(key)) {
        logger.warn(
          `You are setting "${colors.magenta(
            `markdown.${key}`,
          )}" option in ${colors.cyan(
            "vuepress config file",
          )}, but it's not supported by VuePress. You need to set the option in ${colors.cyan("theme options")}.`,
        );

        // @ts-expect-error: we are sure that the key exists in themeMarkdownOptions
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        themeMarkdownOptions[key] = vuepressMarkdownOptions[key];
      } else {
        logger.warn(
          `You are setting "${colors.magenta(
            `markdown.${key}`,
          )}" option in ${colors.cyan(
            "vuepress config file",
          )}, but it's not supported by VuePress.`,
        );
      }
    }
  });
};

/**
 * @private
 *
 * Check theme plugin options for noob users
 */
export const checkThemeMarkdownOptions = (
  vuepressMarkdownOptions: VuePressMarkdownOptions,
  themeMarkdownOptions: ThemeMarkdownOptions,
): void => {
  keys(themeMarkdownOptions).forEach((key) => {
    if (!KNOWN_THEME_MARKDOWN_OPTIONS.includes(key)) {
      if (KNOWN_CORE_MARKDOWN_OPTIONS.includes(key)) {
        logger.warn(
          `You are setting "${colors.magenta(
            `markdown.${key}`,
          )}" option in ${colors.cyan(
            "theme options",
          )}, but it's not supported by theme. You need to set the option in ${colors.cyan("vuepress config file")}.`,
        );
        // @ts-expect-error: we are sure that the key exists in vuepressMarkdownOptions
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        vuepressMarkdownOptions[key] = themeMarkdownOptions[key];
      } else {
        logger.warn(
          `You are setting "${colors.magenta(
            `markdown.${key}`,
          )}" option in ${colors.cyan(
            "theme options",
          )}, but it's not supported by theme.`,
        );
      }
    }
  });
};
