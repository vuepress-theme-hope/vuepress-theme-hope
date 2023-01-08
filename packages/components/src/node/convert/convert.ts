import { isPlainObject } from "@vuepress/shared";
import { colors } from "@vuepress/utils";
import { deprecatedLogger, droppedLogger } from "./utils.js";
import { logger } from "../utils.js";

import type { ComponentOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: ComponentOptions & Record<string, unknown>
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "iconAssets",
    newOption: "componentOptions.fontIcon.assets",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "iconPrefix",
    newOption: "componentOptions.fontIcon.prefix",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "addThis",
    newOption: "rootComponents.addThis",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "backToTop",
    newOption: "rootComponents.backToTop",
  });

  droppedLogger(options, "notice", "", "rootComponents.notice");

  if (isPlainObject(options.rootComponents?.notice)) {
    logger.error(
      `"${colors.magenta(
        "rootComponents.notice"
      )}" no longer support object config, please check the docs.`
    );
    delete options.rootComponents?.notice;
  }

  deprecatedLogger({
    options,
    deprecatedOption: "backToTopLocales",
    newOption: "locales.backToTop",
  });
};
