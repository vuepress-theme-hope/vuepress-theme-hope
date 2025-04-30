import { isArray, isPlainObject } from "@vuepress/helper";
import { colors } from "vuepress/utils";
import { createConverter } from "vuepress-shared/node";

import type { ComponentPluginOptions } from "../options/index.js";
import { logger } from "../utils.js";

/** @deprecated */
export const convertOptions = (
  options: ComponentPluginOptions & Record<string, unknown>,
): void => {
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
    if ((options.components as unknown[]).includes("Catalog"))
      logger.warn(
        `${colors.cyan(
          "Catalog",
        )} component is no longer supported, please use ${colors.magenta(
          "@vuepress/plugin-catalog",
        )} instead.`,
      );

    if ((options.components as unknown[]).includes("Replit"))
      logger.error(
        `${colors.cyan("Replit")} component is no longer supported because it no longer supports embed mode.`,
      );

    if ((options.components as unknown[]).includes("XiGua"))
      logger.error(
        `Since XiGua is merging in to DouYin (TikTok in China), ${colors.cyan("XiGua")} component is no longer supported.`,
      );

    if ((options.components as unknown[]).includes("FontIcon"))
      logger.warn(
        `${colors.cyan(
          "FontIcon",
        )} component is no longer supported, please use ${colors.magenta(
          "@vuepress/plugin-icon",
        )} instead.`,
      );

    ["VideoPlayer", "AudioPlayer", "YouTube"].forEach((component) => {
      if ((options.components as unknown[]).includes(component))
        logger.warn(
          `${colors.cyan(
            component,
          )} component is deprecated, please use ${colors.cyan(
            "VidStack",
          )} component instead.`,
        );
    });
  }
};
