import { colors } from "@vuepress/utils";
import { createConverter } from "vuepress-shared/node";

import type { PWAOptions } from "./options.js";

/** @deprecated */
export const convertOptions = (
  options: PWAOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger, droppedLogger } = createConverter("pwa2");

  deprecatedLogger({
    options,
    old: "cacheMaxSize",
    new: "maxSize",
  });
  deprecatedLogger({
    options,
    old: "popupComponent",
    new: "updateComponent",
  });
  droppedLogger({ options, old: "showInstall" });
  droppedLogger({
    options,
    old: "popupComponent",
    msg: `This option is now split into ${colors.magenta(
      "hintComponent",
    )} and ${colors.magenta("updateComponent")}`,
  });
};
