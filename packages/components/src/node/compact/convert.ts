import { colors } from "@vuepress/utils";
import { createConverter, isNumber, isPlainObject } from "vuepress-shared/node";

import type { ComponentOptions } from "../options/index.js";
import { logger } from "../utils.js";

/** @deprecated */
export const convertOptions = (
  options: ComponentOptions & Record<string, unknown>,
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
      options: <Record<string, unknown>>options.rootComponents,
      old: "addThis",
    });

    if (isNumber(options.rootComponents.backToTop)) {
      logger.error(
        `"${colors.magenta(
          "rootComponents.backToTop",
        )}" no longer support number, please check the docs at https://plugin-components.vuejs.press/guide/backtotop.html.`,
      );
      options.rootComponents.backToTop = {
        threshold: options.rootComponents.backToTop,
      };
    }

    if (isPlainObject(options.rootComponents.notice)) {
      logger.error(
        `"${colors.magenta(
          "rootComponents.notice",
        )}" no longer support object config, please check the docs at https://plugin-components.vuejs.press/guide/notice.html.`,
      );
      delete options.rootComponents.notice;
    }
  }

  if ((options.components as unknown[])?.includes("Catalog"))
    logger.warn(
      `${colors.cyan(
        "Catalog",
      )} component is deprecated, please use ${colors.cyan(
        "AutoCatalog",
      )} component with ${colors.magenta(
        "vuepress-plugin-auto-catalog",
      )} instead.`,
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
