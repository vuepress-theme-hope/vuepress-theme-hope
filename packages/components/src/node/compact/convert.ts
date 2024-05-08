import { isPlainObject } from "@vuepress/helper";
import { colors } from "vuepress/utils";
import { createConverter } from "vuepress-shared/node";

import type { ComponentPluginOptions } from "../options/index.js";
import { logger } from "../utils.js";

/** @deprecated */
export const convertOptions = (
  options: ComponentPluginOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger, droppedLogger } = createConverter("components");

  deprecatedLogger({
    options,
    old: "iconAssets",
    new: "componentOptions.fontIcon.assets",
  });
  deprecatedLogger({
    options,
    old: "iconPrefix",
    new: "componentOptions.fontIcon.prefix",
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

  droppedLogger({
    options,
    old: "notice",
    new: "rootComponents.notice",
  });
  droppedLogger({
    options,
    old: "addThis",
  });

  if (isPlainObject(options.rootComponents)) {
    droppedLogger({
      options: options.rootComponents as Record<string, unknown>,
      old: "addThis",
    });

    if (options.rootComponents.backToTop) {
      logger.error(
        `"${colors.magenta(
          "rootComponents.backToTop",
        )}" is removed, please use ${colors.cyan("@vuepress/plugin-back-to-top")} instead.`,
      );
      delete options.rootComponents.backToTop;
    }

    if (options.rootComponents.notice) {
      logger.error(
        `"${colors.magenta(
          "rootComponents.notice",
        )}" component is no longer supported, please use ${colors.magenta(
          "@vuepress/plugin-notice",
        )} instead.`,
      );
      delete options.rootComponents.notice;
    }
  }

  if ((options.components as unknown[])?.includes("Catalog"))
    logger.warn(
      `${colors.cyan(
        "Catalog",
      )} component is no longer supported, please use ${colors.magenta(
        "@vuepress/plugin-catalog",
      )} instead.`,
    );

  if ((options.components as unknown[])?.includes("Replit"))
    logger.warn(
      `${colors.cyan(
        "Replit",
      )} component is deprecated because you can no longer run code in embed mode.`,
    );

  ["VideoPlayer", "AudioPlayer", "YouTube"].forEach((component) => {
    if ((options.components as unknown[])?.includes(component))
      logger.warn(
        `${colors.cyan(
          component,
        )} component is deprecated, please use ${colors.cyan(
          "VidStack",
        )} component instead.`,
      );
  });
};
