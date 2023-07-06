import { colors } from "@vuepress/utils";

import type { BlogOptions } from "./options.js";
import { logger } from "./utils.js";

/** @deprecated */
export const convertOptions = (
  options: BlogOptions & {
    /** @deprecated */
    customElement?: (tagName: string) => boolean;
  },
): void => {
  // v2 changes
  if ("customElement" in options) {
    logger.warn(
      `${colors.magenta(
        "customElement",
      )} is deprecated, please use ${colors.magenta("isCustomElement")}.`,
    );

    options["isCustomElement"] = options["customElement"];
  }
};
