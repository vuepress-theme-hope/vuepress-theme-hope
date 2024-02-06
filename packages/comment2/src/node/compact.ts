import { colors } from "vuepress/utils";

import type { CommentPluginOptions } from "./options.js";
import { logger } from "./utils.js";

/** @deprecated */
export const convertOptions = (
  options: CommentPluginOptions & {
    /** @deprecated */
    type?: "waline" | "giscus" | "twikoo" | "none";
  },
): void => {
  // v2 changes
  if ("type" in options) {
    logger.warn(
      `${colors.magenta("type")} is deprecated, please use ${colors.magenta(
        "provider",
      )}.`,
    );
    if (options["type"] === "waline") options.provider = "Waline";
    else if (options["type"] === "giscus") options.provider = "Giscus";
    else if (options["type"] === "twikoo") options.provider = "Twikoo";

    delete options["type"];
  }
};
