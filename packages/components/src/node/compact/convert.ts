import { isArray, isPlainObject } from "@vuepress/helper";
import { createConverter } from "vuepress-shared";
import { colors } from "vuepress/utils";

import type { ComponentPluginOptions } from "../options/index.js";
import { logger } from "../utils.js";

/**
 * Components that are moved to `@vuepress/plugin-media`
 *
 * 已迁移至 `@vuepress/plugin-media` 的组件
 */
const MEDIA_COMPONENTS = [
  "ArtPlayer",
  "AudioPlayer",
  "BiliBili",
  "PDF",
  "VideoPlayer",
  "VidStack",
  "YouTube",
];

/**
 * @deprecated
 * @param options - Old component plugin options
 */
export const convertOptions = (options: ComponentPluginOptions & Record<string, unknown>): void => {
  const { deprecatedLogger, droppedLogger } = createConverter("components");

  droppedLogger({
    options,
    old: "addThis",
  });

  deprecatedLogger({
    options,
    old: "backToTop",
    new: "rootComponents.backToTop",
  });
  deprecatedLogger({
    options,
    old: "backToTopLocales",
    new: "locales.backToTop",
  });
  deprecatedLogger({
    options,
    old: "notice",
    new: "rootComponents.notice",
  });

  if (isPlainObject(options.rootComponents)) {
    const rootComponents = options.rootComponents as Record<string, unknown>;

    droppedLogger({
      options: rootComponents,
      old: "addThis",
    });

    if (rootComponents.backToTop) {
      logger.error(
        `"${colors.magenta(
          "rootComponents.backToTop",
        )}" is removed, please use ${colors.cyan("@vuepress/plugin-back-to-top")} instead.`,
      );
      delete rootComponents.backToTop;
    }

    if (rootComponents.notice) {
      logger.error(
        `"${colors.magenta(
          "rootComponents.notice",
        )}" component is no longer supported, please use ${colors.magenta(
          "@vuepress/plugin-notice",
        )} instead.`,
      );
      delete rootComponents.notice;
    }
  }

  if (isArray(options.components)) {
    if ((options.components as unknown[]).includes("Catalog")) {
      logger.warn(
        `${colors.cyan("Catalog")} component is no longer supported, please use ${colors.magenta(
          "@vuepress/plugin-catalog",
        )} instead.`,
      );
    }

    if ((options.components as unknown[]).includes("Replit")) {
      logger.error(
        `${colors.cyan("Replit")} component is no longer supported because it no longer supports embed mode.`,
      );
    }

    if ((options.components as unknown[]).includes("XiGua")) {
      logger.error(
        `Since XiGua is merging in to DouYin (TikTok in China), ${colors.cyan("XiGua")} component is no longer supported.`,
      );
    }

    if ((options.components as unknown[]).includes("FontIcon")) {
      logger.warn(
        `${colors.cyan("FontIcon")} component is no longer supported, please use ${colors.magenta(
          "@vuepress/plugin-icon",
        )} instead.`,
      );
    }

    MEDIA_COMPONENTS.forEach((component) => {
      if ((options.components as unknown[]).includes(component)) {
        logger.error(
          `${colors.cyan(component)} component is no longer supported, please use ${colors.magenta(
            "@vuepress/plugin-media",
          )} instead.`,
        );
      }
    });
  }

  if (isPlainObject(options.componentOptions)) {
    const componentOptions = options.componentOptions as Record<string, unknown>;

    ["artPlayer", "pdf"].forEach((key) => {
      if (key in componentOptions) {
        logger.error(
          `${colors.magenta(`componentOptions.${key}`)} is removed, please use ${colors.magenta(
            key === "artPlayer" ? "artplayer" : "pdf",
          )} option of ${colors.cyan("@vuepress/plugin-media")} instead.`,
        );
        // oxlint-disable-next-line typescript/no-dynamic-delete
        delete componentOptions[key];
      }
    });
  }

  if (isPlainObject(options.locales)) {
    const locales = options.locales as Record<string, unknown>;

    ["pdf", "vidstack"].forEach((key) => {
      if (key in locales) {
        logger.error(
          `${colors.magenta(`locales.${key}`)} is removed, as the related component is moved to ${colors.cyan(
            "@vuepress/plugin-media",
          )}.`,
        );
        // oxlint-disable-next-line typescript/no-dynamic-delete
        delete locales[key];
      }
    });
  }
};
